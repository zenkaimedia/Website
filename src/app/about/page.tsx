import type { Metadata } from "next";
import HomeNav from "@/components/home/HomeNav";
import AboutShowcase from "@/components/home/AboutShowcase";
import AboutStats from "@/components/home/AboutStats";
import ContactForm from "@/components/home/ContactForm";
import ServicesDirectory from "@/components/home/ServicesDirectory";
import FooterWordmark from "@/components/home/FooterWordmark";
import PageContainer from "@/components/home/PageContainer";
import { Arrow } from "@/components/home/Arrow";
import { CTA_ARROW } from "@/components/home/cta";

export const metadata: Metadata = {
  title: "About — Zenkai Media",
  description:
    "Zenkai is a creative growth studio helping brands become clear, distinctive, and built to last — through strategy, content, marketing, and web.",
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
    body: "A seamless blend of skills. By combining brand strategy, content production, performance marketing, and development, we deliver cohesive experiences that work beautifully across every touchpoint.",
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

      {/* Light hero + stats → gif fades to black → dark sections below, exactly
         like the home page (no full-page invert, so the gif zoom's `sticky`
         works). */}
      {/* ---------------------------------------------------------------- HERO */}
      <PageContainer className="pb-16 pt-32 md:pb-24 md:pt-44">
          <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-[7rem] lg:gap-[10rem]">
            {/* Headline: 3vw, regular weight — matching the reference. */}
            <h1
              className="font-display font-normal leading-[1.2] text-black"
              style={{ fontSize: "clamp(1.9rem, 3vw, 3.75rem)" }}
            >
              Zenkai is a creative growth studio helping
              {/* Faded line starts on its own line, like the reference */}
              <span className="block text-black/25">
                brands become clear, distinctive, and built to last.
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
                We combine brand strategy, content production, performance
                marketing, and web development to create cohesive brand
                experiences across every touchpoint.
              </p>

              {/* ---------------------------------------- STATS (count up) */}
              <AboutStats />
            </div>
          </div>
        </PageContainer>

      {/* ---------------------------------------- SHOWCASE (fade-to-black) */}
      <AboutShowcase />

      {/* Everything below is dark by design — the gif hands off into it. */}
      <div className="bg-[#000000]">
        {/* -------------------------------------------------------------- VALUES */}
        {/* "OUR VALUES" label on the left; the four values stacked in a single
           column on the right (collapses to label-on-top + stack on mobile). */}
        <PageContainer className="py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.2fr] md:items-start md:gap-16">
            <p className="font-body uppercase tracking-[0.1em] text-white/45 text-[clamp(15px,1vw,19px)]">
              Our Values
            </p>

            <div className="flex flex-col gap-14 md:gap-[6rem]">
              {VALUES.map((v) => (
                <div key={v.title}>
                  <h2 className="font-display font-normal leading-[1.15] text-white text-[clamp(24px,1.5vw,32px)]">
                    {v.title}
                  </h2>
                  <p className="mt-4 max-w-2xl font-body leading-[1.6] text-white/55 text-[clamp(15px,1vw,16px)]">
                    {v.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>

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
              <a href="mailto:hello@zenkaimedia.in" className="transition-colors hover:text-white">
                Mail
              </a>
            </PageContainer>

            <PageContainer className="border-t border-white/10 py-5 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/35">
              &copy; {year} Zenkai Media &middot; Ahmedabad, India
            </PageContainer>
        </footer>
      </div>
    </main>
  );
}
