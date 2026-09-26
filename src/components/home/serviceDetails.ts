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
  /** Search title (the layout adds " | Zenkai Media"). */
  seoTitle: string;
  /** Meta description, ~150–160 characters. */
  seoDescription: string;
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
    seoTitle: "Creative & Video Production Agency",
    seoDescription:
      "Video production, photography and post-production for brands that need to look as good as they are. Concept to final cut, produced in-house by Zenkai Media.",
    lead: "Ideas, filmed and framed",
    tail: "with the care your brand deserves.",
    body:
      "Creative production is where strategy becomes something people can see. We concept, shoot and finish brand films, campaign video and photography in-house — from studio product work to on-location shoots — with our production team based in Ahmedabad and working with brands worldwide. One team, one standard, from the first frame to the final export.",
    process: [
      { title: "Brief & Concept", text: "Goals, audience and channels first — then a concept, script and shot list that everything else is built around." },
      { title: "Pre-Production", text: "Locations, talent, styling, lighting and schedules planned in detail, so shoot days run to plan." },
      { title: "Production", text: "Our crew captures photo and video on set or on location, directing every frame against the concept." },
      { title: "Post & Delivery", text: "Edit, colour, sound and retouching — exported and sized for every platform you publish on." },
    ],
    work: ["airblack", "ponds"],
  },
  "AI Creative Studio": {
    seoTitle: "AI Creative Studio — AI Video & Ad Production",
    seoDescription:
      "AI commercials, brand films, UGC and product ads — generative production guided by real creative direction. Premium AI video production by Zenkai Media.",
    lead: "AI-assisted production,",
    tail: "directed like a real shoot.",
    body:
      "Our AI Creative Studio pairs generative tools with the judgement of a production team. We create commercials, brand films, UGC-style content and product ads that feel crafted, not generated — with faster turnaround, more variations to test, and ideas that would be impractical or too costly to film. Every output is scripted, directed, edited and finished by people.",
    process: [
      { title: "Creative Direction", text: "Story, look and message are defined first, so every output serves an idea — not a prompt." },
      { title: "Generation", text: "Scenes, characters and product shots are generated and iterated against references and your brand guidelines." },
      { title: "Refinement", text: "Editors compose, grade, sound-design and polish every frame to a broadcast-ready finish." },
      { title: "Variations & Testing", text: "Multiple cuts and formats, so you can test hooks, angles and audiences across channels." },
    ],
    work: ["zudo-app", "ode-songs"],
  },
  "Social Media Management": {
    seoTitle: "Social Media Management Services",
    seoDescription:
      "Strategy, content, publishing and community management that keep your brand consistent and growing on social. Social media done properly, by Zenkai Media.",
    lead: "A social presence",
    tail: "people choose to follow.",
    body:
      "Social is where your audience spends its attention every day. We plan what your brand says, when it says it and how it looks — then produce, publish, engage and report, so your channels grow steadily instead of in bursts. Every post is made to feel like you, and to earn its place in the feed.",
    process: [
      { title: "Audit & Strategy", text: "Channels, competitors and audience reviewed to define pillars, tone and each platform’s role." },
      { title: "Content Calendar", text: "A monthly plan of formats, topics and timing, aligned with launches and the moments that matter." },
      { title: "Create & Publish", text: "Posts, reels and stories produced, captioned and scheduled — on brand and on time." },
      { title: "Engage & Report", text: "Comments and messages managed, performance tracked, and the plan refined every month." },
    ],
    work: ["zudo-app", "airblack"],
  },
  "Performance Marketing": {
    seoTitle: "Performance Marketing Agency — Meta & Google Ads",
    seoDescription:
      "Meta and Google Ads campaigns built on clean tracking, structured testing and creative that converts. Performance marketing measured in revenue, not reach.",
    lead: "Ad spend, turned into",
    tail: "measurable growth.",
    body:
      "Performance marketing works best when creative and data are built together. We plan, launch and optimise campaigns across Meta and Google — with reliable tracking, disciplined testing and ad creative made to convert — so every unit of spend is accountable to a result.",
    process: [
      { title: "Audit & Goals", text: "Accounts, tracking and numbers reviewed to set clear targets for cost, volume and return." },
      { title: "Campaign Build", text: "Audiences, structure, tracking and creative set up for clean data and scalable testing." },
      { title: "Launch & Test", text: "Campaigns go live with structured tests on audiences, hooks and offers to find what wins." },
      { title: "Optimise & Scale", text: "What underperforms is cut, what works is scaled, and results are reported transparently." },
    ],
    work: ["ponds", "airblack"],
  },
  "Influencer Marketing": {
    seoTitle: "Influencer Marketing Agency",
    seoDescription:
      "Creator partnerships that feel authentic and perform — strategy, creator selection, UGC and end-to-end campaign management by Zenkai Media.",
    lead: "Creators your audience",
    tail: "already trusts.",
    body:
      "The right creator introduces your brand more credibly than any ad. We find creators who genuinely fit, brief them clearly, manage every collaboration end to end and measure what it delivers — from UGC for your ads to multi-creator launch campaigns.",
    process: [
      { title: "Strategy", text: "The campaign goal, the audience, and the kind of creators and content that will move it." },
      { title: "Creator Selection", text: "Creators vetted on fit, engagement quality and audience relevance — not follower counts alone." },
      { title: "Brief & Production", text: "Clear briefs, timelines and approvals keep content on-message while each creator’s voice comes through." },
      { title: "Launch & Measure", text: "Go-live coordinated, the best content amplified, and reach, engagement and results reported." },
    ],
    work: ["ponds", "zudo-app"],
  },
  "Branding & Design": {
    seoTitle: "Branding & Design Agency — Brand Identity & Logo Design",
    seoDescription:
      "Brand identity, logo design and visual systems for businesses that want to be recognised. Strategy-led branding from Zenkai Media, Ahmedabad.",
    lead: "Identities that are clear,",
    tail: "distinctive and built to last.",
    body:
      "A brand is more than a logo. We define how your business looks, sounds and feels — from positioning and identity to the everyday creative that carries it — so every touchpoint is recognisably yours. Our branding team in Ahmedabad works with businesses across India and internationally, building systems that stay consistent as you grow.",
    process: [
      { title: "Discovery", text: "Your business, audience and competitors, studied to find what makes you genuinely different." },
      { title: "Concept", text: "Visual directions explored and presented with clear reasoning behind every choice." },
      { title: "Identity System", text: "Logo, colour, typography and graphic language refined into one flexible system." },
      { title: "Guidelines & Rollout", text: "Guidelines and ready-to-use assets, so the brand stays consistent wherever it appears." },
    ],
    work: ["airblack", "ponds"],
  },
  "Web Development": {
    seoTitle: "Web Development — Websites, E-commerce & Custom Software",
    seoDescription:
      "Fast, conversion-focused websites, e-commerce stores and custom business software — including AI-powered tools and automation. Built by Zenkai Media.",
    lead: "Websites and software",
    tail: "built around how you work.",
    body:
      "Your website is often the first real conversation with a customer. We design and build business websites, landing pages and online stores that load fast, read clearly and convert — and, for businesses with specific operational needs, custom software such as CRMs, internal tools, AI-powered dashboards and workflow automation, designed around the way you already work. Built by our team in Ahmedabad, for clients everywhere.",
    process: [
      { title: "Plan", text: "Goals, users and journeys mapped, with structure and content agreed before design begins." },
      { title: "Design", text: "Interfaces designed around your brand and the actions you want people to take." },
      { title: "Build", text: "Fast, responsive, SEO-ready development, tested across devices and browsers." },
      { title: "Launch & Care", text: "Go-live handled, then updates, monitoring and maintenance to keep it performing." },
    ],
    work: ["zudo-app", "ode-songs"],
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
  "Branding & Design": "/services/brandingdesign.webp",
  "Web Development": "/services/webdevelopment.webp",
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
