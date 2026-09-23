import type { Metadata } from "next";
import HomeNav from "@/components/home/HomeNav";
import ContactForm from "@/components/home/ContactForm";
import FooterWordmark from "@/components/home/FooterWordmark";
import PageContainer from "@/components/home/PageContainer";
import InvertShell from "@/components/home/InvertShell";
import ServicesOutro from "@/components/home/ServicesOutro";
import ServicesDirectory from "@/components/home/ServicesDirectory";
import { Arrow } from "@/components/home/Arrow";
import { CTA_ARROW } from "@/components/home/cta";
import { SERVICES, DotServiceIcon, type Service } from "@/components/home/services";

export const metadata: Metadata = {
  title: "Services — Zenkai Media",
  description:
    "Everything Zenkai offers, from creative production and AI studio work to performance marketing, branding, and web development.",
};

const BOOKING_URL = "https://zenkaimedia.dayschedule.com/free-discovery-call";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

/* Fluid type tokens for the two oversized elements. Bounds are in rem (÷16 at
   the 1920px design width, matching HomeNav's convention) so the caps ride the
   fluid root and stay zoom-invariant; the vw middle keeps them fluid across
   viewports. Everything else is rem-based Tailwind, already zoom-resistant. */
const HERO_HEADING = "clamp(2rem, 2.9vw, 3.4rem)";
const CAT_TITLE = "clamp(2.5rem, 5.4vw, 5rem)";

/* Black pill CTA used on the light services hero (the gray CTA_BASE is for
   dark sections). Same motion/shape language as the shared CTAs. */
const CTA_DARK =
  "group inline-flex items-center rounded-xl bg-black px-8 py-4 font-body text-[17px] font-medium text-white shadow-lg transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03] hover:bg-black/85";

/* Zenkai's services grouped into three categories, mirroring the reference. */
const CATEGORIES: {
  name: string;
  image: string;
  description: string;
  titles: string[];
}[] = [
  {
    name: "Content",
    image: "/assets/hero_service_section_images/creativeproduction.webp",
    description:
      "Attention-earning content built to capture, engage, and grow — from studio-grade production to AI-accelerated creative and always-on social.",
    titles: ["Creative Production", "AI Creative Studio", "Social Media Management"],
  },
  {
    name: "Growth",
    image: "/assets/hero_service_section_images/performancemarketing.webp",
    description:
      "Performance-driven campaigns and creator partnerships engineered to reach the right audience and turn attention into measurable results.",
    titles: ["Performance Marketing", "Influencer Marketing"],
  },
  {
    name: "Brand & Web",
    image: "/assets/hero_service_section_images/brandingdesign.webp",
    description:
      "Distinctive brand identities and fast, conversion-focused websites that give your business a memorable presence and a platform to grow.",
    titles: ["Branding & Design", "Web Development"],
  },
];

function ServiceGroup({ service }: { service: Service }) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-black/15 pb-5">
        <span className="text-black/55">
          <DotServiceIcon name={service.icon} className="h-9 w-9 md:h-10 md:w-10" />
        </span>
        <h3 className="font-display text-2xl font-semibold text-black md:text-[1.75rem]">
          {service.title}
        </h3>
        <span className="ml-auto font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-black/35">
          /{service.includes.length} services
        </span>
      </div>

      {/* Sub-services */}
      <ul>
        {service.includes.map((item) => (
          <li key={item}>
            <a
              href="#contact"
              className="group flex items-center justify-between gap-4 rounded-lg border-b border-black/10 px-4 py-5 font-body text-lg text-black/65 transition-colors duration-300 hover:bg-black hover:text-white md:text-xl"
            >
              <span>{item}</span>
              {/* Dotted arrow — white PNG inverted to black on light rows, kept
                 white on the black hover bar. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/general/right-arrow.png"
                alt=""
                aria-hidden="true"
                className="h-3.5 w-auto shrink-0 object-contain [filter:invert(1)] transition-all duration-300 group-hover:translate-x-1 group-hover:[filter:invert(0)]"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategorySection({ cat }: { cat: (typeof CATEGORIES)[number] }) {
  const services = cat.titles
    .map((t) => SERVICES.find((s) => s.title === t))
    .filter(Boolean) as Service[];

  // Total sub-services across the category's groups — shown in the title badge.
  const total = services.reduce((n, s) => n + s.includes.length, 0);

  return (
    <section>
      <PageContainer className="py-14 md:py-20">
        {/* Top band: giant faded category title (left) + muted description (right) */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-16">
          <h2
            className="flex items-start gap-3 font-display font-bold leading-none text-black/[0.13]"
            style={{ fontSize: CAT_TITLE }}
          >
            {cat.name}
            <span className="mt-2 inline-grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-black/[0.06] font-mono text-sm font-medium text-black/40 md:h-9 md:w-9">
              {total}
            </span>
          </h2>
          <p className="max-w-md font-body text-sm leading-relaxed text-black/45 md:pt-3 md:text-right">
            {cat.description}
          </p>
        </div>

        {/* Body: image (left, static — scrolls with the page) + service groups (right) */}
        <div className="mt-6 grid gap-10 md:mt-8 md:grid-cols-[minmax(0,0.85fr)_1.15fr] md:items-start md:gap-16">
          <div className="overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cat.image}
              alt={cat.name}
              className="flip-photo aspect-[3/2] w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {services.map((s) => (
              <ServiceGroup key={s.title} service={s} />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

export default function ServicesPage() {
  const year = new Date().getFullYear();

  return (
    <main className="bg-[#ffffff] font-body">
      <HomeNav />

      {/* Everything from the hero down to the outro shares one reversible
         light↔dark inversion, driven by the outro crossing mid-screen. */}
      <InvertShell>
      {/* ---------------------------------------------------------------- HERO */}
      <PageContainer className="pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="grid gap-8 md:grid-cols-[0.5fr_1fr] md:items-start md:gap-16">
          {/* Far-left eyebrow */}
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-black/45 md:pt-3">
            Our Services
          </p>

          {/* Right-offset headline + CTA */}
          <div>
            <h1
              className="font-display font-medium leading-[1.08] text-black"
              style={{ fontSize: HERO_HEADING }}
            >
              Zenkai is a creative growth studio. We deliver brands, content &amp; digital experiences
              <span className="text-black/30"> from concept to launch.</span>
            </h1>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer noopener"
              className={`mt-10 md:mt-14 ${CTA_DARK}`}
            >
              Discuss the Project
            </a>
          </div>
        </div>
      </PageContainer>

      {/* ---------------------------------------------------------- CATEGORIES */}
      {CATEGORIES.map((cat) => (
        <CategorySection key={cat.name} cat={cat} />
      ))}

      {/* ----------------------------------------------- OUTRO (fade-to-black) */}
      <ServicesOutro />

      {/* Dark-by-design sections, counter-inverted so the whole page flips
         white↔black as one unit (the double invert cancels in dark mode). */}
      <div style={{ filter: "invert(1) hue-rotate(180deg)" }}>
      {/* -------------------------------------------------------------- CONTACT */}
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
