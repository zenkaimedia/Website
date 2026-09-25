/* Per-sub-service page content for /services/<service>/<sub-service>. One
   entry per item in each service's `includes` list (services.tsx), keyed by
   that exact name. The hero banner and process steps come from the parent
   service (serviceDetails.ts). Edit the copy freely — the pages read
   everything from here. */
import { SERVICE_PAGES, serviceSlug, type ServicePage } from "./serviceDetails";

export type IncludedItem = { title: string; text: string };

type SubDetail = {
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
    lead: "Footage",
    tail: "shaped into stories",
    body: "Editing that turns raw footage into clear, paced and platform-ready video. We handle structure, rhythm, colour and sound so every cut holds attention and carries your message.",
    included: [
      { title: "Story & Structure", text: "Selects, sequencing and pacing built around one clear message." },
      { title: "Short-Form Edits", text: "Reels, Shorts and TikTok cuts with strong hooks in the first seconds." },
      { title: "Colour Grading", text: "Consistent, on-brand colour across every shot and deliverable." },
      { title: "Sound & Music", text: "Clean dialogue, sound design, licensed music and mixing." },
      { title: "Motion & Subtitles", text: "Titles, graphics and captions that work with the sound off." },
    ],
  },
  Photography: {
    lead: "Images",
    tail: "that define your brand",
    body: "Brand, lifestyle and campaign photography planned around how the images will be used. From concept and styling to retouching, every frame is shot to feel consistent and unmistakably yours.",
    included: [
      { title: "Creative Direction", text: "Moodboards, styling and shot lists aligned with your brand." },
      { title: "Brand & Lifestyle", text: "People, places and moments that show your brand in real life." },
      { title: "Campaign Shoots", text: "Hero imagery for launches, ads and seasonal campaigns." },
      { title: "Lighting & Set", text: "Studio or on-location setups controlled for a consistent look." },
      { title: "Retouching", text: "Colour correction and detailed retouching, exported for every channel." },
    ],
  },
  Videography: {
    lead: "Video",
    tail: "made to move people",
    body: "End-to-end video production for brand films, social content and campaigns. We plan, direct and shoot with a crew sized to the project, capturing footage that edits into something memorable.",
    included: [
      { title: "Concept & Scripting", text: "Ideas, scripts and storyboards built around your objective." },
      { title: "Pre-Production", text: "Locations, talent, schedules and permissions planned in detail." },
      { title: "Direction & Filming", text: "Cinema cameras, lighting and audio handled by an experienced crew." },
      { title: "Brand Films", text: "Longer stories that explain who you are and why it matters." },
      { title: "Social Cutdowns", text: "Vertical and short-form versions captured on the same shoot." },
    ],
  },
  "Product Shoots": {
    lead: "Products",
    tail: "shown at their best",
    body: "Product photography and video that make details, textures and materials impossible to ignore. Built for eCommerce listings, ads and launches, with a consistent look across your whole catalogue.",
    included: [
      { title: "Packshots", text: "Clean, consistent catalogue images for stores and marketplaces." },
      { title: "Styled Product Scenes", text: "Props, surfaces and set design that give products context." },
      { title: "Macro & Detail", text: "Close-ups that show texture, finish and craftsmanship." },
      { title: "Product Video", text: "Short loops and demos for product pages, ads and social." },
      { title: "Marketplace Ready", text: "Exports sized and formatted to each platform’s requirements." },
    ],
  },
  "Corporate Shoots": {
    lead: "Your company",
    tail: "presented with confidence",
    body: "Professional photo and video for teams, offices, events and leadership. We capture the people and culture behind your business in a way that feels credible, polished and human.",
    included: [
      { title: "Team & Headshots", text: "Consistent portraits for websites, profiles and press." },
      { title: "Office & Culture", text: "Workspaces and everyday moments that show how you work." },
      { title: "Events & Conferences", text: "Coverage of launches, talks and gatherings, delivered fast." },
      { title: "Leadership Interviews", text: "Well-lit, well-recorded interviews for brand and hiring content." },
      { title: "Hiring Content", text: "Employer-brand photo and video that attracts the right people." },
    ],
  },

  /* ------------------------------------------------- AI Creative Studio */
  "AI Commercials": {
    lead: "Commercials",
    tail: "without the production limits",
    body: "Broadcast-quality commercials produced with generative AI and finished by our editors. Big ideas, impossible locations and multiple variations — at a fraction of traditional production time and cost.",
    included: [
      { title: "Concept & Script", text: "A clear idea and script written for the format and channel." },
      { title: "AI Scene Generation", text: "Environments, characters and shots generated to a defined look." },
      { title: "Voice & Music", text: "Voiceover, sound design and music matched to the story." },
      { title: "Edit & Finishing", text: "Compositing, grading and polish until it is broadcast-ready." },
      { title: "Format Variations", text: "Cuts for TV, YouTube, social and every aspect ratio." },
    ],
  },
  "AI Brand Films": {
    lead: "Brand stories",
    tail: "told at cinematic scale",
    body: "Longer-form films that express your brand’s vision and values, created with AI and guided by real creative direction. Ideal for launches, manifestos and moments that deserve more than a post.",
    included: [
      { title: "Narrative Development", text: "The story, tone and structure behind the film." },
      { title: "Visual World", text: "A consistent look built from references and your brand identity." },
      { title: "Generation & Direction", text: "Scenes generated and iterated shot by shot." },
      { title: "Sound & Score", text: "Music, voice and sound design that carry the emotion." },
      { title: "Launch Edits", text: "Hero film plus teasers and cutdowns for rollout." },
    ],
  },
  "AI UGC": {
    lead: "UGC-style content",
    tail: "at the speed of testing",
    body: "Authentic-looking, creator-style videos produced with AI avatars and voices. Test hooks, scripts and angles quickly, then scale what performs — without waiting on creator availability.",
    included: [
      { title: "Hook & Script Writing", text: "Multiple openings and angles written for performance." },
      { title: "AI Avatars & Voices", text: "Presenters and voices chosen to match your audience." },
      { title: "Product Integration", text: "Your product shown naturally within each video." },
      { title: "Rapid Variations", text: "Many versions produced quickly for structured testing." },
      { title: "Ad-Ready Delivery", text: "Captioned, sized and exported for Meta, TikTok and YouTube." },
    ],
  },
  "AI Product Ads": {
    lead: "Product ads",
    tail: "built to convert",
    body: "Scroll-stopping product ads created from your existing images and footage using AI. New scenes, backgrounds and motion for every campaign, season and audience — produced in days, not weeks.",
    included: [
      { title: "Scene Generation", text: "Your product placed in new, on-brand environments." },
      { title: "Motion & Animation", text: "Static shots turned into dynamic, eye-catching video." },
      { title: "Seasonal Campaigns", text: "Fresh creative for sales, festivals and launches." },
      { title: "Copy & Offers", text: "Headlines and offers layered in for performance." },
      { title: "Creative Testing Sets", text: "Variations designed to find the winning ad fast." },
    ],
  },

  /* -------------------------------------------- Social Media Management */
  "Content Strategy": {
    lead: "Strategy",
    tail: "behind every post",
    body: "A clear plan for what your brand says on social, to whom and why. We define pillars, formats and tone so your content builds recognition and moves people toward action.",
    included: [
      { title: "Audience Research", text: "Who you are talking to and what they care about." },
      { title: "Competitor Audit", text: "What works in your category and where the gaps are." },
      { title: "Content Pillars", text: "The themes your brand will own, consistently." },
      { title: "Tone & Formats", text: "Voice, visual style and the formats that fit each platform." },
      { title: "Goals & KPIs", text: "Measurable targets tied to your business objectives." },
    ],
  },
  "Content Planning": {
    lead: "Consistency",
    tail: "planned in advance",
    body: "Monthly content calendars that turn strategy into a steady flow of posts. Every idea is scheduled around launches, campaigns and cultural moments, so nothing is last-minute.",
    included: [
      { title: "Monthly Calendars", text: "A clear plan of posts, formats and dates each month." },
      { title: "Campaign Alignment", text: "Content timed with launches, sales and events." },
      { title: "Trend Monitoring", text: "Relevant trends and moments added where they fit." },
      { title: "Briefs & Scripts", text: "Ready-to-produce briefs for every post and reel." },
      { title: "Approval Workflow", text: "Simple reviews so content is signed off on time." },
    ],
  },
  "Content Publishing": {
    lead: "Publishing",
    tail: "on time, every time",
    body: "We produce, caption and schedule your content across platforms, optimised for each one. Your channels stay active and on-brand without taking up your team’s time.",
    included: [
      { title: "Post & Reel Production", text: "Designed posts, carousels and edited reels." },
      { title: "Captions & Hashtags", text: "Copy written for reach, clarity and engagement." },
      { title: "Scheduling", text: "Posts published at the times your audience is active." },
      { title: "Platform Optimisation", text: "Sizes, covers and formats tailored to each channel." },
      { title: "Monthly Reporting", text: "What was published, how it performed and what’s next." },
    ],
  },
  "Community Management": {
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
    lead: "Meta campaigns",
    tail: "that scale profitably",
    body: "Facebook and Instagram advertising built on clean tracking, structured testing and strong creative. We find the audiences, messages and offers that convert, then scale them efficiently.",
    included: [
      { title: "Account & Pixel Setup", text: "Pixel, Conversions API and events configured correctly." },
      { title: "Audience Strategy", text: "Prospecting, retargeting and lookalike structures." },
      { title: "Ad Creative", text: "Static, video and UGC-style ads designed to convert." },
      { title: "Testing Framework", text: "Structured tests on hooks, angles and offers." },
      { title: "Scaling & Reporting", text: "Budgets scaled on data, reported transparently." },
    ],
  },
  "Google Ads": {
    lead: "High-intent traffic",
    tail: "captured at the right moment",
    body: "Search, Performance Max, Shopping and YouTube campaigns that reach people when they are actively looking. We control spend, sharpen targeting and optimise for real conversions.",
    included: [
      { title: "Search Campaigns", text: "Keyword research, ad copy and bid strategy." },
      { title: "Performance Max", text: "Asset groups and signals set up for quality results." },
      { title: "Shopping Ads", text: "Product feeds optimised for visibility and ROAS." },
      { title: "YouTube Ads", text: "Video campaigns for awareness and remarketing." },
      { title: "Conversion Tracking", text: "GA4 and Google Ads tracking you can trust." },
    ],
  },
  "Lead Generation": {
    lead: "Qualified leads",
    tail: "not just more leads",
    body: "Campaigns and funnels designed to bring in enquiries your sales team actually wants. We optimise for lead quality, cost per lead and the speed at which leads reach you.",
    included: [
      { title: "Funnel Strategy", text: "Offers and journeys matched to your sales process." },
      { title: "Landing Pages", text: "Focused pages built to convert visitors into enquiries." },
      { title: "Lead Forms", text: "Instant forms and qualifying questions that filter quality." },
      { title: "CRM Integration", text: "Leads delivered instantly to your CRM, sheet or inbox." },
      { title: "Lead Quality Optimisation", text: "Feedback loops that train campaigns on good leads." },
    ],
  },
  "E-commerce Advertising": {
    lead: "Online stores",
    tail: "grown through paid media",
    body: "Full-funnel advertising for eCommerce brands, from first click to repeat purchase. We connect catalogue, creative and data to grow revenue at a return that makes sense.",
    included: [
      { title: "Catalogue & Dynamic Ads", text: "Product feeds powering personalised ads at scale." },
      { title: "Full-Funnel Structure", text: "Prospecting, retargeting and retention working together." },
      { title: "Creative for Conversion", text: "Product-focused ads built to drive purchases." },
      { title: "ROAS Optimisation", text: "Budgets and bids managed against profitable returns." },
      { title: "Sale & Launch Campaigns", text: "Planned pushes for launches and peak seasons." },
    ],
  },

  /* ----------------------------------------------- Influencer Marketing */
  "Influencer Campaigns": {
    lead: "Campaigns",
    tail: "powered by creators",
    body: "End-to-end influencer campaigns that put your brand in front of engaged audiences. We plan the idea, choose the right creators and coordinate everything through to results.",
    included: [
      { title: "Campaign Strategy", text: "Goals, concept and the right mix of creators." },
      { title: "Creator Mix", text: "Macro, micro and nano creators balanced for reach and trust." },
      { title: "Content Coordination", text: "Briefs, timelines and approvals handled for you." },
      { title: "Launch Management", text: "Coordinated go-live across creators and platforms." },
      { title: "Performance Reporting", text: "Reach, engagement and conversions measured clearly." },
    ],
  },
  "Creator Outreach": {
    lead: "The right creators",
    tail: "reached the right way",
    body: "We research, vet and approach creators who genuinely fit your brand, then negotiate fair terms. You get partnerships built on relevance, not just follower counts.",
    included: [
      { title: "Creator Research", text: "Shortlists built around your audience and niche." },
      { title: "Audience Vetting", text: "Engagement quality and audience authenticity checked." },
      { title: "Outreach & Pitching", text: "Personal, professional approaches on your behalf." },
      { title: "Negotiation", text: "Fees, deliverables and usage rights agreed clearly." },
      { title: "Relationship Building", text: "Long-term partnerships with creators who perform." },
    ],
  },
  "UGC Collaborations": {
    lead: "Real content",
    tail: "from real people",
    body: "User-generated content from creators, made for your ads, website and social channels. Authentic, relatable videos and photos that build trust and outperform polished ads.",
    included: [
      { title: "Creator Matching", text: "UGC creators chosen for style, voice and audience." },
      { title: "Briefs & Scripts", text: "Clear direction that still leaves room for authenticity." },
      { title: "Product Seeding", text: "Products shipped and tracked to every creator." },
      { title: "Content Review", text: "Quality checks and revisions before delivery." },
      { title: "Usage Rights", text: "Rights secured so content can run in your ads." },
    ],
  },
  "Campaign Management": {
    lead: "Every detail",
    tail: "managed end to end",
    body: "We run the operations behind influencer marketing — contracts, timelines, approvals, payments and reporting — so your campaigns stay on schedule and on message.",
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
    lead: "Identity",
    tail: "with purpose",
    body: "A complete visual identity that expresses who you are and sets you apart. We build a cohesive system — from logo to colour and typography — that works across every touchpoint.",
    included: [
      { title: "Brand Discovery", text: "Workshops and research into your business and audience." },
      { title: "Positioning & Voice", text: "What you stand for and how you sound." },
      { title: "Visual Identity System", text: "Logo, colour, typography and graphic elements." },
      { title: "Brand Applications", text: "Stationery, social, signage and packaging mockups." },
      { title: "Brand Guidelines", text: "Clear rules that keep your brand consistent." },
    ],
  },
  "Logo Design": {
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
    lead: "Design",
    tail: "that communicates clearly",
    body: "Print and digital design that carries your brand with clarity and consistency. From brochures to presentations, every piece is designed to inform, persuade and look the part.",
    included: [
      { title: "Print Collateral", text: "Brochures, flyers, catalogues and stationery." },
      { title: "Presentations", text: "Pitch decks and company profiles that persuade." },
      { title: "Packaging Design", text: "Packaging that stands out on shelves and screens." },
      { title: "Infographics", text: "Complex information made simple and visual." },
      { title: "Event & Signage", text: "Banners, standees and environmental graphics." },
    ],
  },
  "Marketing Creatives": {
    lead: "Creatives",
    tail: "built for performance",
    body: "Everyday marketing assets for ads, social media, email and campaigns. Designed on-brand, delivered fast and made to be tested, so your marketing never waits on design.",
    included: [
      { title: "Ad Creatives", text: "Static and motion ads for Meta, Google and more." },
      { title: "Social Media Posts", text: "Posts, carousels and stories in your brand style." },
      { title: "Email & Web Banners", text: "Headers and banners for campaigns and promotions." },
      { title: "Campaign Key Visuals", text: "A central look adapted across every format." },
      { title: "Creative Variations", text: "Multiple versions ready for A/B testing." },
    ],
  },

  /* --------------------------------------------------- Web Development */
  "Business Websites": {
    lead: "Websites",
    tail: "that work as hard as you do",
    body: "Fast, responsive business websites that explain what you do and turn visitors into enquiries. Designed around your brand, built for performance and easy for your team to update.",
    included: [
      { title: "Strategy & Sitemap", text: "Pages, content and user journeys planned upfront." },
      { title: "UI/UX Design", text: "Layouts designed around your brand and goals." },
      { title: "Responsive Development", text: "Built to look and work perfectly on every device." },
      { title: "CMS Integration", text: "Edit pages and content without touching code." },
      { title: "SEO Foundations", text: "Speed, structure and metadata ready for search." },
    ],
  },
  "Landing Pages": {
    lead: "Pages",
    tail: "with one clear goal",
    body: "High-converting landing pages for campaigns, launches and lead generation. Focused messaging, fast load times and clear calls to action — built and tested around a single objective.",
    included: [
      { title: "Conversion Copy", text: "Messaging structured to persuade and convert." },
      { title: "Focused Design", text: "Layouts that guide visitors toward one action." },
      { title: "Fast Performance", text: "Lightweight pages that load in an instant." },
      { title: "Forms & Integrations", text: "Leads sent straight to your CRM or inbox." },
      { title: "A/B Testing", text: "Variants tested to keep improving results." },
    ],
  },
  "E-commerce Stores": {
    lead: "Stores",
    tail: "built to sell",
    body: "Online stores on Shopify and custom platforms, designed for smooth shopping and strong conversion. We handle design, development, payments and integrations from first product to launch.",
    included: [
      { title: "Store Design", text: "Product, collection and cart pages designed to convert." },
      { title: "Shopify Development", text: "Custom themes, sections and app setup." },
      { title: "Product & Catalogue Setup", text: "Products, variants and collections organised." },
      { title: "Payments & Shipping", text: "Gateways, taxes and delivery configured correctly." },
      { title: "Integrations", text: "Inventory, marketing and analytics tools connected." },
    ],
  },
  "Website Maintenance": {
    lead: "Your website",
    tail: "kept fast and secure",
    body: "Ongoing care that keeps your website updated, protected and performing. We handle updates, backups, fixes and improvements, so you can focus on your business.",
    included: [
      { title: "Updates & Patches", text: "Platform, theme and plugin updates handled safely." },
      { title: "Security Monitoring", text: "Threats watched and blocked before they cause harm." },
      { title: "Backups", text: "Regular backups with quick restore when needed." },
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
