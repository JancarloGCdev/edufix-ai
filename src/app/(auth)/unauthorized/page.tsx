import type { Metadata } from "next";
import { UnauthorizedCard } from "@/src/components/auth";

export const metadata: Metadata = {
  title: "Acceso no autorizado | EduFix AI",
};

type UnauthorizedPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function UnauthorizedPage({
  searchParams,
}: UnauthorizedPageProps) {
  const params = await searchParams;

  return <UnauthorizedCard reason={params.error} />;
}
