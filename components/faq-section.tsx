import { getFaqs, type Lang } from "@/lib/faq-data";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection({ lang = "fr" }: { lang?: Lang }) {
  const faqs = getFaqs(lang);

  const heading =
    lang === "ar"
      ? "أسئلة شائعة"
      : lang === "en"
      ? "Frequently Asked Questions"
      : "Questions fréquentes";

  const intro =
    lang === "ar"
      ? "إجابات سريعة تساعدك على فهم عمل جمعية 8 كانون وطرق الشراكة والتطوع."
      : lang === "en"
      ? "Quick answers about 8 Kanoon, partnerships, volunteering, and our educational work."
      : "Réponses rapides sur 8 Kanoon, les partenariats, le bénévolat et nos actions éducatives.";

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          {/* ✅ Use this as H2 when embedded inside a page */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{heading}</h2>
          <p className="text-muted-foreground text-base sm:text-lg">{intro}</p>
        </div>

        <Card className="max-w-4xl mx-auto p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, idx) => (
              <AccordionItem value={`faq-${idx}`} key={idx}>
                {/* ✅ H3 = question */}
                <AccordionTrigger className="text-left">
                  <h3 className="text-base sm:text-lg font-semibold">{item.q}</h3>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
}
