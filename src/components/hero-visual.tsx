"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/preferences";
import { CompareSlider } from "@/components/compare-slider";
import { heroVisualStrings } from "@/lib/i18n/segments/hero-visual";

/**
 * The hero illustration.
 *
 * Deliberately abstract rather than a mocked-up screenshot: a scan line
 * sweeps a subject silhouette and leaves the alpha checkerboard behind it.
 * It shows what the product does without pretending to be a real result,
 * which is the line a landing page should not cross.
 *
 * All colours are tokens, so the same illustration reads correctly on a
 * white page and on a black one.
 */
function AbstractVisual() {
  const still = useReducedMotion();
  const { t } = useI18n();

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
      <div className="absolute inset-0 overflow-hidden rounded-2xl border border-line bg-ink-2">
        {/* Layer 1: the "background" that is about to go. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 25% 15%, var(--hv-1) 0%, var(--hv-2) 55%, var(--hv-3) 100%)",
          }}
        />
        <div className="grid-field absolute inset-0 opacity-60" />

        {/* Layer 2: the checkerboard, revealed as the scan passes. */}
        <motion.div
          className="checker absolute inset-0"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={
            still
              ? { clipPath: "inset(0 40% 0 0)" }
              : {
                  clipPath: [
                    "inset(0 100% 0 0)",
                    "inset(0 0% 0 0)",
                    "inset(0 100% 0 0)",
                  ],
                }
          }
          transition={
            still
              ? undefined
              : {
                  duration: 7,
                  times: [0, 0.45, 1],
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />

        {/* Layer 3: the subject, which survives either way. */}
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="hv-subject" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="var(--accent-hi)" />
              <stop offset="100%" stopColor="var(--accent-lo)" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="118" r="46" fill="url(#hv-subject)" />
          <path
            d="M96 300c0-52.5 46.6-95 104-95s104 42.5 104 95H96Z"
            fill="url(#hv-subject)"
          />
        </svg>

        {/* Layer 4: the scan line itself. */}
        {!still && (
          <motion.div
            className="absolute inset-y-0 w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 35%, transparent) 45%, var(--accent) 50%, color-mix(in srgb, var(--accent) 35%, transparent) 55%, transparent)",
              filter: "blur(0.5px)",
            }}
            initial={{ left: "-10%" }}
            animate={{ left: ["-10%", "100%", "-10%"] }}
            transition={{
              duration: 7,
              times: [0, 0.45, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Corner registration marks — a nod to how film frames are cut. */}
        {[
          "left-3 top-3 border-l border-t",
          "right-3 top-3 border-r border-t",
          "left-3 bottom-3 border-b border-l",
          "right-3 bottom-3 border-b border-r",
        ].map((c) => (
          <span
            key={c}
            className={`absolute h-4 w-4 ${c}`}
            style={{ borderColor: "var(--line)" }}
          />
        ))}
      </div>

      <span className="mono absolute -bottom-7 start-0 text-[10px] uppercase tracking-[0.16em] text-text-faint">
        {t.hero.caption}
      </span>
    </div>
  );
}

type Sample = {
  key: "person" | "product";
  before: string;
  after: string;
  backdrop: string;
};

const SAMPLES: Sample[] = [
  {
    key: "person",
    before: "/samples/person.jpg",
    after: "/samples/person-cut.png",
    // Passport-photo studio blue, the same family as the backdrop picker.
    backdrop: "linear-gradient(180deg, #4a78b5 0%, #2f5a96 100%)",
  },
  {
    key: "product",
    before: "/samples/product.jpg",
    after: "/samples/product-cut.png",
    // Soft studio gradient for catalogue shots.
    backdrop: "radial-gradient(120% 90% at 50% 25%, #ffffff 0%, #e6e6e2 70%, #d4d4cf 100%)",
  },
];

function probe(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Hero preview: a real before/after slider when the sample photos and their
 * cut-outs exist, the abstract scan illustration otherwise. The frame keeps
 * the old 4/3 box so the hero layout never shifts between the two.
 */
export function HeroVisual() {
  const { locale } = useI18n();
  const s = heroVisualStrings[locale];
  const [ready, setReady] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState<Sample["key"]>("person");

  useEffect(() => {
    let alive = true;
    SAMPLES.forEach(async (smp) => {
      const ok = (await probe(smp.before)) && (await probe(smp.after));
      if (alive && ok) setReady((r) => ({ ...r, [smp.key]: true }));
    });
    return () => {
      alive = false;
    };
  }, []);

  const avail = SAMPLES.filter((x) => ready[x.key]);
  if (avail.length === 0) return <AbstractVisual />;
  const cur = avail.find((x) => x.key === active) ?? avail[0];

  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
      <div
        className="absolute inset-0 grid place-items-center overflow-hidden rounded-2xl border border-line bg-ink-2"
        style={{ background: "var(--hv-2)" }}
      >
        <CompareSlider
          key={cur.key}
          before={cur.before}
          after={cur.after}
          backdrop={cur.backdrop}
          maxVh={34}
        />
      </div>

      {avail.length > 1 && (
        <div
          role="group"
          aria-label={s.switchLabel}
          className="absolute end-3 top-3 flex gap-1 rounded-lg p-1 backdrop-blur"
          style={{ background: "var(--scrim)", border: "1px solid var(--scrim-line)" }}
        >
          {avail.map((x) => (
            <button
              key={x.key}
              type="button"
              aria-pressed={x.key === cur.key}
              onClick={() => setActive(x.key)}
              className="mono rounded-md px-2 py-1 text-[10px] uppercase tracking-[0.12em] transition-colors"
              style={{
                color: "var(--scrim-fg)",
                background: x.key === cur.key ? "#ffffff30" : "transparent",
              }}
            >
              {s[x.key]}
            </button>
          ))}
        </div>
      )}

      <span className="mono absolute -bottom-7 start-0 text-[10px] uppercase tracking-[0.16em] text-text-faint">
        {s.caption}
      </span>
    </div>
  );
}
