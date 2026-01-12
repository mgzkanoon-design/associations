import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabaseServer"

function csvEscape(v: any) {
  const s = String(v ?? "")
  return `"${s.replace(/"/g, '""')}"`
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") ?? "").trim()
  const status = (searchParams.get("status") ?? "").trim()
  const sort = (searchParams.get("sort") ?? "newest") === "oldest" ? "oldest" : "newest"

  let query = supabaseServer
    .from("messages")
    .select("name,email,phone,message,status,created_at")

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,email.ilike.%${q}%,message.ilike.%${q}%,phone.ilike.%${q}%`
    )
  }
  if (status) {
    query = query.eq("status", status)
  }

  query = query.order("created_at", { ascending: sort === "oldest" })

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = data ?? []
  const header = ["Name", "Email", "Phone", "Message", "Status", "Date"]
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        csvEscape(r.name),
        csvEscape(r.email),
        csvEscape(r.phone),
        csvEscape(r.message),
        csvEscape(r.status),
        csvEscape(r.created_at),
      ].join(",")
    ),
  ]

  const csv = lines.join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="contact-requests.csv"`,
    },
  })
}
