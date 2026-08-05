"use client";

import React from "react";
import {
  HeaderSection,
  SummarySection,
  ActionReportButton,
  MyReportsSection,
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
      className="min-h-screen bg-background text-foreground pb-28 md:pb-12 pt-3 px-3.5 sm:px-6 md:px-8 max-w-4xl mx-auto space-y-5 sm:space-y-6 antialiased"
    >
      {/* Top Status Banner */}
      <div className="dash-fade flex items-center justify-between px-1">
        <Badge variant="outline" className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
          <ShieldCheck className="size-3" />
          IE GABO — Portal de Incidencias
        </Badge>
        <span className="text-xs text-muted-foreground font-semibold">
          EduFix AI v1.0
        </span>
      </div>

      {/* 1. HEADER: Datos reales de Auth.js, saludo dinámico por hora y foto con menú */}
      <HeaderSection user={user} />

      {/* 3. BOTÓN PRINCIPAL: CTA Flotante destacado para reportar */}
      <ActionReportButton />

      {/* 2. RESUMEN: Indicadores dinámicos (Pendientes, En revisión, Resueltos, Rechazados) */}
      <SummarySection />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
        {/* 4. MIS REPORTES: Cards modernas tipo Tinder/Airbnb con fotos y estado de rechazo */}
        <div className="md:col-span-2">
          <MyReportsSection />
        </div>

        {/* 5. PROBLEMAS POPULARES E IA */}
        <div className="space-y-4">
          <PopularReportsSection />

          {/* Arquitectura de IA Integrada */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 space-y-2">
            <div className="flex items-center gap-2 text-primary font-black text-xs uppercase">
              <Sparkles className="size-4" />
              <span>EduFix AI Core & Safety</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sistema preparado para detección automática de fotos no institucionales, spam, duplicados, borrosidad y priorización de impacto.
            </p>
          </div>
        </div>
      </div>

      {/* BARRA MÓVIL INFERIOR */}
      <BottomNavigation />
    </div>
  );
};

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ user }) => {
  return (
    <DashboardProvider>
      <StudentDashboardContent user={user} />
    </DashboardProvider>
  );
};
