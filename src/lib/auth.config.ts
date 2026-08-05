import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { isAllowedInstitutionalEmail } from "@/src/services/auth/domain";
import { DEFAULT_USER_ROLE, isUserRole } from "@/src/types/auth";

/**
 * Edge-safe Auth.js config (no Prisma).
 * Google provider reads AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET from env.
 */
export const authConfig = {
  providers: [
    Google({
      // Credentials are resolved from AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET.
      // Leave unset until Google Cloud OAuth client is configured.
      allowDangerousEmailAccountLinking: false,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Domain restriction — active once Google OAuth is connected.
      if (account?.provider === "google") {
        return isAllowedInstitutionalEmail(user.email);
      }

      return false;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.role = isUserRole(user.role) ? user.role : DEFAULT_USER_ROLE;
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
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;

      if (pathname.startsWith("/dashboard") || pathname.startsWith("/reports")) {
        return isLoggedIn;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
