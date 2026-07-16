"use client";

import { motion, type Variants } from "motion/react";
import { SERVICES, type Service } from "./services";
import PageContainer from "./PageContainer";

/* Staggered "down-to-up" reveal: cards start pushed down + faded, then rise
   into place one after another as the grid scrolls into view. */
const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* Small pixel-plus glyph in the bottom-left corner of each resting card. */
function PixelIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 22 22"
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <rect x="9" y="1" width="4" height="4" />
      <rect x="1" y="9" width="4" height="4" />
      <rect x="9" y="9" width="4" height="4" />
      <rect x="17" y="9" width="4" height="4" />
      <rect x="9" y="17" width="4" height="4" />
    </svg>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl bg-neutral-300 shadow-sm ring-1 ring-black/5 sm:w-[46%] md:w-auto"
    >
      {/* Background image — blurs and lifts on hover to make room for the menu. */}
      <img
        src={service.image}
        alt={service.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out will-change-transform group-hover:scale-105 group-hover:blur-[6px] group-hover:brightness-[0.82]"
      />

      {/* Top scrim so the title stays legible on both light and dark images. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />

      {/* Header: title above the service count, top-left (matches the reference) */}
      <div className="absolute inset-x-0 top-0 flex flex-col gap-1 p-4 sm:p-5">
        <h3 className="font-display text-[clamp(1.05rem,4.6vw,1.35rem)] font-semibold leading-tight text-white drop-shadow">
          {service.title}
        </h3>
        <span className="font-mono text-[clamp(0.65rem,2.9vw,0.75rem)] uppercase tracking-wide text-white/70">
          /{service.includes.length} services
        </span>
      </div>

      {/* Resting corner glyph — fades out as the hover menu comes in. */}
      <div className="absolute bottom-4 left-4 text-white/85 drop-shadow transition-opacity duration-300 group-hover:opacity-0 sm:bottom-5 sm:left-5">
        <PixelIcon />
      </div>

      {/* Hover menu: the list of included services, rising in with a stagger,
          plus a "See More" link. Hidden (and non-interactive) until hover. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-3 p-4 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 sm:p-5">
        <div className="flex flex-col items-start gap-2">
          {service.includes.map((item, i) => (
            <span
              key={item}
              style={{ transitionDelay: `${80 + i * 45}ms` }}
              className="translate-y-3 rounded-xl bg-white/90 px-3 py-1.5 font-body text-[0.6875rem] font-medium text-black shadow-sm backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0 sm:text-xs"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href="#contact"
          className="self-end font-body text-[0.6875rem] text-white underline decoration-white/60 underline-offset-4 transition-colors hover:decoration-white sm:text-xs"
        >
          See More
        </a>
      </div>
    </motion.article>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-16 bg-[#ffffff] py-20 md:scroll-mt-20 md:py-28"
    >
      <PageContainer>
        <p className="mb-8 font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-black/45">
          Our Services
        </p>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        <div className="mt-10 flex justify-start md:mt-12 md:justify-center">
          <a
            href="/services"
            className="group inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 font-body text-[17px] font-medium text-white shadow-lg transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:bg-black/85"
          >
            Explore All Services
          </a>
        </div>
      </PageContainer>
    </section>
  );
}

