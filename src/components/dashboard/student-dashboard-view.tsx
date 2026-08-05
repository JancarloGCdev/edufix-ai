"use client";

import React from "react";
import {
  HeaderSection,
  SummarySection,
  ActionReportButton,
  PublicSocialFeed,
  PopularReportsSection,
  BottomNavigation,
  DashboardProvider,
  useDashboardAnimations,
} from "@/src/components/dashboard";
import { Sparkles, ShieldCheck } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import type { AuthUser } from "@/src/services/auth/session";

interface StudentDashboardViewProps {
  user: AuthUser;
}

const StudentDashboardContent: React.FC<StudentDashboardViewProps> = ({ user }) => {
  const { containerRef } = useDashboardAnimations();

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground pb-28 md:pb-12 pt-3 px-3.5 sm:px-6 md:px-8 max-w-4xl mx-auto space-y-6 antialiased"
    >
      {/* Top Status Banner */}
      <div className="dash-fade flex items-center justify-between px-1">
        <Badge variant="outline" className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
          <ShieldCheck className="size-3" />
          IE GABO — Red Social de Incidencias
        </Badge>
        <span className="text-xs text-muted-foreground font-semibold">
          EduFix Social v1.0
        </span>
      </div>

      {/* 1. HEADER: Datos reales de Auth.js y menú de perfil */}
      <HeaderSection user={user} />

      {/* 2. BOTÓN PRINCIPAL: Disparo directo a cámara y flujo de IA */}
      <ActionReportButton />

      {/* 3. RESUMEN: Indicadores dinámicos animados (Pendientes, En revisión, En reparación, Resueltos, Rechazados) */}
      <SummarySection />

      {/* 4. SECCIÓN PROBLEMAS POPULARES: Carrusel Horizontal Móvil */}
      <PopularReportsSection />

      {/* 5. FEED SOCIAL PÚBLICO: Todos los reportes de la comunidad con búsqueda, categorías e interacción en tiempo real */}
      <div className="pt-2">
        <PublicSocialFeed />
      </div>

      {/* BARRA MÓVIL INFERIOR */}
      <BottomNavigation />
    </div>
  );
};

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ user }) => {
  return (
    <DashboardProvider user={user}>
      <StudentDashboardContent user={user} />
    </DashboardProvider>
  );
};
