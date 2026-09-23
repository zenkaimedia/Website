"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "motion/react";
import { useSetMobileDark } from "./MobileFlip";
import PageContainer from "./PageContainer";

const GIF_URL = "/assets/portfolio/showcasegif.gif";
const MOBILE_SHOWCASE = "/assets/portfolio/mobileshowcaseimg.webp";

/* About-page centrepiece — the same scroll-linked gif treatment as the home
   page. Desktop: the card is pinned centre-screen and zooms while the background
   fades white → black. Mobile: the image drives the WHOLE-PAGE flip (via the
   MobileFlip shell) as it crosses mid-screen, so the entire page — not just this
   section — turns black; the photo itself is never filtered, staying full-colour. */
export default function AboutShowcase() {
  // Desktop pinned zoom
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const bgColor = useTransform(scrollYProgress, [0, 0.1], ["#ffffff", "#000000"]);
  const w = useTransform(scrollYProgress, [0.1, 0.9], [52, 91]);
  const h = useTransform(scrollYProgress, [0.1, 0.9], [70, 88]);
  const width = useMotionTemplate`${w}vw`;
  const height = useMotionTemplate`${h}vh`;

  // Mobile: report WHEN to flip the whole page (image crosses mid-screen).
  const mobileRef = useRef<HTMLDivElement>(null);
  const setMobileDark = useSetMobileDark();
  useEffect(() => {
    const update = () => {
      const el = mobileRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.height === 0) {
        setMobileDark(false); // hidden at md+ — never drive the flip there
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

      {/* ── Mobile: image drives the whole-page flip (bg handled by the shell) */}
      <div ref={mobileRef} className="px-5 py-16 sm:px-6 md:hidden">
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
