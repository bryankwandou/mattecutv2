"use client";

import { Download, ImagePlus, ScissorsLineDashed, Shirt, WifiOff, Zap } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useI18n } from "@/components/preferences";
import { landingStrings, OFFLINE_BACKDROP_COUNT } from "@/lib/i18n/segments/landing";

const STEP_ICONS = [ImagePlus, ScissorsLineDashed, Download];
const FACT_ICONS = [Shirt, Zap, WifiOff];

export function HowItWorks() {
  const { locale } = useI18n();
  const s = landingStrings[locale];

  return (
    <section className="border-b border-line-soft bg-ink-2">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <p className="mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
            {s.howEyebrow}
          </p>
          <h2 className="mt-4 max-w-lg text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {s.howHeading}
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {s.steps.map((st, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal key={i} delay={i * 0.07}>
                <li className="flex h-full gap-4 rounded-2xl border border-line bg-surface p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-text">
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="mono text-[11px] text-text-faint">0{i + 1}</p>
                    <h3 className="mt-1 text-base font-semibold tracking-[-0.01em]">{st.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-dim">{st.body}</p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.2}>
          <ul className="mt-8 flex flex-col gap-3 text-sm text-text-dim sm:flex-row sm:flex-wrap sm:gap-x-8">
            {s.facts.map((f, i) => {
              const Icon = FACT_ICONS[i];
              return (
                <li key={i} className="flex items-center gap-2">
                  <Icon size={15} className="shrink-0 text-accent-text" />
                  {f.replace("{n}", String(OFFLINE_BACKDROP_COUNT))}
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
