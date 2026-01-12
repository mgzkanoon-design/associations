import type React from "react"
import type { Metadata } from "next"
import { Geist, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ClientProviders from "./providers"
import Script from "next/script"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const cairo = Cairo({ subsets: ["latin", "arabic"], variable: "--font-arabic" })

export const metadata: Metadata = {
  title: {
    default: "8 Kanoon | Éducation & Lecture pour Enfants Syriens",
    template: "%s | 8 Kanoon",
  },
  description:
    "Association éducative dédiée aux enfants syriens en Syrie et à l’étranger, promouvant la lecture, la culture et des activités pédagogiques.",
  generator: "MULLA-WEB",
  icons: {
    icon: [
      { url: "/logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/logo.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "8 Kanoon | Éducation & Lecture pour Enfants Syriens",
    description:
      "Association éducative dédiée aux enfants syriens en Syrie et à l’étranger, promouvant la lecture, la culture et des activités pédagogiques.",
    type: "website",
    siteName: "8 Kanoon",
    images: [{ url: "/logo.png", width: 800, height: 800, alt: "8 Kanoon" }],
  },
  twitter: {
    card: "summary",
    title: "8 Kanoon | Éducation & Lecture pour Enfants Syriens",
    description:
      "Association éducative dédiée aux enfants syriens en Syrie et à l’étranger, promouvant la lecture, la culture et des activités pédagogiques.",
    images: ["/logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="beforeInteractive">
          {`
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MGQFDZFD');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>

      <body className={`${geist.className} antialiased ${cairo.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MGQFDZFD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ClientProviders>{children}</ClientProviders>

        <Analytics />
      </body>
    </html>
  )
}
