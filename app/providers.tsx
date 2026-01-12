"use client"

import type React from "react"
import { CookieBanner } from "@/components/cookie-banner"

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CookieBanner />
    </>
  )
}
