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
      "Airblack is a leading skilling academy helping aspiring professionals build industry-ready skills and create meaningful career opportunities. We developed a creative production approach that captures the energy of learning, the credibility of expert-led education, and the ambition of a growing community. The visual direction combines human stories, modern aesthetics, and purposeful storytelling to reflect Airblack’s role in shaping the next generation of professionals.",
    location: "India",
    industry: "EdTech",
    services: ["Creative Production"],
  },
  // Smashed Agency — hidden for now; uncomment to bring it back.
  // {
  //   slug: "smashed-agency",
  //   title: "Smashed Agency",
  //   image: "/assets/portfolio/smashedagency.webp",
  //   description:
  //     "Smashed Agency is a performance marketing agency helping DTC brands scale through creative strategy, performance advertising, and media buying. We worked with the team on creative production, translating performance-focused ideas into sharp, platform-ready content built to capture attention and communicate with modern DTC audiences.",
  //   location: "India",
  //   industry: "DTC / Performance Marketing",
  //   services: ["Creative Production"],
  // },
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
      "Zudo App is a learning platform focused on making practical skills easier to learn, understand, and apply. We worked on bringing its creator-first learning experience to life through engaging digital content, combining sharp storytelling, modern visual direction, and AI-driven creative production to create content that feels simple, relevant, and built for today’s learners.",
    location: "India",
    industry: "EdTech",
    services: ["Creative Production", "AI Creative Studio"],
  },
  {
    slug: "ode-songs",
    title: "Ode Songs",
    image: "/assets/portfolio/odesongs.webp",
    description:
      "Ode Songs is a SaaS platform that turns personal memories and stories into original, personalized songs. We developed creative concepts and AI-led visual content to translate the emotional nature of the product into cinematic, engaging short-form experiences built for digital audiences.",
    location: "Netherlands",
    industry: "SaaS / AI",
    services: ["Creative Production", "AI Creative Studio"],
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
