"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/i18n"

export default function MentionsLegalesPage() {
  const [currentLang, setCurrentLang] = useState<Language>("fr")
  const t = translations[currentLang]

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang as Language)
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl")
      document.documentElement.style.fontFamily = "var(--font-arabic), sans-serif"
    } else {
      document.documentElement.setAttribute("dir", "ltr")
      document.documentElement.style.fontFamily = ""
    }
  }

  const ml = t.mentionsLegal

  return (
    <main className="min-h-screen">
      <Header t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange} />

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">{ml.title}</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <p>{ml.intro}</p>

          <h2 className="text-xl font-semibold text-foreground">{ml.sections.editor.title}</h2>
          <p>
            {ml.sections.editor.bodyLines.map((line, idx) => (
              <span key={idx}>
                {idx === 1 ? <strong>{line}</strong> : line}
                <br />
              </span>
            ))}
          </p>

          <h2 className="text-xl font-semibold text-foreground">{ml.sections.hosting.title}</h2>
          <p>
            {ml.sections.hosting.bodyLines.map((line, idx) => (
              <span key={idx}>
                {idx === 0 ? <strong>{line}</strong> : line}
                <br />
              </span>
            ))}
          </p>

          <h2 className="text-xl font-semibold text-foreground">{ml.sections.publication.title}</h2>
          <p>{ml.sections.publication.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{ml.sections.ip.title}</h2>
          <p>{ml.sections.ip.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{ml.sections.data.title}</h2>
          <p>{ml.sections.data.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{ml.sections.cookies.title}</h2>
          <p>{ml.sections.cookies.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{ml.sections.contact.title}</h2>
          <p>
            <strong>{ml.sections.contact.body}</strong>
          </p>
        </section>
      </div>

      <Footer t={t} />
    </main>
  )
}
