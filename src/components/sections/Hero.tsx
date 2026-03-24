"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import TypingBadge from "@/components/ui/TypingBadge";
import { CALENDLY_URL } from "@/lib/constants";
import { fadeUpSpring, staggerSlow } from "@/components/motion/variants";

const FLOATING_DOTS = Array.from({ length: 10 }, (_, i) => ({
  left: `${8 + i * 9}%`,
  delay: `${i * 1.2}s`,
  duration: `${12 + (i % 4) * 2}s`,
  size: `${2 + (i % 3)}px`,
}));

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0">
        <div className="aurora-layer aurora-1" />
        <div className="aurora-layer aurora-2" />
        <div className="aurora-layer aurora-3" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 animated-grid" />

      {/* Floating dots */}
      {FLOATING_DOTS.map((dot, i) => (
        <span
          key={i}
          className="floating-dot"
          style={{
            left: dot.left,
            bottom: "5%",
            width: dot.size,
            height: dot.size,
            animationName: "float-up",
            animationDuration: dot.duration,
            animationDelay: dot.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-8 pt-24 pb-16 z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={staggerSlow}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUpSpring} className="mb-8">
            <TypingBadge
              staticText={t("badge")}
              words={["AI Agents", "SaaS", "APIs", "No-Code"]}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeUpSpring}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight leading-[1.1]"
          >
            {t("title")}
            <br />
            <span className="text-shimmer">{t("titleAccent")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpSpring}
            className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUpSpring}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                href={CALENDLY_URL}
                size="lg"
                className="glow-md hover:glow-lg transition-shadow duration-300"
              >
                {t("cta")}
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
            <Button href="#servicios" variant="secondary" size="lg">
              {t("secondaryCta")}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
