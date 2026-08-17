"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function DecisionArtifact({ label }: { label: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 28,
    restDelta: 0.001,
  });

  const wordsOpacity = useTransform(progress, [0, 0.14, 0.54, 0.75], [0.25, 1, 1, 0.16]);
  const dataX = useTransform(progress, [0.08, 0.58], [reduceMotion ? 0 : -38, reduceMotion ? 0 : 118]);
  const logicY = useTransform(progress, [0.08, 0.58], [reduceMotion ? 0 : 38, reduceMotion ? 0 : -72]);
  const actionX = useTransform(progress, [0.08, 0.58], [reduceMotion ? 0 : 38, reduceMotion ? 0 : -118]);
  const lineScale = useTransform(progress, [0.06, 0.5], [0.08, 1]);
  const lensY = useTransform(progress, [0, 0.48, 1], [reduceMotion ? 0 : 56, 0, reduceMotion ? 0 : -18]);
  const lensScale = useTransform(progress, [0, 0.48, 0.82], [0.72, 1.08, 0.94]);
  const lensRotate = useTransform(progress, [0, 0.52], [reduceMotion ? 0 : -8, 0]);
  const lensGlow = useTransform(progress, [0.2, 0.58], [0.45, 1]);
  const evidenceOpacity = useTransform(progress, [0.03, 0.22, 0.48], [0, 1, 0]);
  const moveOpacity = useTransform(progress, [0.42, 0.62, 0.82], [0, 1, 0]);
  const conclusionOpacity = useTransform(progress, [0.68, 0.84], [0, 1]);
  const conclusionY = useTransform(progress, [0.68, 0.88], [reduceMotion ? 0 : 22, 0]);
  const markerOne = useTransform(progress, [0, 0.18, 0.4], [0.32, 1, 0.32]);
  const markerTwo = useTransform(progress, [0.28, 0.5, 0.72], [0.32, 1, 0.32]);
  const markerThree = useTransform(progress, [0.6, 0.82, 1], [0.32, 1, 0.72]);

  return (
    <section ref={ref} className="decision-story" role="img" aria-label={label} style={{ position: "relative" }}>
      <div className="decision-artifact">
        <div className="decision-artifact__meta" aria-hidden="true">
          <span>NOCODA / OPERATING INTELLIGENCE</span>
          <span><i /> SYSTEM LIVE</span>
        </div>

        <div className="decision-artifact__scene" aria-hidden="true">
          <motion.div className="decision-artifact__words" style={{ opacity: wordsOpacity }}>
            <motion.span style={{ x: dataX }}>DATA</motion.span>
            <motion.span style={{ y: logicY }}>LOGIC</motion.span>
            <motion.span style={{ x: actionX }}>ACTION</motion.span>
          </motion.div>

          <motion.div className="decision-artifact__line" style={{ scaleX: lineScale }} />
          <div className="decision-artifact__signal decision-artifact__signal--one" />
          <div className="decision-artifact__signal decision-artifact__signal--two" />

          <motion.div
            className="decision-artifact__lens"
            style={{ y: lensY, scale: lensScale, rotate: lensRotate, opacity: lensGlow }}
          >
            <span>ONE</span>
            <strong>better<br />decision</strong>
            <small>owned · measured</small>
          </motion.div>

          <motion.div className="decision-artifact__caption decision-artifact__caption--left" style={{ opacity: evidenceOpacity }}>
            <span>01</span><strong>Evidence enters</strong><small>From the real operation</small>
          </motion.div>
          <motion.div className="decision-artifact__caption decision-artifact__caption--right" style={{ opacity: moveOpacity }}>
            <span>02</span><strong>A move leaves</strong><small>With an owner and a metric</small>
          </motion.div>

          <motion.div className="decision-artifact__conclusion" style={{ opacity: conclusionOpacity, y: conclusionY }}>
            <span>03 / OPERATING MOVE</span>
            <strong>Owner named.<br />Metric attached.</strong>
          </motion.div>

          <div className="decision-artifact__rail">
            <motion.span style={{ opacity: markerOne }}><i />SIGNAL</motion.span>
            <motion.span style={{ opacity: markerTwo }}><i />DECISION</motion.span>
            <motion.span style={{ opacity: markerThree }}><i />CHANGE</motion.span>
          </div>
        </div>

        <div className="decision-artifact__foot" aria-hidden="true">
          <span>FROM SIGNAL</span><i /><strong>TO OPERATING CHANGE</strong>
        </div>
      </div>
    </section>
  );
}
