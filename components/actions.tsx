import { Card } from "@/components/ui/card"
import { MapPin, GraduationCap, Users } from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface ActionsProps {
  t: TranslationKey
}

export function Actions({ t }: ActionsProps) {
  const actions = [
    {
      icon: MapPin,
      title: t.actions.inSyria,
      description: t.actions.syriaText,
    },
    {
      icon: GraduationCap,
      title: t.actions.approach,
      description: t.actions.approachText,
    },
    {
      icon: Users,
      title: t.actions.target,
      description: t.actions.targetText,
    },
  ]

  return (
    <section id="actions" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">{t.actions.title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
            {t.actions.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 sm:mb-6">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-balance">{action.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">{action.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
