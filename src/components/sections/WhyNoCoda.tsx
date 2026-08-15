"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function WhyNoCoda() {
  const t = useTranslations("WhyNoCoda");
  const points = [0, 1, 2].map((index) => ({ title: t(`points.${index}.title`), description: t(`points.${index}.description`) }));

  return (
    <section id="por-que-nocoda" className="why-system">
      <div className="why-system__statement">
        <p className="editorial-kicker">{t("label")}</p>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
        <a
          className="why-system__seal"
          href="https://nocoda.tv"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("portalAria")}
        >
          <span className="why-system__seal-head">
            <strong>NOCODA.TV</strong>
            <em><i aria-hidden="true" />{t("portalStatus")}</em>
          </span>
          <i className="why-system__seal-orbit" aria-hidden="true" />
          <span className="why-system__seal-copy">
            <strong>{t("portalTitle")}</strong>
            <small>{t("portalDescription")}</small>
          </span>
          <b>{t("portalCta")} <span aria-hidden="true">↗</span></b>
        </a>
      </div>
      <div className="why-system__principles">
        {points.map((point, index) => (
          <motion.article key={point.title} initial={{ x: 20 }} whileInView={{ x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}>
            <span>0{index + 1}</span><h3>{point.title}</h3><p>{point.description}</p><i aria-hidden="true" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
