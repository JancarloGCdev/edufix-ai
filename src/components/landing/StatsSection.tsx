"use client";

import React, { useEffect, useRef } from "react";
import { CheckCircle2, Users, Layers, TrendingUp } from "lucide-react";
import gsap from "gsap";

const stats = [
  {
    id: "stat-1",
    targetNumber: 250,
    prefix: "+",
    suffix: "",
    label: "Reportes Gestionados",
    description: "Incidencias canalizadas con éxito",
    icon: Layers,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 border-blue-500/30",
  },
  {
    id: "stat-2",
    targetNumber: 95,
    prefix: "",
    suffix: "%",
    label: "Tasa de Resolución",
    description: "Casos resueltos con evidencia",
    icon: CheckCircle2,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/30",
  },
  {
    id: "stat-3",
    targetNumber: 1200,
    prefix: "+",
    suffix: "",
    label: "Estudiantes Beneficiados",
    description: "Comunidad escolar impactada",
    icon: Users,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 border-purple-500/30",
  },
  {
    id: "stat-4",
    targetNumber: 85,
    prefix: "",
    suffix: "%",
    label: "Menos Duplicados",
    description: "Reducción de ruido por IA",
    icon: TrendingUp,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/30",
  },
] as const;

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación de contadores con GSAP
      stats.forEach((st) => {
        const el = document.getElementById(st.id);
        if (el) {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: st.targetNumber,
            duration: 2.2,
            ease: "power2.out",
            onUpdate: () => {
              el.innerText = `${st.prefix}${Math.floor(obj.val)}${st.suffix}`;
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="estadisticas"
      ref={sectionRef}
      data-gsap="stats"
      className="relative border-b border-border/60 bg-dot-pattern py-16 sm:py-24 overflow-hidden"
    >
      {/* Luz Difusa ambiental */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-blue-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner principal de métricas */}
        <div className="rounded-3xl border border-border/80 bg-card/90 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl shadow-blue-500/5 space-y-10">
          
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              📊 Métricas e Impacto en Vivo
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              EduFix AI en Cifras Institucionales
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Resultados proyectados de eficiencia en la gestión de infraestructura y convivencia escolar.
            </p>
          </div>

          {/* Grid de 4 Contadores Animados */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.id}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/40 border border-border/60 hover:bg-muted/70 transition-all space-y-3"
                >
                  <div className={`size-12 rounded-2xl ${st.bgColor} border flex items-center justify-center ${st.color}`}>
                    <Icon className="size-6" />
                  </div>

                  <div className="space-y-1">
                    <span
                      id={st.id}
                      className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${st.color} font-mono`}
                    >
                      {st.prefix}0{st.suffix}
                    </span>
                    <p className="text-sm font-bold text-foreground">{st.label}</p>
                    <p className="text-[11px] text-muted-foreground">{st.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
