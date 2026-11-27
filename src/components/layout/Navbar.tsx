"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import Brand from "./Brand";
import LanguageSwitcher from "./LanguageSwitcher";
import { CALENDLY_URL, LEARN_URL, NAV_SECTIONS } from "@/lib/constants";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const home = usePathname() === "/" ? "" : `/${locale}`;
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    function outside(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className="studio-nav" ref={header} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <nav className="studio-wrap studio-nav__row" aria-label={t("navigation")}>
        <Brand />
        <button className="studio-menu-button" ref={trigger} aria-expanded={open}
          aria-controls="studio-nav-links" onClick={() => setOpen(!open)}>
          {open ? t("close") : t("menu")} <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <div id="studio-nav-links" className="studio-nav__links" data-open={open}>
          <div className="studio-nav__sections">
            {NAV_SECTIONS.map(({ id, labelKey }) => (
              <a key={id} href={`${home}#${id}`} onClick={() => setOpen(false)}>{t(labelKey)}</a>
            ))}
            <a href={LEARN_URL}>BEFORE AI <span aria-hidden="true">↗</span></a>
          </div>
          <LanguageSwitcher />
          <a className="studio-nav__talk" href={CALENDLY_URL}>{t("cta")} <span aria-hidden="true">↗</span></a>
        </div>
      </nav>
    </header>
  );
}
