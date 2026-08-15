"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { CALENDLY_URL } from "@/lib/constants";

export default function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="system-cta">
      <motion.div className="system-cta__line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} aria-hidden="true" />
      <div className="system-cta__copy"><span lang="en">READY / WHEN YOU ARE</span><h2>{t("title")}</h2><p>{t("subtitle")}</p></div>
      <div className="system-cta__action"><Button href={CALENDLY_URL} size="lg">{t("button")}<span aria-hidden="true">↗</span></Button><small lang="en">30 MIN · NO SALES THEATER</small></div>
    </section>
  );
}
