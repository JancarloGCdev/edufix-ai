import type { Metadata } from "next";
import { SchoolLogo } from "@/src/components/common";

export const metadata: Metadata = {
  title: "Acceso | EduFix AI",
  description: "Inicia sesión en EduFix AI con tu cuenta institucional.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // GSAP: fade-in general de pantallas de autenticación
    <div
      data-gsap="auth-shell"
      className="relative flex min-h-full flex-1 flex-col bg-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_0%,oklch(0.93_0.05_255),transparent)]"
      />
      <div className="relative flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6">
        <div className="mb-8 flex justify-center">
          <SchoolLogo size="md" priority />
        </div>
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    </div>
  );
}
