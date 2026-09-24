/* Shared portfolio data — used by the homepage "Latest Work" section and the
   /portfolio page. Add new projects here and both pick them up. */
export type Work = {
  title: string;
  image: string;
  description: string;
  location: string;
  industry: string;
  /** Shown as tags on the mobile card. */
  services: string[];
  href: string;
};

export const WORK: Work[] = [
  {
    title: "Airblack",
    image: "/assets/portfolio/airblack.png",
    description:
      "Airblack is a skilling academy built around the belief that the right skills can create meaningful livelihoods. Our challenge was to capture the energy of learning, the credibility of industry experts, and the ambition of thousands of aspiring professionals in one cohesive visual language. The solution was a creative direction that brings together expertise, transformation, and human connection to reflect Airblack’s role in shaping the next generation of professionals.",
    location: "India",
    industry: "EdTech",
    services: ["Branding & Design"],
    href: "#contact",
  },
  {
    title: "Smashed Agency",
    image: "/assets/portfolio/smashedagency.png",
    description:
      "Smashed Agency is a performance marketing agency helping DTC brands scale through creative strategy, performance advertising, and media buying. We partnered with the team on creative production, turning performance-led concepts into platform-ready content designed for modern DTC brands.",
    location: "India",
    industry: "DTC / Performance Marketing",
    services: ["Branding & Design", "Creative Production", "Web Development"],
    href: "#contact",
  },
  {
    title: "POND’S",
    image: "/assets/portfolio/ponds.png",
    description:
      "POND’S is a skincare brand with a long-standing focus on beauty, skin health, and science. We developed a cinematic visual direction for the brand, translating its product identity into refined, product-led imagery through controlled lighting, elegant compositions, and soft beauty-inspired details.",
    location: "INDIA",
    industry: "BEAUTY & SKINCARE",
    services: ["Branding & Design", "Creative Production"],
    href: "#contact",
  },
  {
    title: "Zudo",
    image: "/assets/portfolio/zudoapp.png",
    description:
      "Zudo is a learning platform built around the idea of making practical skills easier to learn and apply. We worked on translating its fast-paced, creator-first learning experience into engaging digital content, combining clear storytelling, modern visuals, and short-form formats designed to make learning feel simple and accessible.",
    location: "India",
    industry: "EdTech",
    services: ["Creative Production"],
    href: "#contact",
  },
];

/** Projects featured in the homepage "Latest Work" section, in display order
    (titles must match WORK exactly). The /portfolio page shows all of WORK. */
const HOME_TITLES = ["Airblack", "POND’S", "Zudo"];

export const HOME_WORK: Work[] = HOME_TITLES.map((t) => WORK.find((w) => w.title === t)).filter(
  (w): w is Work => Boolean(w)
);
