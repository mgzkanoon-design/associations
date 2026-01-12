"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Mission } from "@/components/mission"
import { About } from "@/components/about"
import { Actions } from "@/components/actions"
import { InternationalVision } from "@/components/international-vision"
import { Partnerships } from "@/components/partnerships"
import { News } from "@/components/news"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/i18n"
import { FaqSection } from "@/components/faq-section"

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  const t = translations[currentLang]

  const handleLanguageChange = (lang: string) => {
    const selectedLang = lang as Language
    setCurrentLang(selectedLang)

    // RTL support for Arabic
    if (selectedLang === "ar") {
      document.documentElement.setAttribute("dir", "rtl")
      document.documentElement.style.fontFamily =
        "var(--font-arabic), sans-serif"
    } else {
      document.documentElement.setAttribute("dir", "ltr")
      document.documentElement.style.fontFamily = ""
    }
  }

  return (
    <main className="min-h-screen">
      <Header
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      {/* ✅ H1 should be inside Hero */}
      <Hero t={t} />

      {/* Sections with H2 / H3 inside components */}
      <Mission t={t} />
      <About t={t} />
      <Actions t={t} />
      <InternationalVision t={t} />
      <Partnerships t={t} />
      <News t={t} />
      <Contact t={t} />

      {/* ✅ FAQ section (SEO booster – H2/H3, long-tail keywords) */}
      <FaqSection lang={currentLang} />

      <Footer t={t} />
    </main>
  )
}
