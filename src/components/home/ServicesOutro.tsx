"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useSetDark } from "./InvertShell";

/* Full-screen outro headline. It doesn't colour itself — the surrounding
   InvertShell does that. It only reports WHEN to flip: the moment its top edge
   crosses the middle of the screen going down, the whole page inverts to black;
   scrolling back up past the middle flips it to white. The fade itself is the
   shell's timed CSS transition, so it's smooth, reversible and never scrubbed. */
export default function ServicesOutro() {
  const ref = useRef<HTMLDivElement>(null);
  const setDark = useSetDark();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setDark(v >= 0.5));

  return (
    <div
      ref={ref}
      className="flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="mx-auto w-full max-w-6xl px-5 text-center sm:px-6">
        <h2
          className="mx-auto font-display font-bold leading-[1.08] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 3.8vw, 3.75rem)" }}
        >
          Crafting Thoughtful Brands and Digital
          <br className="hidden md:block" /> Products
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-body text-sm leading-relaxed text-black/55 md:text-base">
          Zenkai is a creative growth studio. We create brands, content &amp;
          digital experiences defined by strategy, precision, and vision.
        </p>
      </div>
    </div>
  );
}
