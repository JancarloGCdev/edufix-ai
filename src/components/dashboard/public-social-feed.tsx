"use client";

import React, { useState, useMemo } from "react";
import { ReportItem, StatusType, formatReportId } from "./mock-data";
import { ReportCard } from "./report-card";
import { useDashboard } from "./dashboard-context";
import { Search, Filter, Sparkles, MessageSquare, AlertCircle } from "lucide-react";
import { Input } from "@/src/components/ui/input";
import { Badge } from "@/src/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

export const PublicSocialFeed: React.FC = () => {
  const { reports, upvoteReport, upvotedIds } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"all" | StatusType>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const categories = [
    "all",
    "Infraestructura",
    "Tecnología",
    "Climatización",
    "Electricidad",
    "Fontanería",
    "Mantenimiento",
    "Aseo e Higiene",
  ];

  // Filtrado reactivo multivariable (Búsqueda + Estado + Categoría)
  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" ? true : report.status === selectedStatus;

      const matchesCategory =
        selectedCategory === "all" ? true : report.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [reports, searchQuery, selectedStatus, selectedCategory]);

  return (
    <section aria-label="Feed social de incidencias institucional" className="space-y-4">
      {/* Header del Feed Social */}
      <div className="flex items-center justify-between px-1 flex-wrap gap-2">
        <div>
          <h2 className="text-base sm:text-xl font-black tracking-tight text-foreground flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            Feed Comunitario GABO
          </h2>
          <p className="text-xs text-muted-foreground">
            Consulta en tiempo real la situación institucional reportada por la comunidad.
          </p>
        </div>

        <Badge variant="outline" className="gap-1 bg-primary/10 text-primary border-primary/20 text-xs font-bold px-3 py-1">
          <Sparkles className="size-3.5" />
          {filteredReports.length} reportes en vivo
        </Badge>
      </div>

      {/* Barra de Búsqueda de alta precisión */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por salón, bloque o tipo de problema..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 rounded-2xl border-border bg-card shadow-xs text-xs sm:text-sm focus-visible:ring-primary"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Filtros por Estado (Pills) */}
      <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-2xl border border-border/50 text-xs overflow-x-auto max-w-full">
        {(["all", "pending", "in_review", "in_repair", "resolved", "rejected"] as const).map((s) => {
          const labels: Record<string, string> = {
            all: "Todos",
            pending: "Pendientes",
            in_review: "En revisión",
            in_repair: "En reparación",
            resolved: "Resueltos",
            rejected: "Rechazados",
          };
          return (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-3 py-1.5 rounded-xl transition-all font-bold whitespace-nowrap ${
                selectedStatus === s
                  ? "bg-background text-foreground shadow-xs ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {labels[s]}
            </button>
          );
        })}
      </div>

      {/* Categorías institucionales */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
        <Filter className="size-3.5 text-muted-foreground shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "bg-card border-border/60 text-muted-foreground hover:bg-muted"
            }`}
          >
            {cat === "all" ? "Todas las Categorías" : cat}
          </button>
        ))}
      </div>

      {/* Grid del Feed Social */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
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
          <div className="col-span-full p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40 space-y-2">
            <AlertCircle className="size-8 text-muted-foreground mx-auto" />
            <p className="text-base font-bold text-foreground">No se encontraron reportes</p>
            <p className="text-xs text-muted-foreground">Prueba ajustando la búsqueda o cambiando los filtros seleccionados.</p>
          </div>
        )}
      </div>

      {/* Modal de Detalle Clickeable del Feed */}
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
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {selectedReport.description}
                </p>

                {selectedReport.resolutionImageUrl && (
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                      ✔ Solución comprobada por Mantenimiento
                    </span>
                    <img
                      src={selectedReport.resolutionImageUrl}
                      alt="Solución"
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    {selectedReport.resolutionNotes && (
                      <p className="text-xs text-muted-foreground italic">
                        &quot;{selectedReport.resolutionNotes}&quot;
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <span className="text-xs font-bold text-primary">
                    ❤️ {selectedReport.upvotesCount} miembros apoyan este reporte
                  </span>
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
