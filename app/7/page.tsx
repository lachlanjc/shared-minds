"use client";
import "./page.css";
import imgScene from "./IMG_2182.jpeg";
import Scene from "./scene";
import {
  ContentWindow,
  SafariWindow,
  PhotosWindow,
  NotesWindow,
  GrammarlyWindow,
  MusicWindow,
} from "./window";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dock.module.css";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  GlobeAmericas,
  // GraphUpArrow,
  ImageFill,
  MusicNoteBeamed,
  // PinMapFill,
  CompassFill,
  StickiesFill,
  InfoCircleFill,
  KeyboardFill,
} from "react-bootstrap-icons";
import { getAIImage } from "./ai";
import Spinner from "./spinner";

const APP_ICONS: Record<string, JSX.Element> = {
  welcome: <InfoCircleFill />,
  safari: <CompassFill />,
  notes: <StickiesFill />,
  grammarly: <KeyboardFill />,
  photos: <ImageFill />,
  music: <MusicNoteBeamed />,
  // maps: <PinMapFill />,
  // stocks: <GraphUpArrow />,
};
const APP_NAMES = Object.keys(APP_ICONS);
const ENVIRONMENTS = [
  "IMA",
  "Yosemite",
  "Dune",
  "Big Sur",
  "Mars",
  "the Moon",
  "Paris park",
  "San Francisco Buena Vista",
  "San Francisco Golden Gate",
  "San Francisco Twin Peaks",
  "San Francisco Dolores Park",
];

export default function Page() {
  const [envName, setEnvName] = useState(ENVIRONMENTS[0]);
  const [envSrc, setEnvSrc] = useState(imgScene);
  const [isTransporting, setIsTransporting] = useState(false);

  const [items, setItems] = useState(["welcome"]);
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <Scene imgSrc={envSrc} imgAlt={envName}>
      <motion.div className={clsx("outline-none", "windows")} ref={dragRef}>
        {items.map((item) => {
          switch (item) {
            case "welcome":
              return (
                <ContentWindow
                  key="welcome"
                  id="welcome"
                  dragRef={dragRef}
                  onClose={() =>
                    setItems((prev) => prev.filter((i) => i !== "welcome"))
                  }
                >
                  <h1>
                    Welcome to your
                    <br />
                    AI computer
                  </h1>
                </ContentWindow>
              );
            case "safari":
              return (
                <SafariWindow
                  key="safari"
                  id="safari"
                  url="https://edu.lachlanjc.com"
                  domain="edu.lachlanjc.com"
                  dragRef={dragRef}
                  onClose={() =>
                    setItems((prev) => prev.filter((i) => i !== "safari"))
                  }
                />
              );
            case "photos":
              return (
                <PhotosWindow
                  key="photos"
                  id="photos"
                  dragRef={dragRef}
                  onClose={() =>
                    setItems((prev) => prev.filter((i) => i !== "photos"))
                  }
                />
              );
            case "notes":
              return (
                <NotesWindow
                  key="notes"
                  id="notes"
                  dragRef={dragRef}
                  onClose={() =>
                    setItems((prev) => prev.filter((i) => i !== "notes"))
                  }
                />
              );
            case "grammarly":
              return (
                <GrammarlyWindow
                  key="grammarly"
                  id="grammarly"
                  dragRef={dragRef}
                  onClose={() =>
                    setItems((prev) => prev.filter((i) => i !== "grammarly"))
                  }
                />
              );
            case "music":
              return (
                <MusicWindow
                  key="music"
                  id="music"
                  dragRef={dragRef}
                  onClose={() =>
                    setItems((prev) => prev.filter((i) => i !== "music"))
                  }
                />
              );
          }
        })}
      </motion.div>
      <aside className={styles.dock} role="toolbar">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button title="Environments">
              {isTransporting ? (
                <Spinner size={24} />
              ) : (
                <GlobeAmericas width={24} height={24} />
              )}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="center" className={styles.dockMenu}>
            {ENVIRONMENTS.map((env) => (
              <DropdownMenu.Item
                key={env}
                onSelect={() => {
                  setEnvName(env);
                  if (env === ENVIRONMENTS[0]) {
                    setEnvSrc(imgScene);
                  } else {
                    setIsTransporting(true);
                    const width = window.innerWidth - (window.innerWidth % 8);
                    const height =
                      window.innerHeight - (window.innerHeight % 8);
                    getAIImage(
                      `Panoramic ${env} in the style of Apple Mac wallpapers, photographic realism`,
                      width,
                      height,
                    ).then((url) => {
                      setEnvSrc(url);
                      setIsTransporting(false);
                    });
                  }
                }}
                className={styles.dockMenuItem}
                aria-selected={env === envName}
              >
                {env}
                {env === envName && <CheckIcon width={20} height={20} />}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            asChild
            disabled={items.length === APP_NAMES.length}
          >
            <button
              className="openButton"
              title="Open app"
              disabled={items.length === APP_NAMES.length}
            >
              <PlusIcon width={24} height={24} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="center" className={styles.dockMenu}>
            {APP_NAMES.filter((app) => !items.includes(app)).map((app) => (
              <DropdownMenu.Item
                key={app}
                onSelect={() => setItems((prev) => [...prev, app])}
                className={styles.dockMenuItem}
              >
                {APP_ICONS[app]}
                {app}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </aside>
    </Scene>
  );
}
