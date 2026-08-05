import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/services/auth/session";
import {
  StudentDashboardView,
  RoleDashboardView,
} from "@/src/components/dashboard";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Arquitectura limpia: Renderizado dinámico según el rol del usuario
  switch (user.role) {
    case "STUDENT":
      return <StudentDashboardView user={user} />;
    case "TEACHER":
    case "ADMIN":
    case "MAINTENANCE":
      return <RoleDashboardView user={user} />;
    default:
      return <StudentDashboardView user={user} />;
  }
}
