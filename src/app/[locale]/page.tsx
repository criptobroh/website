import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Services from "@/components/sections/Services";
import HowWeWork from "@/components/sections/HowWeWork";
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
    <main className="flex-1">
      <Hero />
      <Problem />
      <Services />
      <HowWeWork />
      <WhyNoCoda />
      <CTASection />
    </main>
  );
}
