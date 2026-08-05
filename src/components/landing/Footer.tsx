import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer id="contacto" data-gsap="footer" className="bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-12">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wrench className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-[15px] font-semibold tracking-tight text-foreground">
              EduFix AI
            </p>
            <p className="text-sm text-muted-foreground">
              Reporta. Detecta. Resuelve.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-1">
          <a
            href="#inicio"
            className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
          >
            Inicio
          </a>
          <a
            href="#como-funciona"
            className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
          >
            Cómo funciona
          </a>
          <a
            href="#ia"
            className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
          >
            IA
          </a>
          <a
            href="mailto:hola@edufix.ai"
            className="inline-flex min-h-11 items-center px-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
          >
            hola@edufix.ai
          </a>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 md:px-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} EduFix AI. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
