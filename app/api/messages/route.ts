import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function GET() {
  return NextResponse.json({ ok: true, route: "messages" })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
const { name, email, phone, message, locale } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

   const { error } = await supabaseServer.from("messages").insert([
  { name, email, phone: phone ?? null, message, locale: locale ?? null },
]);
    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err: any) {
    // ✅ This will show the REAL reason in terminal
    console.error("POST /api/messages crash:", err)
    return NextResponse.json(
      { error: String(err?.message ?? err ?? "Server crash") },
      { status: 500 }
    )
  }
}
