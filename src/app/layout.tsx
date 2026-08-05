import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadataBase = new URL("https://edufix-ai.vercel.app");

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "EduFix AI | Gestión Inteligente de Incidencias Escolares",
    template: "%s | EduFix AI",
  },
  description:
    "EduFix AI es una plataforma inteligente para la gestión de incidencias escolares que utiliza Inteligencia Artificial para detectar reportes duplicados, optimizar el mantenimiento y mejorar la comunicación entre estudiantes, coordinadores y personal de mantenimiento en la IE GABO.",
  keywords: [
    "EduFix AI",
    "Gestión Escolar",
    "Inteligencia Artificial",
    "Incidencias Escolares",
    "Next.js",
    "Supabase",
    "Google OAuth",
    "Prisma",
    "Mantenimiento Escolar",
    "Educación",
    "IA",
    "Software Escolar",
    "IE GABO",
  ],
  authors: [{ name: "Jancarlo GC", url: "https://github.com/JancarloGCdev" }],
  creator: "EduFix AI Team",
  publisher: "Institución educativa GABO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EduFix AI | Gestión Inteligente de Incidencias Escolares",
    description:
      "Plataforma inteligente de gestión de incidencias físicas e infraestructura escolar con IA, Supabase Realtime y seguimiento en tiempo real para la IE GABO.",
    url: "https://edufix-ai.vercel.app",
    siteName: "EduFix AI",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduFix AI | Gestión Inteligente de Incidencias Escolares",
    description:
      "Plataforma SaaS con IA para reportar y reparar fallas de infraestructura en la IE GABO.",
    creator: "@EduFixAI",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "EduFix AI",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  url: "https://edufix-ai.vercel.app",
  author: {
    "@type": "Organization",
    name: "Institución educativa GABO (IE GABO)",
  },
  description:
    "Plataforma SaaS inteligente para la gestión de incidencias físicas e infraestructura escolar en tiempo real mediante Visión por Computadora e Inteligencia Artificial.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "COP",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
