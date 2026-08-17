import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyNoCoda from "@/components/sections/WhyNoCoda";
import CTASection from "@/components/sections/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <Services />
      <WhyNoCoda />
      <CTASection />
    </main>
  );
}
