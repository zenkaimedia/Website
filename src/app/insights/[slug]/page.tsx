import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeNav from "@/components/home/HomeNav";
import InvertShell from "@/components/home/InvertShell";
import ServicesOutro from "@/components/home/ServicesOutro";
import ContactForm from "@/components/home/ContactForm";
import ServicesDirectory from "@/components/home/ServicesDirectory";
import FooterWordmark from "@/components/home/FooterWordmark";
import PageContainer from "@/components/home/PageContainer";
import { Arrow } from "@/components/home/Arrow";
import { CTA_ARROW } from "@/components/home/cta";
import { POSTS } from "@/components/home/insights";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — Zenkai Media` : "Insights — Zenkai Media",
    description: post?.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const year = new Date().getFullYear();

  return (
    <main className="bg-[#ffffff] font-body">
      <HomeNav />

      {/* Article + outro share the reversible light↔dark theme. */}
      <InvertShell>
        <PageContainer className="pb-16 pt-32 md:pb-24 md:pt-40">
          {/* ---- Title + standfirst ---- */}
          <h1
            className="font-display font-bold leading-[1.08] text-black"
            style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)" }}
          >
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl font-body text-[clamp(0.95rem,4vw,1.0625rem)] leading-relaxed text-black/45">
            {post.excerpt}
          </p>

          {/* ---- Meta (left, bottom-aligned) + feature image (right) ---- */}
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[0.8fr_1.3fr] md:gap-16">
            <div className="flex flex-col">
              {post.category && (
                <span className="w-fit rounded-lg bg-black/[0.06] px-3.5 py-2 font-body text-sm text-black/70">
                  {post.category}
                </span>
              )}
              {/* Pinned to the bottom of the column, level with the image base */}
              <div className="mt-8 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-black/40 md:mt-auto">
                Published on
                <span className="mt-1.5 block text-[0.8125rem] text-black/70">
                  {post.date}
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                className="flip-photo aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          {/* ---- Body — aligned with the image column (left side left empty) ---- */}
          <div className="mt-14 grid md:mt-24 md:grid-cols-[0.8fr_1.3fr] md:gap-16">
            <div className="hidden md:block" aria-hidden="true" />
            <div>
              {post.body.map((section) => (
                <section key={section.heading} className="mb-14 last:mb-0 md:mb-20">
                  <h2 className="font-display text-[clamp(1.4rem,6vw,2.5rem)] font-bold leading-[1.15] text-black">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="mt-5 font-body text-[clamp(1rem,4.3vw,1.25rem)] leading-[1.85] text-black/55 md:mt-6 md:text-[1.1875rem]"
                    >
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </PageContainer>

        {/* ----------------------------------------------- OUTRO (fade-to-black) */}
        <ServicesOutro />

        {/* These sections are dark by design. A permanent counter-invert makes
           them render LIGHT while the page is light and, once the shell inverts,
           the two inverts cancel so they return to their normal dark look — so
           the whole page flips white↔black as one unit. */}
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
                <a
                  href="/contact"
                  className="group mt-8 flex items-center justify-between rounded-xl bg-white px-6 py-4 font-body text-base font-medium text-[#141414] transition-colors duration-300 hover:bg-white/90 md:hidden"
                >
                  Get in touch
                  <Arrow invert className={CTA_ARROW} />
                </a>
              </div>
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
