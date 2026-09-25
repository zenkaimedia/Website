/* Shared portfolio data — used by the homepage "Latest Work" section, the
   /portfolio grid, and each /portfolio/[slug] project page. Add new projects
   here and all three pick them up. */

/** One gallery row on a project page: a single full-width image, or a pair
    shown side by side. */
export type GalleryRow = string | [string, string];

type WorkInput = {
  /** URL segment: /portfolio/<slug>. Lowercase, hyphens, no spaces. */
  slug: string;
  title: string;
  /** Cover image — used on cards and as the first gallery image. */
  image: string;
  description: string;
  location: string;
  industry: string;
  /** Tags on the mobile home card and the project page. */
  services: string[];
  /** Project-page gallery below the cover, top to bottom. Drop the files in
      /public/assets/portfolio/<slug>/ and list them here. */
  gallery?: GalleryRow[];
};

export type Work = WorkInput & { href: string };

const INPUT: WorkInput[] = [
  {
    slug: "airblack",
    title: "Airblack",
    image: "/assets/portfolio/airblack.webp",
    description:
      "Airblack is a skilling academy built around the belief that the right skills can create meaningful livelihoods. Our challenge was to capture the energy of learning, the credibility of industry experts, and the ambition of thousands of aspiring professionals in one cohesive visual language. The solution was a creative direction that brings together expertise, transformation, and human connection to reflect Airblack’s role in shaping the next generation of professionals.",
    location: "India",
    industry: "EdTech",
    services: ["Branding & Design"],
  },
  {
    slug: "smashed-agency",
    title: "Smashed Agency",
    image: "/assets/portfolio/smashedagency.webp",
    description:
      "Smashed Agency is a performance marketing agency helping DTC brands scale through creative strategy, performance advertising, and media buying. We partnered with the team on creative production, turning performance-led concepts into platform-ready content designed for modern DTC brands.",
    location: "India",
    industry: "DTC / Performance Marketing",
    services: ["Branding & Design", "Creative Production", "Web Development"],
  },
  {
    slug: "ponds",
    title: "POND’S",
    image: "/assets/portfolio/ponds.webp",
    description:
      "POND’S is a skincare brand with a long-standing focus on beauty, skin health, and science. We developed a cinematic visual direction for the brand, translating its product identity into refined, product-led imagery through controlled lighting, elegant compositions, and soft beauty-inspired details.",
    location: "INDIA",
    industry: "BEAUTY & SKINCARE",
    services: ["Branding & Design", "Creative Production"],
  },
  {
    slug: "zudo-app",
    title: "Zudo App",
    image: "/assets/portfolio/zudoapp.webp",
    description:
      "Zudo App is a learning platform built around the idea of making practical skills easier to learn and apply. We worked on translating its fast-paced, creator-first learning experience into engaging digital content, combining clear storytelling, modern visuals, and short-form formats designed to make learning feel simple and accessible.",
    location: "India",
    industry: "EdTech",
    services: ["Creative Production"],
  },
];

export const WORK: Work[] = INPUT.map((w) => ({ ...w, href: `/portfolio/${w.slug}` }));

export function getWork(slug: string): Work | undefined {
  return WORK.find((w) => w.slug === slug);
}

/** The next `count` projects after `slug`, wrapping around — for the
    "Next project" row on a project page. */
export function nextWork(slug: string, count = 2): Work[] {
  const i = WORK.findIndex((w) => w.slug === slug);
  return Array.from({ length: Math.min(count, WORK.length - 1) }, (_, k) => WORK[(i + 1 + k) % WORK.length]);
}

/** Projects featured in the homepage "Latest Work" section, in display order
    (titles must match WORK exactly). The /portfolio page shows all of WORK. */
const HOME_TITLES = ["Airblack", "POND’S", "Zudo App"];

export const HOME_WORK: Work[] = HOME_TITLES.map((t) => WORK.find((w) => w.title === t)).filter(
  (w): w is Work => Boolean(w)
);
