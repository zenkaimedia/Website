"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { POSTS, CATEGORIES, type Post } from "./insights";

/* One article card — the "Read more" pill follows the cursor (same interaction
   as the portfolio's "See the project" tag), no image zoom. */
function Card({ post }: { post: Post }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cfg = { stiffness: 350, damping: 30, mass: 0.4 };
  const x = useSpring(mx, cfg);
  const y = useSpring(my, cfg);

  const rel = (e: { clientX: number; clientY: number }) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return null;
    return { nx: e.clientX - r.left, ny: e.clientY - r.top };
  };
  const onEnter = (e: React.MouseEvent) => {
    const p = rel(e);
    if (!p) return;
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
      href={post.href}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      className="group relative block"
    >
      <div className="relative overflow-hidden rounded-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="flip-photo aspect-[4/5] w-full object-cover"
        />

        {/* Subtle dim on hover */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />

        {/* Badges — category only when the post has one */}
        <div className="absolute inset-x-4 top-4 flex items-center gap-2">
          {post.category && (
            <span className="rounded-lg bg-[#1a1a1a]/90 px-3 py-1.5 font-body text-[clamp(0.7rem,3vw,0.8125rem)] text-white backdrop-blur-sm">
              {post.category}
            </span>
          )}
          <span className="rounded-lg bg-[#1a1a1a]/90 px-3 py-1.5 font-mono text-[clamp(0.65rem,2.8vw,0.75rem)] tracking-[0.06em] text-white backdrop-blur-sm">
            {post.date}
          </span>
        </div>
      </div>

      {/* Cursor-tracking "Read more" pill — sits OUTSIDE the clipped image box so
         it can extend past the card edge (never gets cut off). */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none absolute left-0 top-0 z-20"
      >
        <span className="flex translate-x-5 translate-y-5 items-center gap-2.5 whitespace-nowrap rounded-xl bg-[#1a1a1a]/95 px-5 py-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          Read more
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/rightuparrow.webp"
            alt=""
            aria-hidden="true"
            className="h-3 w-3 object-contain [filter:brightness(0)_invert(1)]"
          />
        </span>
      </motion.div>

      <h3 className="mt-4 font-display text-[clamp(1.05rem,4.5vw,1.5rem)] font-bold leading-snug text-black">
        {post.title}
      </h3>
    </a>
  );
}

/* Filter chips + article grid for the Insights page. */
export default function InsightsGrid() {
  const [active, setActive] = useState("All");
  const filters = ["All", ...CATEGORIES];
  const posts = active === "All" ? POSTS : POSTS.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap gap-2 md:mb-12">
        {filters.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`rounded-lg px-[clamp(1rem,4vw,1.5rem)] py-[clamp(0.55rem,2.6vw,0.85rem)] font-body text-[clamp(0.85rem,3.7vw,1rem)] transition-colors ${
                on
                  ? "bg-black text-white"
                  : "bg-black/[0.06] text-black/60 hover:bg-black/10 hover:text-black"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Cards — 4 columns on desktop (two fill the row, like the reference) */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 md:gap-x-6 md:gap-y-12 lg:grid-cols-4">
        {posts.map((post) => (
          <Card key={post.title} post={post} />
        ))}
      </div>
    </div>
  );
}
