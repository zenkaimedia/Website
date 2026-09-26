import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomeNav from "@/components/home/HomeNav";
import ContactForm from "@/components/home/ContactForm";
import PageContainer from "@/components/home/PageContainer";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Start a Project",
  description:
    "Tell us about your project. Zenkai Media works with brands worldwide from Ahmedabad, India — Monday to Saturday, 10am to 6pm IST.",
  path: "/contact",
});

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

/* Pale pill used for the e-mail + social links under the headline. */
const PILL =
  "inline-flex shrink-0 items-center rounded-xl bg-black/[0.06] px-[clamp(0.55rem,2.4vw,1.4rem)] py-[clamp(0.6rem,2.9vw,1rem)] font-body text-[clamp(0.75rem,3.4vw,1.25rem)] text-black/70 transition-colors hover:bg-black/10 hover:text-black md:px-6 md:py-3.5 md:text-[1.0625rem]";

export default function ContactPage() {
  /* Desktop fits a single screen — no scrolling, as in the reference. Mobile
     keeps its natural height (the stacked form is taller than a phone). */
  return (
    <main className="bg-[#ffffff] font-body md:h-dvh md:overflow-hidden">
      <HomeNav />

      <PageContainer className="pb-20 pt-32 md:flex md:h-full md:flex-col md:justify-center md:pb-16 md:pt-28">
        <div className="grid gap-14 md:grid-cols-[1fr_1.3fr] md:gap-16">
          {/* Left — giant faded headline, contact links pinned beneath */}
          <div className="flex flex-col">
            {/* Sized off the viewport so it always sits on a single line */}
            <h1
              className="whitespace-nowrap font-display font-bold leading-[1.05] text-black/[0.09]"
              style={{ fontSize: "clamp(2.25rem, 13vw, 6rem)" }}
            >
              Get in Touch
            </h1>

            <div className="mt-8 flex flex-wrap gap-2 md:mt-auto md:gap-3">
              {/* Short label on mobile so all four pills fit on one row */}
              <a href="mailto:workwithzenkai@gmail.com" className={PILL}>
                <span className="md:hidden">Mail</span>
                <span className="hidden md:inline">workwithzenkai@gmail.com</span>
              </a>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={PILL}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — the form, in its light theme */}
          <ContactForm variant="light" />
        </div>
      </PageContainer>
    </main>
  );
}
