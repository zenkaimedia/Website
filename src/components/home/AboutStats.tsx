"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const STATS = [
  { end: 500, suffix: "+", label: "Projects Delivered", wide: true },
  { end: 20, suffix: "+", label: "Industries", wide: false },
  { end: 7, suffix: "", label: "Countries", wide: false },
];

const DURATION = 1600; // count-up duration (ms)

function Stat({ end, suffix, label, wide }: (typeof STATS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-between overflow-hidden rounded-2xl bg-black/[0.03] p-6 ring-1 ring-black/5 ${
        wide
          ? "col-span-2 min-h-[12rem] md:min-h-[22rem] md:p-10"
          : "min-h-[8.5rem] md:min-h-[14rem]"
      }`}
    >
      {/* Big on mobile; the wide "500+" runs at 10vw while the narrow cards use
         a smaller size so 3-char numbers like "20+" always fit their column. */}
      <span
        className="font-display font-bold leading-[0.85] text-black/[0.13]"
        style={{
          fontSize: wide
            ? "clamp(64px, 10vw, 192px)"
            : "clamp(54px, 6vw, 140px)",
        }}
      >
        {val}
        {suffix}
      </span>
      <span
        className="mt-8 font-body text-black/45 md:mt-10"
        style={{ fontSize: "clamp(0.8125rem, 1vw, 1.1875rem)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function AboutStats() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  );
}
