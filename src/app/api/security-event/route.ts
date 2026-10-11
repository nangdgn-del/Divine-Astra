import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTelegramAlert } from "@/lib/telegram";

const schema = z.object({
  eventType: z.enum(["admin_login_failed", "admin_login_success", "account_lockout"]),
  detail: z.string().max(300).optional()
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  const admin = createAdminClient();
  const { error } = await admin.from("security_events").insert({
    event_type: parsed.data.eventType,
    detail: parsed.data.detail || "Authentication event"
  });
  if (error) return NextResponse.json({ error: "Event could not be logged." }, { status: 500 });
  if (parsed.data.eventType !== "admin_login_success") {
    await sendTelegramAlert(`Divine Astra security alert\nEvent: ${parsed.data.eventType}\nDetail: ${parsed.data.detail || "No extra detail"}\nTime: ${new Date().toISOString()}`);
  }
  return NextResponse.json({ ok: true });
}
