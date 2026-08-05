import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { AdminDashboardView } from "@/src/components/dashboard/admin-dashboard-view";
import { Lock, ShieldAlert, ArrowLeft } from "lucide-react";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";

export default async function AdminDashboardPage() {
  const session = await auth();

  // Si no está autenticado, redirigir al login
  if (!session?.user) {
    redirect("/login");
  }

  // Si el usuario no tiene rol de Administrador, mostrar la página de Acceso Denegado
  if (session.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="max-w-md w-full rounded-3xl border-rose-500/30 bg-card p-6 sm:p-8 text-center space-y-5 shadow-2xl">
          <div className="size-16 rounded-3xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto ring-4 ring-rose-500/10">
            <Lock className="size-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold uppercase text-rose-500 tracking-wider">
              Error 403 · Acceso Restringido
            </span>
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              Acceso Denegado
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Lo sentimos, tu usuario no cuenta con el rol de <strong>Administrador del Sistema</strong> para gestionar usuarios y auditoría.
            </p>
          </div>

          <div className="pt-2">
            <a href="/dashboard">
              <Button className="w-full rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs h-11 gap-2">
                <ArrowLeft className="size-4" />
                <span>Volver a Mi Dashboard</span>
              </Button>
            </a>
          </div>
        </Card>
      </div>
    );
  }

  // Si es Administrador, renderizar la consola real de administración
  return <AdminDashboardView user={session.user} />;
}
