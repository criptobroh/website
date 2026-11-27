"use client";

import Image from "next/image";
import { useRef, useState, type Ref } from "react";
import { useTranslations } from "next-intl";
import { CLIENTS, COUNTRY_ORDER, type Client, type CountryCode } from "@/lib/clients";
import { CITY_POINTS, MAP_VIEWBOX, type CityKey } from "@/lib/world-map";
import styles from "./ClientsWorld.module.css";

type Filter = "all" | CountryCode;

const INITIAL_CARDS = 6;
const [mapX, mapY, mapWidth, mapHeight] = MAP_VIEWBOX.split(" ").map(Number);

function position(city: CityKey) {
  const [x, y] = CITY_POINTS[city];
  return { left: `${(x - mapX) / mapWidth * 100}%`, top: `${(y - mapY) / mapHeight * 100}%` };
}

const countries = COUNTRY_ORDER.map((code) => {
  const clients = CLIENTS.filter((client) => client.country === code);
  const cities = [...new Set(clients.map((client) => client.city))];
  return { code, clients, cities };
});

function ClientMark({ client }: { client: Client }) {
  return (
    <span className={styles.brandTile} data-dark={client.darkTile || undefined}>
      <Image loading="eager" src={client.logo} alt="" width={260} height={84} unoptimized className={styles.brand} />
    </span>
  );
}

function ClientCard({ client, triggerRef }: { client: Client; triggerRef?: Ref<HTMLButtonElement> }) {
  const t = useTranslations("Clients");
  const dialog = useRef<HTMLDialogElement>(null);
  const id = `client-case-${client.key}`;

  return (
    <>
      <button
        className={styles.card}
        type="button"
        ref={triggerRef}
        aria-haspopup="dialog"
        aria-controls={id}
        aria-label={t("openCase", { name: client.mark })}
        aria-describedby={`${id}-summary`}
        onClick={() => dialog.current?.showModal()}
      >
        <ClientMark client={client} />
        <span className={styles.cardFooter}>
          <span>
            <strong>{client.mark}</strong>
            <small id={`${id}-summary`}>{t(`cards.${client.key}.subject`)} · {t(`countries.${client.country}`)}</small>
          </span>
          <i aria-hidden="true">+</i>
        </span>
      </button>
      <dialog
        ref={dialog}
        id={id}
        className={styles.dialog}
        aria-labelledby={`${id}-name ${id}-heading`}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
      >
        <article className={styles.case}>
          <div className={styles.caseBar}>
            <span>{t(`countries.${client.country}`)} · {t(`cards.${client.key}.sector`)}</span>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={t("closeCase")}>×</button>
          </div>
          <ClientMark client={client} />
          <div className={styles.caseBody}>
            <p id={`${id}-name`} className={styles.caseName}>{client.mark}</p>
            <h3 id={`${id}-heading`}>{t(`cards.${client.key}.subject`)}</h3>
            <p>{t(`cards.${client.key}.did`)}</p>
            <p className={styles.context}>{t(`cards.${client.key}.what`)}</p>
            <a href={client.url} target="_blank" rel="noopener noreferrer">
              {new URL(client.url).hostname.replace(/^www\./, "")} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </dialog>
    </>
  );
}

export default function ClientsWorld() {
  const t = useTranslations("Clients");
  const [filter, setFilter] = useState<Filter>("all");
  const [hovered, setHovered] = useState<CountryCode | null>(null);
  const [focused, setFocused] = useState<CountryCode | null>(null);
  const [showAll, setShowAll] = useState(false);
  const nextCard = useRef<HTMLButtonElement>(null);

  const filtered = countries.find((country) => country.code === filter)?.clients ?? CLIENTS;
  const active = focused ?? hovered ?? filter;
  const readout = countries.find((country) => country.code === active);

  function selectCountry(next: Filter) {
    setFilter(next);
    setShowAll(false);
    setHovered(null);
    setFocused(null);
  }

  return (
    <section id="clientes" className={styles.section} aria-labelledby="clients-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>{t("label")}</p>
            <h2 id="clients-heading">{t("title")}</h2>
          </div>
          <p className={styles.lede}>{t("subtitle")}</p>
        </header>

        <figure className={styles.atlas}>
          <div className={styles.atlasHeader}>
            <p><b>{CLIENTS.length}</b> {t("teams")}</p>
            <p><b>{countries.length}</b> {t("countriesLabel")}</p>
          </div>
          <div className={styles.map} role="group" aria-label={t("mapAlt")}>
            {countries.map(({ code, clients, cities }) => (
              <div key={code}>
                {cities.slice(1).map((city) => (
                  <i key={city} className={styles.city} style={position(city)} aria-hidden="true" data-dim={active !== "all" && active !== code} />
                ))}
                <button
                  type="button"
                  className={styles.pin}
                  style={position(cities[0])}
                  data-side={code === "mx" || code === "au" ? "left" : "right"}
                  data-dim={active !== "all" && active !== code}
                  data-active={active === code}
                  aria-label={t("marker", { country: t(`countries.${code}`), count: clients.length })}
                  aria-pressed={filter === code}
                  aria-controls="client-list"
                  onPointerEnter={() => setHovered(code)}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setFocused(code)}
                  onBlur={() => setFocused(null)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setFocused(null);
                      setHovered(null);
                    }
                  }}
                  onClick={() => selectCountry(code)}
                >
                  <i aria-hidden="true" />
                  <span className={styles.countryLabel} aria-hidden="true">{t(`countries.${code}`)}</span>
                  <span className={styles.countryCode} aria-hidden="true">{code.toUpperCase()}</span>
                </button>
              </div>
            ))}
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.captionHeading}>{readout ? t(`countries.${readout.code}`) : t("mapTitle")}</span>
            <span>{readout ? readout.clients.map((client) => client.mark).join(" · ") : t("mapHint")}</span>
          </figcaption>
        </figure>

        <div className={styles.filters} role="group" aria-label={t("filterAria")}>
          <button type="button" aria-pressed={filter === "all"} aria-controls="client-list" onClick={() => selectCountry("all")}>
            {t("all")} <span>{CLIENTS.length}</span>
          </button>
          {countries.map(({ code, clients }) => (
            <button key={code} type="button" aria-controls="client-list" aria-pressed={filter === code} onClick={() => selectCountry(code)}>
              {t(`countries.${code}`)} <span>{clients.length}</span>
            </button>
          ))}
        </div>

        <p className={styles.srOnly} role="status">{t("resultCount", { count: filtered.length })}</p>
        <ul className={styles.grid} id="client-list">
          {filtered.map((client, index) => (
            <li key={client.key} hidden={!showAll && index >= INITIAL_CARDS}>
              <ClientCard client={client} triggerRef={index === INITIAL_CARDS ? nextCard : undefined} />
            </li>
          ))}
        </ul>
        {filtered.length > INITIAL_CARDS && (
          <button
            type="button"
            className={styles.more}
            aria-expanded={showAll}
            aria-controls="client-list"
            onClick={(event) => {
              setShowAll(!showAll);
              if (!showAll && event.detail === 0) requestAnimationFrame(() => nextCard.current?.focus());
            }}
          >
            {showAll ? t("showFewer") : t("showAll", { count: filtered.length })}
            <span aria-hidden="true">{showAll ? "↑" : "↓"}</span>
          </button>
        )}
      </div>
    </section>
  );
}
