import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export function CTA() {
  return (
    // GSAP: animación de entrada / énfasis del CTA al entrar en viewport
    <section
      id="cta"
      data-gsap="cta"
      data-gsap-reveal="cta"
      className="border-b border-border/70"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-primary px-5 py-12 text-primary-foreground shadow-[0_12px_40px_oklch(0.45_0.15_255_/0.28)] sm:px-10 sm:py-14 md:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(1_0_0_/0.2),transparent_55%)]"
          />

          <div className="relative mx-auto max-w-xl text-center">
            <h2 className="text-[1.65rem] font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl">
              Tu próximo reporte puede mejorar el colegio hoy
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-primary-foreground/90 sm:text-base">
              Empieza gratis, reporta desde el celular y deja que la IA evite
              el trabajo duplicado.
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
              <a
                href="#contacto"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "min-h-12 w-full shrink gap-2 bg-white px-5 text-[15px] font-semibold text-primary hover:bg-white/95 sm:w-auto"
                )}
              >
                Probar EduFix AI
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href="#ia"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "min-h-12 w-full shrink border-white/35 bg-transparent px-5 text-[15px] text-white hover:bg-white/10 hover:text-white sm:w-auto"
                )}
              >
                Ver la IA en acción
              </a>
            </div>

            <p className="mt-5 text-xs text-primary-foreground/75">
              Sin instalaciones complicadas. Pensado para estudiantes y
              profesores.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
