import Script from "next/script";
import { FaqSection } from "@/components/faq-section";
import { getFaqs, type Lang } from "@/lib/faq-data";

function buildFaqJsonLd(lang: Lang, siteUrl: string) {
  const faqs = getFaqs(lang);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export default function FaqPage({ params }: { params: { lang: Lang } }) {
  const lang = params.lang ?? "fr";
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.org";

  const pageTitle =
    lang === "ar"
      ? "أسئلة شائعة | جمعية 8 كانون"
      : lang === "en"
      ? "FAQ | 8 Kanoon"
      : "FAQ | 8 Kanoon";

  const jsonLd = buildFaqJsonLd(lang, SITE_URL);

  return (
    <main className="min-h-screen">
      {/* ✅ H1 for the dedicated FAQ page */}
      <div className="container mx-auto px-4 sm:px-6 pt-14">
        <h1 className="text-3xl sm:text-4xl font-bold">{pageTitle}</h1>
      </div>

      <FaqSection lang={lang} />

      {/* ✅ FAQ Schema for rich results */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
