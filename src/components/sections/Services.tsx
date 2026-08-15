"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { LEARN_URL } from "@/lib/constants";

export default function Services() {
  const t = useTranslations("Services");
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = [0, 1, 2].map((index) => ({
    eyebrow: t(`items.${index}.eyebrow`),
    title: t(`items.${index}.title`),
    description: t(`items.${index}.description`),
    features: [0, 1, 2, 3].map((feature) => t(`items.${index}.features.${feature}`)),
    output: t(`items.${index}.output`),
    link: t(`items.${index}.link`),
  }));

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduceMotion) return;
    const next = value < 0.34 ? 0 : value < 0.67 ? 1 : 2;
    setActive((current) => current === next ? current : next);
  });

  return (
    <section ref={ref} id="servicios" className="engagements">
      <div className="engagements__sticky">
        <div className="engagements__intro">
          <p className="editorial-kicker">{t("label")}</p>
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
          <div className="engagements__counter" aria-hidden="true">
            <strong>0{active + 1}</strong><span>/ 03</span>
          </div>
        </div>

        <div className="engagements__stage">
          <div className="engagements__visual" aria-hidden="true">
            <div className="engagements__visual-head"><span>NOCODA / ENGAGEMENT</span><strong>{["ALIGN", "ARCHITECT", "OPERATE"][active]}</strong></div>
            <div className="engagements__system">
              <div className="engagements__axis" />
              {["DECISION", "SYSTEM", "RESULT"].map((label, index) => (
                <motion.div
                  key={label}
                  className="engagements__node"
                  animate={{ scale: index === active ? 1.08 : 1, opacity: index <= active ? 1 : 0.34 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>0{index + 1}</span><strong>{label}</strong><i />
                </motion.div>
              ))}
              <motion.div className="engagements__pulse" animate={{ left: `${16 + active * 34}%` }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            <div className="engagements__visual-foot"><span>OWNER / NAMED</span><span>VALUE / VISIBLE</span></div>
          </div>

          <div className="engagements__chapters">
            {items.map((item, index) => (
              <article key={item.title} className={index === active ? "is-active" : ""}>
                <span>{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                <strong className="engagements__output">{item.output}</strong>
                {item.link ? <a href={LEARN_URL}>{item.link}<span aria-hidden="true">↗</span></a> : null}
              </article>
            ))}
          </div>
        </div>

        <div className="engagements__markers" aria-hidden="true">
          {items.map((item, index) => <span key={item.title} className={index <= active ? "is-active" : ""} />)}
        </div>
      </div>
    </section>
  );
}
