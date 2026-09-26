import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeNav from "@/components/home/HomeNav";
import InvertShell from "@/components/home/InvertShell";
import PortfolioGrid from "@/components/home/PortfolioGrid";
import ServicePageEnd from "@/components/home/ServicePageEnd";
import { DotChevron, DotProcessIcon } from "@/components/home/DotIcons";
import { SERVICE_PAGES, getServicePage } from "@/components/home/serviceDetails";
import { subServiceHref } from "@/components/home/subServiceDetails";
import JsonLd from "@/components/seo/JsonLd";
import { ogImage, pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { getWork, type Work } from "@/components/home/portfolio";

type Params = { params: Promise<{ slug: string }> };

// All seven service pages are pre-rendered; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = getServicePage((await params).slug);
  if (!s) return {};
  return pageMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: s.href,
    image: ogImage(`service-${s.slug}`),
  });
}

/* Layout measured off the reference service page at 1920 (rem = px ÷ 16):
   630px hero, 96px side margins, 57.5px statement, 62px "What we do" rows,
   417 × 625px process cards with 19px gaps. */
const SECTION_X = "px-5 sm:px-6 md:px-[6rem]";
const LABEL =
  "font-body text-[16px] uppercase leading-6 text-[#909090] md:text-[1.1875rem] md:leading-[1.8rem]";

export default async function ServiceDetailPage({ params }: Params) {
  const s = getServicePage((await params).slug);
  if (!s) notFound();

  const work = s.work.map(getWork).filter((w): w is Work => Boolean(w));

  return (
    <main className="bg-[#ffffff] font-body">
      <JsonLd
        data={[
          serviceSchema({
            name: s.title,
            description: s.seoDescription,
            path: s.href,
            image: s.hero,
            offers: s.includes,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.title, path: s.href },
          ]),
        ]}
      />
      <HomeNav />

      <InvertShell>
        {/* ---------------------------------------------------------------- HERO */}
        <section className="relative h-[72svh] min-h-[30rem] overflow-hidden bg-black md:h-[39.375rem] md:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.hero}
            alt={s.title}
            className="flip-photo absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

          {/* Title — two big lines starting at the page centre on desktop */}
          <h1 className="absolute bottom-[11rem] left-5 right-5 font-display text-[clamp(2.75rem,12vw,3.5rem)] font-medium leading-none tracking-[-0.02em] text-[#ebebeb] sm:left-6 md:bottom-auto md:left-1/2 md:right-[6rem] md:top-[11rem] md:max-w-[44vw] md:text-[8.39rem]">
            {s.title}
          </h1>

          {/* Tagline — bottom-right on desktop, under the title on mobile */}
          <p className="absolute bottom-[6.5rem] left-5 right-5 font-body text-[15px] leading-snug text-white/85 sm:left-6 md:bottom-auto md:left-auto md:right-[6rem] md:top-[31.0625rem] md:w-[27rem] md:text-[1.1875rem] md:leading-[1.2]">
            {s.description}
          </p>

          {/* Back to all services */}
          <a
            href="/services"
            className="absolute bottom-6 left-5 inline-flex h-[48px] items-center gap-3 rounded-[8px] bg-white/40 px-[18px] font-body text-[15px] text-black backdrop-blur-md transition-colors duration-300 hover:bg-white/60 sm:left-6 md:bottom-[2.375rem] md:left-[6rem] md:h-[3.6875rem] md:gap-[0.9rem] md:rounded-[0.6rem] md:px-[1.5rem] md:text-[1.1875rem]"
          >
            <DotChevron className="h-[12px] w-auto rotate-180 [filter:invert(1)] md:h-[0.9rem]" />
            View all services
          </a>
        </section>

        {/* ------------------------------------------------ STATEMENT + BODY */}
        <section className={`grid gap-8 pb-20 pt-16 md:grid-cols-2 md:gap-0 md:pb-[12.75rem] md:pt-[9.125rem] ${SECTION_X}`}>
          <h2 className="max-w-[48rem] font-display text-[36px] font-normal leading-[40px] tracking-normal text-black md:pr-[4rem] md:text-[3.6rem] md:leading-[1.2]">
            {s.lead}{" "}
            <span className="text-black/30">{s.tail}</span>
          </h2>
          <p className="font-body text-[16px] leading-[1.6] text-black/45 md:pt-[0.25rem] md:text-[1.1875rem] md:leading-[1.556]">
            {s.body}
          </p>
        </section>

        {/* -------------------------------------------------------- WHAT WE DO */}
        <section className={`grid gap-6 pb-20 md:grid-cols-2 md:gap-0 md:pb-[11.375rem] ${SECTION_X}`}>
          <p className={LABEL}>What we do</p>
          <ul className="md:ml-[0.375rem] md:mt-[1.8rem]">
            {s.includes.map((item) => (
              <li key={item}>
                <a
                  href={subServiceHref(s.title, item)}
                  className="group relative isolate flex items-center justify-between gap-4 rounded-lg border-b border-black/10 px-4 py-5 font-body text-lg text-black/85 transition-colors duration-200 hover:text-white md:h-[3.9rem] md:py-0 md:pl-[0.75rem] md:pr-[0.75rem] md:text-[1.1875rem]"
                >
                  {/* Black panel grows up out of the divider on hover (same
                      interaction as the Services page rows). */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -bottom-px -z-10 origin-bottom scale-y-0 rounded-lg bg-black transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                  />
                  <span className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[0.8em]">
                    {item}
                  </span>
                  <span className="grid h-[2.375rem] w-[2.375rem] shrink-0 place-items-center">
                    <DotChevron className="h-3.5 w-auto [filter:invert(1)] transition-[filter,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[0.8em] group-hover:[filter:invert(0)] md:h-[1.5rem]" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ OUR PROCESS */}
        <section className={`pb-20 md:pb-[8rem] ${SECTION_X}`}>
          <p className={LABEL}>Our process</p>
          {/* Mobile: a swipe row of cards (same as the sub-service pages). */}
          <ol className="-mx-5 mt-[24px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto scroll-px-5 px-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:mt-[1.2rem] md:grid md:grid-cols-4 md:gap-[1.2rem] md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {s.process.map((step, i) => (
              <li
                key={step.title}
                className="flex h-[472px] w-[min(355px,86vw)] shrink-0 snap-start flex-col rounded-[16px] bg-black/[0.035] p-[24px] md:aspect-[417/625] md:h-auto md:w-auto md:rounded-[1.2rem] md:p-[1.25rem]"
              >
                <div className="flex items-start justify-between gap-4 font-body text-[15px] uppercase leading-6 text-[#606060] md:text-[1.1875rem] md:leading-[1.8rem]">
                  <span>{step.title}</span>
                  <span>0{i + 1}</span>
                </div>
                <div className="flex flex-1 items-center justify-center">
                  <DotProcessIcon step={i} className="h-[88px] w-[88px] text-black/15 md:h-[7.1875rem] md:w-[7.1875rem]" />
                </div>
                <p className="font-body text-[13px] leading-[17px] text-[#8d8d8d] md:text-[1.078rem] md:leading-[1.44rem]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ----------------------------------------------------- IN PRACTICE */}
        {work.length > 0 && (
          <section className={`pb-20 md:pb-[8rem] ${SECTION_X}`}>
            <p className={`${LABEL} mb-6 md:mb-[1.2rem]`}>{s.title} in practice</p>
            <PortfolioGrid items={work} />
          </section>
        )}

        <ServicePageEnd />
      </InvertShell>
    </main>
  );
}
