import clsx from "clsx";
import styles from "./window.module.css";
import {
  useState,
  type PropsWithChildren,
  type Ref,
  type RefObject,
} from "react";
import { ArrowTopRightIcon, Cross1Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Spinner from "./spinner";
import { getAIImage, getAIMusic } from "./ai";
import { ArrowClockwise, ArrowRight } from "react-bootstrap-icons";
import { useCompletion } from "ai/react";

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
      // dragMomentum={false}
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
      <div className={clsx(styles.windowContent, styles.windowWelcome)}>
        {children}
      </div>
    </Window>
  );
}

export function SafariWindow({
  url,
  domain,
  ...props
}: { url: string; domain: string } & WindowProps) {
  return (
    <Window className={styles.windowSafari} {...props}>
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
  const [url, setUrl] = useState("");
  return (
    <Window className={styles.windowPhoto} {...props}>
      <AIPrompt
        label="What do you want to see?"
        onSubmit={(prompt) =>
          getAIImage(prompt, 512, 768).then((url) => setUrl(url))
        }
      >
        <div className={styles.windowPhotoContainer}>
          <img
            alt="Photo"
            src={url}
            className={styles.windowPhotoImage}
            draggable={false}
          />
        </div>
        <div className={styles.windowPhotoBlur} aria-hidden />
      </AIPrompt>
    </Window>
  );
}

export function NotesWindow(props: WindowProps) {
  const { completion, input, handleInputChange, handleSubmit, error } =
    useCompletion({ api: "/7/completion" });
  return (
    <Window className={styles.windowNotes} {...props}>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.windowNotesTitle}
          value={input}
          placeholder="Note title"
          onChange={handleInputChange}
        />
      </form>
      <div className={styles.windowContent}>
        <p>{completion}</p>
        {error && (
          <p>
            Oh no:
            {error.message}
          </p>
        )}
      </div>
    </Window>
  );
}

export function GrammarlyWindow(props: WindowProps) {
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    error,
    isLoading,
  } = useCompletion({
    api: "/7/grammarly",
  });
  return (
    <Window className={styles.windowGrammarly} {...props}>
      <form
        onSubmit={handleSubmit}
        className={styles.prompt}
        style={{ padding: 0 }}
      >
        <textarea
          rows={2}
          className={styles.promptTextarea}
          value={input}
          placeholder="Note title"
          onChange={handleInputChange}
        />
        <footer className={styles.promptFooter}>
          <button
            type="submit"
            className={clsx(styles.windowActionButton)}
            style={{ backgroundColor: "#15c39a" }}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size={24} /> : <ArrowRight size={24} />}
          </button>
        </footer>
      </form>
      <div className={styles.windowContent}>
        <h1>Grammarly results</h1>
        <p>{completion}</p>
        {error && (
          <p>
            Oh no:
            {error.message}
          </p>
        )}
      </div>
    </Window>
  );
}

export function MusicWindow(props: WindowProps) {
  const [data, setData] = useState<null | {
    audio: string;
    spectrogram: string;
  }>(null);
  return (
    <Window className={styles.windowMusic} {...props}>
      <AIPrompt
        label="What do you want to listen to?"
        onSubmit={(prompt) => getAIMusic(prompt).then((res) => setData(res))}
      >
        {data ? (
          <>
            <div className={styles.windowMusicPlayer}>
              <audio controls autoPlay loop>
                <source src={data.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <img
              src={data.spectrogram}
              alt="Spectrogram"
              className={styles.windowMusicSpectrogram}
              draggable={false}
            />
          </>
        ) : (
          <Spinner size={32} />
        )}
      </AIPrompt>
    </Window>
  );
}

export function AIPrompt({
  label,
  onSubmit,
  children,
}: PropsWithChildren<{
  label: string;
  onSubmit: (prompt: string) => Promise<void>;
}>) {
  const STAGES = ["prompt", "generating", "error", "response"] as const;
  const [stage, setStage] = useState<(typeof STAGES)[number]>(STAGES[0]);
  const [prompt, setPrompt] = useState("");

  switch (stage) {
    case "prompt":
      return (
        <form
          className={styles.prompt}
          onSubmit={(e) => {
            e.preventDefault();
            setStage(STAGES[1]);
            onSubmit(prompt)
              .then(() => setStage(STAGES[3]))
              .catch(() => setStage(STAGES[2]));
          }}
        >
          <label className={styles.promptLabel}>
            {label}
            <textarea
              className={styles.promptTextarea}
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.currentTarget.value)}
              rows={2}
            />
          </label>
          <footer className={styles.promptFooter}>
            <button
              type="submit"
              className={clsx(
                styles.windowActionButton,
                styles.windowActionButtonPrimary,
              )}
            >
              <ArrowRight size={24} />
            </button>
          </footer>
        </form>
      );
    case "generating":
      return (
        <div className={clsx(styles.prompt, styles.promptLoading)}>
          <Spinner size={64} />
        </div>
      );
    case "error":
      return (
        <div className={styles.prompt}>
          <p>Ooops, something went wrong.</p>
          <footer className={styles.promptFooter}>
            <button
              onClick={() => setStage(STAGES[0])}
              className={clsx(
                styles.windowActionButton,
                styles.windowActionButtonPrimary,
              )}
            >
              <ArrowClockwise size={24} />
            </button>
          </footer>
        </div>
      );
    case "response":
      return (
        <>
          {children}
          <footer className={styles.promptFooter}>
            <button
              onClick={() => setStage(STAGES[0])}
              className={clsx(styles.windowActionButton)}
            >
              <ArrowClockwise size={24} />
            </button>
          </footer>
        </>
      );
  }
}
