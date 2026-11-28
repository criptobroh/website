import { getImageProps } from "next/image";
import { getTranslations } from "next-intl/server";
import StudioMotion from "@/components/visuals/StudioMotion";
import StudioFilm from "@/components/visuals/StudioFilm";
import { CALENDLY_URL } from "@/lib/constants";
import ClientMarquee from "./ClientMarquee";
import styles from "./Hero.module.css";

export default async function Hero() {
  const t = await getTranslations("Hero");
  const image = { alt: "", sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const { props: portrait } = getImageProps({ ...image, src: "/images/studio-hero/portrait.webp", width: 850, height: 1050 });
  const { props: landscape } = getImageProps({ ...image, src: "/images/studio-hero/landscape.webp", width: 1920, height: 1030 });

  return (
    <>
      <section className={styles.hero} aria-labelledby="field-title">
        <div className={styles.scene}>
          <picture>
            <source media="(max-width: 660px) and (orientation: portrait), (max-width: 430px)" srcSet={portrait.srcSet} sizes={image.sizes} width={850} height={1050} />
            <img {...landscape} alt="" />
          </picture>
          <StudioMotion />
        </div>
        <div className={`studio-wrap ${styles.inner}`}>
          <div className={styles.copy}>
            <p className={styles.discipline}>Forward Deployed Engineering</p>
            <h1 id="field-title">{t("title")}</h1>
            <p className={styles.intro}>{t("subtitle")}</p>
            <a className={styles.cta} href={CALENDLY_URL}>{t("cta")} <span aria-hidden="true">↗</span></a>
          </div>
          <div className={styles.film}><StudioFilm /></div>
        </div>
      </section>
      <ClientMarquee />
    </>
  );
}
