"use client";

import React, { useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  Play,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Heart,
  Wrench,
} from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCopyRef = useRef<HTMLDivElement>(null);
  const rightMockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada del Hero con GSAP
      if (leftCopyRef.current) {
        gsap.fromTo(
          leftCopyRef.current.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
        );
      }

      if (rightMockupRef.current) {
        gsap.fromTo(
          rightMockupRef.current,
          { opacity: 0, scale: 0.92, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={containerRef}
      data-gsap="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-border/60 bg-dot-pattern py-12 lg:py-20"
    >
      {/* Luces Difusas (Blur Gradients) estilo Vercel / Supabase */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] left-[20%] size-[500px] rounded-full bg-gradient-to-tr from-blue-600/15 via-indigo-500/15 to-sky-400/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] right-[10%] size-[400px] rounded-full bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-transparent blur-[100px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          
          {/* LADO IZQUIERDO: Título potente + CTAs */}
          <div ref={leftCopyRef} className="lg:col-span-6 flex flex-col space-y-6 text-left">
            
            {/* Insignia Impulsado por IA */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md shadow-xs">
              <Sparkles className="size-4 text-blue-600 dark:text-blue-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Impulsado por IA Institucional
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
              Transformando la gestión escolar con{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                Inteligencia Artificial
              </span>
              .
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Reporta averías físicas en tu colegio en menos de 1 minuto. EduFix AI analiza la imagen, elimina reportes duplicados y conecta a estudiantes, coordinadores y mantenimiento en tiempo real.
            </p>

            {/* Botones principales de acción */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-13 px-7 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-blue-600/25 transition-all gap-2 flex items-center justify-center hover:scale-[1.02] active:scale-[0.98]"
                )}
              >
                <span>Comenzar gratis</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href="#como-funciona"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "h-13 px-7 rounded-2xl border-border bg-card/80 backdrop-blur-md text-foreground font-bold text-sm hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                )}
              >
                <Play className="size-4 text-blue-600 dark:text-blue-400 fill-current" />
                <span>Ver demostración</span>
              </a>
            </div>

            {/* Credencial institucional */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50 text-xs font-semibold text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1.5 text-foreground font-bold">
                <ShieldCheck className="size-4 text-emerald-500" />
                IE Gabriel García Márquez (IE GABO)
              </span>
              <span className="text-border">•</span>
              <span className="flex items-center gap-1 text-primary">
                Sincronización Realtime ⚡
              </span>
            </div>

          </div>

          {/* LADO DERECHO: Composición Visual Rica (Mockup Dashboard + Cards Flotantes Glassmorphism) */}
          <div ref={rightMockupRef} className="lg:col-span-6 relative flex justify-center items-center">
            
            {/* Resplandor de fondo para el mockup */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl filter blur-2xl transform scale-95" />

            {/* Contenedor principal del Mockup */}
            <div className="relative w-full max-w-lg rounded-3xl border border-border/80 bg-card/90 backdrop-blur-2xl p-4 sm:p-5 shadow-2xl shadow-blue-500/10 space-y-4">
              
              {/* Header del Mockup */}
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="size-3 rounded-full bg-rose-500/80" />
                    <span className="size-3 rounded-full bg-amber-500/80" />
                    <span className="size-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground ml-2">
                    edufix-ai/dashboard
                  </span>
                </div>

                <Badge variant="outline" className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                  En vivo
                </Badge>
              </div>

              {/* Tarjeta de Reporte Simulado dentro del Mockup */}
              <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-md transition-all hover:shadow-lg">
                <div className="relative h-44 sm:h-48 overflow-hidden bg-black/90">
                  <img
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
                    alt="Proyector Salón 204"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold text-white bg-black/70 px-2 py-0.5 rounded-lg border border-white/20">
                        REP-01
                      </span>
                      <span className="text-[10px] font-bold text-black bg-white/90 px-2 py-0.5 rounded-lg">
                        Tecnología
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 rounded-lg backdrop-blur-md">
                      🟡 Pendiente
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                      <MapPin className="size-3 text-primary" />
                      <span>Salón 204 (Bloque B)</span>
                    </div>
                    <p className="text-sm font-bold truncate">Proyector con pantalla azul sin señal</p>
                  </div>
                </div>

                <div className="p-3.5 flex items-center justify-between text-xs border-t border-border/60 bg-card">
                  <span className="text-muted-foreground flex items-center gap-1 text-[11px] font-medium">
                    <Clock className="size-3.5 text-primary" /> Hace 15 minutos
                  </span>
                  <span className="flex items-center gap-1 font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-xl">
                    <Heart className="size-3.5 fill-current" /> 15 apoyos
                  </span>
                </div>
              </div>

              {/* CARD FLOTANTE 1: IA Detectó Duplicado */}
              <div className="animate-float-slow absolute -top-5 -right-4 sm:-right-6 bg-card/95 backdrop-blur-xl border border-blue-500/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs max-w-[220px]">
                <div className="size-9 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Bot className="size-5" />
                </div>
                <div>
                  <p className="font-extrabold text-foreground leading-tight">IA: 95% Coincidencia</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Caso duplicado unificado</p>
                </div>
              </div>

              {/* CARD FLOTANTE 2: Estado Resuelto por Mantenimiento */}
              <div className="animate-float-reverse absolute -bottom-5 -left-4 sm:-left-6 bg-card/95 backdrop-blur-xl border border-purple-500/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs max-w-[240px]">
                <div className="size-9 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Wrench className="size-5" />
                </div>
                <div>
                  <p className="font-extrabold text-purple-700 dark:text-purple-300 leading-tight">Asignado a Mantenimiento</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Técnico Carlos Ruíz asignado</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
