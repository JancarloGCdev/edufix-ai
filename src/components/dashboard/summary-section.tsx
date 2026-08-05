"use client";

import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { useDashboard } from "./dashboard-context";
import gsap from "gsap";

export const SummarySection: React.FC = () => {
  const { stats } = useDashboard();

  const pendingRef = useRef<HTMLSpanElement>(null);
  const inReviewRef = useRef<HTMLSpanElement>(null);
  const resolvedRef = useRef<HTMLSpanElement>(null);
  const rejectedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const animateCounter = (el: HTMLSpanElement | null, targetVal: number) => {
      if (!el) return;
      const obj = { val: parseFloat(el.innerText) || 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          el.innerText = Math.round(obj.val).toString();
        },
      });
    };

    animateCounter(pendingRef.current, stats.pending);
    animateCounter(inReviewRef.current, stats.inReview);
    animateCounter(resolvedRef.current, stats.resolved);
    animateCounter(rejectedRef.current, stats.rejected);
  }, [stats]);

  const cards = [
    {
      id: "pending",
      title: "Pendientes",
      ref: pendingRef,
      icon: Clock,
      iconColor: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20",
      accentBorder: "border-amber-500/20 hover:border-amber-500/40",
      bgGradient: "from-amber-500/5 via-transparent to-transparent",
    },
    {
      id: "in_review",
      title: "En revisión",
      ref: inReviewRef,
      icon: Loader2,
      iconColor: "text-blue-500 bg-blue-500/10 dark:bg-blue-500/20",
      accentBorder: "border-blue-500/20 hover:border-blue-500/40",
      bgGradient: "from-blue-500/5 via-transparent to-transparent",
    },
    {
      id: "resolved",
      title: "Resueltos",
      ref: resolvedRef,
      icon: CheckCircle2,
      iconColor: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20",
      accentBorder: "border-emerald-500/20 hover:border-emerald-500/40",
      bgGradient: "from-emerald-500/5 via-transparent to-transparent",
    },
    {
      id: "rejected",
      title: "Rechazados",
      ref: rejectedRef,
      icon: XCircle,
      iconColor: "text-rose-500 bg-rose-500/10 dark:bg-rose-500/20",
      accentBorder: "border-rose-500/20 hover:border-rose-500/40",
      bgGradient: "from-rose-500/5 via-transparent to-transparent",
    },
  ];

  return (
    <section aria-label="Resumen de indicadores" className="space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold tracking-wider uppercase text-muted-foreground">
          Resumen de Indicadores
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.id}
              className={`dash-card relative overflow-hidden transition-all duration-300 hover:shadow-md border bg-gradient-to-br ${card.bgGradient} ${card.accentBorder}`}
            >
              <CardContent className="p-3.5 sm:p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground truncate">
                    {card.title}
                  </span>
                  <div className={`p-1.5 rounded-lg ${card.iconColor}`}>
                    <Icon className="size-3.5" />
                  </div>
                </div>

                <div className="flex items-baseline gap-1 mt-1">
                  <span
                    ref={card.ref}
                    className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
                  >
                    0
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                    reportes
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
