export type StatusType = "pending" | "in_review" | "resolved" | "rejected";

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
  aiAnalysis?: AIRiskAnalysis;
}

export interface SummaryStats {
  pending: number;
  inReview: number;
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
    upvotesCount: 5,
    description: "El proyector muestra una pantalla azul parpadeante con la etiqueta 'Sin Entrada Directa'. Imposible ver presentaciones de clase.",
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 8,
    },
  },
  {
    id: "REP-102",
    title: "Fuga de agua en lavamanos del baño de niñas",
    category: "Fontanería / Infraestructura",
    location: "Bloque A - Piso 1",
    status: "pending",
    createdAt: "Ayer a las 3:15 PM",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80",
    aiDuplicateCount: 7,
    upvotesCount: 12,
    description: "La llave principal no cierra bien y hay constante goteo en el piso principal del bloque de bachillerato.",
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 9,
    },
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
    description: "Al encender en velocidad 3 tiembla y produce un chasquido fuerte que distrae durante el desarrollo de la clase.",
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 6,
    },
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
    description: "La imagen enviada no muestra una falla física del colegio sino una selfie de prueba.",
    rejectionReason: "non_institutional_image",
    rejectionNotes: "La IA de EduFix y la moderación descartaron el reporte al no detectar elementos de la infraestructura institucional.",
    aiAnalysis: {
      isInappropriate: false,
      isSpam: true,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: false,
      impactPriorityScore: 1,
    },
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
    description: "Reemplazado por personal de mantenimiento técnico con toma doble certificada y canaleta de protección.",
    aiAnalysis: {
      isInappropriate: false,
      isSpam: false,
      isOffensive: false,
      isBlurry: false,
      belongsToInstitution: true,
      impactPriorityScore: 10,
    },
  },
];

export const INITIAL_POPULAR_REPORTS: ReportItem[] = [
  {
    id: "REP-110",
    title: "Aire Acondicionado fuera de servicio en Biblioteca",
    category: "Climatización",
    location: "Edificio Central",
    status: "in_review",
    createdAt: "Hace 4 horas",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    aiDuplicateCount: 14,
    upvotesCount: 29,
    description: "Temperatura ambiente muy elevada durante horas de estudio vespertino y lectura silenciosa.",
  },
  {
    id: "REP-107",
    title: "Cerradura trancada en la puerta del Gimnasio",
    category: "Infraestructura",
    location: "Área Deportiva",
    status: "pending",
    createdAt: "Hace 1 día",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&auto=format&fit=crop&q=80",
    aiDuplicateCount: 9,
    upvotesCount: 22,
    description: "Cuesta trabajo abrir la chapa de acceso principal desde afuera durante los descansos.",
  },
  {
    id: "REP-095",
    title: "Falta de jabón en dispensadores de sanitarios",
    category: "Aseo e Higiene",
    location: "Bloque C - Todos los pisos",
    status: "pending",
    createdAt: "Hace 2 días",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    aiDuplicateCount: 18,
    upvotesCount: 34,
    description: "Dispensadores vacíos desde el cambio de jornada del martes.",
  },
];
