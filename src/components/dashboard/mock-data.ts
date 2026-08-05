export type StatusType =
  | "pending"
  | "in_review"
  | "in_repair"
  | "resolved"
  | "rejected";

export type RejectionReasonType =
  | "non_institutional_image"
  | "offensive_content"
  | "spam"
  | "duplicate_report"
  | "low_quality_image"
  | "other";

export interface AIRiskAnalysis {
  isInappropriate: boolean;
  isSpam: boolean;
  isOffensive: boolean;
  isBlurry: boolean;
  belongsToInstitution: boolean;
  suggestedDuplicateId?: string;
  impactPriorityScore: number; // 1 to 10
}

export interface StudentInfo {
  name: string;
  grade: string;
  email: string;
  avatarUrl?: string;
}

export interface ReportHistoryEntry {
  timestamp: string;
  status: StatusType;
  actor: string;
  note?: string;
  resolutionImageUrl?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  category: string;
  location: string;
  status: StatusType;
  createdAt: string;
  imageUrl?: string;
  upvotesCount: number;
  description: string;
  aiDuplicateCount?: number;
  rejectionReason?: RejectionReasonType;
  rejectionNotes?: string;
  resolutionNotes?: string;
  resolutionImageUrl?: string;
  assignedTo?: string; // e.g. "Cuadrilla Mantenimiento General"
  student?: StudentInfo;
  history?: ReportHistoryEntry[];
  aiAnalysis?: AIRiskAnalysis;
  isPriority?: boolean;
}

export interface SummaryStats {
  pending: number;
  inReview: number;
  inRepair: number;
  resolved: number;
  rejected: number;
}

