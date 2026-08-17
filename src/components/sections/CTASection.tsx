"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";

export default function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="system-cta">
      <motion.div className="system-cta__copy" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}><h2>{t("title")}</h2></motion.div>
      <div className="system-cta__action"><Button href={CALENDLY_URL} size="lg">{t("button")}<span aria-hidden="true">↗</span></Button><small>{t("note")}</small></div>
    </section>
  );
}
