"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { WORK, type Work } from "./portfolio";

/* One project card — the "See the project" pill follows the cursor (same
   interaction as the homepage Latest Work cards), no image zoom. */
function Card({ work }: { work: Work }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cfg = { stiffness: 350, damping: 30, mass: 0.4 };
  const x = useSpring(mx, cfg);
  const y = useSpring(my, cfg);

  const rel = (e: { clientX: number; clientY: number }) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return null;
    // The pill may spill past the card, but never past the screen edge
    // (the page clips overflow-x): stop it 12px short of the viewport.
    // offsetWidth ignores the translate-x-5 (20px) offset, so add it back.
    const pillW = (pillRef.current?.offsetWidth ?? 0) + 20;
    const maxX = document.documentElement.clientWidth - 12 - pillW;
    return { nx: Math.min(e.clientX, maxX) - r.left, ny: e.clientY - r.top };
  };
  const onEnter = (e: React.MouseEvent) => {
    const p = rel(e);
    if (!p) return;
    // Jump (no trail) on entry so the pill appears at the cursor, not a corner.
    mx.set(p.nx);
    my.set(p.ny);
    x.jump(p.nx);
    y.jump(p.ny);
  };
  const onMove = (e: React.MouseEvent) => {
    const p = rel(e);
    if (!p) return;
    mx.set(p.nx);
    my.set(p.ny);
  };

  return (
    <a
      ref={ref}
      href={work.href}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      className="group relative block"
    >
      <div className="overflow-hidden rounded-lg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.image}
          alt={work.title}
          loading="lazy"
          className="flip-photo aspect-[3/2] w-full object-cover"
        />
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] items-start gap-4 md:mt-4 md:grid-cols-[4fr_1fr]">
        <h2 className="font-display text-[clamp(1.4rem,6vw,1.75rem)] font-medium leading-tight text-black md:text-[2rem]">
          {work.title}
        </h2>
        <p className="pt-0.5 font-body text-[0.8125rem] leading-snug md:pt-1 md:text-base">
          <span className="block text-black/45">Location:</span>
          <span className="block uppercase text-black">{work.location}</span>
        </p>
      </div>

      {/* Cursor-tracking "See the project" pill — sits OUTSIDE the clipped image
         box so it can extend past the card edge (never gets cut off). */}
      <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-20">
        <span
          ref={pillRef}
          className="flex translate-x-5 translate-y-5 items-center gap-2.5 whitespace-nowrap rounded-xl bg-[#1a1a1a]/95 px-5 py-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
        >
          See the project
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/rightuparrow.webp"
            alt=""
            aria-hidden="true"
            className="h-3 w-3 object-contain [filter:brightness(0)_invert(1)]"
          />
        </span>
      </motion.div>
    </a>
  );
}

/** Two-column project grid. Defaults to every project; the project pages pass
    their "Next project" pair. */
export default function PortfolioGrid({ items = WORK }: { items?: Work[] }) {
  return (
    <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-7 md:gap-y-16">
      {items.map((work) => (
        <Card key={work.title} work={work} />
      ))}
    </div>
  );
}
