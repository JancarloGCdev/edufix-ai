"use client";

import React, { useState, useRef } from "react";
import {
  ReportItem,
  StatusType,
  RejectionReasonType,
  REJECTION_REASON_LABELS,
  formatReportId,
} from "./mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Textarea } from "@/src/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import {
  MapPin,
  Calendar,
  Sparkles,
  Heart,
  User,
  History,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Loader2,
  XCircle,
  AlertTriangle,
  Camera,
  Upload,
  RotateCcw,
  Check,
} from "lucide-react";
import { useDashboard } from "./dashboard-context";
import { STATUS_CARD_STYLES } from "./report-card";

interface TeacherReportDetailModalProps {
  report: ReportItem | null;
  onClose: () => void;
  teacherName?: string;
}

export const TeacherReportDetailModal: React.FC<TeacherReportDetailModalProps> = ({
  report,
  onClose,
  teacherName = "Profesor / Coordinador GABO",
}) => {
  const { updateReportStatus } = useDashboard();

  // Estados de modales secundarios
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  // Formulario de Rechazo
  const [rejectionReason, setRejectionReason] =
    useState<RejectionReasonType>("non_institutional_image");
  const [rejectionNotes, setRejectionNotes] = useState("");

  // Formulario de Resolución
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [resolutionFile, setResolutionFile] = useState<File | null>(null);
  const [resolutionPreviewUrl, setResolutionPreviewUrl] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const resolveFileInputRef = useRef<HTMLInputElement>(null);

  if (!report) return null;

  const currentStatusConfig = STATUS_CARD_STYLES[report.status];

  // Cambio de estado directo (Pendiente / En revisión)
  const handleQuickStatusChange = async (newStatus: StatusType) => {
    if (newStatus === "rejected") {
      setIsRejectModalOpen(true);
      return;
    }
    if (newStatus === "resolved") {
      setIsResolveModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    await updateReportStatus(report.id, newStatus, { actorName: teacherName });
    setIsSubmitting(false);
  };

  // Confirmar Rechazo
  const handleConfirmRejection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateReportStatus(report.id, "rejected", {
      rejectionReason,
      rejectionNotes,
      actorName: teacherName,
    });
    setIsSubmitting(false);
    setIsRejectModalOpen(false);
  };

  // Confirmar Resolución con Foto de Mantenimiento
  const handleConfirmResolution = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateReportStatus(report.id, "resolved", {
      resolutionNotes,
      resolutionFile: resolutionFile || undefined,
      actorName: teacherName,
    });
    setIsSubmitting(false);
    setIsResolveModalOpen(false);
    if (resolutionPreviewUrl) URL.revokeObjectURL(resolutionPreviewUrl);
    setResolutionPreviewUrl(null);
    setResolutionFile(null);
  };

  const handleResolutionImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResolutionFile(file);
    setResolutionPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <>
      {/* Modal Principal de Detalle para Docentes / Coordinadores */}
      <Dialog open={!!report} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-xl rounded-3xl border-border bg-card p-0 overflow-hidden shadow-2xl">
          <div className="flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Imagen Principal Grande */}
            <div className="relative w-full h-60 sm:h-72 bg-black shrink-0">
              {report.imageUrl ? (
                <img
                  src={report.imageUrl}
                  alt={report.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Sin Fotografía
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Badges superiores en la imagen */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                    {formatReportId(report.id)}
                  </span>
                  <Badge variant="secondary" className="text-xs font-bold bg-white/90 text-black backdrop-blur-md">
                    {report.category}
                  </Badge>
                </div>

                <Badge
                  variant="outline"
                  className={`gap-1 ${currentStatusConfig.badgeBg} ${currentStatusConfig.badgeText} ${currentStatusConfig.badgeBorder} text-xs font-bold px-3 py-1 backdrop-blur-md`}
                >
                  <span>{currentStatusConfig.badgeLabel}</span>
                </Badge>
              </div>

              {/* Título y Ubicación superpuestos */}
              <div className="absolute bottom-3 left-4 right-4 text-white space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                  <MapPin className="size-3.5 text-primary shrink-0" />
                  <span>{report.location}</span>
                  <span>•</span>
                  <span>{report.createdAt}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-black leading-tight drop-shadow-sm truncate">
                  {report.title}
                </h2>
              </div>
            </div>

            {/* Contenido Modular */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* SECCIÓN 1: Selector de Estado del Docente */}
              <div className="p-4 rounded-2xl bg-muted/60 border border-border/80 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-foreground tracking-wider flex items-center gap-1.5">
                    <span>⚡ Gestión de Estado</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium">Docente / Coordinador</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleQuickStatusChange("pending")}
                    disabled={isSubmitting}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      report.status === "pending"
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "bg-background border-border text-foreground hover:bg-amber-500/10"
                    }`}
                  >
                    🟡 Pendiente
                  </button>

                  <button
                    onClick={() => handleQuickStatusChange("in_review")}
                    disabled={isSubmitting}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      report.status === "in_review"
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-background border-border text-foreground hover:bg-blue-500/10"
                    }`}
                  >
                    🔵 En revisión
                  </button>

                  <button
                    onClick={() => handleQuickStatusChange("resolved")}
                    disabled={isSubmitting}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      report.status === "resolved"
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-background border-border text-foreground hover:bg-emerald-500/10"
                    }`}
                  >
                    🟢 Resuelto
                  </button>

                  <button
                    onClick={() => handleQuickStatusChange("rejected")}
                    disabled={isSubmitting}
                    className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      report.status === "rejected"
                        ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                        : "bg-background border-border text-foreground hover:bg-rose-500/10"
                    }`}
                  >
                    🔴 Rechazado
                  </button>
                </div>
              </div>

              {/* SECCIÓN 2: Descripción y Datos del Reporte */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Descripción del problema
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {report.description}
                </p>
              </div>

              {/* SECCIÓN 3: Información del Estudiante que creó el reporte */}
              {report.student && (
                <div className="p-3.5 rounded-2xl bg-card border border-border/80 flex items-center gap-3">
                  <Avatar size="lg" className="h-11 w-11 ring-2 ring-primary/20 shrink-0">
                    <AvatarImage src={report.student.avatarUrl} alt={report.student.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                      {report.student.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-foreground truncate">
                        {report.student.name}
                      </h5>
                      <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0">
                        {report.student.grade}
                      </Badge>
                    </div>
                    <p className="text-[11px] font-mono text-muted-foreground truncate">
                      {report.student.email}
                    </p>
                  </div>
                </div>
              )}

              {/* SECCIÓN 4: Resultado del Análisis de IA (Simulado) */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-primary font-black text-xs uppercase flex items-center gap-1.5">
                    <Sparkles className="size-4" />
                    Análisis Integrado EduFix AI
                  </span>
                  <span className="text-[11px] font-bold text-primary">
                    Score: {report.aiAnalysis?.impactPriorityScore || 8}/10
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium pt-1">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="size-3.5" /> Imagen institucional
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="size-3.5" /> Nitidez adecuada
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    ⚡ Impacto: Prioridad alta
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    🔍 Duplicados: {report.aiDuplicateCount || 0} detectados
                  </span>
                </div>
              </div>

              {/* SECCIÓN 5: Fotografía de Reparación (Si está resuelto) */}
              {report.status === "resolved" && report.resolutionImageUrl && (
                <div className="space-y-2 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-4" /> Fotografía de Reparación Técnica
                    </span>
                  </div>
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-black">
                    <img
                      src={report.resolutionImageUrl}
                      alt="Reparación completada"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {report.resolutionNotes && (
                    <p className="text-xs text-muted-foreground font-medium pt-1">
                      Nota de reparación: "{report.resolutionNotes}"
                    </p>
                  )}
                </div>
              )}

              {/* SECCIÓN 6: Historial del Reporte */}
              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <History className="size-3.5 text-primary" /> Historial de Cambios
                </h4>

                <div className="space-y-2">
                  {report.history && report.history.length > 0 ? (
                    report.history.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-2xl bg-muted/50 border border-border/60 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-foreground">{item.actor}</span>
                          <span className="text-[10px] text-muted-foreground">{item.timestamp}</span>
                        </div>
                        <p className="text-muted-foreground">{item.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Sin historial previo.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Modal Principal */}
            <div className="p-4 border-t border-border/60 bg-card flex justify-end">
              <Button onClick={onClose} className="rounded-xl text-xs font-bold px-6">
                Cerrar Detalle
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: Seleccionar Motivo de Rechazo */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-6 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 text-rose-500 font-bold text-xs tracking-wider uppercase mb-1">
              <AlertTriangle className="size-4" />
              <span>Motivo del Rechazo</span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Rechazar Reporte institucional
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Selecciona la razón técnica por la cual se descarta esta incidencia.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmRejection} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Seleccionar motivo *</label>
              <select
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value as RejectionReasonType)}
                className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {Object.entries(REJECTION_REASON_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Explicación adicional (Opcional)</label>
              <Textarea
                placeholder="Escribe detalles para el estudiante..."
                value={rejectionNotes}
                onChange={(e) => setRejectionNotes(e.target.value)}
                rows={3}
                className="rounded-xl text-xs resize-none"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsRejectModalOpen(false)}
                className="rounded-xl text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl text-xs bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Confirmar Rechazo
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: Adjuntar Foto y Nota de Resolución */}
      <Dialog open={isResolveModalOpen} onOpenChange={setIsResolveModalOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-6 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs tracking-wider uppercase mb-1">
              <CheckCircle2 className="size-4" />
              <span>Marcar Incidencia como Resuelta</span>
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Comprobar Reparación Técnica
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Adjunta la fotografía de la solución terminada y un comentario para la comunidad escolar.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmResolution} className="space-y-4 py-2">
            <input
              ref={resolveFileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleResolutionImageSelect}
              className="hidden"
            />

            {/* Selector de Fotografía de Solución */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Fotografía de la reparación *</label>
              <div
                onClick={() => resolveFileInputRef.current?.click()}
                className="w-full h-40 rounded-2xl border-2 border-dashed border-border hover:border-emerald-500/50 bg-muted/40 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative transition-colors"
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
                    <Camera className="size-8 text-emerald-500" />
                    <span className="text-xs font-bold text-foreground">Tomar foto o seleccionar archivo</span>
                    <span className="text-[10px]">Demuestra la solución física al estudiante</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Comentario de la solución *</label>
              <Textarea
                placeholder="Ej: Se reemplazó la pieza defectuosa y se realizaron pruebas de funcionamiento..."
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                rows={3}
                required
                className="rounded-xl text-xs resize-none"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsResolveModalOpen(false)}
                className="rounded-xl text-xs"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                Guardar Resolución
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
