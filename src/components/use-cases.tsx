"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { useI18n } from "@/components/preferences";
import { landingStrings } from "@/lib/i18n/segments/landing";

/** Hide a sample photo that has not been added yet instead of showing a broken icon. */
function hide(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.style.display = "none";
}

const PASSPORT_BGS = ["#9ca3af", "#ffffff", "#1d4ed8", "#b91c1c"];

function PassportVisual() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.4fr] gap-1.5 p-3">
      <div className="relative overflow-hidden rounded-md border border-line-soft bg-surface-2">
        <img
          src="/samples/person.jpg"
          alt=""
          onError={hide}
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {["charcoal", "navy", "blazer", "charcoal"].map((suit, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-md border border-line-soft"
            style={{ background: PASSPORT_BGS[i] }}
          >
            <img
              src={`/attire/${suit}.svg`}
              alt=""
              onError={hide}
              className="absolute inset-x-0 bottom-0 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalogVisual() {
  return (
    <div className="grid h-full grid-cols-2 gap-1.5 p-3">
      <div className="relative overflow-hidden rounded-md border border-line-soft bg-surface-2">
        <img src="/samples/product.jpg" alt="" onError={hide} className="h-full w-full object-cover" />
      </div>
      <div className="relative overflow-hidden rounded-md border border-line-soft">
        <img src="/backdrops/studio-grey.svg" alt="" onError={hide} className="absolute inset-0 h-full w-full object-cover" />
        <img src="/samples/product-cut.png" alt="" onError={hide} className="absolute inset-0 h-full w-full object-contain p-2" />
      </div>
    </div>
  );
}

function CreatorVisual() {
  return (
    <div className="grid h-full grid-cols-[1fr_1.6fr] gap-1.5 p-3">
      <div className="relative aspect-square self-center overflow-hidden rounded-full border border-line-soft">
        <img src="/samples/person.jpg" alt="" onError={hide} className="absolute inset-0 h-full w-full object-cover object-top" />
      </div>
      <div className="relative overflow-hidden rounded-md border border-line-soft">
        <img src="/offline/o0005.webp" alt="" onError={hide} className="absolute inset-0 h-full w-full object-cover" />
        <img src="/samples/semiformal.jpg" alt="" onError={hide} className="absolute inset-y-0 end-0 h-full w-1/2 object-cover" />
      </div>
    </div>
  );
}

const CARDS = [
  { href: "/studio?preset=passport", Visual: PassportVisual },
  { href: "/studio?preset=catalog", Visual: CatalogVisual },
  { href: "/studio", Visual: CreatorVisual },
];

export function UseCases() {
  const { locale } = useI18n();
  const s = landingStrings[locale];

  return (
    <section className="border-b border-line-soft">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <p className="mono text-[11px] uppercase tracking-[0.16em] text-accent-text">
            {s.useEyebrow}
          </p>
          <h2 className="mt-4 max-w-lg text-balance text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {s.useHeading}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {CARDS.map(({ href, Visual }, i) => {
            const c = s.cases[i];
            return (
              <Reveal key={href} delay={i * 0.07}>
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 motion-reduce:hover:translate-y-0"
                >
                  <div className="h-36 border-b border-line-soft bg-ink-2">
                    <Visual />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-semibold tracking-[-0.01em]">{c.title}</h3>
                    <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-text-dim">
                      {c.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-text">
                      {c.cta}
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
