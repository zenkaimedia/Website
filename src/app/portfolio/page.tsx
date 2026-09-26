import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomeNav from "@/components/home/HomeNav";
import InvertShell from "@/components/home/InvertShell";
import ServicesOutro from "@/components/home/ServicesOutro";
import ContactForm from "@/components/home/ContactForm";
import ServicesDirectory from "@/components/home/ServicesDirectory";
import FooterWordmark from "@/components/home/FooterWordmark";
import PageContainer from "@/components/home/PageContainer";
import { Arrow } from "@/components/home/Arrow";
import { CTA_ARROW } from "@/components/home/cta";
import PortfolioGrid from "@/components/home/PortfolioGrid";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio — Selected Work",
  description:
    "Selected work from Zenkai Media across creative production, AI creative, branding, performance marketing and web development.",
  path: "/portfolio",
});

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

export default function PortfolioPage() {
  const year = new Date().getFullYear();

  return (
    <main className="bg-[#ffffff] font-body">
      <HomeNav />

      {/* Hero + grid + outro share the reversible light↔dark theme. */}
      <InvertShell>
        {/* ---------------------------------------------------------------- HERO */}
        <PageContainer className="pb-14 pt-32 md:pb-36 md:pt-[13.5rem]">
          <div className="grid gap-8 md:grid-cols-[1.6fr_1fr] md:items-start md:gap-16">
            {/* Desktop breaks give the reference's rhythm: two dark lines, then
               the grey tail starting on its own line. Mobile wraps naturally. */}
            <h1
              className="font-display font-medium leading-[1.05] tracking-[-0.025em] text-black"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.5rem)" }}
            >
              More than five hundred projects{" "}
              <br className="hidden md:block" />
              delivered. A selection of the work{" "}
              <br className="hidden md:block" />
              <span className="text-black/30">
                we are most proud of, across{" "}
                <br className="hidden md:block" />
                brand, content, and growth.
              </span>
            </h1>
            <p className="font-body text-[clamp(0.9rem,4vw,1.0625rem)] leading-relaxed text-black/45 md:ml-auto md:mt-1 md:max-w-[27rem] md:text-[1.1875rem]">
              A curated collection of our work across branding, creative
              production, AI content, performance marketing, and web
              development. Each project here started with a real brief, a real
              challenge, and a clear outcome.
            </p>
          </div>
        </PageContainer>

        {/* ----------------------------------------------------------- PROJECTS */}
        <PageContainer className="pb-16 md:pb-24">
          <PortfolioGrid />
        </PageContainer>

        {/* ----------------------------------------------- OUTRO (fade-to-black) */}
        <ServicesOutro />

        {/* Dark-by-design sections, counter-inverted so the whole page flips
           white↔black as one unit (the double invert cancels in dark mode). */}
        <div style={{ filter: "invert(1) hue-rotate(180deg)" }}>
      {/* -------------------------------------------------------------- CONTACT */}
      <section id="contact" className="scroll-mt-16 bg-[#000000] pb-16 pt-4 md:scroll-mt-20 md:pb-28 md:pt-0">
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

      {/* --------------------------------------------------- SERVICES DIRECTORY */}
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
      </InvertShell>
    </main>
  );
}
