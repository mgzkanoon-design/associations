import { Card } from "@/components/ui/card"
import { Globe, Users, TrendingUp } from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface InternationalVisionProps {
  t: TranslationKey
}

export function InternationalVision({ t }: InternationalVisionProps) {
  const visionPoints = [
    {
      icon: Users,
      title: t.international.children,
      description: t.international.childrenText,
    },
    {
      icon: Globe,
      title: t.international.bridges,
      description: t.international.bridgesText,
    },
    {
      icon: TrendingUp,
      title: t.international.future,
      description: t.international.futureText,
    },
  ]

  return (
    <section id="vision" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-balance">
            {t.international.title}
          </h2>
          <p className="text-xl sm:text-2xl text-primary font-semibold mb-4 sm:mb-6">{t.international.subtitle}</p>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
            {t.international.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {visionPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Card key={index} className="p-6 sm:p-8 hover:shadow-lg transition-shadow border-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-balance">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{point.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
