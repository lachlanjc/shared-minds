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
import { PlusIcon } from "@radix-ui/react-icons";

const APPS = ["safari", "welcome", "photos", "notes"];

export default function Page() {
  const [items, setItems] = useState(["welcome"]);
  const dragRef = useRef<HTMLDivElement>(null);

  return (
    <Scene imgSrc={imgScene} imgAlt="IMA workspace">
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
                  <h1>Welcome to spatial&nbsp;computing</h1>
                  <p className="mb-8">Drag & scroll your way around.</p>
                  <h1>Hi :)</h1>
                </ContentWindow>
              );
            case "photo":
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
            <button className="openButton" title="Open app">
              <PlusIcon width={32} height={32} />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end" className={styles.dockMenu}>
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
