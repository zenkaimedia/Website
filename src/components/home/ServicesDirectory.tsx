import { SERVICES, type Service } from "./services";
import PageContainer from "./PageContainer";
import { serviceHref } from "./serviceDetails";
import { subServiceHref } from "./subServiceDetails";

/* Full services directory that closes the page: each category lists its service
   groups, and on desktop every group expands into its individual services.
   Mobile condenses to the category label + group titles only. */
const CATEGORIES: { label: string; titles: string[] }[] = [
  {
    label: "Content",
    titles: ["Creative Production", "AI Creative Studio", "Social Media Management"],
  },
  {
    label: "Growth",
    titles: ["Performance Marketing", "Influencer Marketing"],
  },
  {
    label: "Brand & Web",
    titles: ["Branding & Design", "Web Development"],
  },
];

function ArrowUpRight() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/general/rightuparrow.webp"
      alt=""
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 object-contain opacity-60 transition-transform duration-300 [filter:brightness(0)_invert(1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    />
  );
}

export default function ServicesDirectory() {
  return (
    // Mobile (reference, 412px): 14px caps group labels, 18/28px service
    // links 8px apart starting 20px below, 64px between groups.
    <section className="bg-[#000000] pb-20 pt-6 max-md:pb-[64px] max-md:pt-[20px] md:pb-32 md:pt-20">
      <PageContainer className="max-md:px-[20px]!">
        <div className="flex flex-col gap-14 max-md:gap-[64px] md:gap-24">
          {CATEGORIES.map((cat, i) => {
            const services = cat.titles
              .map((t) => SERVICES.find((s) => s.title === t))
              .filter(Boolean) as Service[];
            const isLast = i === CATEGORIES.length - 1;

            return (
              <div
                key={cat.label}
                className="grid gap-6 max-md:gap-[20px] md:grid-cols-[15rem_1fr] md:gap-14"
              >
                <div className="flex flex-col">
                  <p className="font-mono text-[clamp(0.85rem,3.8vw,1.15rem)] uppercase tracking-[0.15em] text-white max-md:font-body max-md:text-[14px] max-md:leading-[20px] max-md:tracking-normal md:text-[1.0625rem] md:tracking-[0.2em]">
                    {cat.label}
                  </p>
                  {/* Desktop: partner badge pinned bottom-left of the final row */}
                  {isLast && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src="/assets/general/metapartnerbadge.webp"
                      loading="lazy"
                      alt="Meta Partner"
                      className="hidden w-[13.5rem] md:mt-auto md:block"
                    />
                  )}
                </div>

                {/* 3 columns so the widest category fills the row edge-to-edge */}
                <div className="grid gap-x-8 gap-y-9 max-md:gap-y-[8px] md:grid-cols-3 md:gap-x-12 md:gap-y-16">
                  {services.map((s) => (
                    <div key={s.title}>
                      <a
                        href={serviceHref(s.title)}
                        className="group inline-flex items-center gap-2 font-body text-[clamp(1.15rem,5vw,1.45rem)] leading-tight text-white/40 transition-colors hover:text-white max-md:text-[18px] max-md:leading-[28px] md:text-[1.5rem]"
                      >
                        {s.title}
                        <ArrowUpRight />
                      </a>

                      {/* Individual services — desktop only */}
                      <ul className="mt-4 hidden space-y-4 md:mt-7 md:block">
                        {s.includes.map((item) => (
                          <li key={item}>
                            <a
                              href={subServiceHref(s.title, item)}
                              className="font-body text-[1.25rem] text-white/85 transition-colors hover:text-white"
                            >
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Mobile: partner badge sits AFTER the links, closing the list */}
                {isLast && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src="/assets/general/metapartnerbadge.webp"
                      loading="lazy"
                    alt="Meta Partner"
                    className="mt-4 w-[clamp(11rem,48vw,13.5rem)] md:hidden"
                  />
                )}
              </div>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
