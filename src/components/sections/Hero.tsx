import { getImageProps } from "next/image";
import { getTranslations } from "next-intl/server";
import { CALENDLY_URL } from "@/lib/constants";
import { CLIENTS } from "@/lib/clients";

const featured = ["sequra", "seeds", "areafit", "psima", "muecas"];

export default async function Hero() {
  const t = await getTranslations("Hero");
  const image = { alt: "", sizes: "100vw", fill: true, loading: "eager" } as const;
  const mobile = getImageProps({ ...image, src: "/images/field-connections-mobile.webp" });
  const desktop = getImageProps({ ...image, src: "/images/field-connections.webp", fetchPriority: "high" });
  return (
    <>
      <section className="field-hero" aria-labelledby="field-title">
        <picture>
          <source media="(max-width: 520px)" srcSet={mobile.props.srcSet} sizes={image.sizes} />
          <img {...desktop.props} className="field-hero__photo" alt="" />
        </picture>
        <div className="studio-wrap field-hero__inner">
          <p className="studio-eyebrow"><span className="signal-dot" aria-hidden="true" />{t("badge")}</p>
          <h1 id="field-title">{t("title")} <em>{t("titleAccent")}</em></h1>
          <p className="field-hero__intro">{t("subtitle")}</p>
          <div className="field-hero__actions">
            <a className="studio-button" href={CALENDLY_URL}>{t("cta")} <span aria-hidden="true">↗</span></a>
            <a className="studio-text-link" href="#servicios">{t("secondaryCta")} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>
      <div className="field-roster">
        <div className="studio-wrap field-roster__inner">
          <a href="#clientes" className="field-roster__caption">{t("clients")} <span aria-hidden="true">↘</span></a>
          <ul aria-label={t("clients")}>
            {featured.map(key => {
              const client = CLIENTS.find(client => client.key === key);
              return client && <li key={key} className={`wordmark wordmark--${key}`}>{client.mark}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
