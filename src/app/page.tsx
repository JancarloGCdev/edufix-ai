import {
  AISection,
  Benefits,
  StatsSection,
  CTA,
  Footer,
  Hero,
  HowItWorks,
  Navbar,
} from "@/src/components/landing";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* Hero Principal con composición gráfica e IA */}
        <Hero />
        {/* Proceso Institucional en 4 Pasos */}
        <HowItWorks />
        {/* Sección de IA y Visión Computacional */}
        <AISection />
        {/* Beneficios de la Comunidad Escolar */}
        <Benefits />
        {/* Estadísticas e Impacto Animados con GSAP */}
        <StatsSection />
        {/* Llamado a la Acción Banner */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
