"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/i18n"

export default function MentionsLegalesPage() {
  const [currentLang, setCurrentLang] = useState<Language>("fr")
  const t = translations[currentLang]

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang as Language)
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

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-4xl">
        {/* FR */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Mentions légales</h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <h2 className="text-xl font-semibold text-foreground">1. Éditeur du site</h2>
          <p>
            Le présent site est édité par :
            <br />
            <strong>Association 8 Kanoon</strong>
            <br />
            Siège social : Douai 59500, France
            <br />
            Numéro RNA : W593009063
            <br />
            Représentant légal : Omar MULLA
            <br />
            Email : contact@8kanoon.org
          </p>

          <h2 className="text-xl font-semibold text-foreground">2. Hébergement</h2>
          <p>
            Hébergeur : <strong> OVH</strong>
            <br />
            Adresse : <strong> Douai 59500</strong>
            <br />
            Contact : <strong> contact@mulla-web.org</strong>
          </p>

          <h2 className="text-xl font-semibold text-foreground">3. Directeur de la publication</h2>
          <p>
            Directeur de la publication : <strong>Omar MULLA</strong> (représentant légal de l’association).
          </p>

          <h2 className="text-xl font-semibold text-foreground">4. Propriété intellectuelle</h2>
          <p>
            L’ensemble des contenus (textes, images, graphismes, logos, documents) présents sur ce site est protégé
            par le droit d’auteur et, le cas échéant, par le droit de la propriété intellectuelle. Toute reproduction,
            représentation, modification, publication, adaptation, totale ou partielle, est interdite sans autorisation
            écrite préalable de l’association, sauf exceptions prévues par la loi.
          </p>

          <h2 className="text-xl font-semibold text-foreground">5. Données personnelles</h2>
          <p>
            Les informations relatives au traitement des données personnelles sont détaillées dans la page{" "}
            <strong>Politique de confidentialité (RGPD)</strong>.
          </p>

          <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
          <p>
            Le site n’utilise pas de cookies de suivi ou de publicité. Seuls des cookies techniques nécessaires au bon
            fonctionnement peuvent être utilisés.
          </p>

          <h2 className="text-xl font-semibold text-foreground">7. Contact</h2>
          <p>
            Pour toute question, vous pouvez nous contacter à : <strong>contact@8kanoon.org</strong>
          </p>
        </section>

        <hr className="my-12" />

        {/* AR */}
        <h2 className="text-2xl font-bold mb-6 text-foreground">البيانات القانونية</h2>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <h3 className="text-xl font-semibold text-foreground">1. الجهة الناشرة للموقع</h3>
          <p>
            هذا الموقع صادر عن:
            <br />
            <strong>جمعية 8 كانون</strong>
            <br />
            المقرّ الاجتماعي: Douai 59500، فرنسا
            <br />
            رقم التسجيل (RNA): W593009063
            <br />
            الممثل القانوني: Omar MULLA
            <br />
            البريد الإلكتروني: contact@8kanoon.org
          </p>

          <h3 className="text-xl font-semibold text-foreground">2. الاستضافة</h3>
          <p>
            شركة الاستضافة: <strong>OVH  </strong>
            <br />
            العنوان: <strong>  Douai 59500</strong>
            <br />
            التواصل: <strong>  contact@mulla-web.org</strong>
          </p>
 
          <h3 className="text-xl font-semibold text-foreground">3. مدير النشر</h3>
          <p>
            مدير النشر: <strong>Omar MULLA</strong> (الممثل القانوني للجمعية).
          </p>

          <h3 className="text-xl font-semibold text-foreground">4. الملكية الفكرية</h3>
          <p>
            جميع محتويات هذا الموقع (نصوص، صور، تصاميم، شعارات، ملفات) محمية بحقوق النشر، وعند الاقتضاء بحقوق الملكية
            الفكرية. يُمنع النسخ أو إعادة النشر أو التعديل أو التوزيع كلياً أو جزئياً دون موافقة خطية مسبقة من الجمعية،
            باستثناء الحالات التي يسمح بها القانون.
          </p>

          <h3 className="text-xl font-semibold text-foreground">5. البيانات الشخصية</h3>
          <p>
            تفاصيل معالجة البيانات الشخصية موجودة ضمن صفحة <strong>سياسة الخصوصية (RGPD)</strong>.
          </p>

          <h3 className="text-xl font-semibold text-foreground">6. ملفات تعريف الارتباط (Cookies)</h3>
          <p>
            لا يستخدم الموقع ملفات تتبّع أو إعلانات. قد تُستخدم فقط ملفات تقنية ضرورية لعمل الموقع بشكل صحيح.
          </p>

          <h3 className="text-xl font-semibold text-foreground">7. التواصل</h3>
          <p>
            لأي استفسار، يمكنكم مراسلتنا على: <strong>contact@8kanoon.org</strong>
          </p>
        </section>
      </div>

      <Footer t={t} />
    </main>
  )
}
