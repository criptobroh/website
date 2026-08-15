"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function WhyNoCoda() {
  const t = useTranslations("WhyNoCoda");
  const points = [0, 1, 2].map((i) => ({ title: t(`points.${i}.title`), description: t(`points.${i}.description`) }));

  return (
    <section id="por-que-nocoda" className="why-system">
      <div className="why-system__statement">
        <p className="editorial-kicker">{t("label")}</p>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
      </div>
      <div className="why-system__principles">
        {points.map((point, index) => (
          <motion.article key={point.title} initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.75, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}>
            <span>0{index + 1}</span><h3>{point.title}</h3><p>{point.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
