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
        <motion.div className="operating-line__progress" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }} />
        {steps.map((step, index) => (
          <motion.article key={step.number} initial={{ y: 18 }} whileInView={{ y: 0 }} viewport={{ once: true, amount: 0.65 }} transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
            <span>{step.number}</span><i aria-hidden="true" /><h3>{step.title}</h3><p>{step.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
