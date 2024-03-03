import clsx from "clsx";
import styles from "./window.module.css";
import type { PropsWithChildren, Ref, RefObject } from "react";
import { ArrowTopRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";

interface WindowProps {
  id: string;
  className?: string;
  dragRef?: RefObject<HTMLElement>;
  onClose?: () => void;
}

export function Window({
  children,
  className,
  id,
  dragRef,
  onClose,
}: PropsWithChildren<WindowProps>) {
  return (
    <motion.div
      id={id}
      drag
      dragConstraints={dragRef}
      // dragElastic={0}
      dragMomentum={false}
      // dragElastic={0.9}
      // dragTransition={{ bounceStiffness: 1000, bounceDamping: 8000 }}
      className={clsx(styles.window, className)}
    >
      {/* <div className={styles.blur} aria-hidden /> */}
      {children}
      <button className={styles.windowClose} onClick={onClose}>
        <Cross1Icon width={15} height={15} />
      </button>
    </motion.div>
  );
}

export function ContentWindow({
  children,
  ...props
}: PropsWithChildren<WindowProps>) {
  return (
    <Window {...props}>
      <div className={styles.windowContent}>{children}</div>
    </Window>
  );
}

export function SafariWindow({
  url,
  domain,
  ...props
}: { url: string; domain: string } & WindowProps) {
  return (
    <Window className={styles.windowPreview} {...props}>
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

/*
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
*/

export function PhotosWindow(props: WindowProps) {
  return (
    <Window className={styles.windowPhoto} {...props}>
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

export function NotesWindow(props: WindowProps) {
  return (
    <Window className={styles.windowNotes} {...props}>
      <textarea className={styles.windowNotesTextarea} />
    </Window>
  );
}

// TODO: Prompt component
export function AIPrompt({ prompt }: { prompt: string }) {
  return (
    <div className={styles.prompt}>
      <label>
        {prompt}
        <textarea className={styles.windowNotesTextarea} />
      </label>
    </div>
  );
}

// TODO: Music app
// TODO: Photo app
