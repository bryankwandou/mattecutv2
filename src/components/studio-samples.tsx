"use client";

import { useState } from "react";
import { useI18n } from "@/components/preferences";
import { studioXStrings } from "@/lib/i18n/segments/studio";

/** Bundled sample photos under /public/samples. */
const SAMPLES = [
  { src: "/samples/person.jpg", name: "contoh-orang.jpg" },
  { src: "/samples/product.jpg", name: "contoh-produk.jpg" },
  { src: "/samples/semiformal.jpg", name: "contoh-semiformal.jpg" },
] as const;

export type Scenario = "passport" | "catalog" | "quick";
const SCENARIOS: readonly Scenario[] = ["passport", "catalog", "quick"];

/** `?preset=passport|catalog|quick`, sent by the landing page. */
export function presetFromUrl(): Scenario | null {
  if (typeof window === "undefined") return null;
  const v = new URLSearchParams(window.location.search).get("preset");
  return v && (SCENARIOS as readonly string[]).includes(v) ? (v as Scenario) : null;
}

/** The browser's own data-saver flag, where it reports one. */
export function saveDataOn(): boolean {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  return c?.saveData === true;
}

export function SamplePhotos({
  disabled,
  onFile,
  onError,
}: {
  disabled: boolean;
  onFile: (f: File) => void;
  onError: (msg: string) => void;
}) {
  const { locale } = useI18n();
  const s = studioXStrings[locale];
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const pick = async (src: string, name: string) => {
    if (disabled || loading) return;
    setLoading(src);
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      onFile(new File([blob], name, { type: blob.type || "image/jpeg" }));
    } catch (e) {
      console.error("[mattecut] sample fetch failed", e);
      onError(s.sampleError);
    } finally {
      setLoading(null);
    }
  };

  if (SAMPLES.every((x) => broken[x.src])) return null;

  return (
    <div className="mx-auto mt-6 max-w-sm">
      <p className="mono text-[11px] text-text-faint">{s.samplesTitle}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {SAMPLES.map((x, i) =>
          broken[x.src] ? null : (
            <button
              key={x.src}
              type="button"
              disabled={disabled || loading !== null}
              onClick={() => void pick(x.src, x.name)}
              className="group overflow-hidden rounded-lg border border-line bg-surface text-[11px] text-text-dim transition-colors hover:border-text-faint hover:text-text disabled:opacity-60"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={x.src}
                alt=""
                loading="lazy"
                onError={() => setBroken((b) => ({ ...b, [x.src]: true }))}
                className={`aspect-[4/3] w-full object-cover ${loading === x.src ? "opacity-50" : ""}`}
              />
              <span className="block truncate px-1.5 py-1.5">{s.samples[i]}</span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}

export function ScenarioPicker({
  value,
  onPick,
  disabled,
}: {
  value: Scenario | null;
  onPick: (s: Scenario) => void;
  disabled: boolean;
}) {
  const { locale } = useI18n();
  const s = studioXStrings[locale];
  return (
    <div className="mx-auto mb-6 max-w-xl text-start">
      <p className="mono mb-2 text-center text-[11px] text-text-faint">
        {s.scenarioTitle}
      </p>
      <div className="grid gap-2 sm:grid-cols-3">
        {SCENARIOS.map((id) => (
          <button
            key={id}
            type="button"
            disabled={disabled}
            aria-pressed={value === id}
            onClick={() => onPick(id)}
            className={`rounded-xl border px-3 py-2.5 text-start transition-colors disabled:opacity-60 ${
              value === id
                ? "border-accent bg-accent/10"
                : "border-line bg-surface hover:border-text-faint"
            }`}
          >
            <span className="block text-xs font-semibold">{s.scenarios[id].title}</span>
            <span className="mt-0.5 block text-[11px] leading-snug text-text-faint">
              {s.scenarios[id].note}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
