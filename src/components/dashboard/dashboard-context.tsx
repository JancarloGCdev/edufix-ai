"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import {
  ReportItem,
  SummaryStats,
  INITIAL_REPORTS,
  INITIAL_POPULAR_REPORTS,
  StatusType,
  RejectionReasonType,
  AIRiskAnalysis,
} from "./mock-data";
import { uploadReportImageToStorage } from "@/src/services/storage";
import {
  fetchAllReportsAction,
  createReportAction,
  updateReportStatusAction,
  upvoteReportAction,
} from "@/src/features/reports/actions";
import { supabase } from "@/src/lib/supabase";
import type { AuthUser } from "@/src/services/auth/session";

interface DashboardContextType {
  reports: ReportItem[];
  popularReports: ReportItem[];
  stats: SummaryStats;
  isLoading: boolean;
  addReportWithImage: (data: {
    title: string;
    category: string;
    location: string;
    description: string;
    imageFile?: File;
  }) => Promise<void>;
  updateReportStatus: (
    id: string,
    newStatus: StatusType,
    extraData?: {
      rejectionReason?: RejectionReasonType;
      rejectionNotes?: string;
      resolutionNotes?: string;
      resolutionFile?: File;
      actorName?: string;
    }
  ) => Promise<void>;
  upvoteReport: (id: string) => void;
  upvotedIds: Set<string>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode; user?: AuthUser }> = ({
  children,
  user,
}) => {
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1. Cargar reportes persistidos en PostgreSQL al montar el Dashboard
  useEffect(() => {
    let isMounted = true;
    async function loadReports() {
      try {
        const dbReports = await fetchAllReportsAction();
        if (isMounted && dbReports.length > 0) {
          setReports((prev) => {
            const dbIds = new Set(dbReports.map((r) => r.id));
            const uniqueMock = prev.filter((r) => !dbIds.has(r.id));
            return [...dbReports, ...uniqueMock];
          });
        }
      } catch (err) {
        console.error("Error al cargar reportes persistidos:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadReports();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Suscripción a Supabase Realtime para sincronización instantánea entre todos los usuarios conectados
  useEffect(() => {
    const channel = supabase
      .channel("public:Report")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "Report",
        },
        (payload) => {
          // Evento INSERT (Nuevo reporte creado por cualquier usuario)
          if (payload.eventType === "INSERT" && payload.new) {
            const newDbReport = payload.new as any;
            const newReportItem: ReportItem = {
              id: newDbReport.id,
              title: newDbReport.title,
              category: newDbReport.category,
              location: newDbReport.location,
              description: newDbReport.description,
              status: (newDbReport.status?.toLowerCase() as StatusType) || "pending",
              createdAt: "Hace un momento",
              imageUrl: newDbReport.imageUrl || undefined,
              upvotesCount: newDbReport.upvotesCount || 0,
              aiDuplicateCount: newDbReport.aiDuplicateCount || 0,
              isPriority: newDbReport.isPriority || false,
              assignedTo: newDbReport.assignedTo || undefined,
              rejectionReason: newDbReport.rejectionReason || undefined,
              rejectionNotes: newDbReport.rejectionNotes || undefined,
              resolutionNotes: newDbReport.resolutionNotes || undefined,
              resolutionImageUrl: newDbReport.resolutionImageUrl || undefined,
              student: {
                name: "Comunidad GABO",
                grade: "Estudiante",
                email: "comunidad@iegabo.edu.co",
              },
              history: [
                {
                  timestamp: "Hace un momento",
                  status: (newDbReport.status?.toLowerCase() as StatusType) || "pending",
                  actor: "Comunidad GABO",
                  note: "Reporte recibido en tiempo real vía Supabase.",
                },
              ],
            };

            setReports((prev) => {
              if (prev.some((r) => r.id === newReportItem.id)) return prev;
              return [newReportItem, ...prev];
            });
          }

          // Evento UPDATE (Cambio de estado, asignación de mantenimiento, o incremento de apoyos)
          if (payload.eventType === "UPDATE" && payload.new) {
            const updatedDbReport = payload.new as any;
            const updatedStatus = (updatedDbReport.status?.toLowerCase() as StatusType) || "pending";

            setReports((prev) =>
              prev.map((r) => {
                if (r.id !== updatedDbReport.id) return r;

                const hasStatusChanged = r.status !== updatedStatus;
                const newHistoryEntry = hasStatusChanged
                  ? {
                      timestamp: "En vivo",
                      status: updatedStatus,
                      actor: "Actualización Realtime",
                      note: `Estado actualizado a ${updatedStatus}`,
                      resolutionImageUrl: updatedDbReport.resolutionImageUrl || undefined,
                    }
                  : null;

                return {
                  ...r,
                  status: updatedStatus,
                  upvotesCount: updatedDbReport.upvotesCount ?? r.upvotesCount,
                  assignedTo: updatedDbReport.assignedTo || r.assignedTo,
                  rejectionReason: updatedDbReport.rejectionReason || r.rejectionReason,
                  rejectionNotes: updatedDbReport.rejectionNotes || r.rejectionNotes,
                  resolutionNotes: updatedDbReport.resolutionNotes || r.resolutionNotes,
                  resolutionImageUrl: updatedDbReport.resolutionImageUrl || r.resolutionImageUrl,
                  history: newHistoryEntry ? [newHistoryEntry, ...(r.history || [])] : r.history,
                };
              })
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const popularReports = useMemo(() => {
    return reports.filter((r) => r.upvotesCount >= 5);
  }, [reports]);

  // Cálculo de estadísticas en tiempo real
  const stats: SummaryStats = useMemo(() => {
    const counts = { pending: 0, inReview: 0, inRepair: 0, resolved: 0, rejected: 0 };
    reports.forEach((r) => {
      if (r.status === "pending") counts.pending++;
      if (r.status === "in_review") counts.inReview++;
      if (r.status === "in_repair") counts.inRepair++;
      if (r.status === "resolved") counts.resolved++;
      if (r.status === "rejected") counts.rejected++;
    });
    return counts;
  }, [reports]);

  const addReportWithImage = useCallback(
    async (data: {
      title: string;
      category: string;
      location: string;
      description: string;
      imageFile?: File;
    }) => {
      let imageUrl: string | undefined = undefined;

      // 1. Optimizar (1200px / AVIF/WebP) y Subir imagen a Supabase Storage
      if (data.imageFile) {
        imageUrl = await uploadReportImageToStorage(data.imageFile);
      }

      // 2. Persistir el reporte directamente en PostgreSQL
      try {
        const createdReport = await createReportAction({
          title: data.title,
          category: data.category,
          location: data.location,
          description: data.description,
          imageUrl,
          userId: user?.id,
          userName: user?.name || "Estudiante GABO",
        });

        // 3. Mostrar inmediatamente en la interfaz local (Realtime sincroniza con los demás)
        setReports((prev) => {
          if (prev.some((r) => r.id === createdReport.id)) return prev;
          return [createdReport, ...prev];
        });
      } catch (error) {
        console.error("Error guardando reporte en PostgreSQL:", error);
      }
    },
    [user]
  );

  const updateReportStatus = useCallback(
    async (
      id: string,
      newStatus: StatusType,
      extraData?: {
        rejectionReason?: RejectionReasonType;
        rejectionNotes?: string;
        resolutionNotes?: string;
        resolutionFile?: File;
        actorName?: string;
      }
    ) => {
      let resolutionImageUrl: string | undefined = undefined;

      if (extraData?.resolutionFile) {
        resolutionImageUrl = await uploadReportImageToStorage(extraData.resolutionFile);
      }

      // Actualizar estado local inmediatamente
      setReports((prevReports) =>
        prevReports.map((r) => {
          if (r.id !== id) return r;

          const historyEntry = {
            timestamp: "Ahora mismo",
            status: newStatus,
            actor: extraData?.actorName || user?.name || "Profesor / Coordinador GABO",
            note:
              newStatus === "rejected"
                ? `Rechazado: ${extraData?.rejectionNotes || "Moderación institucional"}`
                : newStatus === "resolved"
                ? `Resuelto: ${extraData?.resolutionNotes || "Solución completada"}`
                : `Estado cambiado a ${newStatus}`,
            resolutionImageUrl,
          };

          return {
            ...r,
            status: newStatus,
            rejectionReason: newStatus === "rejected" ? extraData?.rejectionReason : r.rejectionReason,
            rejectionNotes: newStatus === "rejected" ? extraData?.rejectionNotes : r.rejectionNotes,
            resolutionNotes: newStatus === "resolved" ? extraData?.resolutionNotes : r.resolutionNotes,
            resolutionImageUrl: newStatus === "resolved" ? resolutionImageUrl : r.resolutionImageUrl,
            history: [historyEntry, ...(r.history || [])],
          };
        })
      );

      // Persistir cambio de estado en PostgreSQL para emitir evento Supabase Realtime a todos
      try {
        await updateReportStatusAction(id, newStatus, {
          rejectionReason: extraData?.rejectionReason,
          rejectionNotes: extraData?.rejectionNotes,
          resolutionNotes: extraData?.resolutionNotes,
          resolutionImageUrl,
          actorName: extraData?.actorName || user?.name || undefined,
        });
      } catch (err) {
        console.error("Error actualizando estado en PostgreSQL:", err);
      }
    },
    [user]
  );

  const upvoteReport = useCallback((id: string) => {
    let isCurrentlyUpvoted = false;

    setUpvotedIds((prev) => {
      isCurrentlyUpvoted = prev.has(id);
      const next = new Set(prev);
      if (isCurrentlyUpvoted) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    const delta = isCurrentlyUpvoted ? -1 : 1;

    setReports((prevReports) =>
      prevReports.map((r) =>
        r.id === id ? { ...r, upvotesCount: Math.max(0, r.upvotesCount + delta) } : r
      )
    );

    // Persistir en PostgreSQL para notificar Supabase Realtime a otros clientes
    upvoteReportAction(id, delta).catch(console.error);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        reports,
        popularReports,
        stats,
        isLoading,
        addReportWithImage,
        updateReportStatus,
        upvoteReport,
        upvotedIds,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
