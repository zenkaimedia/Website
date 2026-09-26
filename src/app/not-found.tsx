import type { Metadata } from "next";
import HomeNav from "@/components/home/HomeNav";
import PageContainer from "@/components/home/PageContainer";
import { Arrow } from "@/components/home/Arrow";
import { CTA_BASE, CTA_ARROW } from "@/components/home/cta";

/* Dot-matrix digits (5×7 bitmaps, "1" = a dot) so "404" reads in the site's
   signature dot theme. */
const DIGITS: Record<string, string[]> = {
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "0": ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
};

function DotDigit({ d }: { d: string }) {
  const rows = DIGITS[d];
  const step = 10;
  const r = 4.4; // thicker dots (near-touching at diameter 8.8 of the 10 step)
  const cols = rows[0].length;
  return (
    <svg
      viewBox={`0 0 ${cols * step} ${rows.length * step}`}
      className="h-[clamp(10rem,28vw,26rem)] w-auto"
      fill="currentColor"
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "1" ? (
            <circle
              key={`${x}-${y}`}
              cx={x * step + step / 2}
              cy={y * step + step / 2}
              r={r}
            />
          ) : null
        )
      )}
    </svg>
  );
}

/* 404s keep their own title and stay out of search results. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#000000] font-body">
      <HomeNav />

      <PageContainer className="flex min-h-dvh flex-col items-center justify-center text-center">
        <p className="mb-8 font-mono text-sm uppercase tracking-[0.35em] text-white sm:mb-10">
          Page Not Found
        </p>

        {/* Big dotted 404 */}
        <div
          className="flex items-center justify-center gap-[clamp(1rem,3vw,3rem)] text-white/[0.08]"
          aria-label="404"
        >
          <DotDigit d="4" />
          <DotDigit d="0" />
          <DotDigit d="4" />
        </div>

        {/* Return Home — overlaps the base of the 404, like the reference */}
        <a href="/" className={`-mt-6 md:-mt-10 ${CTA_BASE}`}>
          Return Home
          <Arrow invert className={CTA_ARROW} />
        </a>
      </PageContainer>
    </main>
  );
}
