"use client";

import React from "react";
import { Camera, Bot, ShieldCheck, Wrench, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Tomar Fotografía",
    description: "El estudiante o profesor captura la falla física desde la cámara de su celular en menos de 10 segundos.",
    icon: Camera,
    color: "from-blue-500/20 to-sky-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    badgeBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    step: "02",
    title: "EduFix AI Analiza",
    description: "La IA escanea la foto, sugiere la categoría, verifica la autenticidad y comprueba si ya fue reportado previamente.",
    icon: Bot,
    color: "from-indigo-500/20 to-purple-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    badgeBg: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    step: "03",
    title: "Coordinación Revisa",
    description: "El coordinador evalúa la solicitud, valida la ubicación institucional y asigna la tarea al técnico correspondiente.",
    icon: ShieldCheck,
    color: "from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30",
    badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    step: "04",
    title: "Mantenimiento Resuelve",
    description: "El técnico repara el problema, sube la foto evidencia del trabajo completado y notifica en vivo a toda la comunidad.",
    icon: Wrench,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      data-gsap="how-it-works"
      className="relative border-b border-border/60 bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de Sección */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            🚀 Proceso Institucional Simplificado
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            ¿Cómo funciona <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EduFix AI</span>?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Un flujo inteligente de 4 pasos diseñado para eliminar el papeleo, evitar reportes duplicados y resolver incidencias en tiempo récord.
          </p>
        </div>

        {/* Grid de 4 Pasos con Conectores Visuales */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.step}
                data-gsap="card"
                className="group relative rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Fila superior: Ícono + Número de paso */}
                  <div className="flex items-center justify-between">
                    <div className={`size-14 rounded-2xl bg-gradient-to-br ${item.color} border flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}>
                      <Icon className="size-7" aria-hidden />
                    </div>
                    <span className="font-mono text-2xl font-black text-muted-foreground/40 group-hover:text-primary transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Título y Descripción */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Badge inferior de estado */}
                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeBg}`}>
                    Paso {idx + 1} de 4
                  </span>
                  {idx < 3 && (
                    <ArrowRight className="size-4 text-muted-foreground/40 hidden lg:block" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
