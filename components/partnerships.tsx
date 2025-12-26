import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Building2, Globe2, Handshake } from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface PartnershipsProps {
  t: TranslationKey
}

export function Partnerships({ t }: PartnershipsProps) {
  const partnerships = [
    {
      icon: Building2,
      title: t.partnerships.syria,
      description: t.partnerships.syriaText,
    },
    {
      icon: Globe2,
      title: t.partnerships.europe,
      description: t.partnerships.europeText,
    },
    {
      icon: Handshake,
      title: t.partnerships.become,
      description: t.partnerships.becomeText,
    },
  ]

  // الشركاء مع اللوغو (ضع الصور في public/partners/)
  const partners = [
    {
      key: "nakhla" as const,
      name: t.partnerships.partners.nakhla,
      logo: "/nak.png",
 site:"https://www.nakhla-found.com/",
    },
    {
      key: "salam" as const,
      name: t.partnerships.partners.salam,
      logo: "/logosalam.webp",
      site:"https://salam-ngo.org/",
    },
    {
      key: "reconstructionGermany" as const,
      name: t.partnerships.partners.reconstructionGermany,
      logo: "/logobw2.webp",
 site:"https://syria-rebuild.com/",
    },
  ]

  return (
    <section id="partnerships" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">
            {t.partnerships.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
            {t.partnerships.description}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {partnerships.map((partnership, index) => {
            const Icon = partnership.icon
            return (
              <Card key={index} className="p-6 sm:p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-4 sm:mb-6">
                 <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-balance">
                  {partnership.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {partnership.description}
                </p>
              </Card>
            )
          })}
        </div>

        {/* ===== قسم إضافي: الشركاء (لوغو + اسم) ===== */}
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-balance">
              {t.partnerships.partnersTitle}
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed text-pretty">
              {t.partnerships.partnersDescription}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p) => (
              <Card key={p.key} className="p-6 flex items-center gap-4">
                 <a href={p.site} className="p-6 flex items-center gap-4">
                <div className="relative w-30 h-30 sm:w-45 sm:h-45 dfrcolors shrink-0 rounded-xl bg-background border overflow-hidden">
              
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground leading-snug">{p.name}</p>
                </div>
</a>  
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
