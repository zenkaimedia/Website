import fs from "node:fs";
import path from "node:path";
import PageContainer from "./PageContainer";

/* "We're working with brands like" — two endless logo rows: public/brands/
   line-1 drifts right→left, public/brands/line-2 left→right. Files are read
   at build time, so dropping a logo into either folder adds it (sorted by
   file name). Each logo sits on a uniform white tile in its own colours, so
   logos with white, black or transparent backgrounds all read cleanly; the
   tile is part of the <img> (flip-photo) so it stays white through the
   mobile theme flip. */
const LOGO_EXT = /\.(webp|png|jpe?g|svg|avif)$/i;

type Logo = { src: string; alt: string };

function readLogos(folder: string): Logo[] {
  const dir = path.join(process.cwd(), "public", "brands", folder);
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => LOGO_EXT.test(f)).sort();
  } catch {
    return [];
  }
  return files.map((f) => ({
    src: `/brands/${folder}/${encodeURIComponent(f)}`,
    alt: f.replace(LOGO_EXT, "").replace(/[-_]+/g, " "),
  }));
}

function Row({ logos, reverse }: { logos: Logo[]; reverse?: boolean }) {
  // Repeat the set until one half comfortably overfills a wide screen, then
  // render it twice so a -50% translate loops seamlessly.
  let half = logos;
  while (half.length < 10) half = half.concat(logos);

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul
        className={`flex w-max ${reverse ? "animate-[marqueeRight_45s_linear_infinite]" : "animate-[marqueeLeft_45s_linear_infinite]"} motion-reduce:animate-none`}
      >
        {[...half, ...half].map((logo, i) => (
          <li
            key={i}
            aria-hidden={i >= half.length || undefined}
            className="shrink-0 px-[6px] md:px-[0.625rem]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={i < logos.length ? logo.alt : ""}
              className="flip-photo h-[64px] w-[140px] rounded-[8px] bg-white object-contain p-[10px] md:h-[6rem] md:w-[13rem] md:rounded-[0.75rem] md:p-[1rem]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BrandsMarquee() {
  const line1 = readLogos("line-1");
  const line2 = readLogos("line-2");
  if (line1.length === 0 && line2.length === 0) return null;

  return (
    <section className="bg-[#000000] pb-[80px] md:pb-28">
      <PageContainer className="max-md:px-[20px]!">
        {/* Centred two-tone heading in the site's statement style (white lead,
            grey tail — same as "Ready to get started?"). */}
        <h2 className="mx-auto mb-[32px] max-w-[18ch] text-center font-display text-[30px] font-normal leading-[36px] tracking-[-0.01em] text-white md:mb-[3.5rem] md:max-w-none md:text-[3.6rem] md:leading-[1.2]">
          We&rsquo;re working with{" "}
          <span className="text-white/40">brands like</span>
        </h2>
      </PageContainer>

      <div className="flex flex-col gap-[12px] md:gap-[1.5rem]">
        {line1.length > 0 && <Row logos={line1} />}
        {line2.length > 0 && <Row logos={line2} reverse />}
      </div>
    </section>
  );
}
