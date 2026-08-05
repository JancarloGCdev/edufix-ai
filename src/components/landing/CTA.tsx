"use client";

import React from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export function CTA() {
  return (
    <section
      id="cta"
      data-gsap="cta"
      className="relative border-b border-border/60 bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 p-8 sm:p-14 lg:p-16 text-white shadow-2xl shadow-blue-600/25">

          {/* Luces Difusas del Banner */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-sky-400/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-purple-500/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-3xl text-center space-y-6">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="size-4 text-amber-300 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Institución educativa GABO
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              ¿Listo para transformar la gestión de infraestructura en tu colegio?
            </h2>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              Empieza gratis en segundos desde cualquier celular o computador. Reporta daños físicos, colabora con tus compañeros y mantén tu colegio en excelente estado.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-13 w-full sm:w-auto px-8 rounded-2xl bg-white text-blue-700 hover:bg-white/95 font-black text-sm shadow-xl transition-all gap-2 flex items-center justify-center hover:scale-[1.02]"
                )}
              >
                <span>Probar EduFix AI Ahora</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href="#como-funciona"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-13 w-full sm:w-auto px-8 rounded-2xl border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 font-bold text-sm transition-all flex items-center justify-center"
                )}
              >
                Ver cómo funciona
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-white/70">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span>Sin descargas ni instalaciones requeridas · Acceso directo con correo institucional</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
