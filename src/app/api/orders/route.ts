import { NextResponse } from "next/server";
import { z } from "zod";
import { getSignedInUser } from "@/lib/auth";
import { products } from "@/lib/catalog";
import { createAdminClient } from "@/lib/supabase/admin";

const schema = z.object({ productId: z.string().min(1), quantity: z.number().int().min(1).max(10) });

export async function POST(request: Request) {
  const { user } = await getSignedInUser();
  if (!user) return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid order." }, { status: 400 });
  const product = products.find(p => p.id === parsed.data.productId && p.status === "Available");
  if (!product) return NextResponse.json({ error: "Product unavailable." }, { status: 400 });
  const admin = createAdminClient();
  const { data, error } = await admin.from("orders").insert({
    customer_id: user.id, customer_email: user.email, product_id: product.id,
    product_name: product.name, quantity: parsed.data.quantity,
    total: product.price * parsed.data.quantity, status: "pending"
  }).select("id,total,status").single();
  if (error) return NextResponse.json({ error: "Could not create order." }, { status: 500 });
  return NextResponse.json({ order: data, message: "Order created. Contact the shopkeeper to arrange payment." }, { status: 201 });
}
