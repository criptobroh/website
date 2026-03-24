"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { CALENDLY_URL, NAV_SECTIONS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/components/motion/variants";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      {/* Subtle gradient border on scroll */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      )}

      <nav className="max-w-[1200px] mx-auto px-6 md:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="NoCoda - AI Infrastructure & Automation Partner"
            width={120}
            height={32}
            className="h-8 w-auto rounded-lg"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-text-secondary hover:text-text-primary hover:drop-shadow-[0_0_8px_rgba(2,5,211,0.4)] transition-all duration-200"
            >
              {t(section.labelKey)}
            </a>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button href={CALENDLY_URL} size="sm">
              {t("cta")}
            </Button>
          </motion.div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden glass-strong border-t border-white/[0.04] overflow-hidden"
          >
            <motion.div
              className="px-6 py-8 flex flex-col gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {NAV_SECTIONS.map((section) => (
                <motion.a
                  key={section.id}
                  href={`#${section.id}`}
                  variants={fadeUp}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(section.labelKey)}
                </motion.a>
              ))}
              <motion.div
                variants={fadeUp}
                className="pt-4 border-t border-border flex flex-col gap-4"
              >
                <LanguageSwitcher />
                <Button href={CALENDLY_URL}>{t("cta")}</Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
