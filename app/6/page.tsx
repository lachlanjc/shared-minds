"use client";
import "./page.css";
import imgScene from "./IMG_2182.jpeg";
import Scene from "./scene";
import {
  ContentWindow,
  SafariWindow,
  PhotosWindow,
  NotesWindow,
} from "./window";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "./dock.module.css";
import { CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { GlobeAmericas } from "react-bootstrap-icons";
import { getAIImage } from "./ai";
import Spinner from "./spinner";

const APPS = ["welcome", "safari", "photos", "notes"];
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
            case "welcome":
              return (
                <ContentWindow key="welcome" id="welcome" dragRef={dragRef}>
                  <h1>Welcome to your future computer</h1>
                  {/* <p className="mb-8">Drag & scroll your way around.</p> */}
                </ContentWindow>
              );
            case "photos":
              return (
                <PhotosWindow key="photos" id="photos" dragRef={dragRef} />
              );
            case "notes":
              return <NotesWindow key="notes" id="notes" dragRef={dragRef} />;
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
          <DropdownMenu.Trigger asChild disabled={items.length === APPS.length}>
            <button
              className="openButton"
              title="Open app"
              disabled={items.length === APPS.length}
            >
              <PlusIcon width={24} height={24} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="center" className={styles.dockMenu}>
            {APPS.filter((app) => !items.includes(app)).map((app) => (
              <DropdownMenu.Item
                key={app}
                onSelect={() => setItems((prev) => [...prev, app])}
                className={styles.dockMenuItem}
              >
                Open {app}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </aside>
    </Scene>
  );
}
