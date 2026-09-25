import ServicesOutro from "./ServicesOutro";
import LatestNews from "./LatestNews";
import ContactForm from "./ContactForm";
import ServicesDirectory from "./ServicesDirectory";
import FooterWordmark from "./FooterWordmark";
import PageContainer from "./PageContainer";
import { Arrow } from "./Arrow";
import { CTA_ARROW } from "./cta";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/zenkaimedia.in" },
  { label: "YouTube", href: "https://www.youtube.com/@zenkaimedia_in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zenkaimedia" },
];

/* Shared close of the service and sub-service pages: outro, latest news,
   contact, services directory and footer. Render inside the InvertShell. */
export default function ServicePageEnd() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* ----------------------------------------------- OUTRO (fade-to-black) */}
      <ServicesOutro />

      {/* Dark-by-design sections, counter-inverted so the whole page flips
         white↔black as one unit (the double invert cancels in dark mode).
         `sflip-counter` lets photos in here cancel shell + counter together. */}
      <div className="sflip-counter" style={{ filter: "invert(1) hue-rotate(180deg)" }}>
        <LatestNews />

        {/* -------------------------------------------------------- CONTACT */}
        <section id="contact" className="scroll-mt-16 bg-[#000000] pb-16 pt-4 md:scroll-mt-20 md:pb-28 md:pt-0">
          <PageContainer>
            <div className="overflow-hidden rounded-3xl bg-white/[0.02] ring-1 ring-white/10">
              <div className="grid gap-8 p-7 md:grid-cols-[0.9fr_1.4fr] md:gap-16 md:p-12 lg:p-16">
                <div>
                  <h2 className="font-display text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl">
                    Ready to
                    <span className="text-white/35"> get started?</span>
                  </h2>

                  {/* Mobile: a single "Get in touch" button instead of the form */}
                  <a
                    href="/contact"
                    className="group mt-8 flex items-center justify-between rounded-xl bg-white px-6 py-4 font-body text-base font-medium text-[#141414] transition-colors duration-300 hover:bg-white/90 md:hidden"
                  >
                    Get in touch
                    <Arrow invert className={CTA_ARROW} />
                  </a>
                </div>

                {/* Desktop: the full form */}
                <div className="hidden md:block">
                  <ContactForm />
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* ------------------------------------------------ SERVICES DIRECTORY */}
        <ServicesDirectory />

        {/* ------------------------------------------------------------ FOOTER */}
        <footer className="relative overflow-hidden bg-[#000000] pt-16 md:pt-24">
          <PageContainer>
            <FooterWordmark />
          </PageContainer>

          <PageContainer className="flex items-center justify-between pb-8 pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-white/55">
            {SOCIALS.map((so) => (
              <a
                key={so.label}
                href={so.href}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-white"
              >
                {so.label}
              </a>
            ))}
            <a href="mailto:workwithzenkai@gmail.com" className="transition-colors hover:text-white">
              Mail
            </a>
          </PageContainer>

          <PageContainer className="border-t border-white/10 py-5 text-center font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/35">
            &copy; {year} Zenkai Media &middot; Ahmedabad, India
          </PageContainer>
        </footer>
      </div>
    </>
  );
}
