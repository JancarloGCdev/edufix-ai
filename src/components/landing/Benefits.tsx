import {
  Bell,
  Gauge,
  Layers2,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const benefits = [
  {
    title: "Menos duplicados",
    description: "La IA agrupa casos parecidos antes de saturar al equipo.",
    icon: Layers2,
    tone: "bg-sky-50 text-sky-700",
  },
  {
    title: "Respuesta rápida",
    description: "Prioriza lo urgente y deja una cola limpia de trabajo.",
    icon: Gauge,
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Todos ven el estado",
    description: "Estudiantes, docentes y admin siguen cada incidencia.",
    icon: Users,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    title: "Flujo simple",
    description: "De abierto a resuelto, sin hojas de cálculo ni chats perdidos.",
    icon: Workflow,
    tone: "bg-amber-50 text-amber-700",
  },
  {
    title: "Alertas claras",
    description: "Avisa cuando hay coincidencia alta o un caso crítico.",
    icon: Bell,
    tone: "bg-rose-50 text-rose-700",
  },
  {
    title: "Confianza real",
    description: "Cada reporte tiene seguimiento visible y responsable.",
    icon: ShieldCheck,
    tone: "bg-primary/10 text-primary",
  },
] as const;

export function Benefits() {
  return (
    // GSAP: scroll reveal de la sección + stagger de benefit cards
    <section
      data-gsap="benefits"
      data-gsap-reveal="section"
      className="border-b border-border/70 bg-background"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Hecho para el día a día del colegio
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Menos ruido, más acción. Una app que se siente útil desde el primer
            reporte.
          </p>
        </div>

        {/* GSAP: animar cards al entrar en viewport */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={benefit.title}
                data-gsap="card"
                data-gsap-reveal="card"
                className="rounded-2xl shadow-[0_1px_2px_oklch(0.2_0.02_255_/0.04)] ring-border/50"
              >
                <CardHeader className="gap-3">
                  <span
                    className={`flex size-12 items-center justify-center rounded-2xl ${benefit.tone}`}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <CardTitle className="text-base">{benefit.title}</CardTitle>
                  <CardDescription className="text-[15px] leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
