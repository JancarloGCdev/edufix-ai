"use client";

import React, { useState } from "react";
import {
  HeaderSection,
  SummarySection,
  BottomNavigation,
  DashboardProvider,
  useDashboardAnimations,
  useDashboard,
  ReportCard,
} from "@/src/components/dashboard";
import { ReportItem } from "./mock-data";
import { TeacherReportDetailModal } from "./teacher-report-detail-modal";
import { ShieldCheck, AlertCircle, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import type { AuthUser } from "@/src/services/auth/session";

interface TeacherDashboardViewProps {
  user: AuthUser;
}

const TeacherDashboardContent: React.FC<TeacherDashboardViewProps> = ({ user }) => {
  const { containerRef } = useDashboardAnimations();
  const { reports, upvoteReport, upvotedIds } = useDashboard();
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  // Filtrar reportes prioritarios (con alto puntaje de IA o más apoyos)
  const priorityReports = reports.filter(
    (r) => r.isPriority || r.upvotesCount >= 10 || (r.aiAnalysis?.impactPriorityScore || 0) >= 8
  );

  // Últimos reportes ordenados
  const recentReports = reports;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground pb-28 md:pb-12 pt-3 px-3.5 sm:px-6 md:px-8 max-w-4xl mx-auto space-y-6 antialiased"
    >
      {/* Top Banner de Docente / Coordinador */}
      <div className="dash-fade flex items-center justify-between px-1">
        <Badge variant="outline" className="gap-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 text-[10px] font-bold">
          <ShieldCheck className="size-3" />
          Panel de Docentes y Coordinación GABO
        </Badge>
        <span className="text-xs text-muted-foreground font-semibold">
          Gestión de Incidencias v1.0
        </span>
      </div>

      {/* 1. Header con datos reales de la sesión del profesor y foto de Google */}
      <HeaderSection user={user} />

      {/* 2. Resumen con indicadores dinámicos (Pendientes, En revisión, Resueltos, Rechazados) */}
      <SummarySection />

      {/* 3. SECCIÓN: Reportes Prioritarios (Muestra reportes urgentes o más votados) */}
      <section aria-label="Reportes prioritarios" className="space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center gap-2">
            <AlertCircle className="size-5 text-rose-500" />
            Reportes Prioritarios
          </h2>
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full">
            {priorityReports.length} atención requerida
          </span>
        </div>

        {/* Carrusel horizontal o grid según pantalla */}
        <div className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 px-1 snap-x snap-mandatory scrollbar-none max-w-full">
          {priorityReports.map((report, idx) => (
            <div
              key={report.id}
              className="w-[82vw] sm:w-[320px] shrink-0 snap-align-start flex flex-col"
            >
              <ReportCard
                report={report}
                index={idx}
                isUpvoted={upvotedIds.has(report.id)}
                onUpvote={upvoteReport}
                onOpenDetails={setSelectedReport}
                className="h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECCIÓN: Últimos Reportes */}
      <section aria-label="Últimos reportes registrados" className="space-y-4 pt-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center gap-2">
            <Clock className="size-5 text-primary" />
            Últimos Reportes
          </h2>
          <span className="text-xs font-semibold text-muted-foreground">
            Total {recentReports.length} incidencias
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentReports.map((report, idx) => (
            <ReportCard
              key={report.id}
              report={report}
              index={idx}
              isUpvoted={upvotedIds.has(report.id)}
              onUpvote={upvoteReport}
              onOpenDetails={setSelectedReport}
            />
          ))}
        </div>
      </section>

      {/* MODAL DE GESTIÓN Y DETALLE PARA PROFESORES */}
      <TeacherReportDetailModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
        teacherName={user.name || "Profesor / Coordinador GABO"}
      />

      {/* BARRA MÓVIL INFERIOR */}
      <BottomNavigation />
    </div>
  );
};

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ user }) => {
  return (
    <DashboardProvider user={user}>
      <TeacherDashboardContent user={user} />
    </DashboardProvider>
  );
};
