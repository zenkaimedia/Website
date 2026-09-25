import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeNav from "@/components/home/HomeNav";
import InvertShell from "@/components/home/InvertShell";
import ServicesOutro from "@/components/home/ServicesOutro";
import ContactForm from "@/components/home/ContactForm";
import ServicesDirectory from "@/components/home/ServicesDirectory";
import FooterWordmark from "@/components/home/FooterWordmark";
import PageContainer from "@/components/home/PageContainer";
import PortfolioGrid from "@/components/home/PortfolioGrid";
import { Arrow } from "@/components/home/Arrow";
import { CTA_ARROW } from "@/components/home/cta";
import { WORK, getWork, nextWork } from "@/components/home/portfolio";

type Params = { params: Promise<{ slug: string }> };

// Every project page is pre-rendered at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  return {
    title: `${work.title} — Zenkai Media`,
    description: work.description,
    openGraph: { images: [work.image] },
  };
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

export default async function ProjectPage({ params }: Params) {
  const work = getWork((await params).slug);
  if (!work) notFound();

  const year = new Date().getFullYear();
  const rows = [work.image, ...(work.gallery ?? [])];

  return (
    <main className="bg-[#ffffff] font-body">
      <HomeNav />

      {/* Case study + next projects + outro share the light↔dark theme. */}
      <InvertShell>
        {/* ----------------------------------------------------------- PROJECT */}
        <PageContainer className="pb-24 pt-32 md:pb-40 md:pt-44">
          <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:gap-16 lg:gap-24">
            {/* Details — stays in view while the gallery scrolls past (desktop). */}
            <div className="md:sticky md:top-32 md:self-start">
              <h1
                className="font-display font-medium leading-[1.05] tracking-[-0.025em] text-black"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.5rem)" }}
              >
                {work.title}
              </h1>

              <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
                {work.services.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-black/[0.06] px-3 py-1.5 font-body text-[0.8125rem] text-black/75 md:text-[0.875rem]"
                  >
                    {s}
                  </li>
                ))}
              </ul>

              <p className="mt-8 max-w-xl font-body text-[0.9375rem] leading-relaxed text-black/75 md:mt-10 md:text-base">
                {work.description}
              </p>

              <dl className="mt-8 flex gap-12 font-body text-[0.8125rem] md:mt-10 md:text-sm">
                <div>
                  <dt className="text-black/45">Location:</dt>
                  <dd className="uppercase text-black">{work.location}</dd>
                </div>
                <div>
                  <dt className="text-black/45">Industry:</dt>
                  <dd className="uppercase text-black">{work.industry}</dd>
                </div>
              </dl>

              <a
                href="/portfolio"
                className="mt-12 hidden items-center gap-3 rounded-lg bg-[#f2f2f2] px-5 py-3 font-body text-[0.9375rem] font-medium text-black transition-colors duration-300 hover:bg-[#e6e6e6] md:mt-20 md:inline-flex"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                  <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                View all projects
              </a>
            </div>

            {/* Gallery — full-width images, or pairs side by side. */}
            <div className="flex flex-col gap-2">
              {rows.map((row, i) =>
                typeof row === "string" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={row}
                    alt={i === 0 ? work.title : `${work.title} — ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="flip-photo h-auto w-full rounded-lg object-cover"
                  />
                ) : (
                  <div key={i} className="grid grid-cols-2 gap-2">
                    {row.map((src, j) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={j}
                        src={src}
                        alt={`${work.title} — ${i + 1}.${j + 1}`}
                        loading="lazy"
                        className="flip-photo aspect-[2/3] w-full rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </PageContainer>

        {/* ------------------------------------------------------- NEXT PROJECT */}
        <PageContainer className="pb-16 md:pb-24">
          <p className="mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-black/45 md:mb-6">
            Next project
          </p>
          <PortfolioGrid items={nextWork(work.slug)} />
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
