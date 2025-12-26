"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users } from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface HeroProps {
  t: TranslationKey
}

export function Hero({ t }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/DJI_0950.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/90 to-accent/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
            <Users className="h-4 w-4" />
            {t.about.founded}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-balance leading-tight text-white drop-shadow-lg">
            {t.hero.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-md">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white text-primary hover:bg-white/90"
            >
              <a href="#about">{t.hero.cta}</a>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            >
              <a href="#contact">{t.hero.partners}</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
