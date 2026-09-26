import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { SERVICE_PAGES } from "@/components/home/serviceDetails";
import { SUB_SERVICE_PAGES } from "@/components/home/subServiceDetails";
import { WORK } from "@/components/home/portfolio";
import { POSTS, postIsoDate } from "@/components/home/insights";

/* /sitemap.xml — built from the same data the pages render, so new services,
   projects and articles are listed automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${SITE_URL}${p}`;

  return [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICE_PAGES.map((s) => ({
      url: url(s.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...SUB_SERVICE_PAGES.map((s) => ({
      url: url(s.href),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: url("/portfolio"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...WORK.map((w) => ({
      url: url(w.href),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: url("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...POSTS.map((p) => ({
      url: url(p.href),
      lastModified: new Date(postIsoDate(p.date)),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
}
