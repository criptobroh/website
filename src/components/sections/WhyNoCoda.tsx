"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { staggerSlow, popIn } from "@/components/motion/variants";

const diffIcons = [
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
];

export default function WhyNoCoda() {
  const t = useTranslations("WhyNoCoda");

  const points = [0, 1, 2].map((i) => ({
    title: t(`points.${i}.title`),
    description: t(`points.${i}.description`),
  }));

  return (
    <SectionWrapper id="por-que-nocoda" className="relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <ScrollReveal>
        <div className="text-center mb-16 relative z-10">
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
        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {points.map((point, i) => (
          <motion.div key={i} variants={popIn} className="text-center p-8">
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 text-brand mb-6"
              whileHover={{
                scale: 1.15,
                backgroundColor: "rgba(2, 5, 211, 0.2)",
                rotate: [0, -5, 5, 0],
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {diffIcons[i]}
            </motion.div>

            <h3 className="text-xl font-display font-bold mb-3">
              {point.title}
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
              {point.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative dividers (desktop) */}
      <div className="hidden md:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 justify-around pointer-events-none px-[15%]">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-brand/15 to-transparent" />
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-brand/15 to-transparent" />
      </div>
    </SectionWrapper>
  );
}
