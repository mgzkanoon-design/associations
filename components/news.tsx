import { Card } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface NewsProps {
  t: TranslationKey
}

export function News({ t }: NewsProps) {
  return (
    <section id="news" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">{t.news.title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty">{t.news.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 sm:p-12 text-center border-dashed">
            <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-muted-foreground mx-auto mb-4 sm:mb-6" />
            <p className="text-lg sm:text-xl text-muted-foreground">{t.news.subtitle}</p>
          </Card>
        </div>
      </div>
    </section>
  )
}
