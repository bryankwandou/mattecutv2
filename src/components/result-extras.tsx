"use client";

import { Loader2, ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/preferences";
import { fill } from "@/lib/i18n";
import { studioXStrings } from "@/lib/i18n/segments/studio";
import type { Background } from "@/lib/compose";
import type { Rgba } from "@/lib/color";

const rgb = (r: number, g: number, b: number): Rgba => ({ r, g, b, a: 1 });

/** Values reused from background-picker.tsx (white preset, the grey studio
 *  gradient and its darker end), so these buttons light the same swatches. */
const QUICK: { id: "white" | "grey" | "gradient" | "transparent"; bg: Background; css: string }[] = [
  { id: "white", bg: { kind: "solid", color: rgb(255, 255, 255) }, css: "#ffffff" },
  { id: "grey", bg: { kind: "solid", color: rgb(0xb9, 0xbe, 0xc7) }, css: "#b9bec7" },
  {
    id: "gradient",
    bg: { kind: "gradient", from: rgb(0xe8, 0xe8, 0xea), to: rgb(0xb9, 0xbe, 0xc7), angle: 90 },
    css: "linear-gradient(90deg,#e8e8ea,#b9bec7)",
  },
  {
    id: "transparent",
    bg: { kind: "transparent" },
    css: "repeating-conic-gradient(var(--checker) 0 25%, transparent 0 50%) 0 0/8px 8px",
  },
];

function same(a: Background, b: Background) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function QuickBackdrops({
  value,
  onChange,
  enabled,
}: {
  value: Background;
  onChange: (b: Background) => void;
  enabled: boolean;
}) {
  const { locale } = useI18n();
  const s = studioXStrings[locale];
  if (!enabled) return null;
  return (
    <div role="group" aria-label={s.quickBgTitle} className="flex flex-wrap gap-1.5">
      {QUICK.map((q) => {
        const on = value.kind !== "image" && same(value, q.bg);
        return (
          <button
            key={q.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(q.bg)}
            className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] transition-colors ${
              on
                ? "border-accent bg-accent/10 text-text"
                : "border-line text-text-dim hover:border-text-faint hover:text-text"
            }`}
          >
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 rounded-[3px] border border-line"
              style={{ background: q.css }}
            />
            {s.quickBg[q.id]}
          </button>
        );
      })}
    </div>
  );
}

/** Privacy line plus status labels taken from signals the code really has. */
export function ResultStatus({
  onGpu,
  modelHot,
  attireOn,
  attireAuto,
}: {
  onGpu: boolean;
  /** true: model was already in memory before this cut; false: loaded during
   *  it; null: no cut ran (0 MB mode or restored draft), so no claim. */
  modelHot: boolean | null;
  attireOn: boolean;
  attireAuto: boolean;
}) {
  const { locale } = useI18n();
  const s = studioXStrings[locale];
  const chips = [
    modelHot !== null ? (onGpu ? s.engineGpu : s.engineWasm) : null,
    modelHot === null ? null : modelHot ? s.modelHot : s.modelCold,
    attireOn ? (attireAuto ? s.attireAuto : s.attireManual) : null,
  ].filter((c): c is string => c !== null);
  return (
    <div className="space-y-2">
      <p className="flex items-start gap-2 text-xs leading-relaxed text-text-dim">
        <ShieldCheck size={14} className="mt-px shrink-0 text-ok-text" />
        {s.privacy}
      </p>
      {chips.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <li
              key={c}
              className="mono rounded-md border border-line-soft bg-surface px-2 py-1 text-[10px] text-text-faint"
            >
              {c}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Small status for the background warm-up, with the way to avoid it. */
export function WarmStatus({
  cutBg,
  warming,
  ready,
  saveData,
  mb,
  ratio,
  onZeroMb,
}: {
  cutBg: boolean;
  warming: boolean;
  ready: boolean;
  saveData: boolean;
  mb: number;
  ratio: number | null;
  onZeroMb: () => void;
}) {
  const { locale } = useI18n();
  const s = studioXStrings[locale];
  if (!cutBg) {
    return <p className="mt-3 text-center text-[11px] text-text-faint">{s.warmOff}</p>;
  }
  const text = warming
    ? fill(s.warmDownloading, { mb })
    : ready
      ? s.warmReady
      : saveData
        ? s.warmSaveData
        : null;
  if (!text) return null;
  return (
    <p
      className="mx-auto mt-3 flex max-w-sm flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] text-text-faint"
      role="status"
      aria-live="polite"
    >
      {warming && <Loader2 size={11} className="shrink-0 animate-spin" />}
      <span>{text}</span>
      {warming && ratio != null && (
        <span className="mono tabular-nums">{Math.round(ratio * 100)}%</span>
      )}
      {!ready && (
        <button
          type="button"
          onClick={onZeroMb}
          className="underline underline-offset-2 transition-colors hover:text-text"
        >
          {s.warmStop}
        </button>
      )}
    </p>
  );
}
