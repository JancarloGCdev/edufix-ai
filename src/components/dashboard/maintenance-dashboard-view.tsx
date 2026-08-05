"use client";

import React, { useState, useRef } from "react";
import {
  HeaderSection,
  SummarySection,
  BottomNavigation,
  DashboardProvider,
  useDashboardAnimations,
  useDashboard,
  ReportCard,
} from "@/src/components/dashboard";
import { ReportItem, StatusType } from "./mock-data";
import { ShieldCheck, Wrench, Clock, CheckCircle2, RotateCcw, Camera, Upload } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import type { AuthUser } from "@/src/services/auth/session";

interface MaintenanceDashboardViewProps {
  user: AuthUser;
}

const MaintenanceDashboardContent: React.FC<MaintenanceDashboardViewProps> = ({ user }) => {
  const { containerRef } = useDashboardAnimations();
  const { reports, updateReportStatus, upvoteReport, upvotedIds } = useDashboard();
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  // Formulario de reparación técnica
  const [targetStatus, setTargetStatus] = useState<"in_repair" | "resolved">("in_repair");
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [resolutionFile, setResolutionFile] = useState<File | null>(null);
  const [resolutionPreviewUrl, setResolutionPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reportes asignados a la cuadrilla de mantenimiento técnico (Asignados, En proceso, Terminados)
  const assignedReports = reports.filter((r) => {
    const isAssigned = !!r.assignedTo;
    const isInRepair = r.status === "in_repair";
    const isResolved = r.status === "resolved";

    return isAssigned || isInRepair || isResolved;
  });

  const handleOpenMaintenanceModal = (report: ReportItem, status: "in_repair" | "resolved") => {
    setSelectedReport(report);
    setTargetStatus(status);
    setResolutionNotes(report.resolutionNotes || "");
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResolutionFile(file);
    setResolutionPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmitMaintenanceAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    setIsSubmitting(true);

    await updateReportStatus(selectedReport.id, targetStatus, {
      resolutionNotes,
      resolutionFile: resolutionFile || undefined,
      actorName: user.name || selectedReport.assignedTo || "Técnico Mantenimiento GABO",
    });

    setIsSubmitting(false);
    setSelectedReport(null);
    if (resolutionPreviewUrl) URL.revokeObjectURL(resolutionPreviewUrl);
    setResolutionPreviewUrl(null);
    setResolutionFile(null);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground pb-28 md:pb-12 pt-3 px-3.5 sm:px-6 md:px-8 max-w-4xl mx-auto space-y-6 antialiased"
    >
      {/* Top Banner Mantenimiento */}
      <div className="dash-fade flex items-center justify-between px-1">
        <Badge variant="outline" className="gap-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30 text-[10px] font-bold">
          <ShieldCheck className="size-3" />
          Panel de Mantenimiento Técnico e Infraestructura
        </Badge>
        <span className="text-xs text-muted-foreground font-semibold">
          IE GABO Ops
        </span>
      </div>

      <HeaderSection user={user} />

      <SummarySection />

      {/* Reportes Asignados */}
      <section aria-label="Reportes asignados a mantenimiento" className="space-y-4 pt-1">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center gap-2">
            <Wrench className="size-5 text-purple-600 dark:text-purple-400" />
            Mis Asignaciones de Trabajo
          </h2>
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full">
            {assignedReports.length} tareas asignadas
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assignedReports.map((report, idx) => (
            <div key={report.id} className="flex flex-col space-y-2">
              <ReportCard
                report={report}
                index={idx}
                isUpvoted={upvotedIds.has(report.id)}
                onUpvote={upvoteReport}
                onOpenDetails={() => handleOpenMaintenanceModal(report, "in_repair")}
              />

              {/* Botones Rápidos de Mantenimiento Técnico */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleOpenMaintenanceModal(report, "in_repair")}
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs font-bold border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10 gap-1"
                >
                  <Wrench className="size-3.5" />
                  En reparación
                </Button>

                <Button
                  onClick={() => handleOpenMaintenanceModal(report, "resolved")}
                  className="rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                >
                  <CheckCircle2 className="size-3.5" />
                  Marcar Resuelto
                </Button>
              </div>
            </div>
          ))}

          {assignedReports.length === 0 && (
            <div className="col-span-full p-10 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 space-y-2">
              <p className="text-base font-bold text-foreground">No tienes reparaciones pendientes</p>
              <p className="text-xs text-muted-foreground">Las incidencias asignadas por el coordinador aparecerán aquí automáticamente en tiempo real.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Acción de Mantenimiento */}
      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-6 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-xs tracking-wider uppercase mb-1">
              <Wrench className="size-4" />
              <span>Gestión Técnica de Incidencia</span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              {selectedReport?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Actualiza el progreso técnico de la reparación en la IE GABO.
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <form onSubmit={handleSubmitMaintenanceAction} className="space-y-4 py-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Seleccionar nuevo estado</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetStatus("in_repair")}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      targetStatus === "in_repair"
                        ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                        : "bg-background border-border text-foreground"
                    }`}
                  >
                    🟣 En reparación
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetStatus("resolved")}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                      targetStatus === "resolved"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-background border-border text-foreground"
                    }`}
                  >
                    🟢 Resuelto
                  </button>
                </div>
              </div>

              {/* Selector de Imagen de Solución */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  Fotografía de la reparación (Requerida al marcar Resuelto)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 rounded-2xl border-2 border-dashed border-border hover:border-purple-500/50 bg-muted/40 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition-colors"
                >
                  {resolutionPreviewUrl ? (
                    <>
                      <img
                        src={resolutionPreviewUrl}
                        alt="Solución"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-lg flex items-center gap-1 font-semibold">
                        <RotateCcw className="size-3" /> Cambiar foto
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                      <Camera className="size-8 text-purple-500" />
                      <span className="text-xs font-bold text-foreground">Tomar foto o subir evidencia</span>
                      <span className="text-[10px]">Demuestra el trabajo técnico realizado</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Comentario técnico de trabajo</label>
                <Textarea
                  placeholder="Escribe detalles del arreglo efectuado..."
                  value={resolutionNotes}
                  onChange={(e) => setResolutionNotes(e.target.value)}
                  rows={3}
                  className="rounded-xl text-xs resize-none"
                />
              </div>

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedReport(null)}
                  className="rounded-xl text-xs"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  {isSubmitting ? "Guardando..." : "Actualizar Estado"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export const MaintenanceDashboardView: React.FC<MaintenanceDashboardViewProps> = ({ user }) => {
  return (
    <DashboardProvider user={user}>
      <MaintenanceDashboardContent user={user} />
    </DashboardProvider>
  );
};
