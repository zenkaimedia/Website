import type { ReactNode } from "react";

export type ServiceIconName =
  | "production"
  | "ai"
  | "social"
  | "performance"
  | "influencer"
  | "branding"
  | "web";

export type Service = {
  title: string;
  description: string;
  includes: string[];
  icon: ServiceIconName;
  /** Background image shown on menu-card hover. Drop the file in public/services/. */
  image: string;
};

export const SERVICES: Service[] = [
  {
    title: "Creative Production",
    description:
      "Premium visuals built to capture attention and amplify brand impact.",
    includes: [
      "Video Editing",
      "Photography",
      "Videography",
      "Product Shoots",
      "Corporate Shoots",
    ],
    icon: "production",
    image: "/assets/hero_service_section_images/creativeproduction.webp",
  },
  {
    title: "AI Creative Studio",
    description:
      "AI-powered creative solutions that speed production and elevate storytelling.",
    includes: ["AI Commercials", "AI Brand Films", "AI UGC", "AI Product Ads"],
    icon: "ai",
    image: "/assets/hero_service_section_images/aicreativestudio.webp",
  },
  {
    title: "Social Media Management",
    description:
      "Consistent presence, engaging content, and community growth that builds trust.",
    includes: [
      "Content Strategy",
      "Content Planning",
      "Content Publishing",
      "Community Management",
    ],
    icon: "social",
    image: "/assets/hero_service_section_images/socialmediamanagement.webp",
  },
  {
    title: "Performance Marketing",
    description:
      "Campaigns designed to deliver measurable growth and strong ROI.",
    includes: [
      "Meta Ads",
      "Google Ads",
      "Lead Generation",
      "E-commerce Advertising",
    ],
    icon: "performance",
    image: "/assets/hero_service_section_images/performancemarketing.webp",
  },
  {
    title: "Influencer Marketing",
    description:
      "Authentic creator partnerships that expand reach and drive conversions.",
    includes: [
      "Influencer Campaigns",
      "Creator Outreach",
      "UGC Collaborations",
      "Campaign Management",
    ],
    icon: "influencer",
    image: "/assets/hero_service_section_images/influencermarketing.webp",
  },
  {
    title: "Branding & Design",
    description:
      "Identity, visuals and messaging that create a memorable brand experience.",
    includes: [
      "Brand Identity",
      "Logo Design",
      "Graphic Design",
      "Marketing Creatives",
    ],
    icon: "branding",
    image: "/assets/hero_service_section_images/brandingdesign.webp",
  },
  {
    title: "Web Development",
    description:
      "Fast, responsive websites designed to convert visitors into customers.",
    includes: [
      "Business Websites",
      "Landing Pages",
      "E-commerce Stores",
      "Website Maintenance",
    ],
    icon: "web",
    image: "/assets/hero_service_section_images/webdevelopment.webp",
  },
];

const ICON_PATHS: Record<ServiceIconName, ReactNode> = {
  production: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3z" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M12 7.5 13.6 11 17 12l-3.4 1L12 16.5 10.4 13 7 12l3.4-1z" />
    </>
  ),
  social: (
    <>
      <path d="M21 11.5a8 8 0 0 1-11.9 7L3 20.5l2-6.1A8 8 0 1 1 21 11.5z" />
    </>
  ),
  performance: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 7v5h-5" />
    </>
  ),
  influencer: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.8" />
      <path d="M18.5 20a5 5 0 0 0-3-4.6" />
    </>
  ),
  branding: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="m9 13.5-2 2 2 2M15 13.5l2 2-2 2" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className = "h-5 w-5",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

/* Dot-matrix ("dotted") glyphs — the site's signature dot theme. Each is a 5×5
   bitmap where "1" is a filled dot; rendered as SVG circles. Used on the
   services page headers so every icon reads as dots, matching the reference. */
const DOT_GLYPHS: Record<ServiceIconName, string[]> = {
  // Reference camera/box mark (8×7, 44 dots).
  production: ["00111100", "00111100", "11111111", "11100111", "11100111", "11111111", "11111111"],
  ai: ["00100", "01110", "11111", "01110", "00100"], // spark ◆
  // Reference bow-tie mark (8×8, 28 dots).
  social: ["10000001", "01100110", "01111110", "00100100", "00100100", "01111110", "01100110", "10000001"],
  // Reference laptop: screen outline over a two-row base (8×6, 28 dots).
  performance: ["01111110", "01000010", "01000010", "01000010", "11111111", "11111111"],
  influencer: ["01010", "11011", "00100", "01010", "10101"], // network
  // Reference geometric mark: four diamonds around a centre (8×8, 24 dots).
  branding: ["00011000", "00011000", "00100100", "11011011", "11011011", "00100100", "00011000", "00011000"],
  // Reference terminal prompt ">_" (8×8, 22 dots).
  web: ["10000000", "11000000", "01100000", "00110000", "00110000", "01100000", "11001111", "10001111"],
};

/* Dot radius as a fraction of the grid step. The 8-wide glyphs above use the
   reference's heavier dots (≈0.44); the rest keep the original 0.35. */
const DOT_RATIO: Partial<Record<ServiceIconName, number>> = {
  production: 0.44,
  social: 0.44,
  performance: 0.44,
  branding: 0.44,
  web: 0.44,
};

export function DotServiceIcon({
  name,
  className = "h-9 w-9",
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const rows = DOT_GLYPHS[name];
  const step = 4;
  const r = step * (DOT_RATIO[name] ?? 0.35);
  const cols = rows[0].length;
  // Square viewBox sized to the larger side, glyph centred in it — so an 8×6
  // or 8×7 glyph keeps the same footprint as a square one.
  const size = Math.max(cols, rows.length) * step;
  const dx = (size - cols * step) / 2;
  const dy = (size - rows.length * step) / 2;
  return (
    <svg
      viewBox={`${-dx} ${-dy} ${size} ${size}`}
      fill="currentColor"
      className={className}
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
