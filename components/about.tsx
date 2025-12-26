import { Card } from "@/components/ui/card"
import type { TranslationKey } from "@/lib/i18n"

interface AboutProps {
  t: TranslationKey
}

export function About({ t }: AboutProps) {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-balance">
            {t.about.title}
          </h2>

          <div className="space-y-6 sm:space-y-8">
            <Card className="p-6 sm:p-8">
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
                {t.about.history}
              </p>
            </Card>

            <Card className="p-6 sm:p-8 bg-primary/5 border-primary/20">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t.about.vision}</h3>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
                {t.about.visionText}
              </p>
            </Card>

            <Card className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t.about.values}</h3>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
                {t.about.valuesText}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
