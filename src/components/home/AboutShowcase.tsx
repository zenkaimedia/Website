"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import PageContainer from "./PageContainer";

const GIF_URL = "/assets/portfolio/showcasegif.gif";
const MOBILE_SHOWCASE = "/assets/portfolio/mobileshowcaseimg.webp";

/* About-page centrepiece — the SAME scroll-linked gif zoom the home page uses.
   Desktop: the card is pinned centre-screen and grows as you scroll, while the
   surrounding background fades white → black (the theme hand-off into the dark
   "Our Values" section below). Mobile: a static image on a background that fades
   the same way. The gif itself is never filtered, so it stays full-colour. */
export default function AboutShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // By 10% the background has faded to black; 10%→90% zooms the card.
  const bgColor = useTransform(scrollYProgress, [0, 0.1], ["#ffffff", "#000000"]);
  const w = useTransform(scrollYProgress, [0.1, 0.9], [52, 91]);
  const h = useTransform(scrollYProgress, [0.1, 0.9], [70, 88]);
  const width = useMotionTemplate`${w}vw`;
  const height = useMotionTemplate`${h}vh`;

  // Mobile: fade the section background as the image crosses the screen.
  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: mProg } = useScroll({
    target: mobileRef,
    offset: ["start end", "end start"],
  });
  const mobileBg = useTransform(mProg, [0.35, 0.55], ["#ffffff", "#000000"]);

  return (
    <section className="relative">
      {/* ── Desktop: pinned, scroll-linked gif zoom ─────────────────────── */}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GIF_URL}
                alt="Zenkai work showcase"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </PageContainer>
        </motion.div>
      </div>

      {/* ── Mobile: image on a background that fades white → black ───────── */}
      <motion.div
        ref={mobileRef}
        style={{ backgroundColor: mobileBg }}
        className="px-5 py-16 sm:px-6 md:hidden"
      >
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MOBILE_SHOWCASE}
            alt="Zenkai work showcase"
            className="aspect-[2/3] w-full object-cover object-center"
          />
        </div>
      </motion.div>
    </section>
  );
}
