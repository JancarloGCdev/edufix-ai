"use client";

import React from "react";
import { HeaderSection } from "./header-section";
import { BottomNavigation } from "./bottom-navigation";
import { Badge } from "@/src/components/ui/badge";
import { Shield, Wrench, Users } from "lucide-react";
import type { AuthUser } from "@/src/services/auth/session";

interface RoleDashboardViewProps {
  user: AuthUser;
}

export const RoleDashboardView: React.FC<RoleDashboardViewProps> = ({ user }) => {
  const roleConfig = {
    ADMIN: {
      title: "Panel Administrativo",
      icon: Users,
      description: "Panel de control institucional. Gestión de usuarios, métricas de rendimiento y resolución de fallas.",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    },
    MAINTENANCE: {
      title: "Panel de Mantenimiento",
      icon: Wrench,
      description: "Asignación técnica de trabajo. Gestión de reparaciones físicas, eléctricas e infraestructura.",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
  };

  const currentRoleConfig =
    roleConfig[user.role as keyof typeof roleConfig] || roleConfig.ADMIN;
  const RoleIcon = currentRoleConfig.icon;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-12 pt-4 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto space-y-6 antialiased">
      <div className="flex items-center justify-between px-1">
        <Badge variant="outline" className={`gap-1 ${currentRoleConfig.color} text-[10px]`}>
          <Shield className="size-3" />
          {currentRoleConfig.title}
        </Badge>
        <span className="text-xs text-muted-foreground font-medium">
          Institución educativa GABO
        </span>
      </div>

      <HeaderSection user={user} />

      <div className="p-8 rounded-2xl border border-border/80 bg-card text-center space-y-4 shadow-xs">
        <div className="size-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
          <RoleIcon className="size-8" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h2 className="text-xl font-bold text-foreground">
            {currentRoleConfig.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {currentRoleConfig.description}
          </p>
        </div>
        <div className="pt-2">
          <Badge variant="secondary" className="text-xs px-3 py-1">
            Módulo en desarrollo para el rol {user.role}
          </Badge>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};
