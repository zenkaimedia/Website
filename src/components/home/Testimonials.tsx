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
      "Zenkai was quick to understand what we needed and equally quick with execution. The team was easy to work with, responsive to feedback, and consistently delivered quality work. Overall, a smooth experience from brief to final delivery.",
    name: "Airblack",
    role: "Team, Airblack",
    initials: "A",
  },
  {
    quote:
      "We wanted our digital presence to feel modern, premium and easy to navigate. Zenkai handled the design and development with a good understanding of both the visual and functional side. The final website felt much more aligned with where we wanted the brand to go.",
    name: "Vijay Dudhat",
    role: "Founder, Vitalspace",
    initials: "VD",
  },
  {
    quote:
      "What stood out with Zenkai was their ability to bring creative ideas into the project without losing the core message. The content felt fresh, engaging and suited to our audience. They were also open to experimenting, which made the process more productive.",
    name: "Zudo App",
    role: "Team, Zudo App",
    initials: "ZA",
  },
  {
    quote:
      "Zenkai paid close attention to the details that make a brand feel consistent. From the visual direction to the final creative output, they maintained a strong sense of quality while staying true to the brief. It was a good experience working with the team.",
    name: "Haji Ajmal Ali",
    role: "Founder, Ajmal",
    initials: "HA",
  },
  {
    quote:
      "Zenkai didn’t approach the work as just another creative project. They took the time to understand the brand, the audience and what we were trying to achieve. That thinking reflected in the final work and made the overall collaboration much more valuable.",
    name: "Paper Boat",
    role: "Team, Paper Boat",
    initials: "PB",
  },
];

/* h-full + flex column: in the mobile carousel every card stretches to the
   tallest, with the quote centred and the caption pinned to the bottom. */
function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl bg-white/[0.03] p-7 text-center ring-1 ring-white/10 max-md:rounded-[8px] max-md:p-[16px] md:mb-5 md:p-12">
      <blockquote className="flex flex-1 items-center justify-center font-body text-sm leading-relaxed text-white/70 max-md:text-[14px] max-md:leading-[20px] md:text-[1.1875rem] md:leading-[1.75]">
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
      <PageContainer className="max-md:px-[20px]!">
      {/* Mobile (reference, 412px): 12px panel padding, 8px radius; 32px label
          pill; 36/40px regular heading 20px below it. */}
      <div className="overflow-hidden rounded-3xl bg-white/[0.02] ring-1 ring-white/10 max-md:rounded-[8px]">
        <div className="grid gap-10 p-8 max-md:gap-[28px] max-md:p-[12px] md:grid-cols-2 md:gap-16 md:p-12 lg:p-16">
          {/* Left — heading + CTA */}
          <div className="flex flex-col">
            <span className="w-fit rounded-xl bg-white/10 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/70 max-md:flex max-md:h-[32px] max-md:items-center max-md:rounded-[6px] max-md:px-[16px] max-md:py-0 max-md:font-body max-md:text-[14px] max-md:tracking-normal md:px-5 md:py-2.5 md:text-[0.8125rem]">
              Testimonials
            </span>
            <h2 className="mt-6 max-w-md font-display text-3xl font-bold leading-[1.1] text-white max-md:mt-[20px] max-md:text-[36px] max-md:font-normal max-md:leading-[40px] max-md:tracking-normal sm:text-4xl md:mt-8 md:max-w-[35rem] md:text-[3.5rem]">
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
          <a
            href="#contact"
            className={`w-full md:hidden ${CTA_SIMPLE} max-md:h-[48px] max-md:rounded-[8px] max-md:py-0 max-md:text-[16px] max-md:font-normal max-md:shadow-none`}
          >
            Let&apos;s work together
            <Arrow invert className={CTA_ARROW} />
          </a>
        </div>
      </div>
      </PageContainer>
    </section>
  );
}
