import type { PropsWithChildren } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./scene.module.css";

function Scene({
  imgSrc,
  imgAlt,
  children,
}: PropsWithChildren<{ imgSrc: StaticImageData; imgAlt: string }>) {
  return (
    <div className={styles.scene}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        fill
        placeholder="blur"
        className={styles.sceneBg}
      />
      <div className={styles.sceneBlur} />
      {children}
    </div>
  );
}

export default Scene;
