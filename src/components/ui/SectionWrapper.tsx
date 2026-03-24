import type { ReactNode } from "react";
import Container from "./Container";

export default function SectionWrapper({
  id,
  children,
  className = "",
  dark = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${dark ? "bg-bg-secondary" : ""} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
