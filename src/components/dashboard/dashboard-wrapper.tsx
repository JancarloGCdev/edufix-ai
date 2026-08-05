"use client";

import React, { useState } from "react";
import {
  StudentDashboardView,
  TeacherDashboardView,
  MaintenanceDashboardView,
  AdminDashboardView,
  DemoRoleSelector,
} from "@/src/components/dashboard";
import type { AuthUser } from "@/src/services/auth/session";

interface DashboardWrapperProps {
  user: AuthUser;
}

export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({ user }) => {
  // Estado local para seleccionar dinámicamente el rol en el modo de demostración
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "TEACHER" | "MAINTENANCE" | "ADMIN" | null>(null);

  // Si no se ha elegido rol aún, mostrar la pantalla de selección de demo
  if (!selectedRole) {
    return (
      <DemoRoleSelector
        user={user}
        onSelectRole={(role) => setSelectedRole(role)}
      />
    );
  }

  // Según el rol seleccionado en la demo, renderizar la vista correspondiente
  if (selectedRole === "ADMIN") {
    const adminUser: AuthUser = { ...user, role: "ADMIN" };
    return (
      <div>
        <div className="bg-rose-500/10 border-b border-rose-500/20 px-4 py-2 text-center text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center justify-between max-w-4xl mx-auto rounded-b-2xl">
          <span>Vista actual: Administrador del Sistema</span>
          <button
            onClick={() => setSelectedRole(null)}
            className="underline hover:text-foreground text-[11px]"
          >
            Cambiar rol de demo
          </button>
        </div>
        <AdminDashboardView user={adminUser} />
      </div>
    );
  }

  if (selectedRole === "TEACHER") {
    const teacherUser: AuthUser = { ...user, role: "TEACHER" };
    return (
      <div>
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 text-center text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center justify-between max-w-4xl mx-auto rounded-b-2xl">
          <span>Vista actual: Coordinador / Profesor</span>
          <button
            onClick={() => setSelectedRole(null)}
            className="underline hover:text-foreground text-[11px]"
          >
            Cambiar rol de demo
          </button>
        </div>
        <TeacherDashboardView user={teacherUser} />
      </div>
    );
  }

  if (selectedRole === "MAINTENANCE") {
    const maintenanceUser: AuthUser = { ...user, role: "MAINTENANCE" };
    return (
      <div>
        <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-2 text-center text-xs font-bold text-purple-700 dark:text-purple-400 flex items-center justify-between max-w-4xl mx-auto rounded-b-2xl">
          <span>Vista actual: Equipo de Mantenimiento</span>
          <button
            onClick={() => setSelectedRole(null)}
            className="underline hover:text-foreground text-[11px]"
          >
            Cambiar rol de demo
          </button>
        </div>
        <MaintenanceDashboardView user={maintenanceUser} />
      </div>
    );
  }

  const studentUser: AuthUser = { ...user, role: "STUDENT" };
  return (
    <div>
      <div className="bg-blue-500/10 border-b border-blue-500/20 px-4 py-2 text-center text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center justify-between max-w-4xl mx-auto rounded-b-2xl">
        <span>Vista actual: Estudiante / Feed Comunitario</span>
        <button
          onClick={() => setSelectedRole(null)}
          className="underline hover:text-foreground text-[11px]"
        >
          Cambiar rol de demo
        </button>
      </div>
      <StudentDashboardView user={studentUser} />
    </div>
  );
};
