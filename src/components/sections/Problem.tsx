"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlowCard from "@/components/ui/GlowCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { staggerSlow, fadeUpSpring } from "@/components/motion/variants";

const icons = [
  <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
];

export default function Problem() {
  const t = useTranslations("Problem");

  const points = [0, 1, 2, 3].map((i) => ({
    title: t(`points.${i}.title`),
    description: t(`points.${i}.description`),
  }));

  return (
    <SectionWrapper dark>
      <ScrollReveal>
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-brand uppercase tracking-wider mb-4">
            {t("label")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold">
            {t("title")}
            <br />
            <span className="text-brand">{t("titleAccent")}</span>
          </h2>
        </div>
      </ScrollReveal>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {points.map((point, i) => (
          <GlowCard
            key={i}
            className="p-6 bg-bg-card border border-border"
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center text-brand"
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                {icons[i]}
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          </GlowCard>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
