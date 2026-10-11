import { createClient } from "@/lib/supabase/server";

export async function getSignedInUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return { supabase, user };
}

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(v => v.trim().toLowerCase()).filter(Boolean);
  return allowed.includes(email.toLowerCase());
}
