"use client";

import { useLocale } from "next-intl";
import { useRef, useState, type KeyboardEvent } from "react";
import styles from "./Services.module.css";

const workflows = ["purchasing", "inventory", "knowledge", "data"] as const;
type Workflow = (typeof workflows)[number];
type Language = "es" | "en";

const copy = {
  es: {
    title: "Qué construimos.",
    introduction: "Desde revisar una factura hasta encontrar el pedido que falta en un reporte. Elegí un ejemplo y abrí el registro para ver cómo funciona.",
    example: "Datos de ejemplo",
    purchasing: {
      title: "Compras y facturas", category: "Integración de sistemas",
      description: "Conectamos las facturas con las órdenes de compra del ERP. Quien aprueba el pago ve exactamente qué necesita revisión.",
      app: "Control de compras", heading: "Cruce de documentos", columns: ["Artículo", "Pedido", "Factura"],
      items: ["Cables", "Adaptadores"], action: "Ver diferencia", detail: "Se pidieron 8 adaptadores y se facturaron 10. Compras tiene que confirmar las 2 unidades adicionales antes de liberar el pago.",
    },
    inventory: {
      title: "Inventario en campo", category: "Software a medida",
      description: "Un escaneo de QR vincula cada equipo con el evento, la ubicación y la persona que lo recibió. El historial viaja con la pieza.",
      app: "Inventario técnico", heading: "Consola de audio", label: "Equipo", history: "Últimos movimientos",
      events: ["Salida de depósito", "Recibido en sala"], action: "Ver entrega", detail: "El registro de entrega vincula esta consola con el presupuesto EVT-018 y con la persona a cargo de la sala. La devolución se registra con el mismo QR.",
    },
    knowledge: {
      title: "Conocimiento interno", category: "IA con fuentes",
      description: "Conectamos los manuales del equipo a un asistente que respeta sus permisos. Cada respuesta lleva al documento del que salió.",
      app: "Asistente interno", heading: "Consulta al manual", question: "¿Quién aprueba una devolución fuera de plazo?", answer: "La persona responsable de posventa. El equipo registra el motivo y adjunta el comprobante antes de pedir la aprobación.", action: "Leer la fuente", source: "Manual de posventa · § 4.2", detail: "“Fuera del plazo ordinario, la persona responsable de posventa revisa la solicitud. El expediente debe incluir el motivo de la excepción y el comprobante original.”",
    },
    data: {
      title: "Infraestructura de datos", category: "Monitoreo y permisos",
      description: "Conectamos el ERP con Snowflake y definimos quién puede consultar cada tabla. En este ejemplo, Finanzas ve los pedidos validados y Operaciones recibe las alertas de carga.",
      app: "Monitor de datos", heading: "Carga de pedidos", route: "ERP → Snowflake",
      run: "Carga de las 06:15", columns: ["Pedido", "Estado"], available: "Disponible", held: "Retenido",
      action: "Inspeccionar el pedido retenido", detail: "PED-0186 llegó sin centro de costo. El monitor avisó a Operaciones. Al corregir el dato en el ERP, se vuelve a procesar solo ese pedido. Los otros dos ya están disponibles para Finanzas.",
    },
  },
  en: {
    title: "What we build.",
    introduction: "From checking an invoice to finding the order missing from a report. Pick an example and open the record to see how it works.",
    example: "Sample data",
    purchasing: {
      title: "Purchasing & invoices", category: "Systems integration",
      description: "We match incoming invoices against purchase orders in the ERP. The person approving payment can see exactly what needs a second look.",
      app: "Purchasing desk", heading: "Document match", columns: ["Item", "Ordered", "Billed"],
      items: ["Cables", "Adapters"], action: "Inspect difference", detail: "The order lists 8 adapters, but the invoice bills for 10. Purchasing needs to confirm the 2 extra units before releasing payment.",
    },
    inventory: {
      title: "Field inventory", category: "Custom software",
      description: "A QR scan ties each piece of equipment to the event, its location and the person who received it. Its history stays with it.",
      app: "Equipment register", heading: "Audio console", label: "Asset", history: "Recent movements",
      events: ["Dispatched from warehouse", "Received at venue"], action: "Inspect handoff", detail: "The handoff record connects this console to event quote EVT-018 and the person responsible at the venue. The same QR code records its return.",
    },
    knowledge: {
      title: "Internal knowledge", category: "AI with sources",
      description: "We connect team manuals to an assistant that respects each person's access. Every answer links back to the document it came from.",
      app: "Internal assistant", heading: "Ask the manual", question: "Who approves a return outside the standard window?", answer: "The after-sales lead. The team records the reason and attaches proof of purchase before requesting approval.", action: "Read source", source: "After-sales handbook · § 4.2", detail: "“Outside the standard window, the after-sales lead reviews the request. The case file must include the reason for the exception and the original proof of purchase.”",
    },
    data: {
      title: "Data infrastructure", category: "Monitoring and permissions",
      description: "We connect the ERP to Snowflake and define who can read each table. In this example, Finance sees validated orders and Operations gets alerts about failed records.",
      app: "Data monitor", heading: "Order sync", route: "ERP → Snowflake",
      run: "06:15 run", columns: ["Order", "Status"], available: "Available", held: "On hold",
      action: "Inspect the held order", detail: "ORD-0186 arrived without a cost center. The monitor alerted Operations. Once the team corrects the ERP record, only that order is processed again. Finance can already use the other two.",
    },
  },
};

