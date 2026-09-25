"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useInView } from "motion/react";
import PageContainer from "./PageContainer";
import { revealLines } from "@/components/ui/PageTransitionController";
import { useSetMobileDark } from "./MobileFlip";

const GIF_URL = "/assets/portfolio/showcasegif.gif";
const MOBILE_SHOWCASE = "/assets/portfolio/mobileshowcaseimg.webp";

/* Shared timing for the mobile light↔dark theme flip. */
const THEME_T = "transition-colors duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

/* The six value marks under the heading — dot bitmaps read dot-for-dot off the
   reference (8 wide; 7 or 8 rows). "1" = dot. Each shows its label on hover. */
const GLYPHS: { name: string; rows: string[]; label: string }[] = [
  { name: "heart", label: "made with care", rows: ["01100110", "11111111", "11111111", "11111111", "01111110", "00111100", "00011000"] },
  { name: "cross", label: "no guesswork", rows: ["11000011", "11000011", "00100100", "00011000", "00011000", "00100100", "11000011", "11000011"] },
  { name: "cup", label: "calm process", rows: ["00010100", "00101000", "00000000", "11111111", "11111101", "11111111", "11111100", "01111000"] },
  { name: "hourglass", label: "efficiency first", rows: ["10000001", "01100110", "01111110", "00100100", "00100100", "01111110", "01100110", "10000001"] },
  { name: "house", label: "senior team", rows: ["00011000", "00111100", "01111110", "11111111", "11111111", "11100111", "11100111", "11100111"] },
  { name: "box", label: "full ownership", rows: ["00111100", "00111100", "11111111", "11100111", "11100111", "11111111", "11111111"] },
];

/* Reference geometry: 14px grid, 11.2px dots (r = 0.4 × step). The viewBox is
   the glyph's own grid, so an 8×7 glyph renders 7/8 as tall as an 8×8 one and
   centres against it — exactly like the reference row. */
const STEP = 14;
const DOT_R = 5.6;

function DotGlyph({ rows, className = "" }: { rows: string[]; className?: string }) {
  const cols = rows[0].length;
  return (
    <svg
      viewBox={`0 0 ${cols * STEP} ${rows.length * STEP}`}
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "1" ? (
            <circle key={`${x}-${y}`} cx={x * STEP + STEP / 2} cy={y * STEP + STEP / 2} r={DOT_R} />
          ) : null
        )
      )}
    </svg>
  );
}

function Heading({ dark }: { dark: boolean }) {
  /* Masked line-by-line rise the first time the paragraph scrolls into view.
     Hidden only from mount (so no-JS / reduced motion always see the text). */
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(h2Ref, { once: true, margin: "0px 0px -25% 0px" });
  const pending = useRef(false);
  useEffect(() => {
    const el = h2Ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pending.current = true;
    el.style.visibility = "hidden";
    return () => {
      el.style.visibility = "";
    };
  }, []);
  useEffect(() => {
    const el = h2Ref.current;
    if (!inView || !el || !pending.current) return;
    pending.current = false;
    el.style.visibility = "";
    revealLines(el);
  }, [inView]);

  return (
    <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
      <p
        className={`pt-2 font-mono text-[0.8125rem] uppercase tracking-[0.3em] ${THEME_T} ${dark ? "text-white/45" : "text-black/45"}`}
      >
        Our Approach and Values
      </p>
      <h2
        ref={h2Ref}
        className={`max-w-3xl font-display text-xl font-medium leading-[1.08] sm:text-2xl md:text-[2.75rem] lg:text-[2.875rem] ${THEME_T} ${dark ? "text-white" : "text-black"}`}
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
    // Desktop row per the reference: 8×14px-grid icons whose centres sit 307px
    // apart (5.84vw icons + 10.16vw gaps), centred on the page and vertically.
    <div className="mt-16 grid grid-cols-3 place-items-center gap-x-4 gap-y-12 md:mt-32 md:flex md:items-center md:justify-center md:gap-x-[10.16vw]">
      {GLYPHS.map(({ name, rows, label }) => (
        <div key={name} className="group/icon relative flex flex-col items-center">
          {/* Value label — compact white pill 61px above the icon; fades and
              eases up into place on hover, back out on leave. */}
          <span className="pointer-events-none absolute bottom-[calc(100%+3.8125rem)] left-1/2 z-10 flex h-[2.875rem] -translate-x-1/2 translate-y-2 items-center whitespace-nowrap rounded-full bg-white px-[1.1875rem] font-body text-[1.0625rem] text-black opacity-0 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/icon:translate-y-0 group-hover/icon:opacity-100">
            {label}
          </span>
          <DotGlyph
            rows={rows}
            className={`h-auto w-8 sm:w-12 md:w-[5.84vw] ${THEME_T} ${dark ? "text-white/30" : "text-[#d1d1d1]"}`}
          />
        </div>
      ))}
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
