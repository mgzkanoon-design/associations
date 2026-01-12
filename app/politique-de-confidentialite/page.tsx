"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/i18n"

export default function PolitiqueDeConfidentialitePage() {
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

  const pp = t.privacyPolicy

  return (
    <main className="min-h-screen">
      <Header t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange} />

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">{pp.title}</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <p>{pp.intro}</p>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.controller.title}</h2>
          <p>
            {pp.sections.controller.bodyLines.map((line, idx) => (
              <span key={idx}>
                {idx === 1 ? <strong>{line}</strong> : line}
                <br />
              </span>
            ))}
          </p>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.collected.title}</h2>
          <p>{pp.sections.collected.lead}</p>
          <ul className="list-disc pl-6">
            {pp.sections.collected.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.purposes.title}</h2>
          <p>{pp.sections.purposes.lead}</p>
          <ul className="list-disc pl-6">
            {pp.sections.purposes.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.legalBasis.title}</h2>
          <p>{pp.sections.legalBasis.lead}</p>
          <ul className="list-disc pl-6">
            {pp.sections.legalBasis.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.retention.title}</h2>
          <p>{pp.sections.retention.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.recipients.title}</h2>
          <p>{pp.sections.recipients.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.security.title}</h2>
          <p>{pp.sections.security.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.rights.title}</h2>
          <p>{pp.sections.rights.lead}</p>
          <ul className="list-disc pl-6">
            {pp.sections.rights.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <p>
            <strong>{pp.sections.rights.contact}</strong>
          </p>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.cookies.title}</h2>
          <p>{pp.sections.cookies.body}</p>

          <h2 className="text-xl font-semibold text-foreground">{pp.sections.changes.title}</h2>
          <p>{pp.sections.changes.body}</p>
        </section>
      </div>

      <Footer t={t} />
    </main>
  )
}
