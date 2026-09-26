"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { CTA_SIMPLE } from "./cta";
import PageContainer from "./PageContainer";
import { HOME_WORK, type Work } from "./portfolio";
import { DotChevron } from "./DotIcons";

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function WorkCard({ work }: { work: Work }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Cursor-following "See the project" tag — tracks across the WHOLE card.
  // Raw pointer position feeds a spring so the pill trails the cursor smoothly.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 350, damping: 30, mass: 0.4 };
  const x = useSpring(mx, springCfg);
  const y = useSpring(my, springCfg);

  const pillRef = useRef<HTMLSpanElement>(null);

  const relative = (e: { clientX: number; clientY: number }) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return null;
    // The pill may spill past the card, but never past the screen edge
    // (the page clips overflow-x): stop it 12px short of the viewport.
    // offsetWidth ignores the translate-x-5 (20px) offset, so add it back.
    const pillW = (pillRef.current?.offsetWidth ?? 0) + 20;
    const maxX = document.documentElement.clientWidth - 12 - pillW;
    return { nx: Math.min(e.clientX, maxX) - rect.left, ny: e.clientY - rect.top };
  };
  const handleEnter = (e: { clientX: number; clientY: number }) => {
    const p = relative(e);
    if (!p) return;
    // Jump (no trail) on entry so the pill appears at the cursor, not a corner.
    mx.set(p.nx); my.set(p.ny); x.jump(p.nx); y.jump(p.ny);
  };
  const handleMove = (e: { clientX: number; clientY: number }) => {
    const p = relative(e);
    if (!p) return;
    mx.set(p.nx); my.set(p.ny);
  };

  return (
    <motion.a
      ref={cardRef}
      href={work.href}
      variants={cardVariants}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      className="group relative grid rounded-[1.75rem] bg-white/[0.02] p-3 ring-1 ring-white/[0.08] transition-colors hover:ring-white/15 max-md:rounded-[8px] max-md:bg-white/[0.04] max-md:p-[12px] max-md:ring-0 md:grid-cols-[0.82fr_1fr] md:grid-rows-1 md:gap-6 md:p-4 md:min-h-[31.25rem] 2xl:aspect-[2693/957] 2xl:min-h-0"
    >
      {/* Image — inset with rounded corners */}
      <div className="relative min-h-[18.75rem] overflow-hidden rounded-[1.25rem] max-md:aspect-[4/3] max-md:min-h-0 max-md:rounded-[6px] md:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.image}
          alt={work.title}
          loading="lazy"
          className="flip-photo absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col px-2 py-8 max-md:px-0 max-md:pb-0 max-md:pt-[20px] md:py-12 md:pl-8 md:pr-12">
        <h3 className="font-display text-3xl font-bold leading-[1.05] text-white max-md:text-[24px] max-md:font-normal max-md:leading-[32px] max-md:tracking-normal sm:text-4xl md:text-5xl">
          {work.title}
        </h3>
        <p className="mt-6 hidden max-w-xl font-body text-[0.9375rem] leading-relaxed text-white/45 md:mt-7 md:block md:text-base">
          {work.description}
        </p>
        <div className="mt-auto hidden gap-14 pt-10 font-mono text-[0.6875rem] uppercase tracking-[0.15em] md:flex">
          <div>
            <p className="text-white/40">Location</p>
            <p className="mt-2 text-white/85">{work.location}</p>
          </div>
          <div>
            <p className="text-white/40">Industry</p>
            <p className="mt-2 text-white/85">{work.industry}</p>
          </div>
        </div>

        {/* Mobile: service tags + arrow */}
        {/* Mobile (reference, 412px): 14px "Services" label, 32px pills with
            12px text, dot chevron in a 40px box bottom-right. */}
        <div className="mt-[4px] flex items-end justify-between gap-4 md:hidden">
          <div>
            <p className="font-body text-[14px] leading-[20px] text-[#909090]">
              Services
            </p>
            <div className="mt-[4px] flex flex-wrap gap-[8px]">
              {work.services.map((s) => (
                <span
                  key={s}
                  className="flex h-[32px] items-center rounded-[8px] bg-white/[0.08] px-[16px] font-body text-[12px] leading-[16px] text-white/85"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <span className="grid h-[40px] w-[40px] shrink-0 place-items-center">
            <DotChevron className="h-[16px] w-auto" />
          </span>
        </div>
      </div>

      {/* Cursor-tracking "See the project" pill — follows the pointer anywhere
          on the card, fades in on hover. The card itself must NOT clip
          (no overflow-hidden) so the pill can spill past the card's edge. */}
      <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-20">
        {/* Offset down-right of the pointer (not centred on it), so the cursor
           sits at the pill's top-left corner. */}
        <span ref={pillRef} className="flex translate-x-5 translate-y-5 items-center gap-2.5 whitespace-nowrap rounded-xl bg-[#2a2a2a]/95 px-5 py-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          See the project
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/rightuparrow.webp"
            alt=""
            className="h-3 w-3 [filter:brightness(0)_invert(1)]"
          />
        </span>
      </motion.div>
    </motion.a>
  );
}

export default function LatestWork() {
  return (
    <section
      id="portfolio"
      className="scroll-mt-16 bg-[#000000] py-20 max-md:pb-[80px] max-md:pt-[26px] md:scroll-mt-20 md:py-28"
    >
      <PageContainer className="max-md:px-[20px]!">
        <p className="mb-10 font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-white/45 max-md:mb-[20px] max-md:font-body max-md:text-[16px] max-md:leading-[24px] max-md:tracking-normal max-md:text-[#909090]">
          Latest Work
        </p>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="flex flex-col gap-5 max-md:gap-[12px] sm:gap-6"
        >
          {HOME_WORK.map((work) => (
            <WorkCard key={work.title} work={work} />
          ))}
        </motion.div>

        {/* Mobile: compact 48px left-aligned button, 16px regular, 8px radius. */}
        <div className="mt-12 flex justify-center max-md:mt-[40px] max-md:justify-start">
          <a
            href="/portfolio"
            className={`inline-flex ${CTA_SIMPLE} max-md:h-[48px] max-md:items-center max-md:rounded-[8px] max-md:px-[20px] max-md:py-0 max-md:text-[16px] max-md:font-normal max-md:shadow-none`}
          >
            View full portfolio
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
  