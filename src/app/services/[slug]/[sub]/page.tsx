import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeNav from "@/components/home/HomeNav";
import InvertShell from "@/components/home/InvertShell";
import ServicePageEnd from "@/components/home/ServicePageEnd";
import { DotChevron, DotProcessIcon } from "@/components/home/DotIcons";
import { SUB_SERVICE_PAGES, getSubServicePage, subServiceHref } from "@/components/home/subServiceDetails";

type Params = { params: Promise<{ slug: string; sub: string }> };

// Every sub-service page is pre-rendered; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return SUB_SERVICE_PAGES.map((p) => ({ slug: p.parent.slug, sub: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, sub } = await params;
  const p = getSubServicePage(slug, sub);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.parent.title} — Zenkai Media`,
    description: p.body,
    openGraph: { images: [p.parent.hero] },
  };
}

/* Layout measured off the reference sub-service page — desktop at 1920
   (rem = px ÷ 16) and mobile at 412 (px): 608px hero, 57.5px statement,
   117px "What's included" rows, 417 × 625px process cards (a swipe row on
   mobile), 62px "Other services" rows. */
const SECTION_X = "px-[20px] md:px-[6rem]";
const LABEL =
  "font-body text-[16px] uppercase leading-6 text-[#909090] md:text-[1.1875rem] md:leading-[1.8rem]";

export default async function SubServicePage({ params }: Params) {
  const { slug, sub } = await params;
  const p = getSubServicePage(slug, sub);
  if (!p) notFound();

  const { parent } = p;
  const others = parent.includes.filter((item) => item !== p.title);

  return (
    <main className="bg-[#ffffff] font-body">
      <HomeNav />

      <InvertShell>
        {/* ---------------------------------------------------------------- HERO */}
        <section className="relative h-[590px] overflow-hidden bg-black md:h-[38rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={parent.hero}
            alt={p.title}
            className="flip-photo absolute inset-0 h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/35" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent md:hidden" />

          {/* Title — bottom-left above the button on mobile; two big lines
              starting at the page centre on desktop. */}
          <h1 className="absolute bottom-[90px] left-[20px] right-[20px] font-display text-[60px] font-medium leading-[68px] tracking-[-0.02em] text-[#ebebeb] md:bottom-[2.625rem] md:left-1/2 md:right-[6rem] md:max-w-[44vw] md:text-[8.39rem] md:leading-[0.82]">
            {p.title}
          </h1>

          {/* Back to all services */}
          <a
            href="/services"
            className="absolute bottom-[21px] left-[20px] inline-flex h-[53px] items-center gap-[20px] rounded-[8px] bg-white/40 px-[25px] font-body text-[15px] text-black backdrop-blur-md transition-colors duration-300 hover:bg-white/60 md:bottom-[3.625rem] md:left-[6rem] md:h-[3.6875rem] md:gap-[0.9rem] md:rounded-[0.6rem] md:px-[1.5rem] md:text-[1.1875rem]"
          >
            <DotChevron className="h-[12px] w-auto rotate-180 [filter:invert(1)] md:h-[0.9rem]" />
            View all services
          </a>
        </section>

        {/* ------------------------------------------------ STATEMENT + BODY */}
        <section className={`grid gap-[36px] pb-[68px] pt-[46px] md:grid-cols-2 md:gap-0 md:pb-[12.25rem] md:pt-[4.6875rem] ${SECTION_X}`}>
          <h2 className="max-w-[48rem] font-display text-[32px] font-normal leading-[36px] tracking-normal text-black md:pr-[4rem] md:text-[3.6rem] md:leading-[1.2]">
            {p.lead} <span className="text-black/30">{p.tail}</span>
          </h2>
          <p className="font-body text-[19px] leading-[34px] text-black/45 md:pt-[2.5625rem] md:text-[1.1875rem] md:leading-[1.556]">
            {p.body}
          </p>
        </section>

        {/* -------------------------------------------------- WHAT'S INCLUDED */}
        <section className={`grid pb-[84px] md:grid-cols-2 md:pb-[9.75rem] ${SECTION_X}`}>
          <p className={LABEL}>What&rsquo;s included</p>
          <ul className="mt-[34px] md:ml-[0.5rem] md:mt-0">
            {p.included.map((item) => (
              <li
                key={item.title}
                className="border-b border-black/10 pb-[42px] pt-[40px] first:pt-0 md:pb-[1.6875rem] md:pt-[1.25rem] md:first:pt-0"
              >
                <h3 className="font-display text-[26px] font-normal leading-[32px] text-black md:text-[1.8rem] md:leading-[1.2]">
                  {item.title}
                </h3>
                <p className="mt-[6px] font-body text-[18px] leading-[31px] text-[#8e8e8e] md:mt-[0.6875rem] md:text-[1.078rem] md:leading-[1.44rem]">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------------ OUR PROCESS */}
        <section className={`pb-[80px] md:pb-[11.25rem] ${SECTION_X}`}>
          <p className={LABEL}>Our process</p>
          <ol className="-mx-[20px] mt-[24px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto scroll-px-[20px] px-[20px] [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:mt-[1.2rem] md:grid md:grid-cols-4 md:gap-[1.2rem] md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
            {parent.process.map((step, i) => (
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

        {/* ------------------------------------------ OTHER SERVICES WITHIN … */}
        <section className={`grid pb-0 md:grid-cols-2 md:pb-[4rem] ${SECTION_X}`}>
          <p className={LABEL}>Other services within {parent.title}</p>
          <ul className="md:ml-[0.5rem]">
            {others.map((item) => {
              return (
                <li key={item}>
                  <a
                    href={subServiceHref(parent.title, item)}
                    className="group relative isolate flex h-[76px] items-center justify-between gap-4 rounded-lg border-b border-black/10 pl-[8px] pr-[8px] font-body text-[17px] text-black transition-colors duration-200 hover:text-white md:h-[3.9rem] md:pl-[0.75rem] md:pr-[0.75rem] md:text-[1.1875rem]"
                  >
                    {/* Black panel grows up out of the divider on hover (same
                        interaction as the service page rows). */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 -bottom-px -z-10 origin-bottom scale-y-0 rounded-lg bg-black transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
                    />
                    <span className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[0.8em]">
                      {item}
                    </span>
                    <span className="grid h-[2.375rem] w-[2.375rem] shrink-0 place-items-center">
                      <DotChevron className="h-[14px] w-auto [filter:invert(1)] transition-[filter,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-[0.8em] group-hover:[filter:invert(0)] md:h-[1.375rem]" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        <ServicePageEnd />
      </InvertShell>
    </main>
  );
}
