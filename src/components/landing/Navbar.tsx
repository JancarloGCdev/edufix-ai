"use client";

import { useState } from "react";
import { Menu, X, Wrench } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#ia", label: "IA" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      data-gsap="navbar"
      className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6 md:px-8">
        <a
          href="#inicio"
          className="flex min-h-11 items-center gap-2.5 text-foreground"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <Wrench className="size-4" aria-hidden />
          </span>
          <span className="text-base font-semibold tracking-tight">
            EduFix AI
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center px-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "ml-2 min-h-11 px-4"
            )}
          >
            Comenzar
          </a>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-muted md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "border-t border-border/70 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-xl px-3 text-[15px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-2 min-h-11 w-full text-[15px]"
            )}
            onClick={() => setOpen(false)}
          >
            Comenzar
          </a>
        </div>
      </div>
    </header>
  );
}
