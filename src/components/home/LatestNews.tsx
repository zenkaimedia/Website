import { CTA_BASE, CTA_SIMPLE } from "./cta";
import PageContainer from "./PageContainer";

type Post = {
  title: string;
  date: string;
  image: string;
  href: string;
};

const NEWS: Post[] = [
  {
    title: "Building Brands from Within",
    date: "April 6",
    image: "/assets/insights/cardone.webp",
    href: "#contact",
  },
  {
    title: "How to Choose a Brand Name That Lasts",
    date: "April 6",
    image: "/assets/insights/cardtwo.webp",
    href: "#contact",
  },
];

function NewsCard({ post, className = "" }: { post: Post; className?: string }) {
  return (
    <a
      href={post.href}
      className={`group relative flex h-[18.75rem] overflow-hidden rounded-2xl bg-[#141414] shadow-2xl ring-1 ring-white/10 transition-transform duration-500 ease-out hover:-translate-y-2.5 md:h-[22.5rem] ${className}`}
    >
      {/* Text side */}
      <div className="flex w-2/5 shrink-0 flex-col justify-between p-6 md:p-7">
        <div>
          <h3 className="font-display text-lg font-bold leading-snug text-white md:text-xl">
            {post.title}
          </h3>
          <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-white/40">
            {post.date}
          </p>
        </div>
        {/* Chevron — fades/slides in on hover */}
        <span className="grid h-9 w-9 -translate-x-1 place-items-center rounded-full border border-white/25 text-white/75 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="m9 6 6 6-6 6" />
          </svg>
        </span>
      </div>

      {/* Image side */}
      <div className="relative w-3/5 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </a>
  );
}

export default function LatestNews() {
  return (
    <section
      id="insights"
      className="scroll-mt-16 bg-[#000000] pb-20 md:scroll-mt-20 md:pb-28"
    >
      <PageContainer>
        <p className="mb-10 font-mono text-[0.6875rem] uppercase tracking-[0.3em] text-white/45">
          Latest News
        </p>

        {/* Overlapping, staggered cards on desktop; stacked on mobile */}
        <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-0">
          <NewsCard post={NEWS[0]} className="z-0 md:w-[58%]" />
          <NewsCard post={NEWS[1]} className="z-10 md:-ml-[16%] md:mt-14 md:w-[58%]" />
        </div>

        <div className="mt-12 flex justify-center">
          <a href="#contact" className={`inline-flex ${CTA_SIMPLE}`}>
            View all news
          </a>
        </div>
      </PageContainer>
    </section>
  );
}
