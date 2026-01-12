import Link from "next/link"
import { supabaseServer } from "@/lib/supabaseServer"

type SearchParams = {
  q?: string
  status?: string
  page?: string
  per?: string
  sort?: string // "newest" | "oldest"
}

function toInt(v: string | undefined, def: number) {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : def
}

function formatDate(d: string) {
  const dt = new Date(d)
  return dt.toLocaleString("fr-FR") // بدك عربي؟ خلّيها ar-SY
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const sp = await searchParams
  const q = (sp.q ?? "").trim()
  const status = (sp.status ?? "").trim() // new|contacted|closed
  const page = toInt(sp.page, 1)
  const per = Math.min(toInt(sp.per, 20), 100)
  const sort = (sp.sort ?? "newest") as "newest" | "oldest"

  const from = (page - 1) * per
  const to = from + per - 1

  let query = supabaseServer
    .from("messages")
    .select("id,name,email,phone,message,status,created_at", { count: "exact" })

  if (q) {
    // بحث على الاسم + الإيميل + الرسالة + الهاتف
    query = query.or(
      `name.ilike.%${q}%,email.ilike.%${q}%,message.ilike.%${q}%,phone.ilike.%${q}%`
    )
  }

  if (status) {
    query = query.eq("status", status)
  }

  query = query.order("created_at", { ascending: sort === "oldest" })
  query = query.range(from, to)

  const { data, count, error } = await query

  if (error) {
    return (
      <main className="container mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold">Admin — Messages</h1>
        <p className="mt-4 text-red-600">Error: {error.message}</p>
      </main>
    )
  }

  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / per))

  const exportUrl = `/api/admin/messages/export?q=${encodeURIComponent(q)}&status=${encodeURIComponent(
    status
  )}&sort=${encodeURIComponent(sort)}`

  return (
    <main className="container mx-auto px-4 sm:px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin — Contact Requests</h1>
          <p className="text-sm text-muted-foreground">
            Total: {total} • Page {page} / {totalPages}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            className="rounded-lg border px-3 py-2 text-sm hover:bg-muted"
            href={exportUrl}
          >
            Export CSV
          </Link>
        </div>
      </div>

      {/* Filters */}
      <form className="grid gap-3 md:grid-cols-12 mb-6">
        <input type="hidden" name="page" value="1" />

        <input
          name="q"
          defaultValue={q}
          placeholder="Search (name, email, phone, message)…"
          className="md:col-span-5 rounded-lg border px-3 py-2"
        />

        <select
          name="status"
          defaultValue={status}
          className="md:col-span-2 rounded-lg border px-3 py-2"
        >
          <option value="">All status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>

        <select
          name="sort"
          defaultValue={sort}
          className="md:col-span-2 rounded-lg border px-3 py-2"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <select
          name="per"
          defaultValue={String(per)}
          className="md:col-span-2 rounded-lg border px-3 py-2"
        >
          <option value="10">10 / page</option>
          <option value="20">20 / page</option>
          <option value="50">50 / page</option>
          <option value="100">100 / page</option>
        </select>

        <button
          type="submit"
          className="md:col-span-1 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground hover:opacity-95"
        >
          Go
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-background">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/40">
            <tr className="text-left">
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Phone</th>
              <th className="p-3 font-semibold">Message</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Date</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-3 whitespace-nowrap">{m.name}</td>
                <td className="p-3 whitespace-nowrap">
                  <a className="underline" href={`mailto:${m.email}`}>
                    {m.email}
                  </a>
                </td>
                <td className="p-3 whitespace-nowrap">{m.phone ?? "—"}</td>
                <td className="p-3 min-w-[320px]">{m.message}</td>
                <td className="p-3 whitespace-nowrap">{m.status ?? "new"}</td>
                <td className="p-3 whitespace-nowrap">{formatDate(m.created_at)}</td>
                <td className="p-3 whitespace-nowrap">
                  <form action="/api/admin/messages/status" method="POST" className="flex gap-2">
                    <input type="hidden" name="id" value={m.id} />
                    <select name="status" defaultValue={m.status ?? "new"} className="rounded border px-2 py-1">
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                    <button className="rounded border px-2 py-1 hover:bg-muted" type="submit">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}

            {(!data || data.length === 0) && (
              <tr>
                <td className="p-6 text-muted-foreground" colSpan={7}>
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <Link
          className={`rounded-lg border px-3 py-2 text-sm hover:bg-muted ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
          href={`?q=${encodeURIComponent(q)}&status=${encodeURIComponent(status)}&sort=${encodeURIComponent(sort)}&per=${per}&page=${page - 1}`}
        >
          ← Prev
        </Link>

        <div className="text-sm text-muted-foreground">
          Showing {from + 1}–{Math.min(to + 1, total)} of {total}
        </div>

        <Link
          className={`rounded-lg border px-3 py-2 text-sm hover:bg-muted ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
          href={`?q=${encodeURIComponent(q)}&status=${encodeURIComponent(status)}&sort=${encodeURIComponent(sort)}&per=${per}&page=${page + 1}`}
        >
          Next →
        </Link>
      </div>
    </main>
  )
}
