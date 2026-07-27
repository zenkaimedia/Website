"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import PageContainer from "./PageContainer";
import { useSetMobileDark } from "./MobileFlip";

const GIF_URL = "/assets/portfolio/showcasegif.gif";
const MOBILE_SHOWCASE = "/assets/portfolio/mobileshowcaseimg.webp";

/* Shared timing for the mobile light↔dark theme flip. */
const THEME_T = "transition-colors duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

/* Dense filled dot-matrix glyphs (9-wide bitmaps) — the value marks under the
   heading. "1" = filled dot. Each shows its value label on hover. */
const GLYPHS: { rows: string[]; label: string }[] = [
  { label: "made with care", rows: ["011000110", "111101111", "111111111", "111111111", "011111110", "001111100", "000111000", "000010000"] }, // heart
  { label: "no guesswork", rows: ["110000011", "111000111", "011101110", "001111100", "000111000", "001111100", "011101110", "111000111", "110000011"] }, // x
  { label: "calm process", rows: ["000010000", "000111000", "000111000", "001111100", "011111110", "111111111", "111111111", "011111110", "001111100"] }, // droplet
  { label: "efficiency first", rows: ["111111111", "111111111", "011111110", "001111100", "000111000", "001111100", "011111110", "111111111", "111111111"] }, // hourglass
  { label: "senior team", rows: ["000010000", "000111000", "001111100", "001111100", "011111110", "011101110", "111000111", "110000011", "100000001"] }, // arch
  { label: "full ownership", rows: ["001111100", "011111110", "111000111", "110000011", "110000011", "110000011", "111000111", "011111110", "001111100"] }, // ring
];

/* Build a CSS mask (data-URI SVG of the dots) so we can paint the glyph with a
   flat colour AND sweep a white shine over just the dots — no per-circle SVG. */
function glyphMask(rows: string[]): string {
  const step = 4;
  const r = 1.5;
  const cols = rows[0].length;
  let circles = "";
  rows.forEach((row, y) =>
    [...row].forEach((cell, x) => {
      if (cell === "1") {
        circles += `<circle cx='${x * step + step / 2}' cy='${y * step + step / 2}' r='${r}'/>`;
      }
    })
  );
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${cols * step} ${rows.length * step}'>${circles}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function Heading({ dark }: { dark: boolean }) {
  return (
    <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <p
        className={`pt-2 font-mono text-[0.8125rem] uppercase tracking-[0.3em] ${THEME_T} ${dark ? "text-white/45" : "text-black/45"}`}
      >
        Our Approach and Values
      </p>
      <h2
        className={`max-w-3xl font-display text-xl font-bold leading-[1.08] sm:text-2xl md:text-[2.75rem] lg:text-[2.875rem] ${THEME_T} ${dark ? "text-white" : "text-black"}`}
      >
        We combine creativity, strategic ideas and technology
        <span className={`${THEME_T} ${dark ? "text-white/35" : "text-black/35"}`}>
          {" "}to create bespoke solutions that drive your success.
        </span>
      </h2>
    </div>
  );
}

function Glyphs({ dark }: { dark: boolean }) {
  return (
    <div className="mt-16 grid grid-cols-3 place-items-center gap-x-4 gap-y-12 md:mt-32 md:flex md:items-end md:justify-between md:gap-2">
      {GLYPHS.map(({ rows, label }, i) => {
        const mask = glyphMask(rows);
        const maskStyle = {
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        } as const;
        return (
          <div key={i} className="group/icon relative flex flex-col items-center">
            {/* Value label — fades/rises in on hover */}
            <span className="pointer-events-none absolute top-[-5.125rem] z-10 translate-y-2 whitespace-nowrap rounded-xl bg-white px-5 py-2 font-body text-[0.8125rem] font-medium text-black opacity-0 shadow-md transition-all duration-300 group-hover/icon:translate-y-0 group-hover/icon:opacity-100">
              {label}
            </span>
            {/* Icon: flat grey dots + a white 45° shine that sweeps on hover */}
            <div
              style={maskStyle}
              className="relative h-8 w-8 overflow-hidden sm:h-12 sm:w-12 lg:h-14 lg:w-14 xl:h-20 xl:w-20 2xl:h-[6rem] 2xl:w-[6rem]"
            >
              <div
                className={`absolute inset-0 ${THEME_T} ${dark ? "bg-white/30" : "bg-black/20"}`}
              />
              <div
                style={{ transform: "translateX(-130%)" }}
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_38%,rgba(255,255,255,0.95)_50%,transparent_62%)] group-hover/icon:animate-[iconShine_0.9s_ease-out]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ApproachShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  /* Mobile: when the gif reaches the middle of the screen the surrounding
     background fades white → black (a timed CSS transition, reversible — the
     same feel as the services page), handing off into the black Latest Work. */
  const mobileRef = useRef<HTMLDivElement>(null);
  const setMobileDark = useSetMobileDark();
  useEffect(() => {
    const update = () => {
      const el = mobileRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Hidden (desktop breakpoint) → zero rect; don't let that read as "centred".
      if (r.height === 0) {
        setMobileDark(false);
        return;
      }
      const centre = r.top + r.height / 2;
      setMobileDark(centre <= window.innerHeight * 0.55);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [setMobileDark]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // The gif is pinned centre-screen. Scrolling drives the sequence:
  //  • by 10% the background has faded from cream to black (card still small),
  //  • from 10%→90% the card zooms from its rest size to the final card size,
  //  • it holds there, then normal scroll resumes into the next section.
  const bgColor = useTransform(scrollYProgress, [0, 0.1], ["#ffffff", "#000000"]);
  const w = useTransform(scrollYProgress, [0.1, 0.9], [52, 91]);
  const h = useTransform(scrollYProgress, [0.1, 0.9], [70, 88]);
  const width = useMotionTemplate`${w}vw`;
  const height = useMotionTemplate`${h}vh`;

  return (
    <section
      id="about"
      className="relative scroll-mt-16 bg-white md:scroll-mt-20 md:bg-white"
    >
      {/* ── Heading + icons (normal flow, shown once) ────────────────────────
         Rendered LIGHT; on mobile the surrounding MobileFlip shell inverts the
         whole region to flip it dark — in perfect sync with every other section,
         since one shell filter drives the entire transition. */}
      <PageContainer className="pt-2 pb-20 md:pt-4 md:pb-28 lg:pt-8 lg:pb-32">
        <Heading dark={false} />
        <Glyphs dark={false} />
      </PageContainer>

      {/* ── Desktop: pinned, scroll-linked gif zoom (stops at the card size) ─ */}
      <div ref={ref} className="hidden md:block" style={{ height: "250vh" }}>
        <motion.div
          style={{ backgroundColor: bgColor }}
          className="sticky top-0 h-screen overflow-hidden"
        >
          <PageContainer className="flex h-full items-center justify-center">
            <motion.div
              style={{ width, height }}
              className="overflow-hidden rounded-[1.5rem] bg-black shadow-2xl"
            >
              <img
                src={GIF_URL}
                alt="Zenkai work showcase"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </PageContainer>
        </motion.div>
      </div>

      {/* ── Mobile: no gif — a static image that drives the whole-page flip as
             it crosses mid-screen (image below → page white, above → black).
             The photo stays full-colour: globals.css re-inverts every `.mflip-
             shell img` so the shell's invert cancels on the image itself. ──── */}
      <div ref={mobileRef} className="px-5 pb-16 sm:px-6 md:hidden">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MOBILE_SHOWCASE}
            alt="Zenkai work showcase"
            className="flip-photo aspect-[2/3] w-full object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
