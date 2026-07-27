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
  const ref = useRef<HTMLHeadingElement>(null);
  const setDark = useSetDark();
  // Track the HEADLINE itself (not the whole section, whose centre sits between
  // the headline and the paragraph below it) so the flip fires exactly when the
  // headline reaches the middle of the screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "center start"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setDark(v >= 0.5));

  return (
    <div className="flex min-h-[52vh] items-center justify-center overflow-hidden py-20 md:min-h-screen md:py-0">
      <div className="mx-auto w-full max-w-7xl px-5 text-center sm:px-6">
        <h2
          ref={ref}
          className="mx-auto font-display font-bold leading-[1.1] text-[#0a0a0a]"
          style={{ fontSize: "clamp(1.85rem, 3.5vw, 3.4rem)" }}
        >
          Crafting Thoughtful Brands and Digital
          <br className="hidden md:block" /> Products
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-sm leading-relaxed text-black/55 md:text-[1.1875rem]">
          Zenkai is a creative growth studio. We create brands, content &amp;
          digital experiences defined by strategy, precision, and vision.
        </p>
      </div>
    </div>
  );
}
