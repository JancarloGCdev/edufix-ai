"use client";

import React from "react";
import {
  Zap,
  Bot,
  Activity,
  Camera,
  Users,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/src/components/ui/card";

const benefits = [
  {
    title: "Tiempo de Respuesta Acelerado",
    description: "Reduce el ciclo de atención de días a pocas horas gracias al filtrado proactivo y priorización instantánea.",
    icon: Zap,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconColor: "text-amber-500",
  },
  {
    title: "IA Integrada Asistida",
    description: "Clasificación inteligente de categorías y prevención automatizada de reportes repetidos.",
    icon: Bot,
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    iconColor: "text-blue-500",
  },
  {
    title: "Seguimiento en Tiempo Real",
    description: "Sincronización WebSocket continua vía Supabase. Todos los cambios de estado se ven sin recargar la página.",
    icon: Activity,
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
    iconColor: "text-purple-500",
  },
  {
    title: "Evidencia Fotográfica de Solución",
    description: "Transparencia institucional completa: el técnico adjunta la imagen del arreglo terminado antes de cerrar la incidencia.",
    icon: Camera,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconColor: "text-emerald-500",
  },
  {
    title: "Participación Estudiantil Activa",
    description: "Empodera a la comunidad de la IE GABO a colaborar en el cuidado y valoración del espacio físico escolar.",
    icon: Users,
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    iconColor: "text-sky-500",
  },
  {
    title: "Gestión de Mantenimiento Eficiente",
    description: "El personal técnico cuenta con un panel limpio de asignaciones directas, notas y lista de tareas por resolver.",
    icon: Wrench,
    gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
    iconColor: "text-indigo-500",
  },
] as const;

export function Benefits() {
  return (
    <section
      id="beneficios"
      data-gsap="benefits"
      className="relative border-b border-border/60 bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            🌟 Impacto en la Comunidad
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
            Beneficios Institucionales de{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              EduFix AI
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Diseñado para mejorar la convivencia y calidad de la infraestructura en la Institución Educativa Gabriel García Márquez.
          </p>
        </div>

        {/* Grid de 6 Beneficios Grandes */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                data-gsap="card"
                className="group relative rounded-3xl border border-border/80 bg-card/90 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 overflow-hidden"
              >
                {/* Degradado tenue de fondo al hacer hover */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <CardContent className="relative p-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`size-12 rounded-2xl bg-muted/80 border flex items-center justify-center ${item.iconColor} transition-transform group-hover:scale-110`}>
                      <Icon className="size-6" />
                    </div>
                    <CheckCircle2 className="size-5 text-emerald-500/40 group-hover:text-emerald-500 transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.description}
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
