"use server";

import { signIn, signOut } from "@/src/lib/auth";

export async function signInWithGoogle() {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
}

export async function signOutCurrentUser() {
  await signOut({
    redirectTo: "/",
  });
}
