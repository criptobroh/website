import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CALENDLY_URL } from "@/lib/constants";
import IntakeDemo from "@/components/visuals/IntakeDemo";
import { CLIENTS } from "@/lib/clients";

const featured = ["sequra", "seeds", "elliecare", "alveo", "muecas"]
  .flatMap(key => CLIENTS.filter(client => client.key === key));

export default async function Hero() {
  const t = await getTranslations("Hero");
  return (
    <>
      <section className="nc-hero" aria-labelledby="field-title">
        <div className="studio-wrap nc-hero__grid">
          <div className="nc-hero__copy">
            <p className="studio-eyebrow"><span className="signal-line" aria-hidden="true" />{t("badge")}</p>
            <h1 id="field-title">{t("title")} <span>{t("titleAccent")}</span></h1>
            <p className="nc-hero__intro">{t("subtitle")}</p>
            <div className="nc-hero__actions">
              <a className="studio-button" href={CALENDLY_URL}>{t("cta")} <span aria-hidden="true">↗</span></a>
              <a className="studio-text-link" href="#clientes">{t("secondaryCta")} <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <IntakeDemo />
        </div>
      </section>
      <div className="nc-roster">
        <div className="studio-wrap nc-roster__inner">
          <a href="#clientes" className="nc-roster__caption">{t("clients")} <span aria-hidden="true">↘</span></a>
          <ul aria-label={t("clients")}>
            {featured.map(({ key, logo, mark }) => (
              <li key={key}>
                <Image src={logo} alt={mark}
                  width={136} height={48} unoptimized />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
