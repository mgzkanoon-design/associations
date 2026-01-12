"use client"

import type React from "react"
import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Send,
  Facebook,
  Instagram,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface ContactProps {
  t: TranslationKey
}

type Step = 1 | 2 | 3 | 4

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

function isValidPhone(phone: string) {
  // بسيط وعملي: يسمح بـ + وأرقام ومسافات و()
  const v = phone.trim()
  if (!v) return true // الهاتف اختياري
  return /^[+()\-\s0-9]{6,20}$/.test(v)
}

export function Contact({ t }: ContactProps) {
  const [step, setStep] = useState<Step>(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({})

  const progress = useMemo(() => {
    if (step === 1) return 25
    if (step === 2) return 50
    if (step === 3) return 75
    return 100
  }, [step])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateStep = (s: Step) => {
    const nextErrors: Partial<Record<keyof typeof formData, string>> = {}

    if (s === 1) {
      if (!formData.name.trim()) nextErrors.name = "Please enter your name."
    }

    if (s === 2) {
      const email = formData.email.trim()
      if (!email) nextErrors.email = "Please enter your email."
      else if (!isValidEmail(email)) nextErrors.email = "Please enter a valid email."
    }

    if (s === 3) {
      const phone = formData.phone.trim()
      if (phone && !isValidPhone(phone)) nextErrors.phone = "Please enter a valid phone number."
    }

    if (s === 4) {
      const msg = formData.message.trim()
      if (!msg) nextErrors.message = "Please write your message."
      else if (msg.length < 10) nextErrors.message = "Message is too short (min 10 characters)."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const nextStep = () => {
    if (!validateStep(step)) return
    setStep((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : prev === 3 ? 4 : 4))
  }

  const prevStep = () => {
    setErrors({})
    setStep((prev) => (prev === 4 ? 3 : prev === 3 ? 2 : 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(false)

    // Validate last step
    if (!validateStep(4)) return

    setSubmitting(true)
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          locale: "fr",
        }),
      })

      const text = await res.text()
      console.log("API status:", res.status, "body:", text)

      if (res.ok) {
        setFormData({ name: "", email: "", phone: "", message: "" })
        setStep(1)
        setSubmitted(true)
      } else {
        console.error("API error:", text)
      }
    } catch (err) {
      console.error("Fetch failed (network/server crash):", err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          {/* ✅ Keep H2 here (your page should have one H1 in Hero) */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">
            {t.contact.title}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          {/* FORM */}
          <Card className="p-6 sm:p-8 md:col-span-3">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Step {step} / 4</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Submitted */}
            {submitted && (
              <div className="mb-6 rounded-xl border p-4 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Message sent</p>
                  <p className="text-sm text-muted-foreground">Thank you! We will get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Name */}
              {step === 1 && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t.contact.name}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    autoComplete="name"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>
              )}

              {/* Step 2: Email */}
              {step === 2 && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t.contact.email}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    autoComplete="email"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>
              )}

              {/* Step 3: Phone (optional) */}
              {step === 3 && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone (optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 00 00 00 00"
                    className="w-full"
                    autoComplete="tel"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                  <p className="mt-2 text-xs text-muted-foreground">
                    You can leave this empty. If provided, use only numbers, spaces, and +.
                  </p>
                </div>
              )}

              {/* Step 4: Message + review */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t.contact.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full"
                    />
                    {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  {/* Clear confirmation */}
                  <div className="rounded-xl border p-4">
                    <p className="font-semibold mb-1">Review before sending</p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Name:</span> {formData.name.trim() || "—"}
                      <br />
                      <span className="font-medium text-foreground">Email:</span> {formData.email.trim() || "—"}
                      <br />
                      <span className="font-medium text-foreground">Phone:</span> {formData.phone.trim() || "—"}
                    </p>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1 || submitting}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {step < 4 ? (
                  <Button type="button" onClick={nextStep} disabled={submitting}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="min-w-[180px]" size="lg" disabled={submitting}>
                    {submitting ? "Sending..." : t.contact.send}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Card>

          {/* INFO */}
          <Card className="p-6 sm:p-8 md:col-span-2 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">{t.contact.info}</h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:office@8kanoon.org" className="text-muted-foreground hover:text-primary transition-colors">
                    office@8kanoon.org
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <h4 className="font-semibold mb-4">{t.contact.followUs}</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61585323699369"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                    <Facebook className="h-5 w-5" />
                  </Button>
                </a>

                <a
                  href="https://www.instagram.com/8kan.oon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                    <Instagram className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
