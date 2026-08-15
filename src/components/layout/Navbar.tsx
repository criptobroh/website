"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { CALENDLY_URL, LEARN_URL, NAV_SECTIONS } from "@/lib/constants";
import { Link } from "@/i18n/navigation";

const mobileMenuList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.02 } },
};

const mobileMenuItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } },
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    firstMobileLinkRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header
      className={`nocoda-nav fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "is-scrolled" : ""}`}
    >
      {/* Subtle gradient border on scroll */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
      )}

      <nav className="nocoda-nav__frame max-w-[1240px] mx-auto px-4 md:px-5 flex items-center justify-between h-[64px]">
        {/* Logo */}
        <Link href="/" className="nocoda-nav__brand flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="NoCoda"
            width={32}
            height={32}
            className="h-8 w-auto rounded-lg"
            preload
          />
          <span>NoCoda</span>
        </Link>

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
          <a href={LEARN_URL} className="text-sm text-text-secondary hover:text-text-primary transition-all duration-200">{t("program")}</a>
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
          ref={menuButtonRef}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? (locale === "es" ? "Cerrar menú" : "Close menu") : (locale === "es" ? "Abrir menú" : "Open menu")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
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
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ pointerEvents: "auto" }}
            className="nocoda-nav__mobile-menu md:hidden glass-strong overflow-hidden"
          >
            <motion.div
              className="px-6 py-8 flex flex-col gap-6"
              variants={mobileMenuList}
              initial="hidden"
              animate="visible"
            >
              {NAV_SECTIONS.map((section, index) => (
                <motion.a
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  key={section.id}
                  href={`#${section.id}`}
                  variants={mobileMenuItem}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(section.labelKey)}
                </motion.a>
              ))}
              <motion.a
                href={LEARN_URL}
                variants={mobileMenuItem}
                className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t("program")}
              </motion.a>
              <motion.div
                variants={mobileMenuItem}
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
