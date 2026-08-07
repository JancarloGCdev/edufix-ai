import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { GoogleSignInButton } from "@/src/components/auth/GoogleSignInButton";
import { ALLOWED_EMAIL_DOMAIN } from "@/src/types/auth";

export function LoginCard() {
  return (
    // GSAP: fade-in + entrada de la card de login
    <Card
      data-gsap="auth-card"
      className="w-full rounded-2xl border-border/70 bg-card shadow-[0_1px_2px_oklch(0.2_0.02_255_/0.04),0_12px_32px_oklch(0.2_0.02_255_/0.06)]"
    >
      <CardHeader className="items-center gap-4 px-5 pb-2 pt-8 text-center sm:px-8">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">EduFix AI</p>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Bienvenido
          </CardTitle>
          <CardDescription className="text-[15px] leading-relaxed">
            Inicia sesión para reportar incidencias y dar seguimiento en tu
            colegio.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-5 pb-8 pt-4 sm:px-8">
        <GoogleSignInButton />

        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          Solo se permiten cuentas institucionales{" "}
          <span className="font-medium text-foreground">
            @{ALLOWED_EMAIL_DOMAIN}
          </span>
        </p>

        <a
          href="/"
          className="inline-flex min-h-11 w-full items-center justify-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Volver al inicio
        </a>
      </CardContent>
    </Card>
  );
}
