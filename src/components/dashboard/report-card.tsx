"use client";

import React, { useState } from "react";
import { ReportItem, StatusType, REJECTION_REASON_LABELS, formatReportId } from "./mock-data";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import {
  Clock,
  Loader2,
  CheckCircle2,
  XCircle,
  Wrench,
  MapPin,
  Sparkles,
  AlertTriangle,
  ShieldCheck,
  Heart,
  Calendar,
  History,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";

export interface ReportCardProps {
  report: ReportItem;
  index?: number;
  isUpvoted?: boolean;
  onUpvote?: (id: string) => void;
  onOpenDetails?: (report: ReportItem) => void;
  className?: string;
}

export const STATUS_CARD_STYLES: Record<
  StatusType,
  {
    borderClass: string;
    shadowClass: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    badgeIcon: React.ElementType;
    badgeLabel: string;
  }
> = {
  pending: {
    borderClass: "border-amber-500/40 dark:border-amber-500/30 border-2",
    shadowClass: "shadow-[0_4px_20px_-4px_rgba(245,158,11,0.12)] hover:shadow-[0_8px_25px_-4px_rgba(245,158,11,0.2)]",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-700 dark:text-amber-400",
    badgeBorder: "border-amber-500/30",
    badgeIcon: Clock,
    badgeLabel: "🟡 Pendiente",
  },
  in_review: {
    borderClass: "border-blue-500/40 dark:border-blue-500/30 border-2",
    shadowClass: "shadow-[0_4px_20px_-4px_rgba(59,130,246,0.12)] hover:shadow-[0_8px_25px_-4px_rgba(59,130,246,0.2)]",
    badgeBg: "bg-blue-500/15",
    badgeText: "text-blue-700 dark:text-blue-400",
    badgeBorder: "border-blue-500/30",
    badgeIcon: Loader2,
    badgeLabel: "🔵 En revisión",
  },
  in_repair: {
    borderClass: "border-purple-500/40 dark:border-purple-500/30 border-2",
    shadowClass: "shadow-[0_4px_20px_-4px_rgba(168,85,247,0.12)] hover:shadow-[0_8px_25px_-4px_rgba(168,85,247,0.2)]",
    badgeBg: "bg-purple-500/15",
    badgeText: "text-purple-700 dark:text-purple-400",
    badgeBorder: "border-purple-500/30",
    badgeIcon: Wrench,
    badgeLabel: "🟣 En reparación",
  },
  resolved: {
    borderClass: "border-emerald-500/40 dark:border-emerald-500/30 border-2",
    shadowClass: "shadow-[0_4px_20px_-4px_rgba(16,185,129,0.12)] hover:shadow-[0_8px_25px_-4px_rgba(16,185,129,0.2)]",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-700 dark:text-emerald-400",
    badgeBorder: "border-emerald-500/30",
    badgeIcon: CheckCircle2,
    badgeLabel: "🟢 Resuelto",
  },
  rejected: {
    borderClass: "border-rose-500/40 dark:border-rose-500/30 border-2",
    shadowClass: "shadow-[0_4px_20px_-4px_rgba(244,63,94,0.12)] hover:shadow-[0_8px_25px_-4px_rgba(244,63,94,0.2)]",
    badgeBg: "bg-rose-500/15",
    badgeText: "text-rose-700 dark:text-rose-400",
    badgeBorder: "border-rose-500/30",
    badgeIcon: XCircle,
    badgeLabel: "🔴 Rechazado",
  },
};

export const ReportCard: React.FC<ReportCardProps> = ({
  report,
  index,
  isUpvoted = false,
  onUpvote,
  onOpenDetails,
  className = "",
}) => {
  const statusConfig = STATUS_CARD_STYLES[report.status];
  const BadgeIcon = statusConfig.badgeIcon;
  const historyUpdatesCount = report.history?.length || 1;

  return (
    <Card
      onClick={() => onOpenDetails?.(report)}
      className={`dash-card group relative overflow-hidden transition-all duration-300 rounded-3xl bg-card cursor-pointer active:scale-[0.985] ${statusConfig.borderClass} ${statusConfig.shadowClass} ${className}`}
    >
      <CardContent className="p-0 flex flex-col h-full">
        {/* Foto grande del problema */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-muted">
          {report.imageUrl ? (
            <img
              src={report.imageUrl}
              alt={report.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted/50 font-medium text-xs">
              Sin Fotografía
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Badges superiores en overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                {formatReportId(report.id, index)}
              </span>
              <Badge variant="secondary" className="text-[11px] font-bold bg-white/90 text-black backdrop-blur-md border-none px-2.5 py-0.5">
                {report.category}
              </Badge>
            </div>

            <Badge variant="outline" className={`gap-1 ${statusConfig.badgeBg} ${statusConfig.badgeText} ${statusConfig.badgeBorder} text-[11px] font-bold px-2.5 py-0.5 backdrop-blur-md`}>
              <BadgeIcon className={`size-3 ${report.status === "in_review" ? "animate-spin" : ""}`} />
              <span>{statusConfig.badgeLabel}</span>
            </Badge>
          </div>

          {/* Información superpuesta en parte inferior de la foto */}
          <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
            <div className="flex items-center justify-between text-xs font-semibold text-white/90">
              <span className="flex items-center gap-1 truncate max-w-[70%]">
                <MapPin className="size-3.5 text-primary shrink-0" />
                <span className="truncate">{report.location}</span>
              </span>
              <span className="flex items-center gap-1 text-[11px] shrink-0">
                <Calendar className="size-3 text-white/70" />
                {report.createdAt}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold leading-snug drop-shadow-sm truncate">
              {report.title}
            </h3>
          </div>
        </div>

        {/* Detalles inferiores */}
        <div className="p-4 flex flex-col justify-between flex-1 gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {report.description}
          </p>

          {/* Alerta si está rechazado */}
          {report.status === "rejected" && (
            <div className="p-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 truncate">
                <AlertTriangle className="size-3.5 shrink-0" />
                <span className="truncate">
                  {report.rejectionReason ? REJECTION_REASON_LABELS[report.rejectionReason] : "Rechazado"}
                </span>
              </span>
              <span className="text-[10px] underline shrink-0 font-bold ml-2">Ver motivo</span>
            </div>
          )}

          {/* Pie de Card con Apoyos, Actualizaciones de Red Social */}
          <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-muted-foreground font-semibold text-[10px] bg-muted/80 px-2 py-0.5 rounded-lg border border-border/50">
                <History className="size-3 text-primary" />
                {historyUpdatesCount} actualizaci{historyUpdatesCount === 1 ? "ón" : "ones"}
              </span>

              {report.aiDuplicateCount && report.aiDuplicateCount > 0 ? (
                <span className="hidden sm:flex items-center gap-1 text-primary font-bold text-[10px] bg-primary/10 px-2 py-0.5 rounded-lg">
                  <Sparkles className="size-3" />
                  {report.aiDuplicateCount}
                </span>
              ) : null}
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                onUpvote?.(report.id);
              }}
              variant={isUpvoted ? "default" : "outline"}
              size="sm"
              className={`gap-1 rounded-xl text-xs font-bold transition-all h-8 px-2.5 ${
                isUpvoted ? "bg-primary text-primary-foreground shadow-xs" : "hover:bg-primary/10"
              }`}
            >
              <Heart className={`size-3.5 ${isUpvoted ? "fill-current text-rose-500" : ""}`} />
              <span>{report.upvotesCount} apoyos</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
