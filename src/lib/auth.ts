import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { authConfig } from "@/src/lib/auth.config";
import { prisma } from "@/src/lib/prisma";
import { DEFAULT_USER_ROLE, isUserRole } from "@/src/types/auth";

/**
 * Auth.js v5 entrypoint for EduFix AI.
 * Wire Google OAuth via AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET + AUTH_SECRET.
 * Persists and updates user roles dynamically from PostgreSQL.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }

      // Sincronizar el rol en tiempo real desde la base de datos PostgreSQL
      const userId = (token.id as string) || (token.sub as string);
      if (userId) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
          });
          if (dbUser?.role) {
            token.role = dbUser.role;
          }
        } catch (err) {
          console.error("Error al sincronizar rol en JWT desde la DB:", err);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const userId =
          typeof token.id === "string"
            ? token.id
            : typeof token.sub === "string"
              ? token.sub
              : "";

        session.user.id = userId;
        session.user.role = isUserRole(token.role)
          ? token.role
          : DEFAULT_USER_ROLE;
      }

      return session;
    },
  },
});
