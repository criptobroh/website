"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { LEARN_URL } from "@/lib/constants";

export default function Services() {
  const t = useTranslations("Services");
  const items = [0, 1, 2].map((index) => ({
    eyebrow: t(`items.${index}.eyebrow`),
    title: t(`items.${index}.title`),
    description: t(`items.${index}.description`),
    features: [0, 1, 2, 3].map((feature) => t(`items.${index}.features.${feature}`)),
    output: t(`items.${index}.output`),
    link: t(`items.${index}.link`),
  }));

  return (
    <section id="servicios" className="engagements">
      <div className="engagements__inner">
        <div className="engagements__intro">
          <p className="editorial-kicker">{t("label")}</p>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
        </div>

        <div className="engagements__chapters">
            {items.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="engagements__number">0{index + 1}</div>
                <div className="engagements__copy">
                  <span>{item.eyebrow}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="engagements__details">
                  <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <strong>{item.output}</strong>
                  {item.link ? <a href={LEARN_URL}>{item.link}<span aria-hidden="true">↗</span></a> : null}
                </div>
              </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
}
