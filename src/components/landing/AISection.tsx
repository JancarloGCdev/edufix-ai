"use client";

import React from "react";
import {
  Bot,
  CopyX,
  ScanSearch,
  Zap,
  ShieldAlert,
  Lock,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

const aiFeatures = [
  {
    title: "Detecta Duplicados",
    description: "Compara imágenes y ubicaciones en milisegundos para unir solicitudes idénticas y evitar saturar a coordinación.",
    icon: CopyX,
    color: "from-blue-500/15 to-indigo-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  },
  {
    title: "Analiza Imágenes en Tiempo Real",
    description: "Reconoce el objeto dañado en la fotografía y sugiere la categoría (Tecnología, Infraestructura, Plomería, etc.).",
    icon: ScanSearch,
    color: "from-purple-500/15 to-pink-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  },
  {
    title: "Prioriza Incidencias",
    description: "Calcula un puntaje de riesgo e impacto para colocar las emergencias físicas (fugas, cortocircuitos) arriba en la cola.",
    icon: Zap,
    color: "from-amber-500/15 to-orange-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  {
    title: "Evita Spam y Fotos Ilegibles",
    description: "Filtra automáticamente imágenes borrosas, desenfocadas o no relacionadas con el entorno de la institución.",
    icon: ShieldAlert,
    color: "from-emerald-500/15 to-teal-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  },
  {
    title: "Detecta Contenido Inapropiado",
    description: "Moderación proactiva de seguridad que descarta contenido fuera del marco institucional o inapropiado.",
    icon: Lock,
    color: "from-rose-500/15 to-red-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
  },
] as const;

export function AISection() {
  return (
    <section
      id="ia"
      data-gsap="ai-section"
      className="relative border-b border-border/60 bg-dot-pattern py-16 sm:py-24 overflow-hidden"
    >
      {/* Luz Difusa de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header de Sección */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 backdrop-blur-md">
            <Bot className="size-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Inteligencia Artificial Proactiva
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Potenciado por Visión Computacional e{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              IA Asistida
            </span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            EduFix AI procesa cada imagen cargada para moderar, prevenir duplicados y ayudar al colegio a tomar decisiones informadas.
          </p>
        </div>

        {/* Grid de Tarjetas de IA */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <Card
                key={feat.title}
                data-gsap="card"
                className={`group relative rounded-3xl border border-border/80 bg-card/85 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 ${
                  idx === 0 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <CardContent className="p-0 space-y-4">
                  <div className={`size-12 rounded-2xl bg-gradient-to-br ${feat.color} border flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <Icon className="size-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>{feat.title}</span>
                      <Sparkles className="size-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
