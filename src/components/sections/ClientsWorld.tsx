"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { CLIENTS, COUNTRY_ORDER, type CountryCode } from "@/lib/clients";
import { CALENDLY_URL } from "@/lib/constants";
import { CITY_POINTS, MAP_VIEWBOX, WORLD_DOTS_PATH, type CityKey } from "@/lib/world-map";

type Filter = "all" | CountryCode;

// Posición de cada etiqueta respecto de su punto: evita que Miami y CDMX se pisen.
const LABEL_OFFSET: Record<CityKey, { dx: number; dy: number; anchor: "start" | "end" }> = {
  "buenos-aires": { dx: 14, dy: 4, anchor: "start" },
  barcelona: { dx: 14, dy: -8, anchor: "start" },
  cdmx: { dx: -14, dy: 10, anchor: "end" },
  miami: { dx: 14, dy: 2, anchor: "start" },
  madrid: { dx: 14, dy: 4, anchor: "start" },
  sevilla: { dx: -14, dy: 12, anchor: "end" },
};

function hostOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function ClientsWorld() {
  const t = useTranslations("Clients");
  const [filter, setFilter] = useState<Filter>("all");
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const visible = filter === "all" ? CLIENTS : CLIENTS.filter((c) => c.country === filter);

  // Un punto por ciudad, pero un solo rótulo por país (con el total del país) anclado
  // en su ciudad principal: si no, España mostraría dos veces "ESPAÑA · 1".
  const markers = useMemo(() => {
    const byCity = new Map<CityKey, { country: CountryCode; count: number }>();
    for (const c of CLIENTS) {
      const entry = byCity.get(c.city) ?? { country: c.country, count: 0 };
      entry.count += 1;
      byCity.set(c.city, entry);
    }
    const byCountry = new Map<CountryCode, { total: number; mainCity: CityKey }>();
    for (const [city, { country, count }] of byCity) {
      const entry = byCountry.get(country) ?? { total: 0, mainCity: city };
      entry.total += count;
      if (count > (byCity.get(entry.mainCity)?.count ?? 0)) entry.mainCity = city;
      byCountry.set(country, entry);
    }
    return [...byCity.entries()].map(([city, { country }]) => ({
      city,
      country,
      countryTotal: byCountry.get(country)!.total,
      showLabel: byCountry.get(country)!.mainCity === city,
      point: CITY_POINTS[city],
    }));
  }, []);

  const setCountry = (next: Filter) => {
    setFilter(next);
    setFlipped({});
  };

  const toggle = (key: string) =>
    setFlipped((prev) => ({ ...prev, [key]: !prev[key] }));

  const countryCounts = useMemo(() => {
    const counts = { ar: 0, es: 0, mx: 0, us: 0 } as Record<CountryCode, number>;
    for (const c of CLIENTS) counts[c.country] += 1;
    return counts;
  }, []);

  return (
    <section id="clientes" className="world-clients">
      <div className="world-clients__inner">
        <ScrollReveal>
          <div className="world-clients__intro">
            <p className="editorial-kicker">{t("label")}</p>
            <h2>
              {t("title")} <span>{t("titleAccent")}</span>
            </h2>
            <p>{t("subtitle")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="world-clients__stats">
            <article>
              <strong>
                {CLIENTS.length}
                <small>+</small>
              </strong>
              <span>{t("stats.systems")}</span>
            </article>
            <article>
              <strong>4</strong>
              <span>{t("stats.countries")}</span>
            </article>
            <article>
              <strong>
                {t("stats.scaleValue")}
                <small>{t("stats.scaleUnit")}</small>
              </strong>
              <span>{t("stats.scale")}</span>
            </article>
          </div>
        </ScrollReveal>

        <ScrollReveal className="world-clients__map">
          <svg viewBox={MAP_VIEWBOX} role="img" aria-label={t("mapAlt")}>
            <path className="world-map__dots" d={WORLD_DOTS_PATH} />
            {markers.map(({ city, country, countryTotal, showLabel, point: [x, y] }) => {
              const label = LABEL_OFFSET[city];
              return (
                <g
                  key={city}
                  className={`world-map__marker ${
                    filter !== "all" && filter !== country ? "is-dim" : ""
                  }`}
                >
                  <circle cx={x} cy={y} r={5} />
                  <circle className="world-map__pulse" cx={x} cy={y} r={7} />
                  {showLabel ? (
                    <text x={x + label.dx} y={y + label.dy} textAnchor={label.anchor}>
                      {t(`countriesShort.${country}`)} <tspan>· {countryTotal}</tspan>
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </ScrollReveal>

        <div className="world-clients__filters" role="group" aria-label={t("filterAria")}>
          <button
            type="button"
            className="world-clients__filter"
            aria-pressed={filter === "all"}
            onClick={() => setCountry("all")}
          >
            {t("filterAll")} <b>{CLIENTS.length}</b>
          </button>
          {COUNTRY_ORDER.map((code) => (
            <button
              key={code}
              type="button"
              className="world-clients__filter"
              aria-pressed={filter === code}
              onClick={() => setCountry(code)}
            >
              {t(`countries.${code}`)} <b>{countryCounts[code]}</b>
            </button>
          ))}
        </div>

        <ul className="world-clients__grid">
          {visible.map((client) => {
            const isFlipped = !!flipped[client.key];
            return (
              <li key={client.key} className={`client-card ${isFlipped ? "is-flipped" : ""}`}>
                <div className="client-card__body">
                  <button
                    type="button"
                    className="client-card__front"
                    aria-expanded={isFlipped}
                    tabIndex={isFlipped ? -1 : 0}
                    onClick={() => toggle(client.key)}
                  >
                    <span className="client-card__meta">
                      <i>{t(`countries.${client.country}`)}</i>
                      <span>{t(`cards.${client.key}.sector`)}</span>
                    </span>
                    <strong className="client-card__mark">{client.mark}</strong>
                    <span className="client-card__foot">
                      <span>{t("flipHint")}</span>
                      <i aria-hidden="true">+</i>
                    </span>
                  </button>
                  <div className="client-card__back" aria-hidden={!isFlipped}>
                    <span className="client-card__meta">
                      <i>{t(`countries.${client.country}`)}</i>
                      <span>{t(`cards.${client.key}.sector`)}</span>
                    </span>
                    <h3>{client.mark}</h3>
                    <p>{t(`cards.${client.key}.what`)}</p>
                    <p>
                      <strong>{t("didLabel")}</strong> {t(`cards.${client.key}.did`)}
                    </p>
                    <span className="client-card__actions">
                      {client.url ? (
                        <a
                          className="client-card__visit"
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={isFlipped ? 0 : -1}
                        >
                          {hostOf(client.url)} <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <span />
                      )}
                      <button
                        type="button"
                        className="client-card__close"
                        aria-label={t("closeAria")}
                        tabIndex={isFlipped ? 0 : -1}
                        onClick={() => toggle(client.key)}
                      >
                        ×
                      </button>
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
          <li className="client-card client-card--cta">
            <div className="client-card__body">
              <a className="client-card__front" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <span className="client-card__meta">
                  <i>{t("ctaLabel")}</i>
                </span>
                <strong className="client-card__mark">{t("ctaTitle")}</strong>
                <span className="client-card__foot">
                  <span>{t("ctaNote")}</span>
                  <i aria-hidden="true">↗</i>
                </span>
              </a>
            </div>
          </li>
        </ul>

        <p className="world-clients__foot">{t("foot")}</p>
      </div>
    </section>
  );
}
