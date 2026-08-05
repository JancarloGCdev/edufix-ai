"use client";

import { useState } from "react";
import { Menu, X, Wrench, Sparkles, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#ia", label: "Inteligencia Artificial" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#estadisticas", label: "Estadísticas" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-gsap="navbar"
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl transition-all"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="relative flex size-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="size-5" aria-hidden />
            <Sparkles className="size-3 absolute -top-1 -right-1 text-amber-300 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-foreground leading-none">
              EduFix <span className="text-primary font-mono">AI</span>
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-0.5">
              IE GABO
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex h-9 items-center px-4 rounded-xl text-xs sm:text-sm font-semibold text-muted-foreground transition-all hover:text-foreground hover:bg-muted/60"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className={cn(
              buttonVariants({ size: "sm" }),
              "ml-3 h-10 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md shadow-blue-600/20 transition-all gap-1.5"
            )}
          >
            <span>Comenzar</span>
            <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-border/80 bg-card text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "border-t border-border/60 bg-card/95 backdrop-blur-xl md:hidden transition-all duration-300",
          open ? "block" : "hidden"
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1.5 px-4 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex h-11 items-center rounded-2xl px-4 text-sm font-bold text-foreground transition-colors hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-2 h-11 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md"
            )}
            onClick={() => setOpen(false)}
          >
            Comenzar gratis
          </a>
        </div>
      </div>
    </header>
  );
}
