"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SnowflakeCapability() {
  const t = useTranslations("Snowflake");
  const capabilities = [0, 1, 2, 3].map((index) => t(`capabilities.${index}`));
  const stages = [0, 1, 2, 3].map((index) => t(`stages.${index}`));

  return (
    <section id="snowflake" className="snowflake-capability" aria-labelledby="snowflake-title">
      <div className="snowflake-capability__intro">
        <motion.p
          className="editorial-kicker"
          initial={{ y: 14 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("label")}
        </motion.p>
        <motion.h2
          id="snowflake-title"
          initial={{ y: 22 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.55 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("title")} <span>{t("titleAccent")}</span>
        </motion.h2>
        <p>{t("intro")}</p>
      </div>

      <motion.article
        className="snowflake-capability__card"
        initial={{ y: 36 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="snowflake-capability__card-head">
          <div className="snowflake-capability__brand">
            <span className="snowflake-capability__mark">
              <Image src="/snowflake-mark.svg" alt="" width={146} height={139} />
            </span>
            <div>
              <strong>Snowflake</strong>
              <small>{t("environment")}</small>
            </div>
          </div>
          <span className="snowflake-capability__badge">{t("badge")}</span>
        </div>

        <div className="snowflake-capability__body">
          <div className="snowflake-capability__copy">
            <p className="snowflake-capability__overline">{t("cardLabel")}</p>
            <h3>{t("cardTitle")}</h3>
            <p className="snowflake-capability__description">{t("cardDescription")}</p>
            <ul>
              {capabilities.map((capability) => (
                <li key={capability}><span aria-hidden="true">→</span>{capability}</li>
              ))}
            </ul>
          </div>

          <div className="snowflake-capability__system" aria-label={t("visualAlt")} role="img">
            <div className="snowflake-capability__system-head">
              <span>{t("systemLabel")}</span><strong>{t("systemStatus")}</strong>
            </div>
            <div className="snowflake-capability__diagram" aria-hidden="true">
              <div className="snowflake-capability__axis" />
              {stages.map((stage, index) => (
                <div className={`snowflake-capability__stage snowflake-capability__stage--${index + 1}`} key={stage}>
                  <i /><span>0{index + 1}</span><strong>{stage}</strong>
                </div>
              ))}
              <div className="snowflake-capability__core">
                <span><Image src="/snowflake-mark.svg" alt="" width={146} height={139} /></span>
                <i />
              </div>
              <b className="snowflake-capability__signal snowflake-capability__signal--1" />
              <b className="snowflake-capability__signal snowflake-capability__signal--2" />
            </div>
            <div className="snowflake-capability__system-foot">
              <span>{t("systemFootLeft")}</span><span>{t("systemFootRight")}</span>
            </div>
          </div>
        </div>

        <div className="snowflake-capability__card-foot">
          <strong>{t("principle")}</strong>
          <p>{t("trademark")}</p>
        </div>
      </motion.article>
    </section>
  );
}
