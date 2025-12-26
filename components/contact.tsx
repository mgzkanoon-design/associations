"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Facebook, Instagram, Link } from "lucide-react"
import type { TranslationKey } from "@/lib/i18n"

interface ContactProps {
  t: TranslationKey
}

export function Contact({ t }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      locale: "fr", // أو ar حسب موقعك
    }),
  });

  if (res.ok) {
    setFormData({ name: "", email: "", message: "" });
    // اعملي Toast إن عندك
  } else {
    const data = await res.json().catch(() => null);
    console.error(data?.error ?? "Failed");
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-balance">{t.contact.title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">{t.contact.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <Card className="p-6 sm:p-8 md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>

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
                />
              </div>

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
              </div>

              <Button type="submit" className="w-full" size="lg">
                {t.contact.send}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          <Card className="p-6 sm:p-8 md:col-span-2 flex flex-col">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">{t.contact.info}</h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:office@8kanoon.org"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    office@8kanoon.org
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <h4 className="font-semibold mb-4">{t.contact.followUs}</h4>
              <div className="flex gap-3">
                                 <a href='//www.facebook.com/profile.php?id=61585323699369'>

                <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                                    <Facebook className="h-5 w-5" />

                 
                </Button>
 </a>

                {/* <Button size="icon" variant="outline" className="rounded-full bg-transparent">
                  <Twitter className="h-5 w-5" />
                </Button> */}
<a href="https://www.instagram.com/8kan.oon/">

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
