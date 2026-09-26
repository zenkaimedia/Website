"use client";

import { motion, useMotionValue, useSpring, type Variants } from "motion/react";
import { SERVICES, DotServiceIcon, type Service } from "./services";
import PageContainer from "./PageContainer";
import { serviceHref } from "./serviceDetails";

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

/* Cursor tilt, per the reference recording: the card turns up to ~6° about
   each axis toward the pointer's offset from centre (pointer near the top →
   top edge comes forward; pointer to the right → right edge recedes), through
   a 1000px perspective, smoothed by a critically damped spring so it trails
   the cursor and eases back flat (~0.8s) on leave. Mouse only. */
const TILT_MAX = 6;
const TILT_SPRING = { stiffness: 110, damping: 21, mass: 1 };

function ServiceCard({ service }: { service: Service }) {
  const rotateX = useSpring(useMotionValue(0), TILT_SPRING);
  const rotateY = useSpring(useMotionValue(0), TILT_SPRING);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    rotateX.set(ny * TILT_MAX);
    rotateY.set(nx * TILT_MAX);
  };
  const onPointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      variants={cardVariants}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl bg-neutral-300 shadow-sm ring-1 ring-black/5 max-md:aspect-[320/432] max-md:w-[min(320px,calc(100vw-33px))] max-md:rounded-[8px] max-md:shadow-none max-md:ring-0 sm:w-[46%] md:aspect-[417/575] md:w-auto md:rounded-[1.2rem] md:shadow-none md:ring-0"
    >
      {/* Background image — per the reference recording it defocuses heavily
          (~16px blur, no darkening) over ~250ms on enter and refocuses on exit.
          The slight scale hides the pale halo a blur leaves at the edges. The
          blur sits on a wrapper because the theme-flip rule owns the photo's
          own `filter`. */}
      <div className="absolute inset-0 transition-[filter,scale] duration-[250ms] ease-out will-change-[filter] group-hover:scale-[1.04] group-hover:blur-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="flip-photo absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Top scrim so the title stays legible on both light and dark images. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent md:hidden" />

      {/* Header — mobile (reference, 412px): 20px inset, 18px regular title,
          14px lowercase count 8px below at 70% white. Desktop (reference,
          1920px): 23px inset, 28.8px regular title with the 15px count on the
          same line, top-right. */}
      <div className="absolute inset-x-0 top-0 flex flex-col gap-1 p-4 max-md:gap-[8px] max-md:p-[20px] sm:p-5 md:flex-row md:items-start md:justify-between md:gap-4 md:p-[1.4375rem]">
        <h3 className="font-display text-[clamp(1.05rem,4.6vw,1.35rem)] font-semibold leading-tight text-white drop-shadow max-md:text-[18px] max-md:font-normal max-md:leading-[20px] max-md:tracking-normal md:text-[1.8rem] md:font-normal md:leading-[1.2] md:tracking-normal md:drop-shadow-none">
          {service.title}
        </h3>
        <span className="font-mono text-[clamp(0.65rem,2.9vw,0.75rem)] uppercase tracking-wide text-white/70 max-md:font-body max-md:text-[14px] max-md:normal-case max-md:leading-[20px] max-md:tracking-normal md:mt-[0.375rem] md:shrink-0 md:font-body md:text-[0.96rem] md:normal-case md:leading-[1.43] md:tracking-normal">
          /{service.includes.length} services
        </span>
      </div>

      {/* Resting corner glyph — the service's own dot glyph, fading out as the
          hover menu comes in: 40px, 20px in on mobile; 40px, 23px in on desktop. */}
      <div className="absolute bottom-4 left-4 text-white drop-shadow transition-[opacity,filter] duration-[250ms] ease-out group-hover:opacity-0 group-hover:blur-[4px] max-md:bottom-[20px] max-md:left-[20px] sm:bottom-5 sm:left-5 md:bottom-[1.4375rem] md:left-[1.4375rem] md:drop-shadow-none">
        <DotServiceIcon name={service.icon} className="h-[40px] w-[40px] md:h-[2.5rem] md:w-[2.5rem]" />
      </div>

      {/* Mobile: the whole card opens the service page (reference: tap →
          page transition). Desktop keeps the hover menu's "See More". */}
      <a
        href={serviceHref(service.title)}
        aria-label={service.title}
        className="absolute inset-0 z-10 md:hidden"
      />

      {/* Hover menu: the list of included services plus a "See More" link.
          Reference: the whole menu fades in place (no slide, no stagger) while
          coming into focus from a soft blur, just behind the image blur;
          exit reverses it. Hidden (and non-interactive) until hover.
          Look (reference, 1920px): 40px frosted-white pills, 14px radius,
          17px dark text, 8px apart, 32px in from the left, 36px up from the
          bottom; "See More" sits on the last pill's row, bottom-right. */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end px-[2rem] pb-[2.25rem] opacity-0 blur-[6px] transition-[opacity,filter] duration-[250ms] ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:blur-[0px] group-hover:delay-[50ms]">
        <div className="flex flex-col items-start gap-[0.5rem]">
          {service.includes.map((item) => (
            <span
              key={item}
              className="flex h-[2.5rem] items-center whitespace-nowrap rounded-[0.875rem] bg-white/50 px-[1.0625rem] font-body text-[1.0625rem] font-normal text-[#222]"
            >
              {item}
            </span>
          ))}
        </div>
        <a
          href={serviceHref(service.title)}
          className="absolute bottom-[2.25rem] right-[2.375rem] flex h-[2.5rem] items-center font-body text-[1rem] text-white underline decoration-white/80 underline-offset-[0.2rem] transition-colors hover:decoration-white"
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
      className="scroll-mt-16 bg-[#ffffff] py-20 max-md:pb-[46px] max-md:pt-[84px] md:scroll-mt-20 md:py-28"
    >
      <PageContainer className="max-md:px-[20px]! md:max-w-none! md:px-[6rem]!">
        {/* Label per reference: 16px regular grey caps on mobile, 19px on
            desktop, no tracking. */}
        <p className="mb-8 font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-black/45 max-md:mb-[22px] max-md:font-body max-md:text-[16px] max-md:leading-[16px] max-md:tracking-normal max-md:text-[#909090] md:mb-[0.375rem] md:font-body md:text-[1.2rem] md:leading-[1.8rem] md:tracking-normal md:text-[#909090]">
          Our Services
        </p>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden pb-4 max-md:-mx-[20px] max-md:gap-[12px] max-md:scroll-px-[20px] max-md:px-[20px] max-md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-4 md:gap-[1.2rem] md:overflow-visible md:pb-0 md:overflow-y-visible [&::-webkit-scrollbar]:hidden"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        <div className="mt-10 flex justify-start max-md:mt-[20px] md:mt-12 md:justify-center">
          {/* Mobile: compact 48px black button, 14px regular, 8px radius. */}
          <a
            href="/services"
            className="group inline-flex items-center justify-center rounded-xl bg-black px-8 py-4 font-body text-[17px] font-medium text-white shadow-lg transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:bg-black/85 max-md:h-[48px] max-md:rounded-[8px] max-md:px-[20px] max-md:py-0 max-md:text-[14px] max-md:font-normal max-md:shadow-none"
          >
            Explore All Services
          </a>
        </div>
      </PageContainer>
    </section>
  );
}

