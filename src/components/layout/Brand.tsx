import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Brand({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link className="studio-brand" href="/" aria-label="NoCoda">
      <Image loading="eager"
        src={onDark ? "/brand/nocoda-on-dark.png" : "/brand/nocoda-on-light.png"}
        width={onDark ? 1839 : 439}
        height={onDark ? 563 : 133}
        style={{ width: "clamp(7rem, 10vw, 8.25rem)", height: "auto" }}
        alt=""
        unoptimized
      />
    </Link>
  );
}
