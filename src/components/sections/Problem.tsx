"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("Problem");
  const points = [0, 1, 2, 3].map((index) => ({
    title: t(`points.${index}.title`),
    description: t(`points.${index}.description`),
    outcome: t(`points.${index}.outcome`),
  }));

  return (
    <section id="impacto" className="business-moves">
      <div className="business-moves__heading">
        <div>
          <p className="editorial-kicker">{t("label")}</p>
          <h2>{t("title")} <span>{t("titleAccent")}</span></h2>
        </div>
        <p>{t("intro")}</p>
      </div>

      <div className="business-moves__grid">
        {points.map((point, index) => (
          <motion.article
            key={point.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="business-moves__index"><span>0{index + 1}</span></div>
            <h3>{point.title}</h3>
            <p>{point.description}</p>
            <strong>{point.outcome}</strong>
          </motion.article>
        ))}
      </div>

      <div className="business-moves__statement">
        <span>{t("statementLabel")}</span>
        <p>{t("statement")} <strong>{t("statementAccent")}</strong></p>
      </div>
    </section>
  );
}
