"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "./language-switcher"
import { Menu, X } from "lucide-react"
import type { TranslationKey, Language } from "@/lib/i18n"

interface HeaderProps {
  t: TranslationKey
  currentLang: Language
  onLanguageChange: (lang: string) => void
}

export function Header({ t, currentLang, onLanguageChange }: HeaderProps) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // يحل مشكلة التنقّل بين الصفحات
  const withHomePrefix = (hash: string) => (isHome ? hash : `/${hash}`)

  const navItems = [
    { href: withHomePrefix("#home"), label: t.nav.home },
    { href: withHomePrefix("#about"), label: t.nav.about },
    { href: withHomePrefix("#actions"), label: t.nav.actions },
    { href: withHomePrefix("#vision"), label: t.nav.vision },
    { href: withHomePrefix("#partnerships"), label: t.nav.partnerships },
    { href: withHomePrefix("#news"), label: t.nav.news },
    { href: withHomePrefix("#contact"), label: t.nav.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo – يرجّع دائماً للصفحة الرئيسية */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[100px] h-[60px] flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="8 Kanoon Logo"
                width={100}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" size="sm" className="text-sm">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left py-3"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
