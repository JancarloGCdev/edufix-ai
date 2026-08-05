"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Card } from "@/src/components/ui/card";
import { GraduationCap, UserCheck, Wrench, Shield, Sparkles, ArrowRight, School } from "lucide-react";
import type { AuthUser } from "@/src/services/auth/session";

interface DemoRoleSelectorProps {
  user: AuthUser;
  onSelectRole: (role: "STUDENT" | "TEACHER" | "MAINTENANCE" | "ADMIN") => void;
}

export const DemoRoleSelector: React.FC<DemoRoleSelectorProps> = ({
  user,
  onSelectRole,
}) => {
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6 antialiased">
      <div className="w-full max-w-lg space-y-6">
        {/* Banner de Modo Demostración */}
        <div className="flex items-center justify-between px-1">
          <Badge
            variant="outline"
            className="gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs font-bold px-3 py-1"
          >
            <Sparkles className="size-3.5 text-amber-500 animate-spin" />
            <span>Modo Demostración / Presentación</span>
          </Badge>
          <span className="text-xs font-mono font-semibold text-muted-foreground">
            IE GABO
          </span>
        </div>

        {/* Card Principal */}
        <Card className="rounded-3xl border border-border/80 shadow-2xl bg-card p-6 sm:p-8 space-y-6">
          {/* Info del usuario autenticado real */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border/60">
            <Avatar size="lg" className="h-14 w-14 ring-2 ring-primary/20 shrink-0">
              <AvatarImage src={user.image || undefined} alt={user.name || "Usuario"} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1 space-y-0.5">
              <h3 className="font-extrabold text-base text-foreground truncate">
                {user.name || "Usuario Autenticado"}
              </h3>
              <p className="text-xs font-mono text-muted-foreground truncate">
                {user.email}
              </p>
              <p className="text-[11px] font-medium text-primary flex items-center gap-1">
                <School className="size-3 shrink-0" />
                Institución Educativa GABO
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              Selecciona el Perfil para la Demo
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Elige cómo deseas experimentar el Dashboard de EduFix AI durante esta presentación.
            </p>
          </div>

          {/* Opciones de Selección de Rol */}
          <div className="grid grid-cols-1 gap-3.5 pt-1">
            {/* Opción ESTUDIANTE / FEED COMUNITARIO */}
            <button
              onClick={() => onSelectRole("STUDENT")}
              className="group relative p-4 rounded-2xl border-2 border-border hover:border-primary/60 bg-card hover:bg-primary/5 transition-all text-left flex items-center justify-between gap-4 shadow-xs active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <UserCheck className="size-6" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-extrabold text-sm sm:text-base text-foreground block group-hover:text-primary transition-colors">
                    Estudiante / Feed Comunitario
                  </span>
                  <span className="text-xs text-muted-foreground block leading-tight">
                    Ver feed social en vivo, buscar por categorías, apoyar reportes y reportar con cámara.
                  </span>
                </div>
              </div>
              <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </button>

            {/* Opción PROFESOR / COORDINADOR */}
            <button
              onClick={() => onSelectRole("TEACHER")}
              className="group relative p-4 rounded-2xl border-2 border-border hover:border-blue-500/60 bg-card hover:bg-blue-500/5 transition-all text-left flex items-center justify-between gap-4 shadow-xs active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <GraduationCap className="size-6" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-extrabold text-sm sm:text-base text-foreground block group-hover:text-blue-600 transition-colors">
                    Coordinador / Profesor
                  </span>
                  <span className="text-xs text-muted-foreground block leading-tight">
                    Priorizar incidencias, asignar al equipo de mantenimiento y moderar rechazos.
                  </span>
                </div>
              </div>
              <ArrowRight className="size-5 text-muted-foreground group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
            </button>

            {/* Opción MANTENIMIENTO TÉCNICO */}
            <button
              onClick={() => onSelectRole("MAINTENANCE")}
              className="group relative p-4 rounded-2xl border-2 border-border hover:border-purple-500/60 bg-card hover:bg-purple-500/5 transition-all text-left flex items-center justify-between gap-4 shadow-xs active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Wrench className="size-6" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-extrabold text-sm sm:text-base text-foreground block group-hover:text-purple-600 transition-colors">
                    Equipo de Mantenimiento
                  </span>
                  <span className="text-xs text-muted-foreground block leading-tight">
                    Ver asignadas, cambiar a "En reparación", subir foto de solución y resolver.
                  </span>
                </div>
              </div>
              <ArrowRight className="size-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all shrink-0" />
            </button>

            {/* Opción ADMINISTRADOR DEL SISTEMA */}
            <button
              onClick={() => onSelectRole("ADMIN")}
              className="group relative p-4 rounded-2xl border-2 border-border hover:border-rose-500/60 bg-card hover:bg-rose-500/5 transition-all text-left flex items-center justify-between gap-4 shadow-xs active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                <div className="size-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Shield className="size-6" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-extrabold text-sm sm:text-base text-foreground block group-hover:text-rose-600 transition-colors">
                    Administrador del Sistema
                  </span>
                  <span className="text-xs text-muted-foreground block leading-tight">
                    Gestión de usuarios, métricas globales del colegio, edición de roles y auditoría.
                  </span>
                </div>
              </div>
              <ArrowRight className="size-5 text-muted-foreground group-hover:text-rose-600 group-hover:translate-x-1 transition-all shrink-0" />
            </button>
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-muted-foreground italic">
              * Esta pantalla es temporal para fines de demostración y puede ser removida en producción.
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};
