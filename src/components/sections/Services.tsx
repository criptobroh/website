"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { staggerSlow, fadeUpSpring } from "@/components/motion/variants";

const serviceIcons = [
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
];

export default function Services() {
  const t = useTranslations("Services");

  const items = [0, 1, 2].map((i) => ({
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    features: [0, 1, 2, 3].map((j) => t(`items.${i}.features.${j}`)),
  }));

  return (
    <SectionWrapper id="servicios">
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-brand uppercase tracking-wider mb-4">
            {t("label")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </ScrollReveal>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {items.map((item, i) => (
          <GlowCard
            key={i}
            className="p-8 bg-bg-card border border-border flex flex-col h-full"
          >
            {/* Icon */}
            <motion.div
              className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-6 pulse-ring"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(2, 5, 211, 0.2)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {serviceIcons[i]}
            </motion.div>

            <h3 className="text-xl font-display font-bold mb-3">
              {item.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Features */}
            <ul className="mt-auto space-y-3">
              {item.features.map((feature, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <svg
                    className="w-4 h-4 mt-0.5 text-brand flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </GlowCard>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
