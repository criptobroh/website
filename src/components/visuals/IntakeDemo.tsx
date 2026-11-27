"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import styles from "./IntakeDemo.module.css";

type Step = 0 | 1 | 2;
type DemoCopy = {
  region: string;
  example: string;
  workspace: string;
  stepsLabel: string;
  steps: readonly [string, string, string];
  eyebrow: readonly [string, string, string];
  titles: readonly [string, string, string];
  actions: readonly [string, string, string];
  status: readonly [string, string, string];
  from: string;
  sender: string;
  email: string;
  fields: readonly [string, string, string, string];
  values: readonly [string, string, string, string];
};

const copy = {
  es: {
    region: "Demo del flujo de operaciones",
    example: "Demo interactiva",
    workspace: "Mesa de operaciones",
    stepsLabel: "Elegí una etapa del ejemplo",
    steps: ["Entrada", "Revisión", "Registro"],
    eyebrow: ["Correo recibido", "Revisión humana", "Oportunidad en CRM"],
    titles: ["Stock entre depósitos", "Revisá lo que pidió el equipo.", "Oportunidad registrada."],
    actions: ["Preparar revisión", "Confirmar y registrar", "Volver a empezar"],
    status: ["Paso 1 de 3. Correo recibido.", "Paso 2 de 3. Revisá los datos que se extrajeron del correo.", "Paso 3 de 3. Oportunidad registrada en el CRM de ejemplo."],
    from: "De",
    sender: "Equipo de logística",
    email: "Tenemos el stock repartido entre dos depósitos. ¿Podemos ver en un solo lugar qué queda en cada uno?",
    fields: ["Necesidad detectada", "Alcance", "Equipo responsable", "Próximo paso"],
    values: ["Consultar el stock por ubicación", "Dos depósitos", "Operaciones", "Relevar cómo registra el stock cada depósito"],
  },
  en: {
    region: "Operations workflow demo",
    example: "Interactive demo",
    workspace: "Operations desk",
    stepsLabel: "Select a step in the example",
    steps: ["Inbox", "Review", "Record"],
    eyebrow: ["Incoming email", "Human review", "CRM opportunity"],
    titles: ["Stock across warehouses", "Review the team’s request.", "Opportunity recorded."],
    actions: ["Prepare for review", "Confirm and record", "Start again"],
    status: ["Step 1 of 3. Email received.", "Step 2 of 3. Review the details extracted from the email.", "Step 3 of 3. Opportunity recorded in the sample CRM."],
    from: "From",
    sender: "Logistics team",
    email: "Our stock is split between two warehouses. Could we see what’s left at each one in a single place?",
    fields: ["Request identified", "Scope", "Team responsible", "Next step"],
    values: ["Check stock by location", "Two warehouses", "Operations", "Review how each warehouse records inventory"],
  },
} satisfies Record<"es" | "en", DemoCopy>;

const steps = [0, 1, 2] as const;

export default function IntakeDemo() {
  const locale = useLocale();
  const t = copy[locale === "en" ? "en" : "es"];
  const [step, setStep] = useState<Step>(0);

  return (
    <section className={styles.stage} aria-label={t.region} data-step={step}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.traces} aria-hidden="true"><i /><i /><i /></div>

      <div className={styles.console}>
        <div className={styles.window}>
          <header className={styles.toolbar}>
            <div className={styles.product}>
              <Image src="/logo.png" alt="NoCoda" width={30} height={30} unoptimized />
              <span>{t.workspace}</span>
            </div>
            <span className={styles.demoTag}>{t.example}</span>
          </header>

          <div className={styles.pages}>
            {steps.map((index) => (
              <div key={index} className={styles.sheet} data-active={step === index} aria-hidden={step !== index}>
                <div className={styles.sheetHeading}>
                  <span className={styles.kindIcon} data-kind={index} aria-hidden="true"><i /></span>
                  <span>{t.eyebrow[index]}</span>
                </div>
                <h2>{t.titles[index]}</h2>
                {index === 0 ? (
                  <div className={styles.email}>
                    <p className={styles.sender}><span>{t.from}</span> {t.sender}</p>
                    <p>{t.email}</p>
                  </div>
                ) : (
                  <dl className={styles.fields}>
                    {(index === 1 ? [0, 1] : [2, 3]).map((field) => (
                      <div key={field}><dt>{t.fields[field]}</dt><dd>{t.values[field]}</dd></div>
                    ))}
                  </dl>
                )}
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <span className={styles.count} aria-hidden="true">0{step + 1}<i>/</i>03</span>
            <button type="button" onClick={() => setStep(steps[(step + 1) % steps.length])}>
              {t.actions[step]} <span aria-hidden="true">{step === 2 ? "↺" : "→"}</span>
            </button>
          </div>
        </div>

        <div className={styles.steps} role="group" aria-label={t.stepsLabel}>
          {steps.map((index) => (
            <button type="button" key={index} aria-pressed={step === index} onClick={() => setStep(index)}>
              <i aria-hidden="true" />{t.steps[index]}
            </button>
          ))}
        </div>
        <span className={styles.srOnly} role="status" aria-atomic="true">{t.status[step]}</span>
      </div>
    </section>
  );
}
