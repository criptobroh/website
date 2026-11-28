import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CALENDLY_URL, TV_URL } from "@/lib/constants";
import ClientMarquee from "./ClientMarquee";
import styles from "./Hero.module.css";

const projects = [
  { key: "events", name: "Scuticchio", image: "field-events", href: "#gestion-de-eventos" },
  { key: "commerce", name: "Marti’s", image: "parts-catalog", href: "https://martis.lat/catalogo?make=Toyota&model=Camry" },
  { key: "newsroom", name: "NoCoda.TV", image: "newsroom", href: `${TV_URL}/como-funciona` },
] as const;

export default async function Hero() {
  const t = await getTranslations("Hero");

  return (
    <>
      <section className={styles.hero} aria-labelledby="field-title">
        <div className={`studio-wrap ${styles.inner}`}>
          <div className={styles.opening}>
            <div>
              <p className={styles.discipline}>{t("discipline")}</p>
              <h1 id="field-title">{t("title")} <span>{t("titleEnd")}</span></h1>
            </div>
            <div className={styles.intro}>
              <p>{t("subtitle")}</p>
              <div className={styles.actions}>
                <a href={CALENDLY_URL} className={styles.cta}>{t("cta")} <span aria-hidden="true">↗</span></a>
                <a href="#servicios" className={styles.more}>{t("secondaryCta")} <span aria-hidden="true">↓</span></a>
              </div>
            </div>
          </div>
          <ul className={styles.projects} role="list" aria-label={t("projects")}>
            {projects.map((project, index) => (
              <li key={project.key}>
                <a className={styles.project} href={project.href}>
                  <div className={styles.frame}>
                    <Image
                      src={`/images/work/${project.image}.webp`}
                      width={960}
                      height={496}
                      alt=""
                      sizes="(max-width: 640px) 36vw, (max-width: 1550px) 31vw, 470px"
                      loading="eager"
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  </div>
                  <div className={styles.caption}>
                    <div><p>{project.name}</p><h2>{t(`examples.${project.key}`)}</h2></div>
                    <span aria-hidden="true">{project.href.startsWith("#") ? "↓" : "↗"}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClientMarquee />
    </>
  );
}
