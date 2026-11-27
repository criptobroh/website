"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CLIENTS, COUNTRY_ORDER, type CountryCode } from "@/lib/clients";
import { CITY_POINTS, MAP_VIEWBOX } from "@/lib/world-map";
import styles from "./ClientsWorld.module.css";

type Filter = "all" | CountryCode;

const PREVIEW_COUNT = 4;
const [mapX, mapY, mapWidth, mapHeight] = MAP_VIEWBOX.split(" ").map(Number);
const countries = COUNTRY_ORDER.map((code) => {
  const clients = CLIENTS.filter((client) => client.country === code);
  const [x, y] = CITY_POINTS[clients[0].city];
  return { code, clients, left: (x - mapX) / mapWidth * 100, top: (y - mapY) / mapHeight * 100 };
});

export default function ClientsWorld() {
  const t = useTranslations("Clients");
  const firstAdditionalCase = useRef<HTMLButtonElement>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState<string | null>(CLIENTS[0].key);
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState<CountryCode | null>(null);
  const [focused, setFocused] = useState<CountryCode | null>(null);

  const selected = countries.find((country) => country.code === filter);
  const visible = selected?.clients ?? CLIENTS;
  const readout = countries.find((country) => country.code === (focused ?? hovered ?? filter));
  const canExpand = visible.length > PREVIEW_COUNT;

  function selectCountry(next: Filter) {
    const first = next === "all" ? CLIENTS[0] : CLIENTS.find((client) => client.country === next);
    setFilter(next);
    setExpanded(first?.key ?? null);
    setShowAll(false);
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

        <div className={styles.layout}>
          <div className={styles.atlasColumn}>
            <figure className={styles.atlas}>
              <div className={styles.stats}>
                <span><strong>{CLIENTS.length}</strong> {t("teams")}</span>
                <span><strong>{countries.length}</strong> {t("countriesLabel")}</span>
              </div>
              <div className={styles.map} role="group" aria-label={t("mapAlt")}>
                {countries.map(({ code, clients, left, top }) => (
                  <button
                    key={code}
                    type="button"
                    className={styles.pin}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    data-side={code === "mx" || code === "au" ? "left" : "right"}
                    data-dim={filter !== "all" && filter !== code}
                    aria-label={t("marker", { country: t(`countries.${code}`), count: clients.length })}
                    aria-pressed={filter === code}
                    aria-controls="client-index"
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
                    <span aria-hidden="true">{code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
              <figcaption className={styles.caption}>
                <i aria-hidden="true" />
                {readout
                  ? <span><strong>{t(`countries.${readout.code}`)}</strong> · {readout.clients.map((client) => client.mark).join(", ")}</span>
                  : t("mapHint")}
              </figcaption>
            </figure>
            <div className={styles.filters} role="group" aria-label={t("filterAria")}>
              <button type="button" aria-pressed={filter === "all"} aria-controls="client-index" onClick={() => selectCountry("all")}>
                {t("all")}
              </button>
              {countries.map(({ code }) => (
                <button
                  key={code}
                  type="button"
                  aria-controls="client-index"
                  aria-pressed={code === filter}
                  onClick={() => selectCountry(code)}
                >
                  {t(`countries.${code}`)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.index} id="client-index">
            <p className={styles.srOnly} role="status">{t("resultCount", { count: visible.length })}</p>
            <ul className={styles.list} id="client-list">
              {visible.map((client, index) => {
                const open = expanded === client.key;
                const panelId = `client-${client.key}-panel`;
                return (
                  <li key={client.key} className={styles.entry} hidden={!showAll && index >= PREVIEW_COUNT}>
                    <h3>
                      <button
                        type="button"
                        ref={index === PREVIEW_COUNT ? firstAdditionalCase : undefined}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setExpanded(open ? null : client.key)}
                      >
                        <span>
                          <span className={styles.name}>{client.mark}</span>
                          <span className={styles.sector}>{t(`cards.${client.key}.sector`)} · {t(`countries.${client.country}`)}</span>
                        </span>
                        <i className={styles.toggle} aria-hidden="true" />
                      </button>
                    </h3>
                    <div className={styles.detail} id={panelId} hidden={!open}>
                      <p>{t(`cards.${client.key}.did`)}</p>
                      <p className={styles.context}>{t(`cards.${client.key}.what`)}</p>
                      <a href={client.url} target="_blank" rel="noopener noreferrer">
                        {new URL(client.url).hostname.replace(/^www\./, "")} <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
            {canExpand && (
              <button
                type="button"
                className={styles.more}
                aria-expanded={showAll}
                aria-controls="client-list"
                onClick={(event) => {
                  setShowAll(!showAll);
                  if (!showAll && event.detail === 0) {
                    requestAnimationFrame(() => firstAdditionalCase.current?.focus());
                  }
                  if (showAll && !visible.slice(0, PREVIEW_COUNT).some((client) => client.key === expanded)) {
                    setExpanded(visible[0].key);
                  }
                }}
              >
                {showAll ? t("showFewer") : t("showAll", { count: visible.length })}
                <span aria-hidden="true">{showAll ? "↑" : "↓"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
