"use client"

import { useEffect, useState } from "react"

type Consent = "accepted" | "rejected" | null

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? decodeURIComponent(match[2]) : null
}

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = getCookie("cookie_consent") as Consent
    if (saved === "accepted" || saved === "rejected") {
      setConsent(saved)
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    setCookie("cookie_consent", "accepted", 180)
    setConsent("accepted")
    setVisible(false)
  }

  const reject = () => {
    setCookie("cookie_consent", "rejected", 180)
    setConsent("rejected")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-2xl border bg-background/95 p-4 shadow-lg backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground leading-relaxed">
          نحن نستخدم ملفات تعريف الارتباط (Cookies) التقنية الضرورية لتحسين تجربة المستخدم.
          يمكنك قبولها أو رفضها.{" "}
          <a href="/politique-de-confidentialite" className="underline text-foreground">
            سياسة الخصوصية
          </a>
        </p>

        <div className="flex gap-2">
          <button
            onClick={reject}
            className="rounded-xl border px-4 py-2 text-sm"
          >
            رفض
          </button>
          <button
            onClick={accept}
            className="rounded-xl bg-foreground px-4 py-2 text-sm text-background"
          >
            قبول
          </button>
        </div>
      </div>
    </div>
  )
}
