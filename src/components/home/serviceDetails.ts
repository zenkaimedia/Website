/* Per-service page content for /services/<slug>. Titles, sub-services, images
   and the one-line descriptions come from SERVICES (services.tsx); this file
   adds the longer copy each service page needs. Edit freely — the pages read
   everything from here. */
import { SERVICES, type Service } from "./services";

/** URL segment for a service title: "Branding & Design" → "branding-design". */
export function serviceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type ProcessStep = { title: string; text: string };

type Detail = {
  /** Dark part of the intro statement … */
  lead: string;
  /** … and its grey continuation. */
  tail: string;
  /** Paragraph beside the statement. */
  body: string;
  /** Four steps, one per process icon (discover → plan → create → launch). */
  process: [ProcessStep, ProcessStep, ProcessStep, ProcessStep];
  /** Portfolio slugs shown under "<Service> in practice". */
  work: string[];
};

const DETAILS: Record<string, Detail> = {
  "Creative Production": {
    lead: "We turn ideas into visuals",
    tail: "that stop the scroll and tell your story.",
    body:
      "Creative production is where a brand becomes visible. From studio product shoots to on-location videography and post-production, we plan, shoot and finish every asset in-house — so the look, the pacing and the quality stay consistent on every platform your audience sees you on.",
    process: [
      { title: "Brief & Concept", text: "We start with your goals, audience and channels, then shape a creative concept and shot list that everything else is built around." },
      { title: "Pre-Production", text: "Locations, talent, props, lighting and schedules are planned in detail so shoot days run smoothly and nothing is left to chance." },
      { title: "Production", text: "Our crew captures photo and video on set or on location, directing every frame against the agreed concept." },
      { title: "Post & Delivery", text: "Editing, colour, sound and retouching — then exports sized and formatted for every platform, ready to publish." },
    ],
    work: ["airblack", "ponds"],
  },
  "AI Creative Studio": {
    lead: "We use AI to produce premium creative",
    tail: "at the speed modern marketing demands.",
    body:
      "Our AI Creative Studio combines generative tools with real creative direction. We produce commercials, brand films, UGC-style content and product ads that look crafted, not generated — giving you more variations, faster turnaround and the freedom to test ideas that would be too costly to shoot.",
    process: [
      { title: "Creative Direction", text: "We define the story, look and message first, so every AI output serves a clear idea rather than a random prompt." },
      { title: "Generation", text: "Scenes, characters and product shots are generated and iterated, guided by references and your brand guidelines." },
      { title: "Refinement", text: "Our editors compose, grade, sound-design and polish every frame until it meets broadcast-ready standards." },
      { title: "Variations & Testing", text: "We deliver multiple versions and formats so you can test hooks, angles and audiences across channels." },
    ],
    work: ["zudo-app", "smashed-agency"],
  },
  "Social Media Management": {
    lead: "We build social presences",
    tail: "that people choose to follow, not scroll past.",
    body:
      "Social media is where your audience spends its attention every day. We plan what you say, when you say it and how it looks — then publish, engage and report, so your channels grow consistently instead of in bursts.",
    process: [
      { title: "Audit & Strategy", text: "We review your channels, competitors and audience to define pillars, tone and the goal each platform should serve." },
      { title: "Content Calendar", text: "A monthly plan of formats, topics and posting times, aligned with launches, campaigns and moments that matter." },
      { title: "Create & Publish", text: "Posts, reels and stories are produced, captioned and scheduled — on brand, on time, every time." },
      { title: "Engage & Report", text: "We manage comments and messages, track what performs and refine the plan every month." },
    ],
    work: ["zudo-app", "airblack"],
  },
  "Performance Marketing": {
    lead: "We turn ad spend into",
    tail: "measurable, profitable growth.",
    body:
      "Performance marketing is creative and data working together. We build, launch and optimise campaigns across Meta and Google — pairing sharp targeting and structured testing with ad creative designed to convert, so every rupee is accountable to a result.",
    process: [
      { title: "Audit & Goals", text: "We review your accounts, tracking and numbers to set clear targets for cost, volume and return." },
      { title: "Campaign Build", text: "Audiences, account structure, tracking and ad creative are set up for clean data and scalable testing." },
      { title: "Launch & Test", text: "Campaigns go live with structured tests on audiences, hooks and offers to find what wins." },
      { title: "Optimise & Scale", text: "We cut what doesn't work, scale what does and report transparently on the metrics that matter." },
    ],
    work: ["smashed-agency", "ponds"],
  },
  "Influencer Marketing": {
    lead: "We connect brands with creators",
    tail: "whose audiences already trust them.",
    body:
      "The right creator can introduce your brand more credibly than any ad. We find creators who genuinely fit, brief them clearly, manage every collaboration end to end and measure the impact — from UGC for your ads to full-scale campaigns.",
    process: [
      { title: "Strategy", text: "We define the campaign goal, the audience and the kind of creators and content that will move it." },
      { title: "Creator Selection", text: "We shortlist and vet creators on fit, engagement quality and audience relevance — not just follower counts." },
      { title: "Brief & Production", text: "Clear briefs, timelines and approvals keep content on-message while letting each creator's voice come through." },
      { title: "Launch & Measure", text: "We coordinate go-live, amplify the best content and report on reach, engagement and results." },
    ],
    work: ["ponds", "zudo-app"],
  },
  "Branding & Design": {
    lead: "We shape identities",
    tail: "that are clear, distinctive and built to last.",
    body:
      "A brand is more than a logo. We define how your business looks and feels — from the core identity and logo to everyday marketing creatives — so every touchpoint is recognisably yours and works together as one system.",
    process: [
      { title: "Discovery", text: "We learn your business, audience and competitors to find what makes you genuinely different." },
      { title: "Concept", text: "Visual directions are explored and presented with clear reasoning behind every choice." },
      { title: "Identity System", text: "Logo, colour, typography and graphic language are refined into a flexible, cohesive system." },
      { title: "Guidelines & Rollout", text: "We deliver guidelines and ready-to-use assets so your brand stays consistent as it grows." },
    ],
    work: ["airblack", "ponds"],
  },
  "Web Development": {
    lead: "We build fast, conversion-focused websites",
    tail: "that give your brand a home to grow.",
    body:
      "Your website is often the first real conversation with a customer. We design and build business sites, landing pages and online stores that load fast, read clearly and turn visitors into enquiries and sales — then keep them secure and up to date.",
    process: [
      { title: "Plan", text: "We map goals, pages and user journeys, and agree on structure and content before any design starts." },
      { title: "Design", text: "Layouts and interactions are designed around your brand and the actions you want visitors to take." },
      { title: "Build", text: "We develop a fast, responsive, SEO-ready site, tested across devices and browsers." },
      { title: "Launch & Care", text: "We handle go-live, then provide updates, monitoring and maintenance to keep it performing." },
    ],
    work: ["smashed-agency", "zudo-app"],
  },
};

