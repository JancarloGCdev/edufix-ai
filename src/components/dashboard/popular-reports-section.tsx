"use client";

import React, { useState, useRef } from "react";
import { Flame, Sparkles, MapPin, Calendar, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ReportCard } from "./report-card";
import { useDashboard } from "./dashboard-context";
import { ReportItem, REJECTION_REASON_LABELS, formatReportId } from "./mock-data";
import {
  Dialog,
  DialogContent,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

export const PopularReportsSection: React.FC = () => {
  const { popularReports, upvoteReport, upvotedIds } = useDashboard();
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section aria-label="Problemas populares comunitarios" className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center gap-2">
          <Flame className="size-5 text-orange-500 fill-orange-500/20" />
          Problemas populares
        </h2>
        
        {/* Controles de desplazamiento para escritorio y móviles */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              aria-label="Desplazar anterior"
              className="size-7 rounded-lg border-border/70 text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={scrollRight}
              aria-label="Desplazar siguiente"
              className="size-7 rounded-lg border-border/70 text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground font-semibold sm:hidden">
            Desliza horizontalmente ➔
          </span>
        </div>
      </div>

      {/* Carrusel Horizontal Scrollable en Móviles y Escritorio */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 px-1 snap-x snap-mandatory scrollbar-none max-w-full scroll-smooth"
      >
        {popularReports.map((report, idx) => (
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

      {/* Modal de Detalle Clickeable */}
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
                  <span className="text-xs font-bold text-foreground">Descripción del reporte popular</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedReport.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <div className="flex items-center gap-1 text-xs text-primary font-bold">
                    <Heart className="size-4 fill-primary" />
                    <span>{selectedReport.upvotesCount} estudiantes apoyan esta causa</span>
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
