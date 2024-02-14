import clsx from "clsx";
import styles from "./window.module.css";
import type { PropsWithChildren } from "react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image, { type ImageProps } from "next/image";
import { Reorder, motion } from "framer-motion";

export function Window({
  children,
  className,
  id,
}: PropsWithChildren<{ id: string; className?: string }>) {
  return (
    <Reorder.Item
      value={id}
      id={id}
      as="div"
      className={clsx(styles.window, className)}
    >
      {children}
    </Reorder.Item>
  );
}

export function ContentWindow({ children }: PropsWithChildren<{}>) {
  return (
    <Window id="content">
      <div className={styles.windowContent}>{children}</div>
    </Window>
  );
}

export function SafariWindow({ url, domain }: { url: string; domain: string }) {
  return (
    <Window className={styles.windowPreview} id="safari">
      <div className={styles.windowToolbar}>
        <span className={styles.windowToolbarDomain}>{domain}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.windowToolbarButton}
        >
          <ArrowTopRightIcon width={15} height={15} />
        </a>
      </div>
      {/* <div className={styles.windowIframeContainer}>  */}
      <iframe src={url} className={styles.windowIframe} frameBorder={0} />
      {/* </div> */}
    </Window>
  );
}

export function PhotoWindow({ src, alt }: Pick<ImageProps, "src" | "alt">) {
  return (
    <Window className={styles.windowPhoto} id="photo">
      <Image
        unoptimized
        src={src}
        alt={alt}
        fill
        className={styles.windowPhotoImage}
        draggable={false}
      />
      <div className={styles.windowPhotoBlur} aria-hidden />
    </Window>
  );
}

export function PhotosWindow() {
  return (
    <Window className={styles.windowPhoto} id="photo">
      <div className={styles.windowPhotoContainer}>
        {...new Array(5)
          .fill(null)
          .map((_, i) => (
            <Image
              key={i}
              unoptimized
              placeholder="blur"
              src={require(`./gallery/${i + 1}.jpeg`).default}
              alt={`Photo ${i + 1}`}
              className={styles.windowPhotoImage}
              draggable={false}
            />
          ))}
      </div>
      <div className={styles.windowPhotoBlur} aria-hidden />
    </Window>
  );
}
