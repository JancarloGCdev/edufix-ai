import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/services/auth/session";
import { DashboardWrapper } from "@/src/components/dashboard";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // Renderizar DashboardWrapper para permitir la selección interactiva de rol en Modo Demo
  return <DashboardWrapper user={user} />;
}
