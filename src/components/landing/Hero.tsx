import { Camera, MapPin, Sparkles } from "lucide-react";
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

export function Hero() {
  return (
    // GSAP: inicializar animación de entrada del Hero (copy + mockup)
    <section
      id="inicio"
      data-gsap="hero"
      className="relative overflow-hidden border-b border-border/70"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,oklch(0.93_0.05_255),transparent)]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 md:gap-14 md:px-8 md:py-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* GSAP: entrada del bloque de copy del Hero */}
        <div data-gsap="hero-copy" className="flex flex-col">
          <p className="mb-4 text-sm font-medium text-primary">EduFix AI</p>
          <h1 className="text-[1.875rem] font-semibold leading-tight tracking-tight text-foreground sm:text-4xl sm:leading-[1.15] md:text-[2.75rem]">
            Reporta problemas en tu colegio con ayuda de Inteligencia
            Artificial.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Abre un reporte en segundos. La IA detecta casos similares y ayuda
            a tu colegio a resolver sin duplicados.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
            <a
              href="#cta"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-h-11 w-full px-5 text-[15px] sm:w-auto"
              )}
            >
              Empezar a reportar
            </a>
            <a
              href="#como-funciona"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "min-h-11 w-full px-5 text-[15px] sm:w-auto"
              )}
            >
              Ver cómo funciona
            </a>
          </div>
        </div>

        {/* GSAP: entrada del mockup / cards del Hero */}
        <div data-gsap="hero-mockup" className="w-full">
          <Card className="rounded-2xl bg-card shadow-[0_1px_2px_oklch(0.2_0.02_255_/0.04),0_8px_24px_oklch(0.2_0.02_255_/0.06)] ring-border/50">
            <CardHeader className="border-b border-border/60 pb-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="text-base">Nueva incidencia</CardTitle>
                  <CardDescription className="mt-0.5">
                    Vista previa del reporte
                  </CardDescription>
                </div>
                <Badge className="rounded-lg px-2.5">Borrador</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pt-1">
              <div className="overflow-hidden rounded-2xl border border-border/70 bg-muted/40">
                <div className="flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,oklch(0.94_0.03_255),oklch(0.97_0.01_255))]">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary shadow-sm">
                    <Camera className="size-5" aria-hidden />
                  </span>
                  <p className="text-xs font-medium text-muted-foreground">
                    Foto del pupitre dañado
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Título
                  </p>
                  <p className="mt-1 text-[15px] font-medium text-foreground">
                    Pupitre roto — Aula 2B
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
                  Edificio Central · Segundo piso
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  La pata delantera está suelta y el tablero tiene una grieta.
                  No se puede usar con seguridad.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-3.5">
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Sparkles className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    IA lista para analizar
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    Buscará incidencias similares antes de crear un reporte
                    nuevo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
