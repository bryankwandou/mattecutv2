import type { LocaleCode } from "./index";

/**
 * First-visit language from the visitor's network location.
 *
 * The edge already knows which country a request comes from (Vercel sends
 * it as `x-vercel-ip-country`). `src/proxy.ts` maps that country to one of
 * the shipped locales and leaves the answer in a short-lived cookie that the
 * pre-paint script and the language store read.
 *
 * Order of authority, strongest first:
 *   1. the reader's own choice from the LanguagePicker (localStorage)
 *   2. this IP-derived guess
 *   3. the browser's language setting
 *   4. DEFAULT_LOCALE
 *
 * A reader behind a VPN or proxy abroad gets the language of the VPN exit
 * country. That is intended: the guess follows the active network, and one
 * tap on the picker overrides it for good.
 */
export const GEO_COOKIE = "mattecut.geo";

/** ISO 3166-1 alpha-2 country → locale. Anything unlisted reads English. */
const BY_COUNTRY: Record<string, LocaleCode> = {
  ID: "id",
  MY: "ms",
  BN: "ms",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es", VE: "es",
  EC: "es", GT: "es", CU: "es", BO: "es", DO: "es", HN: "es", PY: "es",
  SV: "es", NI: "es", CR: "es", PA: "es", UY: "es", PR: "es", GQ: "es",
  // Portuguese
  BR: "pt", PT: "pt", AO: "pt", MZ: "pt", CV: "pt", GW: "pt", ST: "pt",
  TL: "pt",
  // French
  FR: "fr", MC: "fr", LU: "fr", SN: "fr", CI: "fr", ML: "fr", BF: "fr",
  NE: "fr", TG: "fr", BJ: "fr", GA: "fr", CG: "fr", CD: "fr", CM: "fr",
  MG: "fr", HT: "fr", GN: "fr", TD: "fr", CF: "fr", BI: "fr", DJ: "fr",
  KM: "fr", RE: "fr", GP: "fr", MQ: "fr", GF: "fr", NC: "fr", PF: "fr",
  // German
  DE: "de", AT: "de", CH: "de", LI: "de",
  // Italian
  IT: "it", SM: "it", VA: "it",
  // Dutch (Belgium's largest language community is Dutch-speaking)
  NL: "nl", BE: "nl", SR: "nl", CW: "nl", AW: "nl", SX: "nl",
  TR: "tr",
  VN: "vi",
  TH: "th",
  JP: "ja",
  KR: "ko",
  CN: "zh", TW: "zh", HK: "zh", MO: "zh",
  IN: "hi",
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru",
  // Arabic
  SA: "ar", AE: "ar", EG: "ar", IQ: "ar", JO: "ar", KW: "ar", LB: "ar",
  LY: "ar", MA: "ar", OM: "ar", QA: "ar", SY: "ar", TN: "ar", YE: "ar",
  BH: "ar", DZ: "ar", PS: "ar", SD: "ar", MR: "ar",
};

/** Returns null when the country is missing or not a real code. */
export function localeForCountry(
  raw: string | null | undefined,
): LocaleCode | null {
  if (!raw) return null;
  const cc = raw.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(cc) || cc === "XX" || cc === "T1") return null;
  return BY_COUNTRY[cc] ?? "en";
}

/** Reads the cookie the proxy left. Client only; never throws. */
export function geoLocaleFromCookie(): string | null {
  try {
    for (const part of document.cookie.split(";")) {
      const [name, value] = part.trim().split("=");
      if (name === GEO_COOKIE) return value ?? null;
    }
    return null;
  } catch {
    return null;
  }
}
