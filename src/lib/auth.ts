import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/src/lib/auth.config";
import { prisma } from "@/src/lib/prisma";

/**
 * Auth.js v5 entrypoint for EduFix AI.
 * Wire Google OAuth via AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET + AUTH_SECRET.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
});