/* Wide hero banners (public/services/), keyed by title. A service without an
   entry falls back to its own image from SERVICES. */
const HERO_IMAGES: Record<string, string> = {
  "Creative Production": "/services/creativeproduction.webp",
  "AI Creative Studio": "/services/aicreativestudio.webp",
  "Social Media Management": "/services/socialmediamanagement.webp",
  "Performance Marketing": "/services/performancemarketing.webp",
  "Influencer Marketing": "/services/influencermarketing.webp",
  "Branding & Design": "/services/brandingdesign.png",
  "Web Development": "/services/webdevelopment.png",
};

export type ServicePage = Service & Detail & { slug: string; href: string; hero: string };

export const SERVICE_PAGES: ServicePage[] = SERVICES.map((s) => ({
  ...s,
  ...DETAILS[s.title],
  slug: serviceSlug(s.title),
  href: `/services/${serviceSlug(s.title)}`,
  hero: HERO_IMAGES[s.title] ?? s.image,
}));

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}

/** Hero banner for a service title — the service page hero and the desktop
    Services dropdown card use the same image. */
export function serviceHeroImage(title: string): string {
  return HERO_IMAGES[title] ?? SERVICES.find((s) => s.title === title)?.image ?? "";
}

/** Link for a service title — used by menus, cards and the directory. */
export function serviceHref(title: string): string {
  return `/services/${serviceSlug(title)}`;
}
