import { getTranslations } from "next-intl/server";
import styles from "./Services.module.css";

const capabilities = [
  { key: "operations", id: "sistemas-operativos" },
  { key: "products", id: "productos-digitales" },
  { key: "ai", id: "ia-aplicada" },
  { key: "infrastructure", id: "datos-e-infraestructura" },
] as const;

type ProjectExample = { anchor?: string; context: string; work: string };

export default async function Services() {
  const t = await getTranslations("Services");

  return (
    <section id="servicios" aria-labelledby="services-title" className={styles.section}>
      <div id="impacto" className={`studio-wrap ${styles.inner}`}>
        <header className={styles.intro}>
          <h2 id="services-title">{t("title")}</h2>
          <p>{t("intro")}</p>
          <a href="#clientes" className={styles.link}>
            {t("clients")} <span aria-hidden="true">↓</span>
          </a>
        </header>

        <div className={styles.collection}>
          {capabilities.map(({ key, id }) => {
            const examples: ProjectExample[] = t.raw(`${key}.examples`);

            return (
              <article key={key} id={id} aria-labelledby={`${id}-title`} className={styles.capability}>
                <h3 id={`${id}-title`}>{t(`${key}.title`)}</h3>
                <p className={styles.delivery}>{t(`${key}.description`)}</p>
                <dl className={styles.examples}>
                  {examples.map(({ anchor, context, work }) => (
                    <div key={context} id={anchor}>
                      <dt>{context}</dt>
                      <dd>{work}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
