import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "./site";

/** Share image for a page: `public/og/<key>.jpg` when one has been generated
    for it, otherwise the branded default. New pages therefore always get a
    valid preview, and a page-specific one as soon as its file is added. */
export function ogImage(key?: string): string {
  if (key) {
    const file = path.join(process.cwd(), "public", "og", `${key}.jpg`);
    if (fs.existsSync(file)) return `/og/${key}.jpg`;
  }
  return DEFAULT_OG_IMAGE;
}

type PageSeo = {
  /** Page title — the layout template appends " | Zenkai Media". */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/services/creative-production". */
  path: string;
  /** Share image path (see ogImage). */
  image?: string;
  /** Use the title as-is, without the brand suffix. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
};

/** Metadata for one page: title, description, canonical URL and matching
    Open Graph / Twitter tags. URLs resolve against `metadataBase`. */
export function pageMetadata({
  title,
  description,
  path: pagePath,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle,
  type = "website",
  publishedTime,
}: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: pagePath },
    openGraph: {
      type,
      url: pagePath,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
