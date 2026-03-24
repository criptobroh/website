"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TypingBadge({
  words,
  staticText,
}: {
  words: string[];
  staticText: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      2800
    );
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand/20 text-brand text-sm font-medium">
      <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
      {staticText}
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.35 }}
          className="font-bold"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
