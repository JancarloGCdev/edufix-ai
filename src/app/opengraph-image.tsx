import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "EduFix AI - Gestión Inteligente de Incidencias Escolares";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e1b4b 100%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(59, 130, 246, 0.2)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "9999px",
              padding: "8px 20px",
              fontSize: "18px",
              fontWeight: 800,
              color: "#60a5fa",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            <span>✨ Impulsado por IA</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "9999px",
              padding: "8px 20px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#cbd5e1",
            }}
          >
            <span>IE Gabriel García Márquez (IE GABO)</span>
          </div>
        </div>

        {/* Center Main Title & Slogan */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #2563eb, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.4)",
              }}
            >
              🛠️
            </div>
            <h1
              style={{
                fontSize: "64px",
                fontWeight: 900,
                letterSpacing: "-2px",
                margin: 0,
                background: "linear-gradient(to right, #ffffff, #93c5fd)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              EduFix AI
            </h1>
          </div>

          <p
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#94a3b8",
              maxWidth: "900px",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Gestión Inteligente de Incidencias e Infraestructura Escolar en Tiempo Real.
          </p>
        </div>

        {/* Bottom Tech Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            width: "100%",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: 700, color: "#64748b" }}>
            TECNOLOGÍAS:
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              background: "rgba(59, 130, 246, 0.15)",
              color: "#60a5fa",
              padding: "6px 14px",
              borderRadius: "10px",
            }}
          >
            Next.js 16
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              padding: "6px 14px",
              borderRadius: "10px",
            }}
          >
            Supabase Realtime
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              background: "rgba(168, 85, 247, 0.15)",
              color: "#c084fc",
              padding: "6px 14px",
              borderRadius: "10px",
            }}
          >
            Prisma ORM
          </span>
          <span
            style={{
              fontSize: "16px",
              fontWeight: 800,
              background: "rgba(245, 158, 11, 0.15)",
              color: "#fbbf24",
              padding: "6px 14px",
              borderRadius: "10px",
            }}
          >
            Visión por Computadora AI
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
