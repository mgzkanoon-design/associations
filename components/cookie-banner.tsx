"use client"

import { useEffect, useMemo, useState } from "react"
import { translations, type Language } from "@/lib/i18n"

type ConsentState = {
  necessary: true
  analytics: boolean
  videos: boolean
  abTesting: boolean
}

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  videos: false,
  abTesting: false,
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

function detectLang(): Language {
  // ✅ dir أولاً لأنه يتغير عندك مع اللغة
  const dir = document.documentElement.getAttribute("dir")
  if (dir === "rtl") return "ar"

  const htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase()
  if (htmlLang.startsWith("fr")) return "fr"
  if (htmlLang.startsWith("ar")) return "ar"
  if (htmlLang.startsWith("en")) return "en"

  const navLang = (navigator.language || "fr").toLowerCase()
  if (navLang.startsWith("ar")) return "ar"
  if (navLang.startsWith("en")) return "en"
  return "fr"
}

function Toggle({
  checked,
  onChange,
  disabled,
  isRtl,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
  isRtl?: boolean
}) {
  const knobClass = isRtl
    ? checked
      ? "translate-x-1"
      : "translate-x-5"
    : checked
      ? "translate-x-5"
      : "translate-x-1"

  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      className={[
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? "bg-blue-600" : "bg-muted",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
      aria-pressed={checked}
      aria-disabled={disabled}
    >
      <span
        className={[
          "inline-block h-5 w-5 transform rounded-full bg-background transition-transform",
          knobClass,
        ].join(" ")}
      />
    </button>
  )
}

export function CookieBanner() {
  const [lang, setLang] = useState<Language>("fr")
  const [open, setOpen] = useState(false)
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT)

  const isRtl = lang === "ar"

  const t = useMemo(() => translations[lang], [lang])
  const c = t.cookieConsent

  // ✅ فتح النافذة من أي مكان (زر بالفوتر) + تحديث اللغة لحظياً
  useEffect(() => {
    const handler = (evt?: Event) => {
      // ✅ تحديث اللغة عند فتح نافذة الكوكيز
      setLang(detectLang())

      // ✅ دعم اختياري: إذا بعثتي اللغة مع الحدث
      // window.dispatchEvent(new CustomEvent("open-cookie-settings",{detail:{lang:"ar"}}))
      const custom = evt as CustomEvent | undefined
      const maybeLang = custom?.detail?.lang as Language | undefined
      if (maybeLang && translations[maybeLang]) {
        setLang(maybeLang)
      }

      setOpen(true)
    }

    window.addEventListener("open-cookie-settings", handler as EventListener)
    return () => window.removeEventListener("open-cookie-settings", handler as EventListener)
  }, [])

  // ✅ تحميل اللغة + حالة الموافقة عند أول دخول
  useEffect(() => {
    const detected = detectLang()
    setLang(detected)

    const saved = getCookie("cookie_consent_v2")
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<ConsentState>
        setConsent({ ...DEFAULT_CONSENT, ...parsed, necessary: true })
        setOpen(false)
        return
      } catch {
        // ignore bad cookie
      }
    }

    // لا يوجد موافقة -> افتح تلقائياً
    setOpen(true)
  }, [])

  const saveConsent = (next: ConsentState) => {
    const safe: ConsentState = { ...next, necessary: true }
    setConsent(safe)
    setCookie("cookie_consent_v2", JSON.stringify(safe), 180)
  }

  const acceptAll = () => {
    const next: ConsentState = { necessary: true, analytics: true, videos: true, abTesting: true }
    saveConsent(next)
    setOpen(false)
  }

  const refuseAll = () => {
    const next: ConsentState = { necessary: true, analytics: false, videos: false, abTesting: false }
    saveConsent(next)
    setOpen(false)
  }

  const confirm = () => {
    saveConsent(consent)
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

      {/* Modal */}
      <div
        className="absolute left-1/2 top-12 w-[92%] max-w-3xl -translate-x-1/2 rounded-2xl border bg-background shadow-xl"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="flex items-start justify-between gap-4 p-6">
          <div>
            <h2 className="text-2xl font-bold">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {c.intro} {c.learnMore}{" "}
              <a href="/politique-de-confidentialite" className="underline text-foreground">
                {c.privacyLinkLabel}
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-muted"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-2 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
          >
            {c.acceptAll}
          </button>
          <button
            type="button"
            onClick={refuseAll}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
          >
            {c.refuseAll}
          </button>
        </div>

        <div className="px-6 py-4 space-y-5">
          {/* Necessary */}
          <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
            <div className="min-w-0">
              <div className="font-semibold">{c.necessaryTitle}</div>
              <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.necessaryDesc}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Toggle checked={true} onChange={() => {}} disabled isRtl={isRtl} />
              <span className="text-xs text-muted-foreground">{c.active}</span>
            </div>
          </div>

          {/* Analytics */}
          <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
            <div className="min-w-0">
              <div className="font-semibold">{c.analyticsTitle}</div>
              <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.analyticsDesc}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Toggle
                checked={consent.analytics}
                onChange={(v) => setConsent((prev) => ({ ...prev, analytics: v }))}
                isRtl={isRtl}
              />
              <span className="text-xs text-muted-foreground">
                {consent.analytics ? c.active : c.inactive}
              </span>
            </div>
          </div>

          {/* AB testing */}
          <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
            <div className="min-w-0">
              <div className="font-semibold">{c.abTitle}</div>
              <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.abDesc}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Toggle
                checked={consent.abTesting}
                onChange={(v) => setConsent((prev) => ({ ...prev, abTesting: v }))}
                isRtl={isRtl}
              />
              <span className="text-xs text-muted-foreground">
                {consent.abTesting ? c.active : c.inactive}
              </span>
            </div>
          </div>

          {/* Videos */}
          <div className="flex items-start justify-between gap-4 rounded-xl border p-4">
            <div className="min-w-0">
              <div className="font-semibold">{c.videosTitle}</div>
              <div className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.videosDesc}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Toggle
                checked={consent.videos}
                onChange={(v) => setConsent((prev) => ({ ...prev, videos: v }))}
                isRtl={isRtl}
              />
              <span className="text-xs text-muted-foreground">
                {consent.videos ? c.active : c.inactive}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            type="button"
            onClick={confirm}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            {c.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}
