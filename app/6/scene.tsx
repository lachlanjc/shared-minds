import type { PropsWithChildren } from "react";
import Image, { ImageProps } from "next/image";
import styles from "./scene.module.css";

function Scene({
  imgSrc,
  imgAlt,
  children,
}: PropsWithChildren<{ imgSrc: ImageProps["src"]; imgAlt: string }>) {
  return (
    <div className={styles.scene}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        fill
        className={styles.sceneBg}
        unoptimized
      />
      <div className={styles.sceneBlur} />
      {children}
    </div>
  );
}

export default Scene;
