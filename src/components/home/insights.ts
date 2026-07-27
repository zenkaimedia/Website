/* Shared insights/articles data — used by the homepage "Latest News" section,
   the /insights list, and each /insights/[slug] article page. */
export type Section = { heading: string; paragraphs: string[] };

export type Post = {
  slug: string;
  title: string;
  date: string;
  /** Filter category shown on the card badge (empty = uncategorised). */
  category: string;
  image: string;
  /** Short standfirst under the title. */
  excerpt: string;
  /** Long-form body, rendered on the article page. */
  body: Section[];
  /** Link target — the individual article. */
  href: string;
};

export const POSTS: Post[] = [
  {
    slug: "building-brands-from-within",
    title: "Building Brands from Within",
    date: "06/04/2026",
    category: "Design",
    image: "/assets/insights/cardone.webp",
    href: "/insights/building-brands-from-within",
    excerpt:
      "Why meaningful brands are built from depth, not just design — and how that approach creates long-term impact.",
    body: [
      {
        heading: "Where Branding Truly Begins",
        paragraphs: [
          "In many cases, branding is still perceived as something primarily visual: a logo, a colour palette, a typeface system. And while these elements are undeniably important, they are not where a brand truly begins.",
          "At Zenkai, even when a client comes to us specifically for visual identity, we never approach design as a purely aesthetic exercise. Before any visual decisions are made, we take the time to understand what exists beneath the surface — the origin of the brand, its intention, its internal logic, and the reason it needs to exist in the first place.",
          "This process is not an additional step. It is the foundation. Without it, design becomes decoration.",
          "Because a brand that is not rooted in meaning may look appealing at first, but it will struggle to remain relevant, coherent, and adaptable over time.",
        ],
      },
      {
        heading: "The Difference Between Something Beautiful and Something Lasting",
        paragraphs: [
          "It is entirely possible to create something visually attractive without going deep. Many brands do. They launch with polished aesthetics and immediate appeal, but over time, something begins to feel inconsistent. The message shifts, the tone changes, the visuals no longer align, and the brand starts to lose clarity.",
          "This happens because what was created was not a system — it was a surface.",
          "When a brand is built only on what looks good in the moment, it lacks the internal structure needed to evolve. It becomes rigid in the wrong ways and fragile where it should be strong.",
          "In contrast, when a brand is developed from a place of depth, it gains a kind of stability that allows for flexibility. It can grow, expand, and adapt without losing its identity. This is the difference between something that is simply beautiful and something that is truly sustainable.",
        ],
      },
      {
        heading: "A Brand as a Living System",
        paragraphs: [
          "One of the most important shifts in perspective is understanding that a brand is not a static object. It is not something that is created once and then remains unchanged.",
          "A brand is a living system.",
          "It has its own character, its own voice, and its own way of interacting with the world. As the business evolves, the brand evolves with it. It responds to new contexts, new audiences, and new challenges. It develops nuance, depth, and complexity over time.",
          "This dynamic nature means that branding is not about control. It is about coherence. The goal is not to fix a brand into a rigid form, but to create a strong internal foundation that allows it to move and grow without losing itself.",
          "When this foundation is missing, every change feels like a disruption. When it is present, change becomes a natural extension of what already exists.",
        ],
      },
      {
        heading: "Why Depth Creates Efficiency",
        paragraphs: [
          "There is a practical side to this approach.",
          "Working from depth is not only more meaningful — it is more efficient in the long term. A well-defined brand reduces uncertainty in decision-making. It provides clear guidelines for communication, design, and strategy. It aligns teams and creates consistency across every touchpoint.",
          "Without this clarity, brands often spend more time correcting themselves than moving forward. They redesign, reposition, and rethink repeatedly, trying to fix something that was never fully defined to begin with.",
        ],
      },
      {
        heading: "The Zenkai Philosophy",
        paragraphs: [
          "For us, this way of working is not a trend or a methodology we adopted recently. It is a value that has shaped our work for years.",
          "We believe that branding should be both intentional and effective. It should not only look good, but function well in the real world. It should support growth, not limit it.",
          "We take the time to understand before we design. We build meaning before we build form. And we approach every brand as something that will live, evolve, and interact far beyond the initial launch.",
          "Because ultimately, our goal is not just to create brands that are visually compelling, but to create brands that endure, adapt, and continue to grow with clarity and purpose.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-brand-name-that-lasts",
    title: "How to Choose a Brand Name That Lasts",
    date: "06/04/2026",
    category: "",
    image: "/assets/insights/cardtwo.webp",
    href: "/insights/how-to-choose-a-brand-name-that-lasts",
    excerpt:
      "A name is the first word your brand ever says. Here's how to choose one built to outlast trends.",
    body: [
      {
        heading: "A Name Is a Promise, Not a Label",
        paragraphs: [
          "Most naming conversations start in the wrong place — with a list of words that sound nice. But a name is not decoration. It is the smallest, most repeated expression of what a brand stands for.",
          "Before it means anything to the market, a name has to mean something internally. It should carry the intention of the business, hint at its character, and give people something to hold onto. When a name is chosen for how it sounds rather than what it signals, it ages quickly.",
          "The strongest names feel almost inevitable in hindsight — not because they were obvious, but because they were rooted in something true about the brand from the start.",
        ],
      },
      {
        heading: "The Trap of Being Too Descriptive",
        paragraphs: [
          "It is tempting to spell out exactly what you do. A descriptive name feels safe: nobody has to guess. But the more literal a name is, the smaller the box it builds around you.",
          "A name that describes a single product or service becomes a liability the moment the business grows beyond it. What felt precise at launch starts to feel limiting — a constant reminder of who you used to be.",
          "The goal is not to be vague. It is to be spacious. A good name says enough to be understood, but leaves room for the brand to become more than its first idea.",
        ],
      },
      {
        heading: "Room to Grow",
        paragraphs: [
          "A name that lasts is one that can stretch. It should still make sense when you enter a new market, launch a new line, or shift your positioning entirely.",
          "This is where depth matters more than cleverness. Names built on a feeling, a value, or a point of view can travel across categories. Names built on a trend or a mechanic cannot.",
          "Think of the name as a container. The question is not only what fits inside it today, but how much it can hold five years from now.",
        ],
      },
      {
        heading: "Sound, Rhythm, and Memory",
        paragraphs: [
          "A name lives out loud. It gets said in meetings, typed in searches, and passed between people in conversation. How it feels to say matters as much as how it looks on a page.",
          "Rhythm, length, and the shape of the sounds all affect how easily a name is remembered and repeated. Short is not always better, but effortless almost always is.",
          "The test is simple: can someone say it once, remember it later, and spell it without asking? If not, the brand pays a small tax on every single interaction.",
        ],
      },
      {
        heading: "Testing a Name in the Real World",
        paragraphs: [
          "A name rarely fails in a document. It fails in context — on a storefront, in an app icon, at the end of an email address, spoken over a bad phone connection.",
          "Before committing, we put candidates through the situations they will actually live in. We check how they hold up next to competitors, whether the domain and handles are viable, and whether the meaning survives translation and shorthand.",
          "This is not about eliminating risk entirely. It is about making sure the name is strong where it will be used most.",
        ],
      },
      {
        heading: "Naming for the Long Game",
        paragraphs: [
          "At Zenkai, we treat naming the same way we treat identity: as a decision that should still feel right long after the excitement of launch has faded.",
          "We are not looking for the name that wins the room today. We are looking for the one you will still be proud to say in a decade — one that has grown more meaningful, not less, as the brand has grown into it.",
          "Because the best names are not the ones that sound impressive at the start. They are the ones that quietly earn their meaning over time.",
        ],
      },
    ],
  },
];

/** Unique, non-empty categories for the filter row. */
export const CATEGORIES = Array.from(
  new Set(POSTS.map((p) => p.category).filter(Boolean))
);
