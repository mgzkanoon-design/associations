export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://yourdomain.org";

export const LOCALES = ["fr", "ar"] as const;

// الصفحات العامة فقط (لا admin ولا صفحات خاصة)
export const PUBLIC_ROUTES = [
  "", // الصفحة الرئيسية للغة (مثال: /fr و /ar)
  "/about",
  "/actions",
  "/partners",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
] as const;

// لاحقًا إذا صار عندك صفحات ديناميكية (أخبار/مقالات..) تجيبيها هون
export async function getDynamicRoutes(): Promise<string[]> {
  return [];
}
