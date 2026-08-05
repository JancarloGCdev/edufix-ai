import { buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import { ALLOWED_EMAIL_DOMAIN } from "@/src/types/auth";

type UnauthorizedCardProps = {
  reason?: string | null;
};

export function UnauthorizedCard({ reason }: UnauthorizedCardProps) {
  const isDomainDenied =
    reason === "AccessDenied" || reason === "Configuration";

  return (
    // GSAP: fade-in de la card de acceso denegado
    <Card
      data-gsap="auth-card"
      className="w-full rounded-2xl border-border/70 bg-card shadow-[0_1px_2px_oklch(0.2_0.02_255_/0.04),0_12px_32px_oklch(0.2_0.02_255_/0.06)]"
    >
      <CardHeader className="gap-2 px-5 pt-8 text-center sm:px-8">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Acceso no autorizado
        </CardTitle>
        <CardDescription className="text-[15px] leading-relaxed">
          {isDomainDenied
            ? `Solo cuentas @${ALLOWED_EMAIL_DOMAIN} pueden ingresar a EduFix AI.`
            : "No tienes permiso para continuar con esta sesión."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-5 pb-8 sm:px-8">
        <a
          href="/login"
          className={cn(
            buttonVariants({ size: "lg" }),
            "min-h-12 w-full text-[15px]"
          )}
        >
          Volver a iniciar sesión
        </a>
        <a
          href="/"
          className={cn(
            buttonVariants({ size: "lg", variant: "outline" }),
            "min-h-12 w-full text-[15px]"
          )}
        >
          Ir al inicio
        </a>
      </CardContent>
    </Card>
  );
}
