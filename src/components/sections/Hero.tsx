"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import DecisionArtifact from "@/components/visuals/DecisionArtifact";
import { CALENDLY_URL } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("Hero");
  return (
    <section className="nocoda-hero">
      <div className="nocoda-hero__inner">
        <motion.div
          className="nocoda-hero__copy"
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="editorial-kicker">{t("badge")}</p>
          <h1>
            {t("title")} <span>{t("titleAccent")}</span>
          </h1>
          <p className="nocoda-hero__subtitle">{t("subtitle")}</p>
          <div className="nocoda-hero__actions">
            <Button href={CALENDLY_URL} size="lg">
              {t("cta")}<span aria-hidden="true">↗</span>
            </Button>
            <a href="#impacto" className="text-link">
              {t("secondaryCta")}<span aria-hidden="true">↓</span>
            </a>
          </div>
        </motion.div>
        <DecisionArtifact label={t("visualAlt")} />
      </div>
    </section>
  );
}
