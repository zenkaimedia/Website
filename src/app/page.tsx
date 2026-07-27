import HomeNav from "@/components/home/HomeNav";
import ContactForm from "@/components/home/ContactForm";
import Logo3D from "@/components/home/Logo3D";
import MobileHero from "@/components/home/MobileHero";
import ServicesSection from "@/components/home/ServicesSection";
import ApproachShowcase from "@/components/home/ApproachShowcase";
import MobileFlipProvider from "@/components/home/MobileFlip";
import LatestWork from "@/components/home/LatestWork";
import Testimonials from "@/components/home/Testimonials";
import LatestNews from "@/components/home/LatestNews";
import ServicesDirectory from "@/components/home/ServicesDirectory";
import { Arrow } from "@/components/home/Arrow";
import ScrollIndicator from "@/components/home/ScrollIndicator";
import { CTA_BASE, CTA_ARROW } from "@/components/home/cta";
import PageContainer from "@/components/home/PageContainer";
import FooterWordmark from "@/components/home/FooterWordmark";

const BOOKING_URL = "https://zenkaimedia.dayschedule.com/free-discovery-call";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <main id="hero" className="bg-[#000000] font-body">
      <HomeNav />

      {/* -------------------------------------------------------- HERO (mobile) */}
      <MobileHero className="md:hidden" />

      {/* ------------------------------------------------------- HERO (desktop) */}
      <section className="relative hidden h-[90dvh] min-h-[37.5rem] overflow-hidden bg-[#000000] md:block">
        {/* 3D chrome logo — mouse-tracking hero centerpiece. Centered both
           horizontally and vertically in the hero's black area. Portrait,
           matching the shape's true proportions measured from an unclipped
           reference render (549×591 ≈ 0.929 width/height). */}
        <Logo3D
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
          style={{
            height: "clamp(21.25rem, 56vh, 35rem)",
            aspectRatio: "549 / 591",
          }}
        />

        {/* Bottom-left copy */}
        <PageContainer className="relative z-10 flex h-full flex-col justify-end pb-32 pt-28 sm:pb-36 md:pb-28">
          <p
            className="mb-1 uppercase tracking-[0.15em]"
            style={{ fontSize: "clamp(0.6875rem, 1.4vw, 0.935rem)", color: "#909090" }}
          >
            FULL-SERVICE AGENCY
          </p>
          <h1
            className="max-w-4xl font-display font-bold leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 2.805rem)" }}
          >
            <span className="text-white">
              Zenkai is a creative growth
              <br />
              studio based in India.
            </span>{" "}
            <span className="text-white/35">
              We deliver
              <br />
              brands, content &amp; digital
              <br />
              experiences.
            </span>
          </h1>

          {/* Mobile CTA (inline, since absolute button is hidden on small screens) */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer noopener"
            className={`mt-8 inline-flex w-fit sm:hidden ${CTA_BASE}`}
          >
            Start a Project
            <Arrow invert className={CTA_ARROW} />
          </a>
        </PageContainer>

        {/* Start a Project — bottom right (desktop/tablet) */}
        <PageContainer className="absolute inset-x-0 bottom-17 z-20 hidden sm:block">
          <div className="flex justify-end">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={`shadow-lg inline-flex ${CTA_BASE}`}
            >
              Start a Project
              <Arrow invert className={CTA_ARROW} />
            </a>
          </div>
        </PageContainer>

        {/* Scroll indicator — bottom center (non-interactive, bounces, hides on scroll) */}
        <ScrollIndicator />
      </section>

      {/* ------------------------------------ MOBILE WHOLE-PAGE FLIP (body)
         On mobile the entire body below the hero flips white↔black as one unit,
         driven by the Approach showcase image crossing mid-screen (image below →
         white, image above → black). Light-by-design sections (Services,
         Approach) flip with the shell; the dark-by-design sections below are
         counter-inverted so they cancel back to normal black in dark mode. The
         whole mechanism is mobile-only — desktop is completely unaffected. */}
      <MobileFlipProvider>
        {/* ------------------------------------------------------------ SERVICES */}
        <ServicesSection />

        {/* -------------------------------------------- APPROACH + GIF SHOWCASE */}
        <ApproachShowcase />

        {/* Dark-by-design sections. `mflip-counter` carries a permanent counter-
           invert (mobile only): combined with the shell's invert it cancels to
           normal black in dark mode, and reads WHITE while the page is light.
           Because the single shell filter above drives the whole transition, the
           upper and lower sections flip in perfect lock-step. Photos inside stay
           original via globals.css (`--mflip-inv`). Desktop keeps filter:none. */}
        <div className="mflip-counter [filter:invert(1)_hue-rotate(180deg)] md:![filter:none]">
          {/* ---------------------------------------------------------- PORTFOLIO */}
          <LatestWork />

      {/* ------------------------------------------------------------ TESTIMONIALS */}
      <Testimonials />

      {/* ------------------------------------------------------------- INSIGHTS */}
      <LatestNews />

      {/* -------------------------------------------------------------- CONTACT */}
      {/* Hidden on mobile — the floating "Start a project" CTA covers that case */}
      <section id="contact" className="hidden scroll-mt-16 bg-[#000000] pb-20 md:block md:scroll-mt-20 md:pb-28">
        <PageContainer>
          <div className="overflow-hidden rounded-3xl bg-white/[0.02] ring-1 ring-white/10">
            <div className="grid gap-10 p-8 md:grid-cols-[0.9fr_1.4fr] md:gap-16 md:p-12 lg:p-16">
              <div>
                <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl">
                  Ready to
                  <span className="text-white/35"> get started?</span>
                </h2>
              </div>

              <ContactForm />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* -------------------------------------------------- SERVICES DIRECTORY */}
      {/* After the contact form on desktop; on mobile the contact section is
         hidden, so this lands directly after Latest News. */}
      <ServicesDirectory />

      {/* --------------------------------------------------------------- FOOTER */}
      <footer className="relative overflow-hidden bg-[#000000] pt-16 md:pt-24">
        {/* Giant interactive wordmark */}
        <PageContainer>
          <FooterWordmark />
        </PageContainer>

        {/* Socials — spread across */}
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

        {/* Copyright */}
        <PageContainer className="border-t border-white/10 py-5 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/35">
          &copy; {year} Zenkai Media &middot; Ahmedabad, India
        </PageContainer>
      </footer>
        </div>
      </MobileFlipProvider>
    </main>
  );
}