import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EduFix AI — Gestión Inteligente de Incidencias Escolares",
    short_name: "EduFix AI",
    description:
      "Plataforma SaaS de gestión de incidencias físicas e infraestructura escolar impulsada por Inteligencia Artificial para la IE GABO.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
