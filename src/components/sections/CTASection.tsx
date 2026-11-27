import { getTranslations } from "next-intl/server";
import { CALENDLY_URL } from "@/lib/constants";

export default async function CTASection() {
  const t = await getTranslations("CTA");
  return (
    <section id="contacto" className="field-contact" aria-labelledby="contact-title">
      <div className="studio-wrap field-contact__inner">
        <div><p className="studio-eyebrow">{t("label")}</p>
          <h2 id="contact-title">{t("title")} <em>{t("accent")}</em></h2>
        </div>
        <div className="field-contact__action">
          <p>{t("subtitle")}</p>
          <a className="studio-button studio-button--ink" href={CALENDLY_URL}>{t("button")} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
