"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("Problem");
  const points = [0, 1, 2, 3].map((i) => ({ title: t(`points.${i}.title`), description: t(`points.${i}.description`) }));

  return (
    <section id="brecha" className="infrastructure-gap">
      <div className="infrastructure-gap__heading">
        <p className="editorial-kicker">{t("label")}</p>
        <h2>{t("title")} <span>{t("titleAccent")}</span></h2>
      </div>
      <div className="infrastructure-gap__list">
        {points.map((point, index) => (
          <motion.article key={point.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}>
            <span>0{index + 1}</span><h3>{point.title}</h3><p>{point.description}</p><i aria-hidden="true" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
