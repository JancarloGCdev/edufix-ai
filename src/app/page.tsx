import {
  AISection,
  Benefits,
  CTA,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
} from "@/src/components/landing";

export default function Home() {
  return (
    // GSAP: montar ScrollTrigger / reveals globales desde este layout de página
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* GSAP: Hero entrance */}
        <Hero />
        {/* GSAP: scroll reveal + cards */}
        <HowItWorks />
        {/* GSAP: AI conversation sequence */}
        <AISection />
        {/* GSAP: scroll reveal + cards */}
        <Benefits />
        {/* GSAP: CTA emphasis */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
