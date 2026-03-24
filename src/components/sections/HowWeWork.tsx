"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { staggerSlow, fadeUpSpring } from "@/components/motion/variants";

export default function HowWeWork() {
  const t = useTranslations("HowWeWork");

  const steps = [0, 1, 2, 3].map((i) => ({
    number: t(`steps.${i}.number`),
    title: t(`steps.${i}.title`),
    description: t(`steps.${i}.description`),
  }));

  return (
    <SectionWrapper id="como-trabajamos" dark>
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

      <div className="relative">
        {/* Animated connecting line (desktop) */}
        <motion.div
          className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          style={{ originX: 0 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={staggerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUpSpring} className="relative text-center md:text-left">
              {/* Step number */}
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-bg-card border border-border text-brand font-display font-bold text-xl mb-6 relative z-10 pulse-ring"
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(2, 5, 211, 0.4)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {step.number}
              </motion.div>

              <h3 className="text-lg font-display font-bold mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Arrow (desktop, not last) */}
              {i < 3 && (
                <motion.div
                  className="hidden md:flex absolute top-6 -right-6 w-8 h-8 items-center justify-center text-brand z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
