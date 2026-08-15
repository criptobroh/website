"use client";

import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { code: "01", label: "SIGNAL", x: 330, y: 84 },
  { code: "02", label: "JUDGMENT", x: 544, y: 270 },
  { code: "03", label: "ACTION", x: 330, y: 456 },
  { code: "04", label: "LEARNING", x: 116, y: 270 },
];

export default function OperatingSystemVisual({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="decision-visual" role="img" aria-label={label}>
      <div className="decision-visual__top"><span>NOCODA / DECISION SYSTEM</span><span><i /> LOOP ACTIVE</span></div>
      <div className="decision-visual__canvas">
        <svg viewBox="0 0 660 540" aria-hidden="true">
          <defs>
            <radialGradient id="decision-core"><stop offset="0" stopColor="#3338e8" /><stop offset="1" stopColor="#0205d3" /></radialGradient>
            <linearGradient id="decision-line" x1="0" x2="1"><stop stopColor="#0205d3" /><stop offset=".55" stopColor="#8b8fff" /><stop offset="1" stopColor="#f4f4f5" /></linearGradient>
            <filter id="decision-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="7" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          <circle cx="330" cy="270" r="216" fill="none" stroke="rgba(139,143,255,.1)" />
          <circle cx="330" cy="270" r="164" fill="none" stroke="rgba(139,143,255,.14)" strokeDasharray="3 8" />
          <motion.path d="M330 84 C456 84 544 150 544 270 C544 390 456 456 330 456 C204 456 116 390 116 270 C116 150 204 84 330 84 Z" fill="none" stroke="url(#decision-line)" strokeWidth="1.5" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} />
          <path d="M330 84 V196 M544 270 H414 M330 456 V344 M116 270 H246" fill="none" stroke="rgba(139,143,255,.22)" />

          {nodes.map((node, index) => (
            <motion.g key={node.code} initial={reduceMotion ? false : { scale: 0.82 }} animate={{ scale: 1 }} transition={{ duration: 0.55, delay: 0.12 + index * 0.07, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
              <circle cx={node.x} cy={node.y} r="28" fill="#0c0c11" stroke="rgba(139,143,255,.36)" />
              <circle cx={node.x} cy={node.y} r="5" fill="#8b8fff" filter="url(#decision-glow)" />
            </motion.g>
          ))}

          <motion.circle cx="330" cy="84" r="6" fill="white" filter="url(#decision-glow)" animate={reduceMotion ? undefined : { cx: [330, 544, 330, 116, 330], cy: [84, 270, 456, 270, 84] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
          <circle cx="330" cy="270" r="82" fill="url(#decision-core)" opacity=".96" />
          <circle cx="330" cy="270" r="58" fill="none" stroke="rgba(255,255,255,.22)" />
        </svg>

        <div className="decision-visual__center" aria-hidden="true"><span>ONE</span><strong>BUSINESS<br />MOVE</strong><small>OWNED / MEASURED</small></div>
        {nodes.map((node, index) => <div key={node.code} className={`decision-visual__node decision-visual__node--${index + 1}`} aria-hidden="true"><span>{node.code}</span><strong>{node.label}</strong></div>)}
        <div className="decision-visual__outcome decision-visual__outcome--a">REVENUE</div>
        <div className="decision-visual__outcome decision-visual__outcome--b">FINANCE</div>
        <div className="decision-visual__outcome decision-visual__outcome--c">OPERATIONS</div>
        <div className="decision-visual__outcome decision-visual__outcome--d">CX</div>
      </div>
      <div className="decision-visual__foot"><span>DECISION / OWNED</span><span>ACTION / TRACEABLE</span><span>RESULT / MEASURED</span></div>
    </div>
  );
}
