"use server";

import { prisma } from "@/src/lib/prisma";
import type { StatusType, RejectionReasonType, ReportItem } from "@/src/components/dashboard/mock-data";
import { ReportStatus } from "@/src/generated/prisma/client";

export async function fetchAllReportsAction(): Promise<ReportItem[]> {
  try {
    const dbReports = await prisma.report.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        history: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return dbReports.map((r) => {
      const statusMap: Record<ReportStatus, StatusType> = {
        PENDING: "pending",
        IN_REVIEW: "in_review",
        IN_REPAIR: "in_repair",
        RESOLVED: "resolved",
        REJECTED: "rejected",
      };

      return {
        id: r.id,
        title: r.title,
        category: r.category,
        location: r.location,
        description: r.description,
        status: statusMap[r.status] || "pending",
        createdAt: new Date(r.createdAt).toLocaleDateString("es-CO", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
        imageUrl: r.imageUrl || undefined,
        upvotesCount: r.upvotesCount,
        aiDuplicateCount: r.aiDuplicateCount,
        isPriority: r.isPriority,
        assignedTo: r.assignedTo || undefined,
        rejectionReason: (r.rejectionReason as RejectionReasonType) || undefined,
        rejectionNotes: r.rejectionNotes || undefined,
        resolutionNotes: r.resolutionNotes || undefined,
        resolutionImageUrl: r.resolutionImageUrl || undefined,
        student: r.user
          ? {
              name: r.user.name || "Estudiante GABO",
              grade: "Estudiante",
              email: r.user.email || "estudiante@iegabo.edu.co",
              avatarUrl: r.user.image || undefined,
            }
          : undefined,
        history: r.history.map((h) => ({
          timestamp: new Date(h.createdAt).toLocaleDateString("es-CO", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: statusMap[h.status] || "pending",
          actor: h.actor,
          note: h.note || undefined,
          resolutionImageUrl: h.resolutionImageUrl || undefined,
        })),
      };
    });
  } catch (error) {
    console.error("Error al consultar reportes de PostgreSQL:", error);
    return [];
  }
}

export async function createReportAction(data: {
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl?: string;
  userId?: string;
  userName?: string;
}): Promise<ReportItem> {
  // Sanitizar userId — string vacío o no válido se convierte en undefined
  const safeUserId = data.userId && data.userId.trim().length > 0 ? data.userId : undefined;

  try {
    const newReport = await prisma.report.create({
      data: {
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        imageUrl: data.imageUrl || null,
        status: "PENDING",
        userId: safeUserId,
        history: {
          create: {
            status: "PENDING",
            actor: data.userName || "Estudiante GABO",
            note: "Reporte registrado y persistido en PostgreSQL.",
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        history: true,
      },
    });

    return {
      id: newReport.id,
      title: newReport.title,
      category: newReport.category,
      location: newReport.location,
      description: newReport.description,
      status: "pending",
      createdAt: "Hace un momento",
      imageUrl: newReport.imageUrl || undefined,
      upvotesCount: newReport.upvotesCount,
      aiDuplicateCount: newReport.aiDuplicateCount,
      isPriority: newReport.isPriority,
      student: {
        name: data.userName || "Estudiante GABO",
        grade: "Estudiante",
        email: "estudiante@iegabo.edu.co",
      },
      history: [
        {
          timestamp: "Hace un momento",
          status: "pending",
          actor: data.userName || "Estudiante GABO",
          note: "Reporte registrado y persistido en PostgreSQL.",
        },
      ],
    };
  } catch (error) {
    console.error("[createReportAction] Error al crear reporte en DB:", error);
    throw new Error("No se pudo guardar el reporte en la base de datos.");
  }
}

export async function updateReportStatusAction(
  id: string,
  newStatus: StatusType,
  extraData?: {
    rejectionReason?: RejectionReasonType;
    rejectionNotes?: string;
    resolutionNotes?: string;
    resolutionImageUrl?: string;
    actorName?: string;
    assignedTo?: string;
  }
) {
  const statusMap: Record<StatusType, ReportStatus> = {
    pending: "PENDING",
    in_review: "IN_REVIEW",
    in_repair: "IN_REPAIR",
    resolved: "RESOLVED",
    rejected: "REJECTED",
  };

  const dbStatus = statusMap[newStatus];

  try {
    await prisma.report.update({
      where: { id },
      data: {
        status: dbStatus,
        assignedTo: extraData?.assignedTo,
        rejectionReason: extraData?.rejectionReason,
        rejectionNotes: extraData?.rejectionNotes,
        resolutionNotes: extraData?.resolutionNotes,
        resolutionImageUrl: extraData?.resolutionImageUrl,
        history: {
          create: {
            status: dbStatus,
            actor: extraData?.actorName || "Profesor / Coordinador GABO",
            note:
              newStatus === "rejected"
                ? `Rechazado: ${extraData?.rejectionNotes || "Moderación"}`
                : newStatus === "resolved"
                ? `Resuelto: ${extraData?.resolutionNotes || "Solución completada"}`
                : extraData?.assignedTo
                ? `Asignado a ${extraData.assignedTo}`
                : `Estado actualizado a ${newStatus}`,
            resolutionImageUrl: extraData?.resolutionImageUrl,
          },
        },
      },
    });
  } catch (error) {
    console.warn(`[updateReportStatusAction] El reporte "${id}" no existe en PostgreSQL DB (Mock report u omitido).`);
  }
}

export async function upvoteReportAction(id: string, delta: number = 1) {
  try {
    await prisma.report.update({
      where: { id },
      data: {
        upvotesCount: {
          increment: delta,
        },
      },
    });
  } catch (error) {
    console.warn(`[upvoteReportAction] El reporte "${id}" no existe en PostgreSQL DB (Mock report u omitido).`);
  }
}

