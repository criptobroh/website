"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "es" | "en") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        onClick={() => switchLocale("es")}
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          locale === "es"
            ? "text-text-primary font-medium"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="Cambiar a espanol"
      >
        ES
      </button>
      <span className="text-text-muted">/</span>
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 rounded transition-colors cursor-pointer ${
          locale === "en"
            ? "text-text-primary font-medium"
            : "text-text-muted hover:text-text-secondary"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
