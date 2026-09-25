import type { Metadata } from "next";
import HomeNav from "@/components/home/HomeNav";
import MobileFlipProvider from "@/components/home/MobileFlip";
import AboutShowcase from "@/components/home/AboutShowcase";
import AboutStats from "@/components/home/AboutStats";
import BrandsMarquee from "@/components/home/BrandsMarquee";
import ContactForm from "@/components/home/ContactForm";
import ServicesDirectory from "@/components/home/ServicesDirectory";
import FooterWordmark from "@/components/home/FooterWordmark";
import PageContainer from "@/components/home/PageContainer";
import { Arrow } from "@/components/home/Arrow";
import { CTA_ARROW } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "About — Zenkai Media",
  description:
    "Zenkai Media is a creative growth agency — branding, AI video, performance creative, video production, web development, and digital marketing. 500+ projects across 20+ industries, for brands in India and worldwide.",
};

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

const VALUES = [
  {
    title: "Meaningful Design",
    body: "Every identity we build starts with meaning, not decoration. Before shaping how a brand looks, we take the time to understand its character, values, and purpose — so the work communicates clearly and authentically.",
  },
  {
    title: "Strategic Thinking",
    body: "Creativity guided by strategy. We analyse your goals, audience, and market context so every decision has intent and drives tangible, measurable growth — not just something that looks good.",
  },
  {
    title: "Integrated Expertise",
    body: "Branding, AI video, performance creative, video production, web development, and digital marketing under one roof — so every touchpoint works together to drive growth.",
  },
  {
    title: "Long-Term Vision",
    body: "We build for the long game. Brands designed to stay relevant, flexible, and strong — able to grow and evolve with you rather than needing to be rebuilt a year later.",
  },
];

export default function AboutPage() {
  const year = new Date().getFullYear();

  return (
    <main className="bg-[#ffffff] font-body">
      <HomeNav />

      {/* On mobile the whole page flips white↔black as one unit (the showcase
         image drives it via MobileFlip). On desktop the shell is inert
         (filter:none) and the gif's own background fade handles the transition,
         so the pinned-zoom `sticky` keeps working. */}
      <MobileFlipProvider>
      {/* ---------------------------------------------------------------- HERO */}
      <PageContainer className="pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-[7rem] lg:gap-[10rem]">
            {/* Headline: 3vw, regular weight — matching the reference. */}
            <h1
              className="font-display font-medium leading-[1.1] text-black"
              style={{ fontSize: "clamp(1.9rem, 3vw, 3.75rem)" }}
            >
              Zenkai is a creative growth agency helping
              {/* Faded line starts on its own line, like the reference */}
              <span className="block text-black/25">
                brands scale through creative that&rsquo;s clear, distinctive,
                and built to last.
              </span>
            </h1>

            {/* Right column: description pinned top-right, stats pushed low so
               the first (100+) card fills the lower hero and 5+/7 just peek in
               below the fold. The gap tracks viewport height so the card stays
               anchored near the bottom on any screen. */}
            <div className="flex flex-col gap-16 md:gap-[max(6rem,calc(100vh_-_46rem))]">
              <p
                className="font-body leading-relaxed text-black/50 md:ml-auto md:max-w-[17.5rem] md:text-left"
                style={{ fontSize: "clamp(0.875rem, 1vw, 1.1875rem)" }}
              >
                Branding, AI video, performance creative, video production,
                web development, and digital marketing — helping brands scale
                across India and around the world.
              </p>

              {/* ---------------------------------------- STATS (count up) */}
              <AboutStats />
            </div>
          </div>
        </PageContainer>

      {/* ---------------------------------------- SHOWCASE (fade-to-black) */}
      <AboutShowcase />

      {/* Everything below is dark by design — the gif hands off into it. On
         mobile it's counter-inverted so the shell's invert cancels to normal
         black in dark mode (and it reads white while the page is light, off the
         fold). Desktop keeps filter:none, so it just renders black. */}
      <div className="mflip-counter bg-[#000000] [filter:invert(1)_hue-rotate(180deg)] md:![filter:none]">
        {/* -------------------------------------------------------------- VALUES */}
        {/* "OUR VALUES" label on the left; the four values stacked in a single
           column on the right (collapses to label-on-top + stack on mobile). */}
        <PageContainer className="py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.2fr] md:items-start md:gap-16">
            <p className="font-body uppercase tracking-[0.1em] text-white/45 text-[clamp(16px,1vw,19px)]">
              Our Values
            </p>

            <div className="flex flex-col gap-14 md:gap-[6rem]">
              {VALUES.map((v) => (
                <div key={v.title}>
                  <h2 className="font-display font-normal leading-[1.15] text-white text-[clamp(24px,1.5vw,32px)]">
                    {v.title}
                  </h2>
                  <p className="mt-4 max-w-[54rem] font-body leading-[1.6] text-white/55 text-[16px]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>

        {/* ------------------------------------------------------------- BRANDS */}
        <BrandsMarquee />

        {/* ------------------------------------------------------------ CONTACT */}
        <section id="contact" className="scroll-mt-16 bg-[#000000] pb-16 pt-4 md:scroll-mt-20 md:py-28">
            <PageContainer>
              <div className="overflow-hidden rounded-3xl bg-white/[0.02] ring-1 ring-white/10">
                <div className="grid gap-8 p-7 md:grid-cols-[0.9fr_1.4fr] md:gap-16 md:p-12 lg:p-16">
                  <div>
                    <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl">
                      Ready to
                      <span className="text-white/35"> get started?</span>
                    </h2>

                    {/* Mobile: a single "Get in touch" button instead of the form */}
                    <a
                      href="/contact"
                      className="group mt-8 flex items-center justify-between rounded-xl bg-white px-6 py-4 font-body text-base font-medium text-[#141414] transition-colors duration-300 hover:bg-white/90 md:hidden"
                    >
                      Get in touch
                      <Arrow invert className={CTA_ARROW} />
                    </a>
                  </div>

                  {/* Desktop: the full form */}
                  <div className="hidden md:block">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </PageContainer>
          </section>

          {/* -------------------------------------------------- SERVICES DIRECTORY */}
          <ServicesDirectory />

          {/* --------------------------------------------------------------- FOOTER */}
          <footer className="relative overflow-hidden bg-[#000000] pt-16 md:pt-24">
            <PageContainer>
              <FooterWordmark />
            </PageContainer>

            <PageContainer className="flex items-center justify-between pb-8 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/55">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              ))}
              <a href="mailto:workwithzenkai@gmail.com" className="transition-colors hover:text-white">
                Mail
              </a>
            </PageContainer>

            <PageContainer className="border-t border-white/10 py-5 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/35">
              &copy; {year} Zenkai Media &middot; Ahmedabad, India
            </PageContainer>
        </footer>
      </div>
      </MobileFlipProvider>
    </main>
  );
}
