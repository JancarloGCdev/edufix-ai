"use client";

import React, { useState } from "react";
import { ReportItem, StatusType, REJECTION_REASON_LABELS, formatReportId } from "./mock-data";
import { ReportCard } from "./report-card";
import { useDashboard } from "./dashboard-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { AlertTriangle, MapPin, Calendar, Tag, Heart, Sparkles } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

export const MyReportsSection: React.FC = () => {
  const { reports, upvoteReport, upvotedIds } = useDashboard();
  const [filter, setFilter] = useState<"all" | StatusType>("all");
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const filteredReports = reports.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <section aria-label="Lista de mis reportes" className="space-y-4">
      <div className="flex items-center justify-between px-1 flex-wrap gap-2">
        <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center gap-2">
          Mis Reportes
          <span className="text-xs font-bold text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full border border-border/60">
            {reports.length}
          </span>
        </h2>

        {/* Filtros rápidos estilo pill */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border/50 text-xs overflow-x-auto max-w-full">
          {(["all", "pending", "in_review", "resolved", "rejected"] as const).map((f) => {
            const labels = {
              all: "Todos",
              pending: "Pendientes",
              in_review: "En revisión",
              resolved: "Resueltos",
              rejected: "Rechazados",
            };
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg transition-all font-bold whitespace-nowrap ${filter === f
                    ? "bg-background text-foreground shadow-xs ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {labels[f]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredReports.map((report, idx) => (
          <ReportCard
            key={report.id}
            report={report}
            index={idx}
            isUpvoted={upvotedIds.has(report.id)}
            onUpvote={upvoteReport}
            onOpenDetails={setSelectedReport}
          />
        ))}

        {filteredReports.length === 0 && (
          <div className="col-span-full p-10 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 space-y-2">
            <p className="text-base font-bold text-foreground">No hay reportes en este estado</p>
            <p className="text-xs text-muted-foreground">Usa el botón flotante principal para registrar un problema en la institución.</p>
          </div>
        )}
      </div>

      {/* Modal de Detalle Completo del Reporte */}
      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-0 overflow-hidden shadow-2xl">
          {selectedReport && (
            <div className="flex flex-col max-h-[85vh] overflow-y-auto">
              <div className="relative w-full h-56 bg-black">
                {selectedReport.imageUrl && (
                  <img
                    src={selectedReport.imageUrl}
                    alt={selectedReport.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                      {formatReportId(selectedReport.id)}
                    </span>
                    <Badge variant="secondary" className="text-[10px] font-bold">
                      {selectedReport.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-black leading-tight truncate">
                    {selectedReport.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-2xl bg-muted/60 space-y-0.5">
                    <span className="text-muted-foreground text-[10px] flex items-center gap-1 font-medium">
                      <MapPin className="size-3 text-primary" /> Ubicación
                    </span>
                    <span className="font-bold text-foreground truncate block">{selectedReport.location}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-muted/60 space-y-0.5">
                    <span className="text-muted-foreground text-[10px] flex items-center gap-1 font-medium">
                      <Calendar className="size-3 text-primary" /> Fecha
                    </span>
                    <span className="font-bold text-foreground truncate block">{selectedReport.createdAt}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-foreground">Descripción detallada</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedReport.description}
                  </p>
                </div>

                {selectedReport.status === "rejected" && (
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <AlertTriangle className="size-4 shrink-0" />
                      <span>Motivo del Rechazo por Moderación</span>
                    </div>
                    <p className="font-bold">
                      {selectedReport.rejectionReason
                        ? (REJECTION_REASON_LABELS as Record<string, string>)[selectedReport.rejectionReason] || "Rechazado por moderación"
                        : "Rechazado por moderación"}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedReport.rejectionNotes ||
                        "El reporte ha sido rechazado porque la imagen adjuntada no coincide con las instalaciones de la Institución Educativa GABO o fue categorizada como contenido inapropiado."}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <div className="flex items-center gap-1 text-xs text-primary font-bold">
                    <Heart className="size-4 fill-primary" />
                    <span>{selectedReport.upvotesCount} apoyos de la comunidad</span>
                  </div>
                  <Button
                    onClick={() => setSelectedReport(null)}
                    className="rounded-xl text-xs font-bold bg-primary text-primary-foreground px-4"
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

function selectedRejectedReason(reason: string): any {
  return reason;
}
