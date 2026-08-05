import { ALLOWED_EMAIL_DOMAIN } from "@/src/types/auth";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getEmailDomain(email: string): string | null {
  const normalized = normalizeEmail(email);
  const atIndex = normalized.lastIndexOf("@");

  if (atIndex <= 0 || atIndex === normalized.length - 1) {
    return null;
  }

  return normalized.slice(atIndex + 1);
}

/**
 * Institutional domain gate for Google OAuth.
 * Ready for production once AUTH_GOOGLE_* credentials are configured.
 */
export function isAllowedInstitutionalEmail(
  email: string | null | undefined,
  allowedDomain: string = ALLOWED_EMAIL_DOMAIN
): boolean {
  if (!email) {
    return false;
  }

  const domain = getEmailDomain(email);
  return domain === allowedDomain.toLowerCase();
}
