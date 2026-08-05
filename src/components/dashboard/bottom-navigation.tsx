"use client";

import React from "react";
import { Home, PlusCircle, AlertCircle, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavigation: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Inicio",
      href: "/dashboard",
      icon: Home,
      isActive: pathname === "/dashboard",
    },
    {
      name: "Mis Reportes",
      href: "/dashboard#reports",
      icon: AlertCircle,
      isActive: pathname === "/reports" || pathname.includes("#reports"),
    },
    {
      name: "Reportar",
      href: "/dashboard#new",
      icon: PlusCircle,
      isPrimary: true,
    },
    {
      name: "Comunidad",
      href: "/dashboard#popular",
      icon: Sparkles,
      isActive: pathname.includes("#popular"),
    },
    {
      name: "Perfil",
      href: "/dashboard#profile",
      icon: User,
      isActive: pathname.includes("#profile"),
    },
  ];

  return (
    <nav
      aria-label="Navegación principal móvil"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/85 backdrop-blur-lg border-t border-border/80 px-4 py-2 shadow-lg"
    >
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={index}
                href={item.href}
                className="relative -top-5 flex flex-col items-center justify-center"
                aria-label="Crear nuevo reporte"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-background transition-transform active:scale-90 hover:scale-105">
                  <Icon className="size-6" />
                </div>
                <span className="mt-1 text-[10px] font-semibold text-primary">
                  Reportar
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-xl transition-colors ${
                item.isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
