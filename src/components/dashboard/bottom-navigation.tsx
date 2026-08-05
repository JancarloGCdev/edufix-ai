"use client";

import React, { useState } from "react";
import { Home, PlusCircle, Flame, Bell, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

interface BottomNavigationProps {
  onOpenReportModal?: () => void;
  onOpenProfileModal?: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onOpenReportModal,
  onOpenProfileModal,
}) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<"home" | "report" | "popular" | "notifications" | "profile">("home");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const scrollToPopular = () => {
    setActiveTab("popular");
    const element = document.getElementById("popular-section") || document.querySelector('[aria-label="Problemas populares comunitarios"]');
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = "/dashboard#popular";
    }
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab("report");
    if (onOpenReportModal) {
      onOpenReportModal();
    } else {
      // Disparar clic en el botón de reportar visible o abrir file input
      const reportButton = document.querySelector('[aria-label*="Reportar problema"]') as HTMLButtonElement;
      if (reportButton) {
        reportButton.click();
      }
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab("profile");
    if (onOpenProfileModal) {
      onOpenProfileModal();
    } else {
      const userMenuButton = document.querySelector('[aria-label="Abrir menú de usuario"]') as HTMLButtonElement;
      if (userMenuButton) {
        userMenuButton.click();
      }
    }
  };

  return (
    <>
      <nav
        aria-label="Navegación principal móvil"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-t border-border/80 px-3 py-2 shadow-2xl"
      >
        <div className="mx-auto flex max-w-md items-center justify-around">

          {/* 1. 🏠 Inicio -> Dashboard */}
          <Link
            href="/dashboard"
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors ${activeTab === "home" && pathname === "/dashboard"
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Home className="size-5" />
            <span className="text-[10px] tracking-tight">Inicio</span>
          </Link>

          {/* 2. 🔥 Populares -> Scroll a la sección */}
          <button
            type="button"
            onClick={scrollToPopular}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors ${activeTab === "popular"
              ? "text-orange-500 font-bold"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Flame className="size-5" />
            <span className="text-[10px] tracking-tight">Populares</span>
          </button>

          {/* 3. ➕ Reportar -> Abrir directamente modal */}
          <button
            type="button"
            onClick={handleReportClick}
            className="relative -top-4 flex flex-col items-center justify-center focus:outline-none"
            aria-label="Crear nuevo reporte"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background transition-transform active:scale-90 hover:scale-105">
              <PlusCircle className="size-7" />
            </div>
            <span className={`mt-0.5 text-[10px] font-extrabold ${activeTab === "report" ? "text-primary" : "text-primary/90"}`}>
              Reportar
            </span>
          </button>
          {/* 4. 🔔 Notificaciones -> Panel modal */}
          <button
            type="button"
            onClick={() => {
              setActiveTab("notifications");
              setIsNotificationsOpen(true);
            }}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors relative ${activeTab === "notifications"
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <div className="relative">
              <Bell className="size-5" />
              <span className="absolute -top-1 -right-1 size-2 rounded-full bg-rose-500 ring-2 ring-background animate-pulse" />
            </div>
            <span className="text-[10px] tracking-tight">Notificaciones</span>
          </button>

          {/* 5. 👤 Perfil -> Perfil de usuario */}
          <button
            type="button"
            onClick={handleProfileClick}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors ${activeTab === "profile"
              ? "text-primary font-bold"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <User className="size-5" />
            <span className="text-[10px] tracking-tight">Perfil</span>
          </button>

        </div>
      </nav>

      {/* Modal / Panel de Notificaciones */}
      <Dialog open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <DialogContent className="sm:max-w-md rounded-3xl border-border bg-card p-6 shadow-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-base font-black text-foreground flex items-center gap-2">
                <Bell className="size-5 text-primary" />
                Panel de Notificaciones
              </DialogTitle>
              <Badge variant="secondary" className="text-[10px] font-bold">En vivo</Badge>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Actualizaciones recientes sobre reportes de la IE GABO.
            </DialogDescription>
          </DialogHeader>

          <div className="py-3 space-y-3 max-h-[50vh] overflow-y-auto">
            <div className="p-3 rounded-2xl bg-muted/60 border border-border/60 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-primary">🟢 Reporte Resuelto</span>
                <span className="text-[10px] text-muted-foreground">Hace 10 min</span>
              </div>
              <p className="text-xs text-foreground font-medium">
                La falla de energía en el laboratorio 2 fue solucionada por Mantenimiento.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-muted/60 border border-border/60 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-blue-500">🔵 En Revisión</span>
                <span className="text-[10px] text-muted-foreground">Hace 1 hora</span>
              </div>
              <p className="text-xs text-foreground font-medium">
                Tu reporte sobre la ventana rota en grado 6-1 fue revisado por Coordinación.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setIsNotificationsOpen(false)}
              className="w-full rounded-2xl bg-primary text-primary-foreground font-bold text-xs"
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
