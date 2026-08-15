import { getTranslations } from "next-intl/server";

export default async function OutcomeMarquee() {
  const t = await getTranslations("Marquee");
  const items = [0, 1, 2, 3].map((index) => t(`items.${index}`));

  return (
    <div className="outcome-marquee" aria-label={items.join(" · ")}>
      <div className="outcome-marquee__track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} aria-hidden={index >= items.length ? "true" : undefined}>
            {item}<i aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
