/* Per-sub-service page content for /services/<service>/<sub-service>. One
   entry per item in each service's `includes` list (services.tsx), keyed by
   that exact name. The hero banner and process steps come from the parent
   service (serviceDetails.ts). Edit the copy freely — the pages read
   everything from here. */
import { SERVICE_PAGES, serviceSlug, type ServicePage } from "./serviceDetails";

export type IncludedItem = { title: string; text: string };

type SubDetail = {
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
  /** "What's included" rows. */
  included: IncludedItem[];
};

const SUB_DETAILS: Record<string, SubDetail> = {
  /* ------------------------------------------------ Creative Production */
  "Video Editing": {
    seoTitle: "Video Editing Services for Brands",
    seoDescription:
      "Professional video editing for brands — story, pacing, colour, sound and motion, delivered ready for every platform. Short-form and long-form, by Zenkai Media.",
    lead: "Footage,",
    tail: "shaped into stories",
    body: "Editing is where footage becomes a story. We structure, pace, grade and mix every cut so it holds attention and carries one clear message — from brand films to short-form edits built for the first three seconds.",
    included: [
      { title: "Story & Structure", text: "Selects, sequencing and pacing built around one clear message." },
      { title: "Short-Form Edits", text: "Reels, Shorts and TikTok cuts with hooks that earn the next second." },
      { title: "Colour Grading", text: "A consistent, on-brand look across every shot and deliverable." },
      { title: "Sound & Music", text: "Clean dialogue, sound design, licensed music and a proper mix." },
      { title: "Motion & Subtitles", text: "Titles, graphics and captions that work with the sound off." },
    ],
  },
  Photography: {
    seoTitle: "Brand & Commercial Photography",
    seoDescription:
      "Brand, lifestyle and campaign photography planned around how the images will be used — art-directed, lit and retouched to a premium standard by Zenkai Media.",
    lead: "Images",
    tail: "that define your brand",
    body: "Brand, lifestyle and campaign photography planned around where each image will live. From concept and styling to lighting and retouching, every frame is shot to feel consistent — and unmistakably yours.",
    included: [
      { title: "Creative Direction", text: "Moodboards, styling and shot lists aligned with your brand." },
      { title: "Brand & Lifestyle", text: "People, places and moments that show your brand in real life." },
      { title: "Campaign Shoots", text: "Hero imagery for launches, advertising and seasonal campaigns." },
      { title: "Lighting & Set", text: "Studio or on-location setups controlled for a consistent look." },
      { title: "Retouching", text: "Colour and detail retouching, exported for every channel." },
    ],
  },
  Videography: {
    seoTitle: "Videography & Brand Film Production",
    seoDescription:
      "Brand films, campaign video and social content — concept, scripting, direction and filming by an experienced crew. Video production by Zenkai Media.",
    lead: "Video",
    tail: "made to move people",
    body: "End-to-end video production for brand films, campaigns and social content. We plan, direct and shoot with a crew sized to the project, capturing footage that cuts into something memorable.",
    included: [
      { title: "Concept & Scripting", text: "Ideas, scripts and storyboards built around your objective." },
      { title: "Pre-Production", text: "Locations, talent, schedules and permissions planned in detail." },
      { title: "Direction & Filming", text: "Cinema cameras, lighting and sound handled by an experienced crew." },
      { title: "Brand Films", text: "Longer stories that show who you are and why it matters." },
      { title: "Social Cutdowns", text: "Vertical and short-form versions captured on the same shoot." },
    ],
  },
  "Product Shoots": {
    seoTitle: "Product Photography & Video for E-commerce",
    seoDescription:
      "Product photography and video that make details, textures and materials impossible to ignore — built for e-commerce, marketplaces and ads by Zenkai Media.",
    lead: "Products,",
    tail: "shown at their best",
    body: "Product photography and video that make details, textures and finishes impossible to ignore. Built for e-commerce listings, advertising and launches, with one consistent look across your entire catalogue.",
    included: [
      { title: "Packshots", text: "Clean, consistent catalogue images for stores and marketplaces." },
      { title: "Styled Product Scenes", text: "Props, surfaces and set design that give products context." },
      { title: "Macro & Detail", text: "Close-ups that show texture, finish and craftsmanship." },
      { title: "Product Video", text: "Loops and demos for product pages, ads and social." },
      { title: "Marketplace Ready", text: "Exports sized and formatted to each platform’s requirements." },
    ],
  },
  "Corporate Shoots": {
    seoTitle: "Corporate Photography & Video",
    seoDescription:
      "Corporate photo and video for teams, offices, leadership and events — polished, credible and human. Corporate shoots by Zenkai Media.",
    lead: "Your company,",
    tail: "presented with confidence",
    body: "Photo and video for teams, workplaces, leadership and events. We capture the people and culture behind your business in a way that feels credible, polished and human.",
    included: [
      { title: "Team & Headshots", text: "Consistent portraits for websites, profiles and press." },
      { title: "Office & Culture", text: "Workspaces and everyday moments that show how you work." },
      { title: "Events & Conferences", text: "Coverage of launches, talks and gatherings, delivered fast." },
      { title: "Leadership Interviews", text: "Well-lit, well-recorded interviews for brand and hiring content." },
      { title: "Employer Brand", text: "Photo and video that help you attract the right people." },
    ],
  },

  /* ------------------------------------------------- AI Creative Studio */
  "AI Commercials": {
    seoTitle: "AI Commercials & AI Ad Film Production",
    seoDescription:
      "Broadcast-quality commercials produced with generative AI and finished by real editors — bigger ideas, faster turnaround and more variations. By Zenkai Media.",
    lead: "Commercials,",
    tail: "without production limits",
    body: "Broadcast-quality commercials produced with generative AI and finished by our editors. Impossible locations, bigger ideas and multiple variations — in a fraction of the time and cost of a traditional shoot.",
    included: [
      { title: "Concept & Script", text: "A clear idea and script written for the format and channel." },
      { title: "AI Scene Generation", text: "Environments, characters and shots generated to a defined look." },
      { title: "Voice & Music", text: "Voiceover, sound design and music matched to the story." },
      { title: "Edit & Finishing", text: "Compositing, grading and polish to a broadcast-ready finish." },
      { title: "Format Variations", text: "Cuts for TV, YouTube, social and every aspect ratio." },
    ],
  },
  "AI Brand Films": {
    seoTitle: "AI Brand Films",
    seoDescription:
      "Cinematic brand films created with AI and guided by real creative direction — for launches, manifestos and moments that deserve more than a post.",
    lead: "Brand stories,",
    tail: "told at cinematic scale",
    body: "Longer-form films that express your brand’s vision and values, created with AI and shaped by real creative direction. Made for launches, manifestos and moments that deserve more than a post.",
    included: [
      { title: "Narrative Development", text: "The story, tone and structure behind the film." },
      { title: "Visual World", text: "A consistent look built from references and your identity." },
      { title: "Generation & Direction", text: "Scenes generated and directed shot by shot." },
      { title: "Sound & Score", text: "Music, voice and sound design that carry the emotion." },
      { title: "Launch Edits", text: "The hero film plus teasers and cutdowns for rollout." },
    ],
  },
  "AI UGC": {
    seoTitle: "AI UGC Video Ads",
    seoDescription:
      "Creator-style UGC ads produced with AI avatars and voices — test hooks and angles fast, then scale what performs. AI UGC production by Zenkai Media.",
    lead: "UGC-style ads,",
    tail: "at the speed of testing",
    body: "Authentic, creator-style video produced with AI presenters and voices. Test hooks, scripts and angles quickly, then scale the ones that perform — without waiting on creator availability.",
    included: [
      { title: "Hook & Script Writing", text: "Multiple openings and angles written for performance." },
      { title: "AI Presenters & Voices", text: "Presenters and voices chosen to match your audience." },
      { title: "Product Integration", text: "Your product shown naturally within every video." },
      { title: "Rapid Variations", text: "Many versions produced quickly for structured testing." },
      { title: "Ad-Ready Delivery", text: "Captioned and sized for Meta, TikTok and YouTube." },
    ],
  },
  "AI Product Ads": {
    seoTitle: "AI Product Ads & Product Video",
    seoDescription:
      "Scroll-stopping product ads made with AI from your existing photos and footage — new scenes and motion for every campaign, in days rather than weeks.",
    lead: "Product ads,",
    tail: "built to convert",
    body: "Scroll-stopping product ads created from your existing images and footage with AI. New scenes, backgrounds and motion for every campaign, season and audience — produced in days, not weeks.",
    included: [
      { title: "Scene Generation", text: "Your product placed in new, on-brand environments." },
      { title: "Motion & Animation", text: "Still shots turned into dynamic, attention-grabbing video." },
      { title: "Seasonal Campaigns", text: "Fresh creative for sales, festivals and launches." },
      { title: "Copy & Offers", text: "Headlines and offers layered in for performance." },
      { title: "Creative Testing Sets", text: "Variations designed to find the winning ad quickly." },
    ],
  },

  /* -------------------------------------------- Social Media Management */
  "Content Strategy": {
    seoTitle: "Social Media Content Strategy",
    seoDescription:
      "A clear social content strategy — audience, pillars, formats and tone — so every post builds recognition and moves people to act. By Zenkai Media.",
    lead: "Strategy",
    tail: "behind every post",
    body: "A clear plan for what your brand says on social, to whom and why. We define the pillars, formats and tone that build recognition and move people toward action.",
    included: [
      { title: "Audience Research", text: "Who you are speaking to, and what they care about." },
      { title: "Competitor Audit", text: "What works in your category, and where the gaps are." },
      { title: "Content Pillars", text: "The themes your brand will own, consistently." },
      { title: "Tone & Formats", text: "Voice, visual style and the right formats for each platform." },
      { title: "Goals & KPIs", text: "Measurable targets tied to business objectives." },
    ],
  },
  "Content Planning": {
    seoTitle: "Social Media Content Planning & Calendars",
    seoDescription:
      "Monthly social media content calendars that turn strategy into a steady flow of on-brand posts, timed around launches and campaigns.",
    lead: "Consistency,",
    tail: "planned in advance",
    body: "Monthly content calendars that turn strategy into a steady rhythm of posts. Every idea is scheduled around launches, campaigns and cultural moments — so nothing is last-minute.",
    included: [
      { title: "Monthly Calendars", text: "A clear plan of posts, formats and dates each month." },
      { title: "Campaign Alignment", text: "Content timed with launches, sales and events." },
      { title: "Trend Monitoring", text: "Relevant trends and moments added where they fit." },
      { title: "Briefs & Scripts", text: "Production-ready briefs for every post and reel." },
      { title: "Approval Workflow", text: "Simple reviews, so content is signed off on time." },
    ],
  },
  "Content Publishing": {
    seoTitle: "Social Media Content Creation & Publishing",
    seoDescription:
      "Posts, carousels and reels produced, captioned and scheduled across platforms — keeping your channels active and on-brand. By Zenkai Media.",
    lead: "Publishing,",
    tail: "on time, every time",
    body: "We produce, caption and schedule your content across platforms, tailored to each one. Your channels stay active and on-brand — without taking up your team’s time.",
    included: [
      { title: "Post & Reel Production", text: "Designed posts, carousels and edited reels." },
      { title: "Captions & Hashtags", text: "Copy written for reach, clarity and engagement." },
      { title: "Scheduling", text: "Published when your audience is most active." },
      { title: "Platform Optimisation", text: "Sizes, covers and formats tailored to each channel." },
      { title: "Monthly Reporting", text: "What went out, how it performed and what comes next." },
    ],
  },
  "Community Management": {
    seoTitle: "Community Management Services",
    seoDescription:
      "Comments and messages managed in your brand’s voice — fast, thoughtful replies that turn followers into a loyal community. By Zenkai Media.",
    lead: "Conversations",
    tail: "that build loyalty",
    body: "We manage comments and messages in your brand’s voice, respond quickly and turn followers into a community. Every interaction is a chance to build trust.",
    included: [
      { title: "Comment Moderation", text: "Timely, on-brand replies across your channels." },
      { title: "DM Management", text: "Enquiries answered and routed to the right team." },
      { title: "Engagement Growth", text: "Proactive interaction with your audience and niche." },
      { title: "Reputation Monitoring", text: "Mentions and sentiment tracked, issues flagged early." },
      { title: "Insight Reports", text: "What your audience is asking for and talking about." },
    ],
  },

  /* ---------------------------------------------- Performance Marketing */
  "Meta Ads": {
    seoTitle: "Meta Ads Agency — Facebook & Instagram Advertising",
    seoDescription:
      "Facebook and Instagram ads built on clean tracking, structured testing and strong creative — find what converts, then scale it. Meta Ads by Zenkai Media.",
    lead: "Meta campaigns",
    tail: "that scale profitably",
    body: "Facebook and Instagram advertising built on clean tracking, structured testing and creative that earns attention. We find the audiences, messages and offers that convert — then scale them efficiently.",
    included: [
      { title: "Account & Pixel Setup", text: "Pixel, Conversions API and events configured correctly." },
      { title: "Audience Strategy", text: "Prospecting, retargeting and lookalike structures." },
      { title: "Ad Creative", text: "Static, video and UGC-style ads designed to convert." },
      { title: "Testing Framework", text: "Structured tests on hooks, angles and offers." },
      { title: "Scaling & Reporting", text: "Budgets scaled on data, reported transparently." },
    ],
  },
  "Google Ads": {
    seoTitle: "Google Ads Management — Search, PMax & YouTube",
    seoDescription:
      "Search, Performance Max, Shopping and YouTube campaigns that reach people when they are actively looking — with controlled spend and real conversions.",
    lead: "High-intent traffic,",
    tail: "captured at the right moment",
    body: "Search, Performance Max, Shopping and YouTube campaigns that reach people when they are actively looking. We control spend, sharpen targeting and optimise for real conversions — not clicks.",
    included: [
      { title: "Search Campaigns", text: "Keyword research, ad copy and bid strategy." },
      { title: "Performance Max", text: "Asset groups and signals set up for quality results." },
      { title: "Shopping Ads", text: "Product feeds optimised for visibility and return." },
      { title: "YouTube Ads", text: "Video campaigns for awareness and remarketing." },
      { title: "Conversion Tracking", text: "GA4 and Google Ads tracking you can trust." },
    ],
  },
  "Lead Generation": {
    seoTitle: "Lead Generation Campaigns",
    seoDescription:
      "Lead generation campaigns and funnels that bring in enquiries your sales team actually wants — optimised for lead quality, not just volume.",
    lead: "Qualified leads,",
    tail: "not just more leads",
    body: "Campaigns and funnels designed to bring in enquiries your sales team wants. We optimise for lead quality, cost per lead and how quickly each lead reaches you.",
    included: [
      { title: "Funnel Strategy", text: "Offers and journeys matched to your sales process." },
      { title: "Landing Pages", text: "Focused pages built to turn visitors into enquiries." },
      { title: "Lead Forms", text: "Qualifying questions that filter for quality." },
      { title: "CRM Integration", text: "Leads delivered instantly to your CRM, sheet or inbox." },
      { title: "Lead Quality Optimisation", text: "Feedback loops that train campaigns on good leads." },
    ],
  },
  "E-commerce Advertising": {
    seoTitle: "E-commerce Advertising for D2C Brands",
    seoDescription:
      "Full-funnel paid media for e-commerce and D2C brands — catalogue ads, conversion creative and ROAS-focused optimisation from first click to repeat purchase.",
    lead: "Online stores,",
    tail: "grown through paid media",
    body: "Full-funnel advertising for e-commerce and D2C brands, from first click to repeat purchase. We connect catalogue, creative and data to grow revenue at a return that makes sense.",
    included: [
      { title: "Catalogue & Dynamic Ads", text: "Product feeds powering personalised ads at scale." },
      { title: "Full-Funnel Structure", text: "Prospecting, retargeting and retention working together." },
      { title: "Creative for Conversion", text: "Product-led ads built to drive purchases." },
      { title: "ROAS Optimisation", text: "Budgets and bids managed against profitable returns." },
      { title: "Sale & Launch Campaigns", text: "Planned pushes for launches and peak seasons." },
    ],
  },

  /* ----------------------------------------------- Influencer Marketing */
  "Influencer Campaigns": {
    seoTitle: "Influencer Marketing Campaigns",
    seoDescription:
      "End-to-end influencer campaigns — strategy, the right creator mix, coordinated launches and clear reporting on reach and results. By Zenkai Media.",
    lead: "Campaigns,",
    tail: "powered by creators",
    body: "End-to-end influencer campaigns that put your brand in front of engaged audiences. We shape the idea, choose the right creators and coordinate everything through to results.",
    included: [
      { title: "Campaign Strategy", text: "Goals, concept and the right mix of creators." },
      { title: "Creator Mix", text: "Macro, micro and nano creators balanced for reach and trust." },
      { title: "Content Coordination", text: "Briefs, timelines and approvals handled for you." },
      { title: "Launch Management", text: "Coordinated go-live across creators and platforms." },
      { title: "Performance Reporting", text: "Reach, engagement and conversions measured clearly." },
    ],
  },
  "Creator Outreach": {
    seoTitle: "Creator Outreach & Influencer Sourcing",
    seoDescription:
      "Research, vetting and outreach to creators who genuinely fit your brand — with fair terms and partnerships built on relevance, not follower counts.",
    lead: "The right creators,",
    tail: "reached the right way",
    body: "We research, vet and approach creators who genuinely fit your brand, then agree fair terms. You get partnerships built on relevance — not follower counts alone.",
    included: [
      { title: "Creator Research", text: "Shortlists built around your audience and niche." },
      { title: "Audience Vetting", text: "Engagement quality and audience authenticity checked." },
      { title: "Outreach & Pitching", text: "Personal, professional approaches on your behalf." },
      { title: "Negotiation", text: "Fees, deliverables and usage rights agreed clearly." },
      { title: "Relationship Building", text: "Long-term partnerships with creators who perform." },
    ],
  },
  "UGC Collaborations": {
    seoTitle: "UGC Content Creation",
    seoDescription:
      "User-generated content from real creators for your ads, website and social — authentic video and photos that build trust and outperform polished ads.",
    lead: "Real content,",
    tail: "from real people",
    body: "User-generated content from creators, made for your ads, website and social channels. Relatable video and photography that builds trust — and often outperforms polished ads.",
    included: [
      { title: "Creator Matching", text: "UGC creators chosen for style, voice and audience." },
      { title: "Briefs & Scripts", text: "Clear direction that still leaves room for authenticity." },
      { title: "Product Seeding", text: "Products shipped and tracked to every creator." },
      { title: "Content Review", text: "Quality checks and revisions before delivery." },
      { title: "Usage Rights", text: "Rights secured so content can run in your ads." },
    ],
  },
  "Campaign Management": {
    seoTitle: "Influencer Campaign Management",
    seoDescription:
      "Contracts, timelines, approvals, payments and reporting — the operations behind influencer marketing, managed end to end by Zenkai Media.",
    lead: "Every detail,",
    tail: "managed end to end",
    body: "We run the operations behind influencer marketing — contracts, timelines, approvals, payments and reporting — so campaigns stay on schedule and on message.",
    included: [
      { title: "Timelines & Deliverables", text: "Clear schedules for every creator and post." },
      { title: "Contracts & Payments", text: "Agreements and payouts handled professionally." },
      { title: "Content Approvals", text: "Every post checked for brand fit and compliance." },
      { title: "Amplification", text: "Top-performing content boosted with paid media." },
      { title: "Results & Insights", text: "Campaign reports with learnings for the next one." },
    ],
  },

  /* -------------------------------------------------- Branding & Design */
  "Brand Identity": {
    seoTitle: "Brand Identity Design",
    seoDescription:
      "Complete brand identity systems — positioning, logo, colour, typography and guidelines — that set you apart and stay consistent everywhere. By Zenkai Media.",
    lead: "Identity,",
    tail: "with purpose",
    body: "A complete identity that expresses who you are and sets you apart. We build one cohesive system — from positioning and logo to colour and typography — that works across every touchpoint.",
    included: [
      { title: "Brand Discovery", text: "Workshops and research into your business and audience." },
      { title: "Positioning & Voice", text: "What you stand for, and how you sound." },
      { title: "Visual Identity System", text: "Logo, colour, typography and graphic elements." },
      { title: "Brand Applications", text: "Stationery, social, signage and packaging." },
      { title: "Brand Guidelines", text: "Clear rules that keep the brand consistent." },
    ],
  },
  "Logo Design": {
    seoTitle: "Logo Design Services",
    seoDescription:
      "Distinctive, meaningful logos designed to work at every size — from favicon to billboard — with all the variations and files you need. By Zenkai Media.",
    lead: "A mark",
    tail: "worth remembering",
    body: "Distinctive logos designed to be simple, meaningful and versatile. Every mark is tested at every size and in every context, so it works as well on a phone screen as on a billboard.",
    included: [
      { title: "Research & Concepts", text: "Multiple directions explored around your story." },
      { title: "Logo Refinement", text: "Proportions, spacing and details perfected." },
      { title: "Logo Variations", text: "Primary, secondary, icon and monochrome versions." },
      { title: "Scalability Testing", text: "Checked for clarity from favicon to signage." },
      { title: "Final Files", text: "Vector, print and digital formats, ready to use." },
    ],
  },
  "Graphic Design": {
    seoTitle: "Graphic Design Services",
    seoDescription:
      "Print and digital graphic design — brochures, decks, packaging and more — that carries your brand with clarity and consistency. By Zenkai Media.",
    lead: "Design",
    tail: "that communicates clearly",
    body: "Print and digital design that carries your brand with clarity and consistency. From brochures to pitch decks, every piece is designed to inform, persuade and look the part.",
    included: [
      { title: "Print Collateral", text: "Brochures, flyers, catalogues and stationery." },
      { title: "Presentations", text: "Pitch decks and company profiles that persuade." },
      { title: "Packaging Design", text: "Packaging that stands out on shelf and on screen." },
      { title: "Infographics", text: "Complex information made simple and visual." },
      { title: "Event & Signage", text: "Banners, standees and environmental graphics." },
    ],
  },
  "Marketing Creatives": {
    seoTitle: "Marketing Creatives & Ad Design",
    seoDescription:
      "On-brand ad creatives, social posts, banners and campaign visuals — delivered fast and made to be tested, so marketing never waits on design.",
    lead: "Creatives,",
    tail: "built for performance",
    body: "Everyday marketing assets for ads, social, email and campaigns. Designed on-brand, delivered quickly and made to be tested — so your marketing never waits on design.",
    included: [
      { title: "Ad Creatives", text: "Static and motion ads for Meta, Google and more." },
      { title: "Social Media Posts", text: "Posts, carousels and stories in your brand style." },
      { title: "Email & Web Banners", text: "Headers and banners for campaigns and promotions." },
      { title: "Campaign Key Visuals", text: "One central look, adapted across every format." },
      { title: "Creative Variations", text: "Multiple versions ready for A/B testing." },
    ],
  },

  /* --------------------------------------------------- Web Development */
  "Business Websites": {
    seoTitle: "Business Website Design & Development",
    seoDescription:
      "Fast, responsive business websites that explain what you do and turn visitors into enquiries — designed around your brand and easy to update.",
    lead: "Websites",
    tail: "that work as hard as you do",
    body: "Fast, responsive websites that explain what you do and turn visitors into enquiries. Designed around your brand, engineered for performance and search, and easy for your team to update.",
    included: [
      { title: "Strategy & Sitemap", text: "Pages, content and user journeys planned upfront." },
      { title: "UI/UX Design", text: "Layouts designed around your brand and goals." },
      { title: "Responsive Development", text: "Built to look and work perfectly on every device." },
      { title: "CMS Integration", text: "Edit pages and content without touching code." },
      { title: "SEO Foundations", text: "Speed, structure and metadata ready for search." },
    ],
  },
  "Landing Pages": {
    seoTitle: "High-Converting Landing Pages",
    seoDescription:
      "Landing pages for campaigns, launches and lead generation — focused messaging, fast load times and one clear call to action, tested to convert.",
    lead: "Pages",
    tail: "with one clear goal",
    body: "Landing pages for campaigns, launches and lead generation. Focused messaging, fast load times and one clear call to action — built and tested around a single objective.",
    included: [
      { title: "Conversion Copy", text: "Messaging structured to persuade and convert." },
      { title: "Focused Design", text: "Layouts that guide visitors toward one action." },
      { title: "Fast Performance", text: "Lightweight pages that load in an instant." },
      { title: "Forms & Integrations", text: "Leads sent straight to your CRM or inbox." },
      { title: "A/B Testing", text: "Variants tested to keep improving results." },
    ],
  },
  "E-commerce Stores": {
    seoTitle: "E-commerce Website Development — Shopify & Custom",
    seoDescription:
      "Online stores on Shopify and custom platforms, designed for smooth shopping and strong conversion — from catalogue setup to payments and launch.",
    lead: "Stores,",
    tail: "built to sell",
    body: "Online stores on Shopify and custom platforms, designed for smooth shopping and strong conversion. We handle design, development, payments and integrations — from the first product to launch day.",
    included: [
      { title: "Store Design", text: "Product, collection and cart pages designed to convert." },
      { title: "Shopify Development", text: "Custom themes, sections and app setup." },
      { title: "Catalogue Setup", text: "Products, variants and collections organised." },
      { title: "Payments & Shipping", text: "Gateways, taxes and delivery configured correctly." },
      { title: "Integrations", text: "Inventory, marketing and analytics tools connected." },
    ],
  },
  "Website Maintenance": {
    seoTitle: "Website Maintenance & Support",
    seoDescription:
      "Ongoing website care — updates, security, backups, performance and content changes — so your site stays fast, secure and up to date.",
    lead: "Your website,",
    tail: "kept fast and secure",
    body: "Ongoing care that keeps your website updated, protected and performing. We handle updates, backups, fixes and improvements — so you can focus on your business.",
    included: [
      { title: "Updates & Patches", text: "Platform, theme and plugin updates handled safely." },
      { title: "Security Monitoring", text: "Threats watched and blocked before they cause harm." },
      { title: "Backups", text: "Regular backups, with quick restores when needed." },
      { title: "Performance Tuning", text: "Speed checks and optimisation over time." },
      { title: "Content Updates", text: "Text, image and page changes on request." },
    ],
  },
};

export type SubServicePage = SubDetail & {
  title: string;
  slug: string;
  href: string;
  parent: ServicePage;
};

export const SUB_SERVICE_PAGES: SubServicePage[] = SERVICE_PAGES.flatMap((parent) =>
  parent.includes.map((title) => ({
    ...SUB_DETAILS[title],
    title,
    slug: serviceSlug(title),
    href: `${parent.href}/${serviceSlug(title)}`,
    parent,
  }))
);

export function getSubServicePage(service: string, sub: string): SubServicePage | undefined {
  return SUB_SERVICE_PAGES.find((p) => p.parent.slug === service && p.slug === sub);
}

/** Link for a sub-service: /services/<service>/<sub-service>. */
export function subServiceHref(serviceTitle: string, item: string): string {
  return `/services/${serviceSlug(serviceTitle)}/${serviceSlug(item)}`;
}
