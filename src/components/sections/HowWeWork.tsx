"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HowWeWork() {
  const t = useTranslations("HowWeWork");
  const steps = [0, 1, 2, 3].map((index) => ({
    number: t(`steps.${index}.number`),
    title: t(`steps.${index}.title`),
    description: t(`steps.${index}.description`),
  }));

  return (
    <section id="como-trabajamos" className="operating-line">
      <div className="operating-line__heading">
        <div><p className="editorial-kicker">{t("label")}</p><h2>{t("title")}</h2></div>
        <p>{t("subtitle")}</p>
      </div>
      <div className="operating-line__track">
        {steps.map((step, index) => (
          <motion.article key={step.number} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.65 }} transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}>
            <span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
