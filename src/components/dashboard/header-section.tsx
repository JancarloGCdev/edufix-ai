"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { LogOut, User as UserIcon, Mail, Shield, ChevronDown, School } from "lucide-react";
import { signOutCurrentUser } from "@/src/features/auth/actions";
import type { AuthUser } from "@/src/services/auth/session";

interface HeaderSectionProps {
  user: AuthUser;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Generar saludo dinámico según la hora del día
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Buenos días";
    if (hour >= 12 && hour < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const roleLabels: Record<string, { label: string; color: string }> = {
    STUDENT: { label: "Estudiante", color: "bg-primary/10 text-primary border-primary/20" },
    TEACHER: { label: "Docente", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
    ADMIN: { label: "Administrador", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
    MAINTENANCE: { label: "Mantenimiento", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  };

  const userRoleInfo = roleLabels[user.role] || { label: user.role, color: "bg-muted text-muted-foreground" };
  const firstName = user.name ? user.name.split(" ")[0] : "Usuario";

  return (
    <>
      <header className="dash-fade relative z-20 flex items-center justify-between rounded-2xl bg-card/80 p-4 backdrop-blur-md border border-border/60 shadow-xs sm:p-6 transition-all">
        {/* Lado izquierdo: Saludo e Institución */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-1.5 flex-wrap">
            <span>👋 {getGreeting()},</span>
            <span className="text-primary font-extrabold">{firstName}</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground flex items-center gap-1">
            <School className="size-3.5 shrink-0 text-primary/70" />
            <span>Institución Educativa GABO</span>
          </p>
        </div>

        {/* Esquina superior derecha: Foto del usuario con menú interactivo */}
        <div className="relative z-30">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 p-1 rounded-full hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all active:scale-95"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-label="Abrir menú de usuario"
          >
            <Avatar size="lg" className="h-11 w-11 sm:h-13 sm:w-13 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
              <AvatarImage src={user.image || undefined} alt={user.name || "Usuario"} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-base">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className={`size-4 text-muted-foreground transition-transform duration-200 ${isMenuOpen ? "rotate-180 text-primary" : ""}`} />
          </button>

          {/* Menú desplegable */}
          {isMenuOpen && (
            <>
              {/* Overlay transparente para cerrar al hacer clic afuera */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <div
                role="menu"
                className="absolute right-0 mt-2 z-50 w-64 rounded-2xl bg-card border border-border/80 p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="px-3 py-2.5 border-b border-border/60 mb-1 space-y-0.5">
                  <p className="text-xs font-bold text-foreground truncate">
                    {user.name || "Usuario de EduFix"}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate font-mono">
                    {user.email}
                  </p>
                  <div className="pt-1.5 flex items-center gap-1.5">
                    <Badge variant="outline" className={`text-[10px] font-medium ${userRoleInfo.color}`}>
                      {userRoleInfo.label}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <button
                    role="menuitem"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground rounded-xl hover:bg-muted/80 transition-colors text-left"
                  >
                    <UserIcon className="size-4 text-primary" />
                    <span>Mi perfil</span>
                  </button>

                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center justify-between rounded-xl">
                    <span className="flex items-center gap-2.5">
                      <Mail className="size-4 text-muted-foreground" />
                      <span>Correo:</span>
                    </span>
                    <span className="text-[11px] font-mono truncate max-w-[110px] text-foreground">
                      {user.email}
                    </span>
                  </div>

                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground flex items-center justify-between rounded-xl">
                    <span className="flex items-center gap-2.5">
                      <Shield className="size-4 text-muted-foreground" />
                      <span>Rol:</span>
                    </span>
                    <span className="text-[11px] font-bold text-foreground">
                      {userRoleInfo.label}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/60 mt-1 pt-1">
                  <form action={signOutCurrentUser}>
                    <button
                      type="submit"
                      role="menuitem"
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-destructive rounded-xl hover:bg-destructive/10 transition-colors text-left"
                    >
                      <LogOut className="size-4" />
                      <span>Cerrar sesión</span>
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Modal de Mi Perfil */}
      <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl border-border bg-card p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Perfil de Usuario
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Información de tu cuenta institucional autenticada con Google OAuth.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 border border-border/60">
              <Avatar size="lg" className="h-14 w-14 ring-2 ring-primary/20">
                <AvatarImage src={user.image || undefined} alt={user.name || "Usuario"} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-foreground truncate">
                  {user.name}
                </h4>
                <p className="text-xs text-muted-foreground truncate font-mono">
                  {user.email}
                </p>
                <div className="mt-1">
                  <Badge variant="outline" className={`text-[10px] font-medium ${userRoleInfo.color}`}>
                    Rol: {userRoleInfo.label}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-2 border-b border-border/60">
                <span className="text-muted-foreground">Institución:</span>
                <span className="font-semibold text-foreground">Institución educativa GABO</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/60">
                <span className="text-muted-foreground">Dominio autorizado:</span>
                <span className="font-mono font-medium text-foreground">@iegabo.edu.co</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">ID de Usuario:</span>
                <span className="font-mono text-[11px] text-muted-foreground truncate max-w-[180px]">
                  {user.id}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsProfileModalOpen(false)}
              className="w-full rounded-xl text-xs"
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
