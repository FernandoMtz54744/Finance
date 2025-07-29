import { redirect } from "@tanstack/react-router";
import { supabase } from "./supabaseClient";

export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw redirect({ to: "/" });
  }
  return session.user;
}