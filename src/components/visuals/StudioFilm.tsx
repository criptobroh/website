"use client";

import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocale } from "next-intl";
import styles from "./StudioFilm.module.css";

const film = "/media/fde/intro.mp4";

export default function StudioFilm() {
  const en = useLocale() === "en";
  const title = en ? "What an FDE does" : "Qué hace un FDE";
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  function watch() {
    // Mount the media and start playback within the same user gesture on iOS.
    flushSync(() => setOpen(true));
    dialog.current?.showModal();
    // Native controls remain available when the browser requires another tap.
    video.current?.play().catch(() => {});
  }

  function finish() {
    video.current?.pause();
    setOpen(false);
    setFailed(false);
    button.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <button
        ref={button}
        type="button"
        className={styles.trigger}
        aria-label={en ? "Watch What an FDE does with Pablo Loyúdice, 27 seconds" : "Ver Qué hace un FDE con Pablo Loyúdice, 27 segundos"}
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={watch}
      >
        <span className={styles.play} aria-hidden="true" />
        <span className={styles.label}>
          <strong>{title}</strong>
          <span>Pablo Loyúdice · 0:27</span>
        </span>
      </button>
      <dialog
        id={id}
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={`${id}-title`}
        onClose={finish}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div>
          <header className={styles.header}>
            <div>
              <h2 id={`${id}-title`}>{title}</h2>
              <p>{en ? "Pablo Loyúdice · Spanish audio" : "Pablo Loyúdice"}</p>
            </div>
            <button type="button" className={styles.close} onClick={() => dialog.current?.close()}>
              {en ? "Close" : "Cerrar"} <span aria-hidden="true">×</span>
            </button>
          </header>
          {open && (
            <video
              ref={video}
              src={film}
              className={styles.video}
              aria-label={title}
              controls
              playsInline
              preload="metadata"
              onError={() => setFailed(true)}
            >
              <track kind="subtitles" src="/media/fde/intro-en.vtt" srcLang="en" label="English" default={en} />
              <track kind="captions" src="/media/fde/intro-es.vtt" srcLang="es" label="Español" default={!en} />
            </video>
          )}
          {failed && (
            <p role="status" className={styles.fallback}>
              {en ? "The video couldn’t play." : "No se pudo reproducir el video."}{" "}
              <a href={film}>{en ? "Open video file" : "Abrí el archivo de video"}</a>
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}
