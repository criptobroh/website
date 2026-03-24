"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";
import { scaleIn } from "@/components/motion/variants";

const CTA_DOTS = Array.from({ length: 6 }, (_, i) => ({
  left: `${10 + i * 16}%`,
  delay: `${i * 1.8}s`,
  duration: `${14 + (i % 3) * 3}s`,
}));

export default function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0">
        <div className="aurora-layer aurora-1" style={{ opacity: 0.2 }} />
        <div className="aurora-layer aurora-2" style={{ opacity: 0.12 }} />
      </div>

      {/* Floating dots */}
      {CTA_DOTS.map((dot, i) => (
        <span
          key={i}
          className="floating-dot"
          style={{
            left: dot.left,
            bottom: "10%",
            animationName: "float-up",
            animationDuration: dot.duration,
            animationDelay: dot.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        />
      ))}

      {/* Animated border lines */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative max-w-[800px] mx-auto px-6 md:px-8 text-center z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={scaleIn}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-text-secondary text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-block"
          >
            <Button
              href={CALENDLY_URL}
              size="lg"
              className="glow-md hover:glow-lg transition-shadow duration-300"
            >
              {t("button")}
              <motion.svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
