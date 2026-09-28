import { SERVICE_PAGES } from "@/components/home/serviceDetails";
import { SUB_SERVICE_PAGES } from "@/components/home/subServiceDetails";
import { WORK } from "@/components/home/portfolio";
import { POSTS } from "@/components/home/insights";
import {
  FOUNDERS,
  FOUNDING_YEAR,
  PHONE_DISPLAY,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/site";

/* /llms.txt — a plain-Markdown summary of the site for AI assistants and
   answer engines (llmstxt.org convention). Built from the same data as the
   pages, so new services, projects and articles appear automatically.
   Generated once at build time. */
export const dynamic = "force-static";

const url = (p: string) => `${SITE_URL}${p}`;

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${SITE_NAME}`, "");
  lines.push(`> ${SITE_TAGLINE}`, "");
  lines.push(
    `${SITE_NAME} is a creative growth agency based in Ahmedabad, Gujarat, India, founded in ${FOUNDING_YEAR} and working with brands worldwide. It brings creative, strategy and technology under one roof — creative and video production, AI-assisted creative, social media and influencer marketing, performance marketing, branding and design, web development and custom AI solutions (CRMs, internal tools, workflow automation and AI dashboards).`,
    ""
  );
  lines.push("## Key facts", "");
  lines.push(`- Name: ${SITE_NAME} (also written as Zenkai, ZenkaiMedia)`);
  lines.push(`- Website: ${SITE_URL}`);
  lines.push("- Location: Ahmedabad, Gujarat, India — serving clients worldwide");
  lines.push(`- Founded: ${FOUNDING_YEAR}`);
  lines.push(`- Founders: ${FOUNDERS.map((f) => `${f.name} (${f.jobTitle})`).join(", ")}`);
  lines.push("- Industries: D2C and e-commerce, beauty and skincare, EdTech, SaaS and technology, consumer brands");
  lines.push("- Track record: 500+ projects across 20+ industries");
  lines.push(`- Contact: ${PHONE_DISPLAY} · ${url("/contact")}`);
  lines.push("- Hours: Monday–Saturday, 10:00–18:00 IST", "");

  lines.push("## Services", "");
  for (const s of SERVICE_PAGES) {
    lines.push(`- [${s.title}](${url(s.href)}): ${s.seoDescription}`);
  }
  lines.push("");

  for (const s of SERVICE_PAGES) {
    const subs = SUB_SERVICE_PAGES.filter((p) => p.parent.slug === s.slug);
    if (subs.length === 0) continue;
    lines.push(`### ${s.title}`, "");
    for (const p of subs) lines.push(`- [${p.title}](${url(p.href)}): ${p.seoDescription}`);
    lines.push("");
  }

  lines.push("## Selected work", "");
  for (const w of WORK) {
    lines.push(
      `- [${w.title}](${url(w.href)}): ${w.seoDescription ?? w.description} (${w.industry}, ${w.location}; ${w.services.join(", ")})`
    );
  }
  lines.push("");

  lines.push("## Insights", "");
  for (const p of POSTS) {
    lines.push(`- [${p.title}](${url(p.href)}): ${p.seoDescription ?? p.excerpt}`);
  }
  lines.push("");

  lines.push("## Company", "");
  lines.push(`- [About](${url("/about")}): Who we are, how we work and our values`);
  lines.push(`- [Services overview](${url("/services")}): All services grouped by Content, Growth and Brand & Technology`);
  lines.push(`- [Portfolio](${url("/portfolio")}): Selected client work`);
  lines.push(`- [Contact](${url("/contact")}): Start a project`, "");

  lines.push("## Profiles", "");
  for (const p of SOCIAL_PROFILES) lines.push(`- ${p}`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
