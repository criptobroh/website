import type { Metadata } from "next";
import Image from "next/image";
import styles from "../secondary.module.css";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CALENDLY_URL, DATA_CENTERS_PATH, SITE_NAME, SITE_URL } from "@/lib/constants";

type DataCentersPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: DataCentersPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DataCenters" });
  const es = `${SITE_URL}${DATA_CENTERS_PATH}`;
  const en = `${SITE_URL}/en${DATA_CENTERS_PATH}`;
  const url = locale === "es" ? es : en;
  const title = `${t("title")} | ${SITE_NAME}`;
  const description = t("description");

  return {
    title,
    description,
    alternates: { canonical: url, languages: { es, en, "x-default": es } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function DataCentersPage({ params }: DataCentersPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "DataCenters" });
  const topics = ["site", "systems", "delivery"] as const;

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="datacenter-title">
        <div className={styles.intro}>
          <p className={styles.label}>{t("eyebrow")}</p>
          <h1 id="datacenter-title">{t("lead")} <em>{t("accent")}</em></h1>
          <p className={styles.description}>{t("description")}</p>
          <a className={styles.button} href={CALENDLY_URL}>
            {t("link")} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <figure className={styles.figure}>
          <Image
            src="/datacenter-aisle.webp"
            width={896}
            height={1120}
            sizes="(max-width: 740px) 100vw, (max-width: 1440px) 44vw, 630px"
            alt={t("imageAlt")}
            preload
          />
          <figcaption>{t("scope")}</figcaption>
        </figure>
      </section>
      <section className={styles.scope} aria-labelledby="scope-title">
        <div className={styles.scopeGrid}>
          <div className={styles.scopeHeading}>
            <h2 id="scope-title">{t("workTitle")}</h2>
            <p>{t("workIntro")}</p>
          </div>
          <dl className={styles.topics}>
            {topics.map((topic) => (
              <div key={topic}>
                <dt>{t(topic)}</dt>
                <dd>{t(`${topic}Detail`)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={styles.result}>
          <p className={styles.label}>{t("outputLabel")}</p>
          <p className={styles.resultTitle}>{t("output")}</p>
        </div>
      </section>
    </main>
  );
}
