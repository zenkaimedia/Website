import { Arrow } from "./Arrow";
import { CTA_BASE, CTA_ARROW, CTA_SIMPLE } from "./cta";
import PageContainer from "./PageContainer";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "We wanted to sincerely thank you for being part of the birth and realization of our private spa project in Brussels. Your attention to detail was remarkable and, at times, felt like a real achievement! From our logo to our website and the entire branding experience, every element was thoughtfully crafted and aligned with what we had envisioned & sometimes even better than we could have imagined ourselves.",
    name: "Esra & Olivier",
    role: "Founders, Neva Spa",
    initials: "EO",
  },
  {
    quote:
      "You've created a true work of art that perfectly captures the idea of an emotional connection with the customer. Your work exceeded our expectations, and this was echoed by everyone on the team. Every element of the design reflects a genuine love for animals and a high level of professionalism. Everything has been thought through down to the smallest detail and contributes to creating a strong emotional response from the consumer. We're truly happy we had the opportunity to work with you on this project and hope to collaborate again in the future.",
    name: "Duo Nutrition",
    role: "Team, DUO Nutrition",
    initials: "DN",
  },
  {
    quote:
      "We're glad we found you and waited for your availability, I'm sure we'll work together again soon. The process was smooth and you understood what we wanted to achieve, so we're really happy.",
    name: "Miguel",
    role: "Founder, Lunna",
    initials: "M",
  },
  {
    quote:
      "Zenkai Media brings a rare mix of exceptional talent and true collaboration. Their design work is best-in-class, defined by sharp taste and a distinct point of view. Chandni has been a pleasure to work with and is a partner we're excited to keep building with.",
    name: "Johnny Tran",
    role: "Founder, Vora",
    initials: "JT",
  },
];

/* h-full + flex column: in the mobile carousel every card stretches to the
   tallest, with the quote centred and the caption pinned to the bottom. */
function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white/[0.03] p-7 text-center ring-1 ring-white/10 md:mb-5 md:p-12">
      <blockquote className="flex flex-1 items-center justify-center font-body text-sm leading-relaxed text-white/70 md:text-[1.1875rem] md:leading-[1.75]">
        <span>&ldquo;{t.quote}&rdquo;</span>
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-center gap-3 md:mt-10 md:gap-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.06] font-display text-xs font-bold text-white/80 ring-1 ring-white/25 md:h-14 md:w-14 md:text-sm">
          {t.initials}
        </span>
        <div className="text-left">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.06em] text-white md:text-[1.0625rem]">
            {t.name}
          </p>
          <p className="mt-0.5 font-body text-[0.8125rem] text-white/45 md:mt-1 md:text-[0.9375rem]">
            {t.role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  // Doubled list so the upward scroll can loop seamlessly (translateY -50%).
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-[#000000] pb-20 md:pb-28">
      <PageContainer>
      <div className="overflow-hidden rounded-3xl bg-white/[0.02] ring-1 ring-white/10">
        <div className="grid gap-10 p-8 md:grid-cols-2 md:gap-16 md:p-12 lg:p-16">
          {/* Left — heading + CTA */}
          <div className="flex flex-col">
            <span className="w-fit rounded-xl bg-white/10 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/70 md:px-5 md:py-2.5 md:text-[0.8125rem]">
              Testimonials
            </span>
            <h2 className="mt-6 max-w-md font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:mt-8 md:max-w-[35rem] md:text-[3.5rem]">
              What our clients say
              <span className="text-white/35"> about working with us.</span>
            </h2>
            {/* Desktop CTA sits under the heading; on mobile it moves below the
               cards (see the mobile CTA after the list). The wrapper carries the
               `hidden` so CTA_BASE's own `inline-flex` can't override it. */}
            <div className="hidden md:mt-auto md:block">
              <a href="#contact" className={`w-fit ${CTA_BASE}`}>
                Let&apos;s work together
                <Arrow invert className={CTA_ARROW} />
              </a>
            </div>
          </div>

          {/* Mobile — horizontal snap carousel, next card peeking */}
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="w-[88%] shrink-0 snap-start">
                <Card t={t} />
              </div>
            ))}
          </div>

          {/* Desktop — vertical auto-scroll (pauses on hover) */}
          <div className="relative hidden h-[28.75rem] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)] md:block md:h-[35rem]">
            <div className="animate-[scrollUp_38s_linear_infinite] hover:[animation-play-state:paused]">
              {loop.map((t, i) => (
                <Card key={i} t={t} />
              ))}
            </div>
          </div>

          {/* Mobile CTA — the only one on mobile, sitting below the cards */}
          <a href="#contact" className={`w-full md:hidden ${CTA_SIMPLE}`}>
            Let&apos;s work together
            <Arrow invert className={CTA_ARROW} />
          </a>
        </div>
      </div>
      </PageContainer>
    </section>
  );
}
