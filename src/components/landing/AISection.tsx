import {
  Bot,
  Camera,
  CheckCircle2,
  ChevronDown,
  Search,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

const flow = [
  {
    key: "upload",
    title: "Imagen subida",
    detail: "Foto del baño · Edificio A",
    icon: Camera,
    tone: "bg-sky-50 text-sky-700",
  },
  {
    key: "analyze",
    title: "Analizando…",
    detail: "Leyendo descripción y ubicación",
    icon: Bot,
    tone: "bg-primary/10 text-primary",
  },
  {
    key: "compare",
    title: "Comparando incidencias…",
    detail: "Revisando reportes abiertos cercanos",
    icon: Search,
    tone: "bg-slate-100 text-slate-700",
  },
  {
    key: "match",
    title: "Coincidencia encontrada",
    detail: "Reporte #184 · hace 2 horas",
    icon: CheckCircle2,
    tone: "bg-emerald-50 text-emerald-700",
    match: "94%",
  },
] as const;

export function AISection() {
  return (
    // GSAP: scroll reveal + secuencia del flujo de IA (paso a paso)
    <section
      id="ia"
      data-gsap="ai-section"
      data-gsap-reveal="section"
      className="border-b border-border/70 bg-[linear-gradient(180deg,oklch(0.985_0.008_255),oklch(0.975_0.018_255))]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:px-6 sm:py-16 md:gap-12 md:px-8 md:py-20 lg:grid lg:grid-cols-2 lg:items-start">
        <div data-gsap="ai-copy" className="max-w-xl">
          <p className="mb-3 text-sm font-medium text-primary">
            Inteligencia artificial
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            La IA te habla en cada paso
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            No es una caja negra. Ves qué analiza, qué encontró y decides si
            confirmar el reporte o unirlo a uno existente.
          </p>
        </div>

        {/* GSAP: animar cada paso del flujo como conversación */}
        <Card
          data-gsap="ai-flow"
          className="rounded-2xl shadow-[0_1px_2px_oklch(0.2_0.02_255_/0.04),0_8px_24px_oklch(0.2_0.02_255_/0.05)] ring-border/50"
        >
          <CardHeader className="border-b border-border/60 pb-4">
            <CardTitle className="text-base">Flujo de análisis</CardTitle>
            <CardDescription>
              Así se ve cuando reportas desde el celular
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-0 pt-1">
            {flow.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === flow.length - 1;

              return (
                <div key={step.key} data-gsap="ai-step" className="relative">
                  <div className="flex items-start gap-3 py-3">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-2xl",
                        step.tone
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-[15px] font-medium text-foreground">
                          {step.title}
                        </p>
                        {"match" in step ? (
                          <Badge className="rounded-lg px-2.5 tabular-nums">
                            {step.match}
                          </Badge>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {!isLast ? (
                    <div
                      className="ml-[1.35rem] flex h-5 items-center"
                      aria-hidden
                    >
                      <ChevronDown className="size-4 text-muted-foreground/70" />
                    </div>
                  ) : null}
                </div>
              );
            })}

            <div
              data-gsap="ai-confirm"
              className="mt-2 rounded-2xl border border-border/70 bg-background p-4"
            >
              <p className="text-[15px] font-medium text-foreground">
                ¿Deseas confirmar este reporte?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Puedes unirlo al caso existente o crear uno nuevo.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href="#cta"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "min-h-11 w-full px-4 text-[15px] sm:flex-1"
                  )}
                >
                  Confirmar
                </a>
                <a
                  href="#cta"
                  className={cn(
                    buttonVariants({ size: "lg", variant: "outline" }),
                    "min-h-11 w-full px-4 text-[15px] sm:flex-1"
                  )}
                >
                  Crear nuevo
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
