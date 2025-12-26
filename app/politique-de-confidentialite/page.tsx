"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { translations, type Language } from "@/lib/i18n"

export default function PolitiqueDeConfidentialitePage() {
  const [currentLang, setCurrentLang] = useState<Language>("fr")
  const t = translations[currentLang]

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang as Language)
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl")
      document.documentElement.style.fontFamily =
        "var(--font-arabic), sans-serif"
    } else {
      document.documentElement.setAttribute("dir", "ltr")
      document.documentElement.style.fontFamily = ""
    }
  }

  return (
    <main className="min-h-screen">
      <Header
        t={t}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 max-w-4xl">
        {/* ================= FR ================= */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          Politique de confidentialité (RGPD)
        </h1>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            La présente politique de confidentialité décrit la manière dont
            l’association <strong>8 Kanoon</strong> collecte, utilise et protège
            les données personnelles des utilisateurs, conformément au Règlement
            Général sur la Protection des Données (RGPD).
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            1. Responsable du traitement
          </h2>
          <p>
            Le responsable du traitement est :
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

          <h2 className="text-xl font-semibold text-foreground">
            2. Données collectées
          </h2>
          <p>Nous collectons uniquement les données nécessaires :</p>
          <ul className="list-disc pl-6">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Messages envoyés via le formulaire de contact</li>
            <li>Données fournies lors d’une demande de bénévolat</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">
            3. Finalités du traitement
          </h2>
          <ul className="list-disc pl-6">
            <li>Répondre aux demandes envoyées</li>
            <li>Gérer les candidatures de bénévolat</li>
            <li>Communiquer sur les activités de l’association</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">
            4. Base légale
          </h2>
          <ul className="list-disc pl-6">
            <li>Consentement explicite de l’utilisateur</li>
            <li>Intérêt légitime de l’association</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground">
            5. Durée de conservation
          </h2>
          <p>
            Les données sont conservées uniquement le temps nécessaire aux
            finalités prévues, puis supprimées ou anonymisées.
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            6. Destinataires
          </h2>
          <p>
            Les données sont accessibles uniquement aux membres habilités de
            l’association.  
            Aucune donnée n’est vendue ou transmise à des tiers.
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            7. Sécurité
          </h2>
          <p>
            L’association met en œuvre des mesures techniques et
            organisationnelles afin d’assurer la sécurité et la confidentialité
            des données.
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            8. Droits des utilisateurs
          </h2>
          <ul className="list-disc pl-6">
            <li>Droit d’accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l’effacement</li>
            <li>Droit d’opposition</li>
            <li>Droit à la portabilité</li>
          </ul>

          <p>
            Pour exercer ces droits :{" "}
            <strong>contact@8kanoon.org</strong>
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            9. Cookies
          </h2>
          <p>
            Le site n’utilise pas de cookies publicitaires ou de suivi.
            Seuls des cookies techniques nécessaires peuvent être utilisés.
          </p>

          <h2 className="text-xl font-semibold text-foreground">
            10. Modification
          </h2>
          <p>
            Cette politique peut être modifiée à tout moment.  
            Toute mise à jour sera publiée sur cette page.
          </p>
        </section>

        <hr className="my-12" />

        {/* ================= AR ================= */}
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          سياسة الخصوصية (RGPD)
        </h2>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            توضّح سياسة الخصوصية هذه كيفية قيام جمعية <strong>8 كانون</strong>{" "}
            بجمع واستخدام وحماية البيانات الشخصية للمستخدمين، وذلك وفقاً للائحة
            العامة لحماية البيانات (RGPD).
          </p>

          <h3 className="text-xl font-semibold text-foreground">
            1. الجهة المسؤولة عن المعالجة
          </h3>
          <p>
            الجهة المسؤولة عن معالجة البيانات هي:
            <br />
            <strong>جمعية 8 كانون</strong>
            <br />
            المقرّ الاجتماعي: Douai 59500، فرنسا
            <br />
            رقم التسجيل: W593009063
            <br />
            الممثل القانوني: Omar MULLA
            <br />
            البريد الإلكتروني: contact@8kanoon.org
          </p>

          <h3 className="text-xl font-semibold text-foreground">
            2. البيانات التي يتم جمعها
          </h3>
          <ul className="list-disc pl-6">
            <li>الاسم والكنية</li>
            <li>البريد الإلكتروني</li>
            <li>الرسائل المرسلة عبر نموذج التواصل</li>
            <li>البيانات المقدمة ضمن طلبات التطوع</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">
            3. أهداف المعالجة
          </h3>
          <ul className="list-disc pl-6">
            <li>الرد على الرسائل</li>
            <li>إدارة طلبات التطوع</li>
            <li>التواصل حول أنشطة الجمعية</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">
            4. الأساس القانوني
          </h3>
          <ul className="list-disc pl-6">
            <li>موافقة المستخدم الصريحة</li>
            <li>المصلحة المشروعة للجمعية</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">
            5. مدة الاحتفاظ
          </h3>
          <p>
            يتم الاحتفاظ بالبيانات فقط للمدة اللازمة لتحقيق الأهداف المحددة،
            ثم يتم حذفها أو إخفاء هويتها.
          </p>

          <h3 className="text-xl font-semibold text-foreground">
            6. حقوق المستخدم
          </h3>
          <p>
            يحق للمستخدم الوصول إلى بياناته وتعديلها وحذفها والاعتراض على
            معالجتها، وذلك عبر التواصل على:
            <strong> contact@8kanoon.org</strong>
          </p>
        </section>
      </div>

      <Footer t={t} />
    </main>
  )
}
