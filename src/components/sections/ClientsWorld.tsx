"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { CLIENTS, COUNTRY_ORDER, type Client, type CountryCode } from "@/lib/clients";
import { CALENDLY_URL } from "@/lib/constants";
import { CITY_POINTS, MAP_VIEWBOX, WORLD_DOTS_PATH, type CityKey } from "@/lib/world-map";

type Filter = "all" | CountryCode;

const PAGE_SIZE = 6;

const [VB_X, VB_Y, VB_W, VB_H] = MAP_VIEWBOX.split(" ").map(Number);

// Posición de cada etiqueta respecto de su punto: evita que Miami y CDMX se pisen.
const LABEL_OFFSET: Record<CityKey, { dx: number; dy: number; anchor: "start" | "end" }> = {
  "buenos-aires": { dx: 14, dy: 4, anchor: "start" },
  barcelona: { dx: 14, dy: -8, anchor: "start" },
  cdmx: { dx: -14, dy: 10, anchor: "end" },
  miami: { dx: 14, dy: 2, anchor: "start" },
  madrid: { dx: 14, dy: 4, anchor: "start" },
  sevilla: { dx: -14, dy: 12, anchor: "end" },
};

const MOBILE_QUERY = "(max-width: 640px)";

function subscribeToMobile(onChange: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

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
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState<CountryCode | null>(null);

  const isMobile = useSyncExternalStore(
    subscribeToMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );

  const visible = filter === "all" ? CLIENTS : CLIENTS.filter((c) => c.country === filter);
  // Se pagina por clientes; la tarjeta de cierre se suma a la última página en vez de
  // quedarse sola en una propia.
  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  // Derivada, no sincronizada: si el filtro achica la lista, la página se acota sola.
  const current = Math.min(page, pageCount - 1);

  const byCity = useMemo(() => {
    const map = new Map<CityKey, Client[]>();
    for (const c of CLIENTS) map.set(c.city, [...(map.get(c.city) ?? []), c]);
    return map;
  }, []);

  // Un punto por ciudad, pero un solo rótulo por país (con el total del país) anclado
  // en su ciudad principal: si no, España mostraría dos veces "ESPAÑA · 1".
  const countryAnchors = useMemo(() => {
    const map = new Map<CountryCode, { list: Client[]; mainCity: CityKey }>();
    for (const [city, list] of byCity) {
      const country = list[0].country;
      const entry = map.get(country) ?? { list: [], mainCity: city };
      entry.list = [...entry.list, ...list];
      if (list.length > (byCity.get(entry.mainCity)?.length ?? 0)) entry.mainCity = city;
      map.set(country, entry);
    }
    return map;
  }, [byCity]);

  // Los puntos se dibujan por ciudad (precisión geográfica), pero la interacción y el
  // rótulo son por país: Barcelona y Sevilla están a 26px y sus zonas sensibles se pisaban.
  const dots = useMemo(
    () =>
      [...byCity.entries()].map(([city, list]) => ({
        city,
        country: list[0].country,
        point: CITY_POINTS[city],
        isAnchor: countryAnchors.get(list[0].country)!.mainCity === city,
      })),
    [byCity, countryAnchors],
  );

  const hotspots = useMemo(
    () =>
      [...countryAnchors.entries()].map(([country, { list, mainCity }]) => {
        const [x, y] = CITY_POINTS[mainCity];
        return {
          country,
          list,
          anchor: LABEL_OFFSET[mainCity].anchor,
          // El SVG escala con el contenedor manteniendo el viewBox, así que el punto
          // se ubica en porcentaje y el panel acompaña sin medir nada en JS.
          left: ((x - VB_X) / VB_W) * 100,
          top: ((y - VB_Y) / VB_H) * 100,
        };
      }),
    [countryAnchors],
  );

  const setCountry = (next: Filter) => {
    setFilter(next);
    setFlipped({});
    setPage(0);
  };

  const goToPage = useCallback((next: number) => {
    setPage(next);
    setFlipped({});
  }, []);

  const toggle = (key: string) => setFlipped((prev) => ({ ...prev, [key]: !prev[key] }));

  const countryCounts = useMemo(() => {
    const counts = { ar: 0, es: 0, mx: 0, us: 0 } as Record<CountryCode, number>;
    for (const c of CLIENTS) counts[c.country] += 1;
    return counts;
  }, []);

  const active = hovered ? hotspots.find((h) => h.country === hovered) : null;

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
          <div className="world-clients__map-frame">
            <svg viewBox={MAP_VIEWBOX} role="img" aria-label={t("mapAlt")}>
              <path className="world-map__dots" d={WORLD_DOTS_PATH} />
              {dots.map(({ city, country, isAnchor, point: [x, y] }) => {
                const label = LABEL_OFFSET[city];
                return (
                  <g
                    key={city}
                    className={`world-map__marker ${
                      filter !== "all" && filter !== country ? "is-dim" : ""
                    } ${hovered === country ? "is-active" : ""}`}
                  >
                    <circle cx={x} cy={y} r={5} />
                    <circle className="world-map__pulse" cx={x} cy={y} r={7} />
                    {isAnchor ? (
                      <text x={x + label.dx} y={y + label.dy} textAnchor={label.anchor}>
                        {t(`countriesShort.${country}`)}{" "}
                        <tspan>· {countryAnchors.get(country)!.list.length}</tspan>
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>

            {/* Zonas sensibles en HTML: reciben hover, foco y click sin pelear con el SVG. */}
            {hotspots.map(({ country, list, left, top }) => (
              <button
                key={country}
                type="button"
                className="world-map__hit"
                style={{ left: `${left}%`, top: `${top}%` }}
                aria-pressed={filter === country}
                aria-label={t("markerAria", {
                  country: t(`countries.${country}`),
                  count: list.length,
                })}
                onMouseEnter={() => setHovered(country)}
                onMouseLeave={() => setHovered((c) => (c === country ? null : c))}
                onFocus={() => setHovered(country)}
                onBlur={() => setHovered((c) => (c === country ? null : c))}
                onKeyDown={(e) => {
                  // WCAG 1.4.13: el panel se descarta sin mover el foco.
                  if (e.key === "Escape") setHovered(null);
                }}
                onClick={() => {
                  setCountry(country);
                  // En touch no llega un mouseleave fiable: el panel quedaría pegado.
                  setHovered(null);
                }}
              />
            ))}

            {active ? (
              <div
                className={`world-map__panel ${active.top > 50 ? "is-above" : "is-below"}`}
                style={{ left: `${active.left}%`, top: `${active.top}%` }}
                aria-hidden="true"
              >
                <p className="world-map__panel-head">
                  <i>{t(`countries.${active.country}`)}</i>
                  <span>{t("panelCount", { count: active.list.length })}</span>
                </p>
                {active.list.length === 1 ? (
                  <div className="world-map__panel-solo">
                    <strong>{active.list[0].mark}</strong>
                    <em>{t(`cards.${active.list[0].key}.sector`)}</em>
                    <p>{t(`cards.${active.list[0].key}.what`)}</p>
                    <p>
                      <b>{t("didLabel")}</b> {t(`cards.${active.list[0].key}.did`)}
                    </p>
                  </div>
                ) : (
                  <ul className="world-map__panel-list">
                    {active.list.map((c) => (
                      <li key={c.key}>
                        <strong>{c.mark}</strong>
                        <span>{t(`cards.${c.key}.sector`)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="world-map__panel-foot">{t("panelHint")}</p>
              </div>
            ) : null}
          </div>
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
          {visible.map((client, i) => {
            const isFlipped = !!flipped[client.key];
            // En desktop se pagina; en mobile el CSS las muestra todas como carrusel.
            const offPage = !isMobile && Math.floor(i / PAGE_SIZE) !== current;
            return (
              <li
                key={client.key}
                className={`client-card ${isFlipped ? "is-flipped" : ""} ${
                  offPage ? "is-off-page" : ""
                }`}
              >
                <div className="client-card__body">
                  <button
                    type="button"
                    className="client-card__front"
                    aria-expanded={isFlipped}
                    aria-hidden={isFlipped}
                    tabIndex={isFlipped || offPage ? -1 : 0}
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
                      <a
                        className="client-card__visit"
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isFlipped && !offPage ? 0 : -1}
                      >
                        {hostOf(client.url)} <span aria-hidden="true">↗</span>
                      </a>
                      <button
                        type="button"
                        className="client-card__close"
                        aria-label={t("closeAria")}
                        tabIndex={isFlipped && !offPage ? 0 : -1}
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
          <li
            className={`client-card client-card--cta ${
              !isMobile && current < pageCount - 1 ? "is-off-page" : ""
            }`}
          >
            <div className="client-card__body">
              <a
                className="client-card__front"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={!isMobile && current < pageCount - 1 ? -1 : 0}
              >
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

        {visible.length > 1 ? (
          <p className="world-clients__swipe">
            {t("swipeHint")}{" "}
            <span aria-hidden="true">→</span>
          </p>
        ) : null}

        {pageCount > 1 ? (
          <nav className="world-clients__pager" aria-label={t("pagerAria")}>
            <button
              type="button"
              className="world-clients__pager-btn"
              aria-label={t("prev")}
              aria-disabled={current === 0}
              onClick={() => current > 0 && goToPage(current - 1)}
            >
              ←
            </button>
            <span className="world-clients__pager-count">
              {current + 1} / {pageCount}
            </span>
            <button
              type="button"
              className="world-clients__pager-btn"
              aria-label={t("next")}
              aria-disabled={current === pageCount - 1}
              onClick={() => current < pageCount - 1 && goToPage(current + 1)}
            >
              →
            </button>
          </nav>
        ) : null}

        <p className="world-clients__foot">{t("foot")}</p>
      </div>
    </section>
  );
}
