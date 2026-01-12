import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin")
  if (!isAdminRoute) return NextResponse.next()

  // ✅ Read and normalize env values
  const user = (process.env.ADMIN_USER || "").trim()
  const pass = (process.env.ADMIN_PASSWORD || "").trim()

  // ✅ If env is missing, return a clear server error (not 401)
  if (!user || !pass) {
    console.error("Admin auth misconfigured: ADMIN_USER/ADMIN_PASSWORD missing")
    return new NextResponse("Server misconfigured: missing ADMIN_USER/ADMIN_PASSWORD", {
      status: 500,
    })
  }

  const auth = req.headers.get("authorization")

  // ✅ If no auth header, request Basic Auth
  if (!auth?.startsWith("Basic ")) {
    return new NextResponse("Auth required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Dashboard v4"' },
    })
  }

  // ✅ Decode Basic Auth credentials
  const base64 = auth.slice("Basic ".length)
  const decoded = Buffer.from(base64, "base64").toString("utf8")
  const idx = decoded.indexOf(":")

  const u = idx >= 0 ? decoded.slice(0, idx) : decoded
  const p = idx >= 0 ? decoded.slice(idx + 1) : ""

  // ✅ Logs for debugging (no password exposure)
  console.log("Expected ADMIN_USER:", user, "| Got:", u)
  console.log("Expected PASS length:", pass.length, "| Got length:", p.length)

  // ✅ Validate
  if (u !== user || p !== pass) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin Dashboard v4"' },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
}
