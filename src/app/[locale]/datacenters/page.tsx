import type { Metadata } from "next";
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
  const t = await getTranslations("DataCenters");

  return (
    <main id="main-content" className="engagements datacenters flex-1">
      <p className="editorial-kicker">{t("eyebrow")}</p>
      <h1>{t("title")}</h1>
      <p className="datacenters__description">{t("description")}</p>
      <div className="datacenters__details">
        <strong>{t("output")}</strong>
        <a href={CALENDLY_URL}>
          {t("link")} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </main>
  );
}
