"use client";

import { motion, useReducedMotion } from "framer-motion";

const layers = [
  { code: "01", title: "DATA", copy: "SOURCES / QUALITY / LINEAGE", y: 112 },
  { code: "02", title: "LOGIC", copy: "RULES / CONTEXT / PERMISSIONS", y: 256 },
  { code: "03", title: "ACTION", copy: "AGENTS / APPS / OPERATIONS", y: 400 },
];

export default function OperatingSystemVisual({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="os-visual" role="img" aria-label={label}>
      <div className="os-visual__top"><span>NOCODA / OPERATING LAYER</span><span><i /> SYSTEM ONLINE</span></div>
      <div className="os-visual__canvas">
        <svg viewBox="0 0 660 520" aria-hidden="true">
          <defs>
            <linearGradient id="os-plane" x1="0" x2="1"><stop offset="0" stopColor="#0205d3" stopOpacity=".04" /><stop offset=".55" stopColor="#8b8fff" stopOpacity=".19" /><stop offset="1" stopColor="#0205d3" stopOpacity=".03" /></linearGradient>
            <linearGradient id="os-line" x1="0" x2="1"><stop offset="0" stopColor="#0205d3" /><stop offset=".55" stopColor="#8b8fff" /><stop offset="1" stopColor="#f4f4f5" /></linearGradient>
            <filter id="os-glow" x="-50%" y="-100%" width="200%" height="300%"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>

          {layers.map((layer, index) => (
            <motion.g key={layer.code} initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.68, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
              <path d={`M142 ${layer.y} L334 ${layer.y - 48} L526 ${layer.y} L334 ${layer.y + 48} Z`} fill="url(#os-plane)" stroke="rgba(139,143,255,.24)" />
              <circle cx="334" cy={layer.y} r="4" fill="#8b8fff" />
            </motion.g>
          ))}

          <motion.path d="M66 112 H142 M526 112 H594 M66 256 H142 M526 256 H594 M66 400 H142 M526 400 H594" fill="none" stroke="url(#os-line)" strokeWidth="1.5" initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} />
          <motion.path d="M334 46 V466" fill="none" stroke="url(#os-line)" strokeWidth="2" filter="url(#os-glow)" initial={reduceMotion ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.25, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} />

          {[112, 256, 400].map((y, index) => (
            <motion.circle key={y} cx="66" cy={y} r="5" fill="#0205d3" filter="url(#os-glow)" animate={reduceMotion ? undefined : { x: [0, 528], opacity: [0, 1, 1, 0] }} transition={{ duration: 6.5, repeat: Infinity, delay: 1.5 + index * 1.8, ease: "linear" }} />
          ))}
        </svg>

        <div className="os-visual__labels" aria-hidden="true">
          {layers.map((layer) => <div key={layer.code}><span>{layer.code}</span><strong>{layer.title}</strong><small>{layer.copy}</small></div>)}
        </div>
        <div className="os-visual__source os-visual__source--a">CRM</div>
        <div className="os-visual__source os-visual__source--b">ERP</div>
        <div className="os-visual__source os-visual__source--c">DOCS</div>
        <div className="os-visual__output os-visual__output--a">DECIDE</div>
        <div className="os-visual__output os-visual__output--b">ACT</div>
        <div className="os-visual__output os-visual__output--c">LEARN</div>
      </div>
      <div className="os-visual__foot"><span>SOURCES / CONNECTED</span><span>DECISIONS / TRACEABLE</span><span>CONTROL / HUMAN</span></div>
    </div>
  );
}
