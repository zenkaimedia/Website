/* Single source of truth for brand and business details used by metadata,
   structured data (JSON-LD), the sitemap and analytics. Update here and every
   page picks it up. */

export const SITE_URL = "https://zenkaimedia.in";

export const SITE_NAME = "Zenkai Media";

/** Other names people search for — helps Google tie "Zenkai", common
    misspellings and run-together forms back to the brand. */
export const SITE_ALT_NAMES = ["Zenkai", "ZenkaiMedia", "Zenkai Media Agency", "Zenkai Media India"];

export const SITE_TAGLINE =
  "Creative growth agency helping brands build, communicate and grow through creative, technology and marketing.";

/** Default meta description (home and any page without its own). */
export const SITE_DESCRIPTION =
  "Zenkai Media is a creative growth agency from Ahmedabad, India, working with brands worldwide — creative, video, AI, branding, web and performance marketing.";

/** Business phone, shown to Google (E.164 and display forms). */
export const PHONE = "+919016792014";
export const PHONE_DISPLAY = "+91 90167 92014";

export const FOUNDING_YEAR = "2020";

export const FOUNDERS = [
  { name: "Raees Shaikh", jobTitle: "Founder & CEO" },
  { name: "Chandni Sodha", jobTitle: "Co-Founder & CTO" },
];

/** Public profiles — also listed as `sameAs` in the organisation schema. */
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/zenkaimedia.in",
  "https://www.youtube.com/@zenkaimedia_in",
  "https://www.linkedin.com/company/zenkaimedia",
  "https://www.facebook.com/zenkaimedia.in",
  "https://www.threads.com/@zenkaimedia.in",
];

export const GOOGLE_BUSINESS_PROFILE = "https://share.google/4mib9S1qpCacvmg6w";

/** Google Analytics 4 measurement ID (same property as the previous site). */
export const GA_MEASUREMENT_ID = "G-Y2TS2JR1V2";

/** Branded share image used by pages without their own. */
export const DEFAULT_OG_IMAGE = "/og/default.png";
