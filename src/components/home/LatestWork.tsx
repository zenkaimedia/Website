"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { CTA_BASE, CTA_SIMPLE } from "./cta";
import PageContainer from "./PageContainer";

type Work = {
  title: string;
  image: string;
  description: string;
  location: string;
  industry: string;
  /** Shown as tags on the mobile card. */
  services: string[];
  href: string;
};

const WORK: Work[] = [
  {
    title: "Duo Nutrition",
    image: "/assets/portfolio/firstcard.webp",
    description:
      "Duo Nutrition is a brand that redefines pet food as a celebration of the equal, unspoken partnership between humans and their dogs. Our challenge was to translate philosophy into a logo that captures the essence of togetherness. The solution lies in the submark: a simple yet powerful oval, split evenly down the middle — two distinct halves, balanced and complementary, coming together to form a unified whole.",
    location: "Russia",
    industry: "Pets",
    services: ["Branding & Design"],
    href: "#contact",
  },
  {
    title: "Everyday",
    image: "/assets/portfolio/secondcard.webp",
    description:
      "Everyday Sea Moss is a premium wellness brand offering natural sea moss, rich in over 92 minerals and vitamins — designed to effortlessly support energy, immunity, and glowing skin. Our task was to create a brand identity, packaging design, web design, and photoshoot: a bright yet minimal visual language that repositions the product as modern, appealing, and seamlessly fitting into everyday life.",
    location: "Australia",
    industry: "Supplements",
    services: ["Branding & Design", "Creative Production", "Web Development"],
    href: "#contact",
  },
  {
    title: "Nymph",
    image: "/assets/portfolio/thirdcard.webp",
    description:
      "Nymph Haircare celebrates femininity, free spirit, and our deep connection with nature. Its philosophy is inspired by ancient Greek mythology — nymphs, the divine spirits of the natural world — translated into a modern identity, packaging, and campaign that feel both timeless and fresh.",
    location: "Thailand",
    industry: "Cosmetics",
    services: ["Branding & Design", "Creative Production"],
    href: "#contact",
  },
];

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

  const relative = (e: { clientX: number; clientY: number }) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return { nx: e.clientX - rect.left, ny: e.clientY - rect.top };
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
      className="group relative grid overflow-hidden rounded-[1.75rem] bg-white/[0.02] p-3 ring-1 ring-white/[0.08] transition-colors hover:ring-white/15 md:grid-cols-[0.82fr_1fr] md:grid-rows-1 md:gap-6 md:p-4 md:min-h-[31.25rem] 2xl:aspect-[2693/957] 2xl:min-h-0"
    >
      {/* Image — inset with rounded corners */}
      <div className="relative min-h-[18.75rem] overflow-hidden rounded-[1.25rem] md:min-h-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={work.image}
          alt={work.title}
          loading="lazy"
          className="flip-photo absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col px-2 py-8 md:py-12 md:pl-8 md:pr-12">
        <h3 className="font-display text-3xl font-bold leading-[1.05] text-white sm:text-4xl md:text-5xl">
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
        <div className="mt-5 flex items-end justify-between gap-4 md:hidden">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-white/40">
              Services
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {work.services.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/15 bg-white/[0.06] px-2.5 py-1.5 font-body text-[0.75rem] text-white/85"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/right-arrow.png"
            alt=""
            aria-hidden="true"
            className="mb-1 h-4 w-auto shrink-0 object-contain"
          />
        </div>
      </div>

      {/* Cursor-tracking "See the project" pill — follows the pointer anywhere
          on the card, fades in on hover. */}
      <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 z-20">
        {/* Offset down-right of the pointer (not centred on it), so the cursor
           sits at the pill's top-left corner. */}
        <span className="flex translate-x-5 translate-y-5 items-center gap-2.5 whitespace-nowrap rounded-xl bg-[#2a2a2a]/95 px-5 py-3 font-mono text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
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
      className="scroll-mt-16 bg-[#000000] py-20 md:scroll-mt-20 md:py-28"
    >
      <PageContainer>
        <p className="mb-10 font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-white/45">
          Latest Work
        </p>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="flex flex-col gap-5 sm:gap-6"
        >
          {WORK.map((work) => (
            <WorkCard key={work.title} work={work} />
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <a href="#contact" className={`inline-flex ${CTA_SIMPLE}`}>
            View full portfolio
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
  