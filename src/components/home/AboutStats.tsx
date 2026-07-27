"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

/* Update these to your real figures. */
const STATS = [
  { end: 100, suffix: "+", label: "Projects Delivered", wide: true },
  { end: 5, suffix: "+", label: "Years in Industry", wide: false },
  { end: 7, suffix: "", label: "Disciplines", wide: false },
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
      className={`flex flex-col justify-between rounded-2xl bg-black/[0.03] p-6 ring-1 ring-black/5 md:p-8 ${
        wide
          ? "col-span-2 min-h-[12rem] md:min-h-[22rem]"
          : "min-h-[8.5rem] md:min-h-[14rem]"
      }`}
    >
      {/* 10vw number, matching the reference (~192px at 1920). */}
      <span
        className="font-display font-bold leading-[0.85] text-black/[0.13]"
        style={{ fontSize: "clamp(3.25rem, 10vw, 12rem)" }}
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
