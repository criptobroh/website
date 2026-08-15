"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DecisionArtifact({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lensY = useTransform(scrollYProgress, [0, 1], [reduceMotion ? 0 : 34, reduceMotion ? 0 : -34]);
  const lineScale = useTransform(scrollYProgress, [0.12, 0.72], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="decision-artifact"
      role="img"
      aria-label={label}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="decision-artifact__meta" aria-hidden="true">
        <span>NOCODA / OPERATING INTELLIGENCE</span>
        <span><i /> SYSTEM LIVE</span>
      </div>

      <div className="decision-artifact__scene" aria-hidden="true">
        <div className="decision-artifact__words">
          <span>DATA</span>
          <span>LOGIC</span>
          <span>ACTION</span>
        </div>

        <motion.div className="decision-artifact__line" style={{ scaleX: lineScale }} />
        <div className="decision-artifact__signal decision-artifact__signal--one" />
        <div className="decision-artifact__signal decision-artifact__signal--two" />

        <motion.div className="decision-artifact__lens" style={{ y: lensY }}>
          <span>ONE</span>
          <strong>better<br />decision</strong>
          <small>owned · measured</small>
        </motion.div>

        <div className="decision-artifact__caption decision-artifact__caption--left">
          <span>01</span><strong>Evidence enters</strong><small>From the real operation</small>
        </div>
        <div className="decision-artifact__caption decision-artifact__caption--right">
          <span>02</span><strong>A move leaves</strong><small>With an owner and a metric</small>
        </div>
      </div>

      <div className="decision-artifact__foot" aria-hidden="true">
        <span>FROM SIGNAL</span><i /><strong>TO OPERATING CHANGE</strong>
      </div>
    </motion.div>
  );
}
