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

export default function Home() {
  const [currentLang, setCurrentLang] = useState<Language>("en")

  const t = translations[currentLang]

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang as Language)
    // Set document direction for RTL languages
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl")
      document.documentElement.style.fontFamily = "var(--font-arabic), sans-serif"
    } else {
      document.documentElement.setAttribute("dir", "ltr")
      document.documentElement.style.fontFamily = ""
    }
  }

  return (
    <main className="min-h-screen">
      <Header t={t} currentLang={currentLang} onLanguageChange={handleLanguageChange} />
      <Hero t={t} />
      <Mission t={t} />
      <About t={t} />
      <Actions t={t} />
      <InternationalVision t={t} />
      <Partnerships t={t} />
      <News t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </main>
  )
}
