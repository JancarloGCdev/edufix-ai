"use client";

import React from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { MapPin, ThumbsUp, Flame, Sparkles, Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useDashboard } from "./dashboard-context";

export const PopularReportsSection: React.FC = () => {
  const { popularReports, upvoteReport, upvotedIds } = useDashboard();

  return (
    <section aria-label="Problemas populares comunitarios" className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base sm:text-lg font-black tracking-tight text-foreground flex items-center gap-2">
          <Flame className="size-5 text-orange-500 fill-orange-500/20" />
          Problemas populares
        </h2>
        <span className="text-xs text-muted-foreground font-medium">
          Comunidad GABO
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {popularReports.map((report) => {
          const isUpvoted = upvotedIds.has(report.id);

          return (
            <Card
              key={report.id}
              className="dash-card group relative overflow-hidden transition-all duration-300 hover:shadow-md border border-border/70 bg-card/90 rounded-2xl"
            >
              <CardContent className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px] font-bold px-2 py-0">
                      {report.category}
                    </Badge>
                    {report.aiDuplicateCount ? (
                      <Badge variant="outline" className="gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 text-[10px] px-1.5 py-0 font-semibold">
                        <Sparkles className="size-2.5" />
                        {report.aiDuplicateCount} repeticiones
                      </Badge>
                    ) : null}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {report.title}
                  </h3>

                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin className="size-3 text-primary/70 shrink-0" />
                      {report.location}
                    </span>
                    <span>•</span>
                    <span>{report.createdAt}</span>
                  </div>
                </div>

                <Button
                  onClick={() => upvoteReport(report.id)}
                  variant={isUpvoted ? "default" : "outline"}
                  size="sm"
                  className={`shrink-0 flex flex-col items-center justify-center h-12 w-12 rounded-xl transition-all ${
                    isUpvoted
                      ? "bg-primary text-primary-foreground border-primary shadow-xs scale-105"
                      : "border-border hover:bg-primary/10 hover:text-primary"
                  }`}
                  aria-label={`Apoyar reporte: ${report.title}`}
                >
                  {isUpvoted ? <Check className="size-4" /> : <ThumbsUp className="size-4" />}
                  <span className="text-[11px] font-black mt-0.5 leading-none">
                    {report.upvotesCount}
                  </span>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
