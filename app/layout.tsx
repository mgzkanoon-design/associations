import type React from "react"
import type { Metadata } from "next"
import { Geist, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CookieBanner } from "@/components/cookie-banner"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _cairo = Cairo({ subsets: ["latin", "arabic"], variable: "--font-arabic" })

export const metadata: Metadata = {
  title: "8 Kanoon - Association for Syrian Children",
  description:
    "Association 8 Kanoon - Strengthening cultural identity and building bridges between Syrian and French societies through education, culture, and childhood.",
  generator: "MULLA-WEB",
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },

    ],
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_cairo.variable}`}>
        {children}
        <CookieBanner />

        <Analytics />
      </body>
    </html>
  )
}
