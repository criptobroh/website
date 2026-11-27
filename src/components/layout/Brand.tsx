import { Link } from "@/i18n/navigation";

export default function Brand() {
  return (
    <Link className="studio-brand" href="/" aria-label="NoCoda">
      <span className="studio-brand__mark" aria-hidden="true" />
      <span>NoCoda</span>
    </Link>
  );
}
