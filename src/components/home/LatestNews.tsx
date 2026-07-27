"use client";

import { motion, type Variants } from "motion/react";
import { CTA_BASE, CTA_SIMPLE } from "./cta";
import PageContainer from "./PageContainer";

/* Cards rise into view, staggered — same motion language as Latest Work. */
const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 56 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type Post = {
  title: string;
  date: string;
  image: string;
  href: string;
};

const NEWS: Post[] = [
  {
    title: "Building Brands from Within",
    date: "April 6",
    image: "/assets/insights/cardone.webp",
    href: "/insights/building-brands-from-within",
  },
  {
    title: "How to Choose a Brand Name That Lasts",
    date: "April 6",
    image: "/assets/insights/cardtwo.webp",
    href: "/insights/how-to-choose-a-brand-name-that-lasts",
  },
];

function ChevronCircle({ className = "" }: { className?: string }) {
  return (
    <span
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 text-white/75 md:h-14 md:w-14 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 md:h-5 md:w-5"
        aria-hidden="true"
      >
        <path d="m9 6 6 6-6 6" />
      </svg>
    </span>
  );
}

function NewsCard({ post, className = "" }: { post: Post; className?: string }) {
  return (
    /* Translucent + blurred so the overlapping card reveals the one beneath it. */
    <motion.a
      variants={cardVariants}
      href={post.href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#141414]/80 p-5 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl transition-transform duration-500 ease-out hover:-translate-y-2.5 md:h-[36rem] md:flex-row md:p-0 ${className}`}
    >
      {/* Text — above the image on mobile, left column on desktop */}
      <div className="flex w-full shrink-0 flex-col md:w-2/5 md:justify-between md:p-10">
        <div>
          <h3 className="font-display text-[clamp(1.3rem,5.6vw,1.6rem)] font-bold leading-snug text-white md:text-[2.25rem] md:leading-[1.15]">
            {post.title}
          </h3>
          <p className="mt-2 font-body text-[clamp(0.9rem,4vw,1.25rem)] text-white/40 md:mt-6 md:text-[1.0625rem]">
            {post.date}
          </p>
        </div>
        {/* Desktop chevron — hidden until the card is hovered */}
        <ChevronCircle className="hidden -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:grid" />
      </div>

      {/* Mobile — portrait image with the chevron beside its bottom-right */}
      <div className="mt-4 flex items-end gap-3 md:hidden">
        <div className="aspect-[5/7] flex-1 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="flip-photo h-full w-full object-cover"
          />
        </div>
        <ChevronCircle className="mb-1" />
      </div>

      {/* Desktop — full-bleed right column */}
      <div className="relative hidden md:block md:h-full md:w-3/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </motion.a>
  );
}

export default function LatestNews() {
  return (
    <section
      id="insights"
      className="scroll-mt-16 bg-[#000000] pb-20 md:scroll-mt-20 md:pb-28"
    >
      <PageContainer>
        <p className="mb-6 font-mono text-[clamp(0.85rem,4vw,1.25rem)] uppercase tracking-[0.25em] text-white/45 md:mb-10 md:text-[0.9375rem] md:tracking-[0.3em]">
          Latest News
        </p>

        {/* Overlapping, staggered cards on desktop; stacked on mobile */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-0"
        >
          <NewsCard post={NEWS[0]} className="z-0 md:w-[58%]" />
          <NewsCard post={NEWS[1]} className="z-10 md:-ml-[16%] md:mt-14 md:w-[58%]" />
        </motion.div>

        <div className="mt-12 flex justify-center">
          <a href="#contact" className={`inline-flex ${CTA_SIMPLE}`}>
            View all news
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
