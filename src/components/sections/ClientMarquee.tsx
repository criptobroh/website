"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import { CLIENTS } from "@/lib/clients";
import styles from "./ClientMarquee.module.css";

const lead = new Map(["sequra", "legalwise", "seeds"].map((key, index) => [key, index]));
const clients = [...CLIENTS].sort((a, b) => (lead.get(a.key) ?? lead.size) - (lead.get(b.key) ?? lead.size));

const labels = {
  es: {
    clients: "Trabajamos con",
    link: "Trabajamos con estas empresas. Ver proyectos de clientes",
    pause: "Pausar",
    resume: "Reanudar",
    pauseLabel: "Pausar el movimiento de los logos",
    resumeLabel: "Reanudar el movimiento de los logos",
  },
  en: {
    clients: "Teams we work with",
    link: "Teams we work with. Explore client projects",
    pause: "Pause",
    resume: "Resume",
    pauseLabel: "Pause the moving logos",
    resumeLabel: "Resume the moving logos",
  },
};

export default function ClientMarquee() {
  const text = labels[useLocale() === "es" ? "es" : "en"];
  const [paused, setPaused] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="client-marquee-label">
      <div className={styles.bar}>
        <a className={styles.link} href="#clientes" aria-label={text.link}>
          <span id="client-marquee-label">{text.clients}</span>
          <span aria-hidden="true">↘</span>
        </a>
        <button
          className={styles.control}
          type="button"
          aria-controls="client-marquee-track"
          aria-label={paused ? text.resumeLabel : text.pauseLabel}
          onClick={() => setPaused(!paused)}
        >
          <span className={styles.icon} data-paused={paused} aria-hidden="true" />
          {paused ? text.resume : text.pause}
        </button>
      </div>
      <div className={styles.window}>
        <div className={styles.track} id="client-marquee-track" data-paused={paused}>
          {[false, true].map((duplicate) => (
            <ul className={styles.group} key={String(duplicate)} aria-hidden={duplicate || undefined} role="list">
              {clients.map((client) => (
                <li
                  key={client.key}
                  className={styles.tile}
                  data-dark={client.darkTile || undefined}
                  data-client={client.key}
                  title={duplicate ? undefined : client.mark}
                >
                  <Image
                    src={client.logo}
                    width={240}
                    height={86}
                    unoptimized
                    loading="eager"
                    alt={duplicate ? "" : client.mark}
                    className={styles.mark}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
