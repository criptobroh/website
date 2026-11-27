"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { DATA_CENTERS_PATH } from "@/lib/constants";

export default function LanguageSwitcher() {
  const current = useLocale();
  const pathname = usePathname();
  return (
    <div className="studio-languages" role="group" aria-label={current === "es" ? "Idioma" : "Language"}>
      {(["es", "en"] as const).map((lang) => {
        const prefix = lang === "es" && pathname === DATA_CENTERS_PATH ? "" : `/${lang}`;
        const href = `${prefix}${pathname === "/" ? "" : pathname}`;
        return (
          <a key={lang} href={href} hrefLang={lang} lang={lang}
            aria-current={current === lang ? "true" : undefined}
            aria-label={lang === "es" ? "Español" : "English"}>
            {lang.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
