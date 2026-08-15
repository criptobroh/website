"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhyNoCoda() {
  const t = useTranslations("WhyNoCoda");
  const snowflake = useTranslations("Snowflake");
  const points = [0, 1, 2].map((index) => ({ title: t(`points.${index}.title`), description: t(`points.${index}.description`) }));

  return (
    <section id="por-que-nocoda" className="why-system">
      <div className="why-system__statement">
        <p className="editorial-kicker">{t("label")}</p>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
      </div>
      <div className="why-system__principles">
        {points.map((point, index) => (
          <motion.article key={point.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}>
            <span>0{index + 1}</span><h3>{point.title}</h3><p>{point.description}</p>
          </motion.article>
        ))}
      </div>
      <div className="why-system__proofs">
        <div className="why-system__proof">
          <span>Snowflake</span>
          <div className="why-system__proof-visual why-system__proof-visual--snowflake" aria-hidden="true">
            <i /><i /><i />
            <Image src="/snowflake-mark.svg" alt="" width={146} height={139} />
          </div>
          <strong>{snowflake("cardTitle")}</strong>
          <p>{snowflake("cardDescription")}</p>
        </div>
        <a
          className="why-system__proof why-system__proof--link"
          href="https://nocoda.tv"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("portalAria")}
        >
          <span>NoCoda.TV · {t("portalStatus")}</span>
          <div className="why-system__proof-visual why-system__proof-visual--tv" aria-hidden="true">
            <div><b>LIVE</b><small>AI NEWSROOM</small></div>
            <p>AI agents move from demos to operating systems</p>
            <p>Data quality becomes an executive decision</p>
            <p>The next interface is the workflow</p>
          </div>
          <strong>{t("portalTitle")}</strong>
          <p>{t("portalDescription")}</p>
          <b>{t("portalCta")} <span aria-hidden="true">↗</span></b>
        </a>
      </div>
    </section>
  );
}
