import type { Metadata } from "next";
import { LoginCard } from "@/src/components/auth";

export const metadata: Metadata = {
  title: "Iniciar sesión | EduFix AI",
};

export default function LoginPage() {
  return <LoginCard />;
}
