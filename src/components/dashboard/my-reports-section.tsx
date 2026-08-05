"use client";

import React, { useState } from "react";
import { ReportItem, StatusType, REJECTION_REASON_LABELS } from "./mock-data";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  MapPin,
  Sparkles,
  ThumbsUp,
  AlertTriangle,
  Info,
  ShieldCheck,
  Eye,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { useDashboard } from "./dashboard-context";

export const MyReportsSection: React.FC = () => {
  const { reports, upvoteReport, upvotedIds } = useDashboard();
  const [filter, setFilter] = useState<"all" | StatusType>("all");
  const [selectedRejectedReport, setSelectedRejectedReport] = useState<ReportItem | null>(null);

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs font-bold px-2.5 py-0.5">
            <Clock className="size-3.5" />
            🟡 Pendiente
          </Badge>
        );
      case "in_review":
        return (
          <Badge variant="outline" className="gap-1 bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 text-xs font-bold px-2.5 py-0.5">
            <Loader2 className="size-3.5 animate-spin" />
            🔵 En revisión
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="gap-1 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs font-bold px-2.5 py-0.5">
            <CheckCircle2 className="size-3.5" />
            🟢 Resuelto
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="gap-1 bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 text-xs font-bold px-2.5 py-0.5">
            <XCircle className="size-3.5" />
            🔴 Rechazado
          </Badge>
        );
    }
  };

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

        {/* Filtros rápidos con estética pill */}
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
                className={`px-3 py-1 rounded-lg transition-all font-bold whitespace-nowrap ${
                  filter === f
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

      <div className="space-y-4">
        {filteredReports.map((report) => {
          const isUpvoted = upvotedIds.has(report.id);

          return (
            <Card
              key={report.id}
              className="dash-card group relative overflow-hidden transition-all duration-300 hover:shadow-xl border border-border/70 bg-card rounded-3xl"
            >
              <CardContent className="p-0 flex flex-col">
                {/* Foto grande ocupando la mayor parte de la card (estilo Airbnb / Tinder) */}
                <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-muted">
                  {report.imageUrl ? (
                    <img
                      src={report.imageUrl}
                      alt={report.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50">
                      Sin Fotografía
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges superiores sobre la imagen */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                        {report.id}
                      </span>
                      <Badge variant="secondary" className="text-xs font-bold bg-white/90 text-black backdrop-blur-md border-none px-2.5 py-0.5">
                        {report.category}
                      </Badge>
                    </div>
                    <div>{getStatusBadge(report.status)}</div>
                  </div>

                  {/* Info inferior sobre la imagen */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                      <MapPin className="size-3.5 text-primary shrink-0" />
                      <span>{report.location}</span>
                      <span>•</span>
                      <span>{report.createdAt}</span>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold leading-tight drop-shadow-sm truncate">
                      {report.title}
                    </h3>
                  </div>
                </div>

                {/* Contenido inferior de la card */}
                <div className="p-4 sm:p-5 space-y-3">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {report.description}
                  </p>

                  {/* Si está rechazado, mostrar alerta y botón "Ver detalles" */}
                  {report.status === "rejected" && (
                    <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                          <AlertTriangle className="size-4 shrink-0" />
                          <span>Reporte Rechazado por Moderación</span>
                        </div>
                        <Button
                          onClick={() => setSelectedRejectedReport(report)}
                          variant="ghost"
                          size="xs"
                          className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-500/20 gap-1 rounded-lg"
                        >
                          <Info className="size-3.5" />
                          Ver detalles
                        </Button>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        Motivo: {report.rejectionReason ? REJECTION_REASON_LABELS[report.rejectionReason] : "No cumple con las normativas"}
                      </p>
                    </div>
                  )}

                  {/* Acciones e IA Duplicados */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                    {report.aiDuplicateCount && report.aiDuplicateCount > 0 ? (
                      <span className="flex items-center gap-1.5 text-primary font-bold text-[11px] bg-primary/10 px-2.5 py-1 rounded-xl">
                        <Sparkles className="size-3.5" />
                        {report.aiDuplicateCount} reportes similares
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-muted-foreground text-[11px]">
                        <ShieldCheck className="size-3.5 text-emerald-500" />
                        Validación IA limpia
                      </span>
                    )}

                    <Button
                      onClick={() => upvoteReport(report.id)}
                      variant={isUpvoted ? "default" : "outline"}
                      size="sm"
                      className={`gap-1.5 rounded-xl text-xs font-bold transition-all ${
                        isUpvoted ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-primary/10"
                      }`}
                    >
                      <ThumbsUp className="size-3.5" />
                      <span>{report.upvotesCount} apoyos</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredReports.length === 0 && (
          <div className="p-10 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 space-y-2">
            <p className="text-base font-bold text-foreground">No hay reportes en este estado</p>
            <p className="text-xs text-muted-foreground">Usa el botón flotante principal para registrar un problema en la institución.</p>
          </div>
        )}
      </div>

      {/* Modal de detalles de rechazo */}
      <Dialog
        open={!!selectedRejectedReport}
        onOpenChange={(open) => !open && setSelectedRejectedReport(null)}
      >
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-6 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs tracking-wider uppercase mb-1">
              <AlertTriangle className="size-4" />
              <span>Detalles del Rechazo</span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              {selectedRejectedReport?.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Explicación del sistema de moderación de la IE GABO.
            </DialogDescription>
          </DialogHeader>

          {selectedRejectedReport && (
            <div className="py-3 space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 space-y-1">
                <p className="font-bold text-sm">
                  {selectedRejectedReport.rejectionReason
                    ? REJECTION_REASON_LABELS[selectedRejectedReport.rejectionReason]
                    : "No institucional"}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedRejectedReport.rejectionNotes ||
                    "El reporte ha sido rechazado porque la imagen adjuntada no coincide con las instalaciones de la Institución Educativa GABO o fue categorizada como spam por la IA."}
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-muted/60 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Código de Reporte:</span>
                  <span className="font-mono font-bold text-foreground">{selectedRejectedReport.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ubicación registrada:</span>
                  <span className="font-medium text-foreground">{selectedRejectedReport.location}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => setSelectedRejectedReport(null)}
              className="w-full rounded-xl bg-primary text-primary-foreground text-xs font-bold"
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
