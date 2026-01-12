import { NextResponse } from "next/server";
import { SITE_URL, LOCALES, PUBLIC_ROUTES, getDynamicRoutes } from "@/lib/seo";

function isValidSitemapSlug(slug: string) {
  return LOCALES.some((l) => `sitemap-${l}.xml` === slug);
}

function localeFromSlug(slug: string) {
  const match = slug.match(/^sitemap-(.+)\.xml$/);
  return match?.[1];
}

export async function GET(
  _req: Request,
  { params }: { params: { sitemap: string } }
) {
  const slug = params.sitemap;

  if (!isValidSitemapSlug(slug)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const locale = localeFromSlug(slug) as (typeof LOCALES)[number];
  const now = new Date().toISOString();

  const dynamicRoutes = await getDynamicRoutes();
  const routes = [...PUBLIC_ROUTES, ...dynamicRoutes];

  const urls = routes.map((r) => ({
    loc: `${SITE_URL}/${locale}${r}`,
    lastmod: now,
    changefreq: "weekly",
    priority: r === "" ? "1.0" : "0.7",
    alternates: LOCALES.map((alt) => ({
      hreflang: alt,
      href: `${SITE_URL}/${alt}${r}`,
    })),
    xDefault: `${SITE_URL}/fr${r}`, // عدّليها إذا لغتك الافتراضية ليست fr
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
${u.alternates
  .map(
    (a) =>
      `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`
  )
  .join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${u.xDefault}" />
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