export const REJECTION_REASON_LABELS: Record<RejectionReasonType, string> = {
  non_institutional_image: "Imagen no relacionada con la institución",
  offensive_content: "Contenido ofensivo o inapropiado",
  spam: "Reporte detectado como spam",
  duplicate_report: "Reporte duplicado ya existente",
  low_quality_image: "Imagen ilegible o de baja calidad",
  other: "Rechazado por moderación institucional",
};

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: "REP-104",
    title: "Proyector sin señal en Salón 204",
    category: "Tecnología",
    location: "Bloque B - Piso 2",
    status: "in_review",
    createdAt: "Hace 2 horas",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    aiDuplicateCount: 3,
    upvotesCount: 15,
    isPriority: true,
    description: "El proyector muestra una pantalla azul parpadeante con la etiqueta 'Sin Entrada Directa'. Imposible ver presentaciones de clase.",
    assignedTo: "Equipo de Sistemas y Tecnología",
    student: {
      name: "Mateo Bermúdez",
      grade: "11°A",
      email: "m.bermudez@iegabo.edu.co",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    },
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 9,
    },
    history: [
      {
        timestamp: "Hace 2 horas",
        status: "pending",
        actor: "Estudiante Mateo Bermúdez",
        note: "Reporte creado mediante escaneo de cámara IA.",
      },
      {
        timestamp: "Hace 45 minutos",
        status: "in_review",
        actor: "Profesor Carlos Mendoza",
        note: "Asignado a revisión técnica de sistemas.",
      },
    ],
  },
  {
    id: "REP-110",
    title: "Aire Acondicionado fuera de servicio en Biblioteca",
    category: "Climatización",
    location: "Edificio Central - Piso 2",
    status: "in_repair",
    createdAt: "Hace 4 horas",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    aiDuplicateCount: 14,
    upvotesCount: 29,
    isPriority: true,
    description: "Temperatura ambiente muy elevada durante horas de estudio vespertino y lectura silenciosa.",
    assignedTo: "Técnico Mantenimiento GABO",
    student: {
      name: "Valeria Gómez",
      grade: "10°B",
      email: "v.gomez@iegabo.edu.co",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 9,
    },
    history: [
      {
        timestamp: "Hace 4 horas",
        status: "pending",
        actor: "Estudiante Valeria Gómez",
        note: "Creación de reporte comunitario.",
      },
      {
        timestamp: "Hace 1 hora",
        status: "in_repair",
        actor: "Técnico Mantenimiento GABO",
        note: "Se inició desarme de unidad de compresor.",
      },
    ],
  },
  {
    id: "REP-102",
    title: "Fuga de agua en lavamanos del baño de niñas",
    category: "Fontanería",
    location: "Bloque A - Piso 1",
    status: "pending",
    createdAt: "Ayer a las 3:15 PM",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    aiDuplicateCount: 7,
    upvotesCount: 12,
    isPriority: true,
    description: "La llave principal no cierra bien y hay constante goteo en el piso principal del bloque de bachillerato.",
    student: {
      name: "Camila Torres",
      grade: "11°B",
      email: "c.torres@iegabo.edu.co",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 8,
    },
    history: [
      {
        timestamp: "Ayer a las 3:15 PM",
        status: "pending",
        actor: "Estudiante Camila Torres",
        note: "Ingresado al sistema.",
      },
    ],
  },
  {
    id: "REP-098",
    title: "Ventilador de techo emite ruido metálico",
    category: "Mantenimiento",
    location: "Laboratorio de Física",
    status: "pending",
    createdAt: "Hace 3 días",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
    upvotesCount: 3,
    isPriority: false,
    description: "Al encender en velocidad 3 tiembla y produce un chasquido fuerte que distrae durante el desarrollo de la clase.",
    student: {
      name: "Santiago Ruiz",
      grade: "9°C",
      email: "s.ruiz@iegabo.edu.co",
    },
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 6,
    },
    history: [
      {
        timestamp: "Hace 3 días",
        status: "pending",
        actor: "Estudiante Santiago Ruiz",
        note: "Reporte recibido.",
      },
    ],
  },
  {
    id: "REP-091",
    title: "Foto personal adjuntada en lugar del daño",
    category: "Otros",
    location: "Patio Central",
    status: "rejected",
    createdAt: "Hace 4 días",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    upvotesCount: 1,
    isPriority: false,
    description: "La imagen enviada no muestra una falla física del colegio sino una selfie de prueba.",
    rejectionReason: "non_institutional_image",
    rejectionNotes: "La IA de EduFix y la moderación descartaron el reporte al no detectar elementos de la infraestructura institucional.",
    student: {
      name: "Felipe Soto",
      grade: "8°A",
      email: "f.soto@iegabo.edu.co",
    },
    aiAnalysis: {
      isInappropriate: false,
      isSpam: true,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: false,
      impactPriorityScore: 1,
    },
    history: [
      {
        timestamp: "Hace 4 días",
        status: "pending",
        actor: "Estudiante Felipe Soto",
        note: "Ingreso inicial.",
      },
      {
        timestamp: "Hace 4 días",
        status: "rejected",
        actor: "Moderador IA / Coordinación",
        note: "Rechazado: Imagen no pertenece a las instalaciones de la IE GABO.",
      },
    ],
  },
  {
    id: "REP-089",
    title: "Enchufe quemado cerca al escritorio del docente",
    category: "Electricidad",
    location: "Salón 108",
    status: "resolved",
    createdAt: "Hace 5 días",
    imageUrl: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&auto=format&fit=crop&q=80",
    upvotesCount: 8,
    isPriority: false,
    description: "Reemplazado por personal de mantenimiento técnico con toma doble certificada y canaleta de protección.",
    resolutionNotes: "Se reemplazó el tomacorriente dañado y se colocó protección térmica adicional.",
    resolutionImageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    student: {
      name: "Lucía Ortiz",
      grade: "10°A",
      email: "l.ortiz@iegabo.edu.co",
    },
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 10,
    },
    history: [
      {
        timestamp: "Hace 5 días",
        status: "pending",
        actor: "Estudiante Lucía Ortiz",
        note: "Reporte creado.",
      },
      {
        timestamp: "Hace 4 días",
        status: "in_review",
        actor: "Profesor Carlos Mendoza",
        note: "Enviado a cuadrilla de mantenimiento eléctrico.",
      },
      {
        timestamp: "Hace 2 días",
        status: "resolved",
        actor: "Técnico Mantenimiento GABO",
        note: "Reparación completada y verificada.",
        resolutionImageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
      },
    ],
  },
];

export const INITIAL_POPULAR_REPORTS: ReportItem[] = INITIAL_REPORTS.filter((r) => r.upvotesCount > 5);

/**
 * Formatea un ID de reporte para mostrar siempre una etiqueta limpia tipo "REP-01", "REP-104", etc.
 */
export function formatReportId(id?: string, index?: number): string {
  if (!id) {
    return typeof index === "number" ? `REP-${String(index + 1).padStart(2, "0")}` : "REP-01";
  }

  // Si ya viene formateado como REP-104, REP-01, etc.
  if (/^REP-/i.test(id)) {
    return id.toUpperCase();
  }

  // Si tenemos el índice ordinal en la lista, usamos REP-01, REP-02...
  if (typeof index === "number" && index >= 0) {
    return `REP-${String(index + 1).padStart(2, "0")}`;
  }

  // Si es un CUID/UUID de base de datos sin índice disponible, generamos un número 2 dígitos determinista
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const num = (Math.abs(hash) % 99) + 1;
  return `REP-${String(num).padStart(2, "0")}`;
}

