import { NextResponse } from "next/server";
import { SITE_URL, LOCALES } from "@/lib/seo";

export async function GET() {
  const now = new Date().toISOString();

  const sitemaps = LOCALES.map((loc) => `${SITE_URL}/sitemaps/sitemap-${loc}.xml`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
