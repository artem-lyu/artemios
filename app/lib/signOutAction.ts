// signOutAction.ts
'use server';

import { signOut } from "@/auth"; // Adjust the import according to your setup

export async function handleSignOut() {
  await signOut();
}
