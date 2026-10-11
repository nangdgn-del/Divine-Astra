import { NextResponse } from "next/server";
import { getSignedInUser, isAdminEmail } from "@/lib/auth";
import { sendTelegramAlert } from "@/lib/telegram";

export async function POST() {
  const { user } = await getSignedInUser();
  const email = user?.email ?? null;
  const allowed = Boolean(user && isAdminEmail(email));
  if (allowed) await sendTelegramAlert(`Divine Astra: authorized admin session started.\nAccount: ${email}\nTime: ${new Date().toISOString()}`);
  return NextResponse.json({ authorized: allowed }, { status: allowed ? 200 : 403 });
}
