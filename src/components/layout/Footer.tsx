import { getTranslations } from "next-intl/server";
import Brand from "./Brand";
import { LEARN_URL, SOCIAL_LINKS, TV_URL } from "@/lib/constants";

export default async function Footer() {
  const t = await getTranslations("Footer");
  return (
    <footer className="studio-footer">
      <div className="studio-wrap">
        <div className="studio-footer__main">
          <div><Brand onDark /><p className="studio-footer__mission">{t("description")}</p></div>
          <div className="studio-footer__group">
            <h2>{t("explore")}</h2>
            <a href={LEARN_URL}>BEFORE AI <span>{t("program")}</span><i aria-hidden="true">↗</i></a>
            <a href={TV_URL}>NoCoda.TV <span>{t("newsroom")}</span><i aria-hidden="true">↗</i></a>
          </div>
          <div className="studio-footer__social">
            <h2>{t("contact")}</h2>
            <a href="mailto:hola@nocoda.ai">hola@nocoda.ai</a>
            <a href={SOCIAL_LINKS.linkedin}>LinkedIn <i aria-hidden="true">↗</i></a>
            <a href={SOCIAL_LINKS.youtube}>YouTube <i aria-hidden="true">↗</i></a>
          </div>
        </div>
        <div className="studio-footer__base"><span>© {new Date().getFullYear()} NoCoda</span><a href="#main-content">{t("top")} ↑</a></div>
      </div>
    </footer>
  );
}
