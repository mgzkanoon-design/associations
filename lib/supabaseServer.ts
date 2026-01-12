import { createClient } from "@supabase/supabase-js"

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const url = rawUrl?.trim()
const serviceKey = rawServiceKey?.trim()

if (!url) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL in .env.local")
}
if (!serviceKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in .env.local")
}

// ✅ Validate URL (this will catch hidden spaces / bad characters)
try {
  new URL(url)
} catch (e) {
  throw new Error(
    `Invalid NEXT_PUBLIC_SUPABASE_URL: "${rawUrl}". Please remove spaces/hidden characters.`
  )
}

export const supabaseServer = createClient(url, serviceKey, {
  auth: { persistSession: false },
})
