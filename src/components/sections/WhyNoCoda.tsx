import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CALENDLY_URL, LEARN_URL, TV_URL } from "@/lib/constants";
import styles from "./WhyNoCoda.module.css";

const editionPath = "/nota/nvidia-lanza-pair-convierte-tus-computadoras-inactivas-en-centro-de-ia-local";

export default async function WhyNoCoda() {
  const t = await getTranslations("WhyNoCoda");

  return (
    <section id="por-que-nocoda" className={styles.section} aria-labelledby="engagement-title">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <h2 id="engagement-title">{t("title")}</h2>
          <p>{t("intro")}</p>
        </header>
        <div className={styles.paths}>
          <article className={styles.path}>
            <div className={`${styles.art} ${styles.program}`} aria-hidden="true">
              <div className={styles.brand}>
                <Image loading="eager" src="/logo.png" width={28} height={28} alt="" className={styles.brandMark} />BEFORE AI
              </div>
              <div className={styles.roadmap}>
                <strong>{t("roadmap")}</strong>
                <div className={styles.roadmapDays}><span>30</span><span>60</span><span>90</span></div>
                <div className={styles.roadmapBars}><i /><i /><i /></div>
              </div>
            </div>
            <h3>{t("programTitle")}</h3>
            <p>{t("programBody")}</p>
            <a href={`${LEARN_URL}/programa`} hrefLang="es" className={styles.link}>{t("programLink")} <span aria-hidden="true">↗</span></a>
          </article>
          <article className={styles.path}>
            <div className={`${styles.art} ${styles.snow}`} aria-hidden="true">
              <div className={styles.brand}>Snowflake</div>
              <div className={styles.dataFlow}>
                <div className={styles.sources}><span>ERP</span><span>CRM</span></div>
                <div className={styles.connector} />
                <div className={styles.database}>
                  <Image loading="eager" src="/snowflake-mark.svg" width={146} height={139} alt="" />
                </div>
              </div>
            </div>
            <h3>{t("dataTitle")}</h3>
            <p>{t("dataBody")}</p>
            <a href={CALENDLY_URL} className={styles.link}>{t("dataLink")} <span aria-hidden="true">↗</span></a>
          </article>
          <article className={styles.path}>
            <div className={`${styles.art} ${styles.newsroom}`}>
              <Image loading="eager" src="/images/newsroom-edition.webp" width={810} height={810} alt=""
                sizes="(max-width: 610px) 94vw, (max-width: 700px) 46vw, (max-width: 1440px) 29vw, 430px" />
              <span className={styles.tvBrand} aria-hidden="true">
                <Image loading="eager" src="/logo.png" width={28} height={28} alt="" className={styles.brandMark} />NOCODA<span>.TV</span>
              </span>
            </div>
            <h3>{t("buildTitle")}</h3>
            <p>{t("buildBody")}</p>
            <a href={`${TV_URL}${editionPath}`} hrefLang="es" className={styles.link}>{t("buildLink")} <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </div>
    </section>
  );
}
