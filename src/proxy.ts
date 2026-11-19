import { NextResponse, type NextRequest } from "next/server";
import { GEO_COOKIE, localeForCountry } from "@/lib/i18n/geo";

/**
 * Leaves an IP-derived first-visit language for the page to read.
 *
 * Only the country header the platform already attaches is used; no IP is
 * stored, logged, or sent anywhere. The cookie holds a two-letter language
 * code and nothing else. A manual choice in the LanguagePicker lives in
 * localStorage and always wins over it (see src/lib/i18n/geo.ts).
 */
export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  const locale = localeForCountry(request.headers.get("x-vercel-ip-country"));
  if (locale && request.cookies.get(GEO_COOKIE)?.value !== locale) {
    res.cookies.set(GEO_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: true,
      httpOnly: false,
    });
  }
  return res;
}

export const config = {
  // Pages only: skip build output, images, the model worker and every
  // public asset, which never need a language.
  matcher: [
    "/((?!_next/|api/|favicon|icon\\.svg|.*\\.[a-zA-Z0-9]+$).*)",
  ],
};
