"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { TranslationKey } from "@/lib/i18n"
import Image from "next/image"

interface FooterProps {
  t: TranslationKey
}

export function Footer({ t }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const pathname = usePathname()
  const isHome = pathname === "/"

  const withHomePrefix = (hash: string) => (isHome ? hash : `/${hash}`)

  const quickLinks = [
    { href: withHomePrefix("#home"), label: t.nav.home },
    { href: withHomePrefix("#about"), label: t.nav.about },
    { href: withHomePrefix("#actions"), label: t.nav.actions },
    { href: withHomePrefix("#vision"), label: t.nav.vision },
    { href: withHomePrefix("#partnerships"), label: t.nav.partnerships },
    { href: withHomePrefix("#contact"), label: t.nav.contact },
  ]

  return (
    <footer className="bg-primary text-primary-foreground py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div>
            <div className="w-[150px] h-[60px] bgtss flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="8 Kanoon Logo"
                width={100}
                height={60}
                className="object-contain"
                priority
              />
            </div>

            <p className="text-primary-foreground/80 text-sm sm:text-base leading-relaxed text-pretty">
              {t.footer.about}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm sm:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg sm:text-xl mb-4">{t.footer.contact}</h3>
            <ul className="space-y-2 text-primary-foreground/80 text-sm sm:text-base">
              <li>
                <a href="mailto:office@8kanoon.org" className="hover:text-primary-foreground transition-colors">
                  office@8kanoon.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 text-center text-primary-foreground/60 text-sm space-y-2">
          <p>
            © {currentYear} Association 8 Kanoon. {t.footer.rights}
          </p>

          <p>
            <Link href="/mention" className="hover:text-primary-foreground transition-colors">
              Mentions légales
            </Link>
          </p>

          <p>
            <Link href="/politique-de-confidentialite" className="hover:text-primary-foreground transition-colors">
              {t.footer.righ}
            </Link>
          </p>

  <p>
  <button
    type="button"
    onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))}
    className="hover:text-primary-foreground transition-colors underline"
  >
    Cookie
  </button>
</p>

        </div>
      </div>
    </footer>
  )
}
