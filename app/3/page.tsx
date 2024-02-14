"use client";
import "./page.css";
import imgScene from "./IMG_2182.jpeg";
import imgPhoto from "./IMG_5731.jpeg";
import Scene from "./scene";
import {
  ContentWindow,
  SafariWindow,
  PhotoWindow,
  PhotosWindow,
} from "./window";
import { Reorder, motion } from "framer-motion";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const WINDOWS = {
  content: (
    <ContentWindow key="content">
      <h1>Welcome to spatial&nbsp;computing</h1>
      <p className="mb-8">Drag & scroll your way around.</p>
      <h1>Hi :)</h1>
    </ContentWindow>
  ),
  safari: (
    <SafariWindow
      key="safari"
      url="https://edu.lachlanjc.com"
      domain="edu.lachlanjc.com"
    />
  ),
  photo: (
    // <PhotoWindow key="photo" src={imgPhoto} alt="" />
    <PhotosWindow key="photo" />
  ),
};

export default function Page() {
  const dragRef = useRef(null);
  const [items, setItems] = useState(["safari", "content", "photo"]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <Scene imgSrc={imgScene} imgAlt="IMA workspace">
      <Reorder.Group
        as="div"
        axis="x"
        className={clsx("outline-none", "windows")}
        ref={dragRef}
        values={items}
        onReorder={setItems}
      >
        {items.map((item) => WINDOWS[item as keyof typeof WINDOWS])}
      </Reorder.Group>
    </Scene>
  );
}
