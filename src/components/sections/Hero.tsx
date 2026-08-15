"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import OperatingSystemVisual from "@/components/visuals/OperatingSystemVisual";
import { CALENDLY_URL } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("Hero");
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 34]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -38]);
  const visualRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -1.4]);
  const rail = [0, 1, 2, 3].map((index) => t(`rail.${index}`));

  return (
    <section ref={ref} className="nocoda-hero">
      <div className="nocoda-hero__beam" aria-hidden="true" />
      <div className="nocoda-hero__orbit" aria-hidden="true" />
      <div className="nocoda-hero__inner">
        <motion.div className="nocoda-hero__copy" style={{ y: copyY }}>
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
          <p className="nocoda-hero__note"><i aria-hidden="true" />{t("note")}</p>
        </motion.div>

        <motion.div className="nocoda-hero__visual" style={{ y: visualY, rotate: visualRotate }}>
          <OperatingSystemVisual label={t("visualAlt")} />
        </motion.div>
      </div>
      <div className="nocoda-hero__rail" aria-label={t("badge")}>{rail.map((item, index) => <span key={item}><b>0{index + 1}</b>{item}</span>)}</div>
    </section>
  );
}
