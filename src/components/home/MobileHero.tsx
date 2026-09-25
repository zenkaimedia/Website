"use client";

import { useEffect, useRef, useState } from "react";

/* Full-screen swipeable image carousel — the mobile home hero. Auto-advances
   with a segmented progress bar; swipe or tap a segment to jump. */
const SLIDES = [
  {
    image: "/assets/mobile/herosection/creativeproduction.webp",
    title: "Creative Production",
  },
  {
    image: "/assets/mobile/herosection/aicreativestudio.webp",
    title: "AI Creative Studio",
  },
  {
    image: "/assets/mobile/herosection/brandanddesign.webp",
    title: "Branding & Design",
  },
];

const DURATION = 4500; // ms per slide (matches the progress-bar animation)

export default function MobileHero({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);

  const go = (i: number) => setActive((i + SLIDES.length) % SLIDES.length);

  // Auto-advance; the timer resets whenever `active` changes (manual or auto).
  useEffect(() => {
    const t = setTimeout(() => go(active + 1), DURATION);
    return () => clearTimeout(t);
  }, [active]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) go(active + 1);
    else if (dx > 40) go(active - 1);
    touchX.current = null;
  };

  return (
    <section
      className={`relative h-[80svh] min-h-[480px] overflow-hidden bg-black ${className}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={s.image}
          className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"
            }`}
          aria-hidden={i !== active}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt={s.title}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      ))}

      {/* Legibility gradients — top for the nav, bottom for the caption */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {/* Caption + progress */}
      {/* Reference (412px phone): 16px inset, 12px counter, 24px regular title,
          4px bars 8px apart sitting 16px off the bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-[16px] pb-[16px]">
        <p className="font-body text-[12px] leading-[16px] tracking-[0.1em] text-white/60">
          0{active + 1} / 0{SLIDES.length}
        </p>
        <h2 className="mt-[4px] font-display text-[24px] font-normal leading-[32px] tracking-normal text-white">
          {SLIDES[active].title}
        </h2>

        {/* Segmented progress bar */}
        <div className="mt-[20px] flex gap-[8px]">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className="h-[4px] flex-1 overflow-hidden rounded-full bg-white/25"
            >
              <span
                key={active} // remount so the fill animation restarts each slide
                className="block h-full bg-white"
                style={
                  i < active
                    ? { width: "100%" }
                    : i === active
                      ? {
                        width: "0%",
                        animation: `growWidth ${DURATION}ms linear forwards`,
                      }
                      : { width: "0%" }
                }
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
