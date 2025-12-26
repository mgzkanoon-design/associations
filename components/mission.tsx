import { Card } from "@/components/ui/card"
import { BookOpen, Users, Heart } from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface MissionProps {
  t: TranslationKey
}

export function Mission({ t }: MissionProps) {
  const values = [
    {
      icon: BookOpen,
      title: t.mission.value1Title,
      description: t.mission.value1Text,
    },
    {
      icon: Users,
      title: t.mission.value2Title,
      description: t.mission.value2Text,
    },
    {
      icon: Heart,
      title: t.mission.value3Title,
      description: t.mission.value3Text,
    },
  ]

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">{t.mission.title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
            {t.mission.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <Card key={index} className="p-6 sm:p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-balance">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{value.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
