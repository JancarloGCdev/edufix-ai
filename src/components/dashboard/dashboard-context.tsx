"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import {
  ReportItem,
  SummaryStats,
  INITIAL_REPORTS,
  INITIAL_POPULAR_REPORTS,
  StatusType,
  AIRiskAnalysis,
} from "./mock-data";
import { uploadReportImageToStorage } from "@/src/services/storage";

interface DashboardContextType {
  reports: ReportItem[];
  popularReports: ReportItem[];
  stats: SummaryStats;
  addReportWithImage: (data: {
    title: string;
    category: string;
    location: string;
    description: string;
    imageFile?: File;
  }) => Promise<void>;
  upvoteReport: (id: string) => void;
  upvotedIds: Set<string>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [popularReports, setPopularReports] = useState<ReportItem[]>(INITIAL_POPULAR_REPORTS);
  const [upvotedIds, setUpvotedIds] = useState<Set<string>>(new Set());

  // Cálculo automático de indicadores en tiempo real
  const stats: SummaryStats = useMemo(() => {
    const counts = { pending: 0, inReview: 0, resolved: 0, rejected: 0 };
    reports.forEach((r) => {
      if (r.status === "pending") counts.pending++;
      if (r.status === "in_review") counts.inReview++;
      if (r.status === "resolved") counts.resolved++;
      if (r.status === "rejected") counts.rejected++;
    });
    return counts;
  }, [reports]);

  const analyzeWithAI = (title: string, description: string): AIRiskAnalysis => {
    const isSpam = title.length < 4 || description.toLowerCase().includes("test");
    const isOffensive = description.toLowerCase().includes("grosero") || description.toLowerCase().includes("tonto");

    return {
      isInappropriate: false,
      isSpam,
      isOffensive,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: isSpam || isOffensive ? 2 : 8,
    };
  };

  const addReportWithImage = useCallback(
    async (data: {
      title: string;
      category: string;
      location: string;
      description: string;
      imageFile?: File;
    }) => {
      let imageUrl = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80";

      // 1. Subida a Supabase Storage al publicar
      if (data.imageFile) {
        imageUrl = await uploadReportImageToStorage(data.imageFile);
      }

      // 2. Evaluación de IA simulada
      const aiAnalysis = analyzeWithAI(data.title, data.description);
      const initialStatus: StatusType = aiAnalysis.isSpam || aiAnalysis.isOffensive ? "rejected" : "pending";

      const newReport: ReportItem = {
        id: `REP-${Math.floor(100 + Math.random() * 900)}`,
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        status: initialStatus,
        createdAt: "Hace un momento",
        imageUrl,
        upvotesCount: 1,
        aiAnalysis,
        rejectionReason: initialStatus === "rejected" ? "spam" : undefined,
        rejectionNotes: initialStatus === "rejected" ? "La IA de EduFix detectó contenido inadecuado o no institucional." : undefined,
      };

      // 3. Reactividad inmediata en tiempo real
      setReports((prev) => [newReport, ...prev]);

      if (initialStatus !== "rejected") {
        setPopularReports((prev) => [newReport, ...prev]);
      }
    },
    []
  );

  const upvoteReport = useCallback((id: string) => {
    setUpvotedIds((prev) => {
      const next = new Set(prev);
      const isCurrentlyUpvoted = next.has(id);

      if (isCurrentlyUpvoted) {
        next.delete(id);
      } else {
        next.add(id);
      }

      setReports((prevReports) =>
        prevReports.map((r) =>
          r.id === id ? { ...r, upvotesCount: r.upvotesCount + (isCurrentlyUpvoted ? -1 : 1) } : r
        )
      );
      setPopularReports((prevPopular) =>
        prevPopular.map((r) =>
          r.id === id ? { ...r, upvotesCount: r.upvotesCount + (isCurrentlyUpvoted ? -1 : 1) } : r
        )
      );

      return next;
    });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        reports,
        popularReports,
        stats,
        addReportWithImage,
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
