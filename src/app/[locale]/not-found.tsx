import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./secondary.module.css";

export default async function NotFound() {
  const locale = await getLocale();
  const english = locale === "en";

  return (
    <main id="main-content" className={styles.notFound}>
      <div className={styles.errorContent}>
        <p className={styles.errorCode}>404</p>
        <h1>{english ? "Page not found." : "No encontramos esta página."}</h1>
        <Link className={styles.button} href="/" locale={locale}>
          <span aria-hidden="true">←</span> {english ? "Back to home" : "Volver al inicio"}
        </Link>
      </div>
    </main>
  );
}
