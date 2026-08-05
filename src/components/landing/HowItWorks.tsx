import { ClipboardList, School, Sparkles } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Reporta",
    description:
      "Toma una foto, elige el lugar y describe el problema en menos de un minuto.",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "La IA analiza",
    description:
      "Compara tu reporte con casos abiertos y avisa si ya existe uno similar.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "El colegio actúa",
    description:
      "Mantenimiento recibe una cola clara, sin ruido ni reportes repetidos.",
    icon: School,
  },
] as const;

export function HowItWorks() {
  return (
    // GSAP: scroll reveal de la sección + stagger de cards
    <section
      id="como-funciona"
      data-gsap="how-it-works"
      data-gsap-reveal="section"
      className="border-b border-border/70 bg-background"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Cómo funciona
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Tres pasos simples. Pensado para usarlo desde el celular en el
            pasillo o el aula.
          </p>
        </div>

        {/* GSAP: animar cards con stagger al entrar en viewport */}
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4 md:grid md:grid-cols-3">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                data-gsap="card"
                data-gsap-reveal="card"
                className="rounded-2xl shadow-[0_1px_2px_oklch(0.2_0.02_255_/0.04)] ring-border/50"
              >
                <CardHeader className="gap-3">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {item.step}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-[15px] leading-relaxed">
                    {item.description}
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