type SpecimenProps = { workflow: Workflow; language: Language };

function Specimen({ workflow, language }: SpecimenProps) {
  const t = copy[language];
  const item = t[workflow];

  return (
    <div className={styles.specimen}>
      <div className={styles.appBar}>
        <span className={styles.appName}><i aria-hidden="true" />{item.app}</span>
        <span>{t.example}</span>
      </div>
      <div className={styles.sheet}>
        <h3>{item.heading}</h3>
        {workflow === "purchasing" && (
          <>
            <p className={styles.documentIds} dir="ltr">{language === "es" ? "OC-0184  /  FC-0247" : "PO-0184  /  INV-0247"}</p>
            <table className={styles.compare}>
              <thead><tr>{t.purchasing.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
              <tbody>
                <tr><th scope="row">{t.purchasing.items[0]}</th><td>12</td><td>12</td></tr>
                <tr><th scope="row">{t.purchasing.items[1]}</th><td>8</td><td><strong className={styles.flag}>10</strong></td></tr>
              </tbody>
            </table>
          </>
        )}
        {workflow === "inventory" && (
          <>
            <div className={styles.assetTag}><span>{t.inventory.label}</span><strong>EQ-041</strong><i aria-hidden="true" /></div>
            <p className={styles.logHeading}>{t.inventory.history}</p>
            <ol className={styles.history}>
              {t.inventory.events.map((event, index) => <li key={event}><time>{index === 0 ? "09:12" : "10:06"}</time><span>{event}</span></li>)}
            </ol>
          </>
        )}
        {workflow === "knowledge" && (
          <div className={styles.conversation}>
            <p className={styles.question}>{t.knowledge.question}</p>
            <p className={styles.answer}>{t.knowledge.answer}</p>
          </div>
        )}
        {workflow === "data" && (
          <>
            <p className={styles.syncRoute}><span>{t.data.route}</span><span>{t.data.run}</span></p>
            <table className={styles.compare}>
              <thead><tr>{t.data.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
              <tbody>
                {["0184", "0185", "0186"].map((id) => (
                  <tr key={id}>
                    <th scope="row">{language === "es" ? "PED" : "ORD"}-{id}</th>
                    <td>{id === "0186" ? <strong className={styles.flag}>{t.data.held}</strong> : t.data.available}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
        <details className={styles.detail}>
          <summary>{item.action}<span aria-hidden="true">+</span></summary>
          {workflow === "knowledge" && <strong className={styles.source}>{t.knowledge.source}</strong>}
          <p>{item.detail}</p>
        </details>
      </div>
    </div>
  );
}

export default function Services() {
  const language = useLocale() === "es" ? "es" : "en";
  const t = copy[language];
  const [active, setActive] = useState<Workflow>("purchasing");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = workflows.length - 1;
    const nextIndex: Record<string, number> = {
      ArrowDown: (index + 1) % workflows.length,
      ArrowUp: (index + last) % workflows.length,
      Home: 0,
      End: last,
    };
    const next = nextIndex[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(workflows[next]);
    tabs.current[next]?.focus();
  }

  return (
    <section id="servicios" aria-labelledby="services-title" className={styles.section}>
      <div className={styles.inner} id="impacto">
        <div className={styles.intro}>
          <h2 id="services-title">{t.title}</h2>
          <p>{t.introduction}</p>
        </div>
        <div className={styles.explorer}>
          <div role="tablist" aria-labelledby="services-title" aria-orientation="vertical" className={styles.tabs}>
            {workflows.map((key, index) => (
              <button
                key={key}
                id={`service-tab-${key}`}
                type="button"
                role="tab"
                aria-selected={key === active}
                aria-controls={`service-panel-${key}`}
                tabIndex={key === active ? 0 : -1}
                ref={(element) => { tabs.current[index] = element; }}
                onKeyDown={(event) => navigateTabs(event, index)}
                onClick={() => setActive(key)}
                className={styles.tab}
              >
                <span className={styles.tabText}><span>{t[key].category}</span><strong>{t[key].title}</strong></span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          {workflows.map((key) => (
            <div
              key={key}
              role="tabpanel"
              aria-labelledby={`service-tab-${key}`}
              id={`service-panel-${key}`}
              hidden={active !== key}
              className={styles.panel}
            >
              <Specimen workflow={key} language={language} />
              <p className={styles.caption}>{t[key].description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
