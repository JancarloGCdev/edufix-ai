"use server";

import { prisma } from "@/src/lib/prisma";
import { UserRole } from "@/src/generated/prisma/client";
import { revalidatePath } from "next/cache";

export interface RealUserItem {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "STUDENT" | "TEACHER" | "MAINTENANCE" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface AdminMetricsData {
  totalUsers: number;
  activeUsersToday: number;
  countStudents: number;
  countTeachers: number;
  countMaintenance: number;
  countAdmins: number;
  totalReports: number;
  resolvedReports: number;
  latestUserName?: string;
  latestUserEmail?: string;
}

/**
 * Obtiene todos los usuarios reales registrados en la base de datos PostgreSQL.
 */
export async function fetchAllUsersAction(): Promise<RealUserItem[]> {
  try {
    const dbUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return dbUsers.map((u) => ({
      id: u.id,
      name: u.name || "Usuario GABO",
      email: u.email || "",
      image: u.image || undefined,
      role: (u.role as "STUDENT" | "TEACHER" | "MAINTENANCE" | "ADMIN") || "STUDENT",
      createdAt: new Date(u.createdAt).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      updatedAt: new Date(u.updatedAt).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
  } catch (error) {
    console.error("Error al obtener usuarios reales desde PostgreSQL:", error);
    return [];
  }
}

/**
 * Obtiene métricas reales desde la base de datos.
 */
export async function fetchAdminMetricsAction(): Promise<AdminMetricsData> {
  try {
    const [
      totalUsers,
      countStudents,
      countTeachers,
      countMaintenance,
      countAdmins,
      totalReports,
      resolvedReports,
      latestUser,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: UserRole.STUDENT } }),
      prisma.user.count({ where: { role: UserRole.TEACHER } }),
      prisma.user.count({ where: { role: UserRole.MAINTENANCE } }),
      prisma.user.count({ where: { role: UserRole.ADMIN } }),
      prisma.report.count(),
      prisma.report.count({ where: { status: "RESOLVED" } }),
      prisma.user.findFirst({ orderBy: { createdAt: "desc" } }),
    ]);

    return {
      totalUsers,
      activeUsersToday: totalUsers, // Todos los registrados
      countStudents,
      countTeachers,
      countMaintenance,
      countAdmins,
      totalReports,
      resolvedReports,
      latestUserName: latestUser?.name || undefined,
      latestUserEmail: latestUser?.email || undefined,
    };
  } catch (error) {
    console.error("Error al obtener métricas reales:", error);
    return {
      totalUsers: 0,
      activeUsersToday: 0,
      countStudents: 0,
      countTeachers: 0,
      countMaintenance: 0,
      countAdmins: 0,
      totalReports: 0,
      resolvedReports: 0,
    };
  }
}

/**
 * Actualiza el rol de un usuario real en la base de datos PostgreSQL.
 * Regla de seguridad: El Administrador actual no puede quitarse su propio rol de ADMIN.
 */
export async function updateUserRoleAction(
  targetUserId: string,
  newRole: "STUDENT" | "TEACHER" | "MAINTENANCE" | "ADMIN",
  currentAdminEmail?: string
) {
  try {
    // Si se pasa el correo del admin actual, comprobar que no se des-promueva a sí mismo
    if (currentAdminEmail) {
      const currentAdmin = await prisma.user.findUnique({
        where: { email: currentAdminEmail },
      });

      if (currentAdmin && currentAdmin.id === targetUserId && newRole !== UserRole.ADMIN) {
        return {
          success: false,
          error: "Seguridad: No puedes quitarte tu propio rol de Administrador.",
        };
      }
    }

    // Actualización directa en PostgreSQL vía Prisma ORM
    await prisma.user.update({
      where: {
        id: targetUserId,
      },
      data: {
        role: newRole as UserRole,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/admin");

    return { success: true };
  } catch (error) {
    console.error("Error al actualizar el rol del usuario en PostgreSQL:", error);
    return {
      success: false,
      error: "No se pudo actualizar el rol en la base de datos.",
    };
  }
}
