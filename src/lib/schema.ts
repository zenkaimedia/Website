/* Structured data (schema.org JSON-LD) builders. Rendered with <JsonLd>. */
import {
  FOUNDERS,
  FOUNDING_YEAR,
  GOOGLE_BUSINESS_PROFILE,
  PHONE,
  SITE_ALT_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "./site";

const ORG_ID = `${SITE_URL}/#organization`;
const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

/** The business itself — name (with alternate spellings), founders, phone,
    city (no street address), hours, service area and social profiles. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAMES,
    url: SITE_URL,
    logo: abs("/android-chrome-512x512.png"),
    image: abs("/og/default.png"),
    description: SITE_DESCRIPTION,
    slogan: "Creative, strategy and technology under one roof.",
    foundingDate: FOUNDING_YEAR,
    founder: FOUNDERS.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.jobTitle })),
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "18:00",
      },
    ],
    hasMap: GOOGLE_BUSINESS_PROFILE,
    sameAs: SOCIAL_PROFILES,
    knowsAbout: [
      "Creative production",
      "Video production",
      "AI video production",
      "AI creative",
      "Branding",
      "Web development",
      "Performance marketing",
      "Social media management",
      "Influencer marketing",
      "Custom AI solutions",
      "Business automation",
    ],
  };
}

/** The website — its name and alternates feed Google's site-name display. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_ALT_NAMES,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": ORG_ID },
  };
}

/** Breadcrumb trail, e.g. Home › Services › Creative Production. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

/** A service (or sub-service) offered by the organisation. */
export function serviceSchema(s: {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  image?: string;
  offers?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.serviceType ?? s.name,
    description: s.description,
    url: abs(s.path),
    ...(s.image ? { image: abs(s.image) } : {}),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Place", name: "Worldwide" },
    ...(s.offers?.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: s.name,
            itemListElement: s.offers.map((o) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: o },
            })),
          },
        }
      : {}),
  };
}

/** A portfolio project. */
export function creativeWorkSchema(w: { name: string; description: string; path: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: w.name,
    description: w.description,
    url: abs(w.path),
    image: abs(w.image),
    creator: { "@id": ORG_ID },
  };
}

/** An Insights article. `date` is ISO (YYYY-MM-DD). */
export function articleSchema(a: {
  title: string;
  description: string;
  path: string;
  image: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    url: abs(a.path),
    mainEntityOfPage: abs(a.path),
    image: abs(a.image),
    datePublished: a.date,
    dateModified: a.date,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
