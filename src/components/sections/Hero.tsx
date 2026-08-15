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
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 42]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -28]);

  return (
    <section ref={ref} className="nocoda-hero">
      <div className="nocoda-hero__beam" aria-hidden="true" />
      <div className="nocoda-hero__inner">
        <motion.div className="nocoda-hero__copy" style={{ y: copyY }}>
          <motion.p initial={reduceMotion ? false : { y: 12 }} animate={{ y: 0 }} transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }} className="editorial-kicker">{t("badge")}</motion.p>
          <motion.h1 initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}>
            {t("title")} <span>{t("titleAccent")}</span>
          </motion.h1>
          <motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.66, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="nocoda-hero__subtitle">{t("subtitle")}</motion.p>
          <motion.div initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="nocoda-hero__actions">
            <Button href={CALENDLY_URL} size="lg">{t("cta")}<span aria-hidden="true">↗</span></Button>
            <a href="#servicios" className="text-link">{t("secondaryCta")}<span aria-hidden="true">↓</span></a>
          </motion.div>
        </motion.div>

        <motion.div className="nocoda-hero__visual" style={{ y: visualY }}>
          <OperatingSystemVisual label={t("visualAlt")} />
        </motion.div>
      </div>
      <div className="nocoda-hero__rail" lang="en" aria-label="NoCoda capabilities"><span>DATA SYSTEMS</span><span>BUSINESS LOGIC</span><span>AI AGENTS</span><span>PRODUCT SOFTWARE</span></div>
      <a className="nocoda-hero__scroll" lang="en" href="#brecha"><span>Scroll to operate</span><i /></a>
    </section>
  );
}
