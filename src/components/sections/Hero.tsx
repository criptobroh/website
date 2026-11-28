import { getImageProps } from "next/image";
import { getTranslations } from "next-intl/server";
import IntakeDemoLauncher from "@/components/visuals/IntakeDemoLauncher";
import { CALENDLY_URL } from "@/lib/constants";
import ClientMarquee from "./ClientMarquee";
import styles from "./Hero.module.css";

export default async function Hero() {
  const t = await getTranslations("Hero");
  const options = { alt: "", sizes: "100vw", loading: "eager", fetchPriority: "high" } as const;
  const desktop = getImageProps({ ...options, src: "/images/nocoda-glass.webp", width: 1942, height: 809 });
  const mobile = getImageProps({ ...options, src: "/images/nocoda-glass-mobile.webp", width: 1100, height: 601 });

  return (
    <>
      <section className={styles.hero} aria-labelledby="field-title">
        <picture className={styles.scene}>
          <source media="(max-width: 740px)" srcSet={mobile.props.srcSet} sizes={options.sizes} />
          <img {...desktop.props} alt="" />
        </picture>
        <div className={`studio-wrap ${styles.inner}`}>
          <div className={styles.copy}>
            <p className="studio-eyebrow"><span className="signal-line" aria-hidden="true" />{t("badge")}</p>
            <h1 id="field-title">{t("title")} <span>{t("titleAccent")}</span></h1>
            <p className={styles.intro}>{t("subtitle")}</p>
            <div className={styles.actions}>
              <a className="studio-button" href={CALENDLY_URL}>{t("cta")} <span aria-hidden="true">↗</span></a>
              <a className="studio-text-link" href="#clientes">{t("secondaryCta")} <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className={styles.launcher}><IntakeDemoLauncher /></div>
        </div>
      </section>
      <ClientMarquee />
    </>
  );
}
