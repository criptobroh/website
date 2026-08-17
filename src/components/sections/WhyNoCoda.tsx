"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhyNoCoda() {
  const t = useTranslations("WhyNoCoda");
  const snowflake = useTranslations("Snowflake");

  return (
    <section id="por-que-nocoda" className="why-system">
      <div className="why-system__statement">
        <p className="editorial-kicker">{t("label")}</p>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
      </div>
      <div className="why-system__proofs">
        <div className="why-system__proof">
          <span>Snowflake</span>
          <div className="why-system__proof-visual why-system__proof-visual--snowflake" aria-hidden="true">
            <i /><i /><i />
            <Image src="/snowflake-mark.svg" alt="" width={146} height={139} />
          </div>
          <strong>{snowflake("cardTitle")}</strong>
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
          <b>{t("portalCta")} <span aria-hidden="true">↗</span></b>
        </a>
      </div>
    </section>
  );
}
