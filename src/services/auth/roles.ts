import type { UserRole } from "@/src/types/auth";
import { isUserRole } from "@/src/types/auth";

export function hasRole(
  role: UserRole | null | undefined,
  allowed: UserRole | UserRole[]
): boolean {
  if (!role || !isUserRole(role)) {
    return false;
  }

  const allowedRoles = Array.isArray(allowed) ? allowed : [allowed];
  return allowedRoles.includes(role);
}

export function isStaffRole(role: UserRole | null | undefined): boolean {
  return hasRole(role, ["ADMIN", "MAINTENANCE", "TEACHER"]);
}

export function isAdminRole(role: UserRole | null | undefined): boolean {
  return hasRole(role, "ADMIN");
}
