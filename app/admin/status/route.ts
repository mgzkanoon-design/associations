import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

export async function POST(req: Request) {
  const form = await req.formData()
  const id = String(form.get("id") || "")
  const status = String(form.get("status") || "")

  if (!id || !status) {
    return NextResponse.json({ error: "Missing id/status" }, { status: 400 })
  }

  const allowed = new Set(["new", "contacted", "closed"])
  if (!allowed.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const { error } = await supabaseServer.from("messages").update({ status }).eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // رجّع المستخدم للصفحة السابقة
  return NextResponse.redirect(new URL("/admin/messages", req.url), 303)
}
