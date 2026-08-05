"use client";

import React from "react";
import { Wrench, Sparkles, Code2, Heart } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

export function Footer() {
  return (
    <footer id="contacto" data-gsap="footer" className="bg-card border-t border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Columna 1: Branding EduFix AI */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
                <Wrench className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-foreground">
                  EduFix <span className="text-primary font-mono">AI</span>
                </span>
                <span className="text-xs text-muted-foreground font-semibold">
                  Plataforma Inteligente de Gestión Escolar
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm">
              Solución web móvil moderna para la notificación, seguimiento y reparación en tiempo real de incidencias de infraestructura en la **Institución Educativa Gabriel García Márquez (IE GABO)**.
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                Next.js 16
              </Badge>
              <Badge variant="outline" className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30">
                Supabase Realtime
              </Badge>
              <Badge variant="outline" className="text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30">
                Prisma ORM
              </Badge>
              <Badge variant="outline" className="text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30">
                GSAP
              </Badge>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-foreground">Navegación</h4>
            <ul className="space-y-2 text-xs font-semibold text-muted-foreground">
              <li>
                <a href="#inicio" className="hover:text-primary transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-primary transition-colors">¿Cómo Funciona?</a>
              </li>
              <li>
                <a href="#ia" className="hover:text-primary transition-colors">Inteligencia Artificial</a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-primary transition-colors">Beneficios Institucionales</a>
              </li>
              <li>
                <a href="#estadisticas" className="hover:text-primary transition-colors">Métricas e Impacto</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Información e Integración */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-foreground">Institución y Repositorio</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Desarrollado para la comunidad escolar de la **IE GABO** con código limpio, arquitectura escalable y soporte Mobile-First.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/JancarloGCdev/edufix-ai"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/80 bg-muted/50 hover:bg-muted text-xs font-bold text-foreground transition-all"
              >
                <Code2 className="size-4 text-primary" />
                <span>GitHub Repo</span>
              </a>

              <span className="text-xs font-mono font-bold text-muted-foreground bg-muted px-2.5 py-1 rounded-lg border border-border/60">
                v1.0.0
              </span>
            </div>
          </div>

        </div>

        {/* Fila inferior de Copyright */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} EduFix AI — Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="size-3.5 text-rose-500 fill-current" /> para la comunidad de la <strong>IE GABO</strong>.
          </p>
        </div>

      </div>
    </footer>
  );
}
