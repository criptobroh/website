import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function HowWeWork() {
  const t = await getTranslations("HowWeWork");
  const steps: { title: string; description: string }[] = t.raw("steps");

  return (
    <section id="como-trabajamos" className="field-method" aria-labelledby="method-title">
      <div className="studio-wrap">
        <p className="studio-eyebrow"><span className="signal-line" aria-hidden="true" />{t("label")}</p>
        <div className="field-method__heading">
          <h2 id="method-title">{t("title")} <em>{t("accent")}</em></h2>
          <p>{t("intro")}</p>
        </div>
        <div className="field-method__body">
          <figure className="field-method__portrait">
            <Image loading="eager" src="/images/pablo-estudio.webp" alt={t("photoAlt")} width={720} height={866}
              sizes="(max-width: 660px) 100vw, (max-width: 1400px) 38vw, 480px" />
            <figcaption><span>Pablo Loyúdice</span><span>NoCoda</span></figcaption>
          </figure>
          <ol className="field-method__steps">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="field-method__index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
