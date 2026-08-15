"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

export default function Services() {
  const t = useTranslations("Services");
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const items = [0, 1, 2].map((i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
  }));

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (reduceMotion) return;
    const next = value < 0.34 ? 0 : value < 0.67 ? 1 : 2;
    setActive((current) => current === next ? current : next);
  });

  return (
    <section ref={ref} id="servicios" className="services-piano">
      <div className="services-piano__sticky">
        <div className="services-piano__content">
          <div className="services-piano__intro"><p className="editorial-kicker">{t("label")}</p><h2>{t("title")}</h2><p>{t("subtitle")}</p></div>
          <div className="services-piano__chapters">
            {items.map((item, index) => (
              <article key={item.title} className={index === active ? "is-active" : ""}>
                <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p>
                <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>

        <div className={`services-piano__visual is-stage-${active + 1}`} aria-hidden="true">
          <div className="services-piano__visual-head"><span>SYSTEM / 0{active + 1}</span><strong>{["FOUNDATION", "DELEGATION", "PRODUCT"][active]}</strong></div>
          <div className="system-topology">
            <div className="system-topology__axis" />
            {["SOURCE", "CONTEXT", "ACTION"].map((label, index) => <motion.div key={label} className={`system-topology__node system-topology__node--${index + 1}`} animate={{ scale: index === active ? 1.08 : 1, opacity: index <= active ? 1 : 0.38 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}><span>0{index + 1}</span><strong>{label}</strong><i /></motion.div>)}
            <motion.div className="system-topology__pulse" animate={{ x: active * 174 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }} />
          </div>
          <div className="services-piano__visual-foot"><span>TRACE / ACTIVE</span><span>HUMAN / IN CONTROL</span></div>
        </div>
        <div className="services-piano__markers" aria-hidden="true">{items.map((item, index) => <span key={item.title} className={index <= active ? "is-active" : ""} />)}</div>
      </div>
    </section>
  );
}
