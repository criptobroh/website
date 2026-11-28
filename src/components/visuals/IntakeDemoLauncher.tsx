"use client";

import dynamic from "next/dynamic";
import { useLocale } from "next-intl";
import { useId, useRef, useState } from "react";
import styles from "./IntakeDemoLauncher.module.css";

function LoadingDemo() {
  const isEnglish = useLocale() === "en";
  return <p className={styles.loading} role="status">{isEnglish ? "Loading example…" : "Cargando el ejemplo…"}</p>;
}

const IntakeDemo = dynamic(() => import("./IntakeDemo"), { loading: LoadingDemo });

export default function IntakeDemoLauncher() {
  const isEnglish = useLocale() === "en";
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        ref={opener}
        className={styles.opener}
        aria-haspopup="dialog"
        aria-controls={id}
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
      >
        <span className={styles.play} aria-hidden="true" />
        {isEnglish ? "See an example" : "Ver un ejemplo"}
      </button>
      <dialog
        id={id}
        ref={dialog}
        aria-labelledby={`${id}-heading`}
        className={styles.dialog}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onClose={() => {
          setOpen(false);
          opener.current?.focus({ preventScroll: true });
        }}
      >
        <div>
          <div className={styles.header}>
            <h2 id={`${id}-heading`}>{isEnglish ? "From email to CRM" : "Del correo al CRM"}</h2>
            <button type="button" className={styles.close} onClick={() => dialog.current?.close()}>
              {isEnglish ? "Close" : "Cerrar"} <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className={styles.content}>{open && <IntakeDemo />}</div>
        </div>
      </dialog>
    </>
  );
}
