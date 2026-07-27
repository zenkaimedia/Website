"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Arrow } from "./Arrow";

const BOOKING_URL = "https://zenkaimedia.dayschedule.com/free-discovery-call";

/* Persistent "Start a project" pill, fixed at the bottom-centre of every page.
   • Every page EXCEPT the home page: always visible, hero → footer.
   • Home page only: hidden while the hero fills the screen, then fades in once
     the user scrolls past it (from the services section onward) and stays for
     the rest of the page. Same behaviour on every device. */
export default function FloatingCTA() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  // Not shown on the contact page — that's already where "Get in touch" leads.
  const hidden = pathname === "/contact";
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Off the home page the pill is always shown, from the top of the hero on.
    if (!isHome) {
      setShow(true);
      return;
    }
    const update = () => {
      // Anchor to the "Our Services" section so the pill appears exactly once
      // that section arrives — never over the hero.
      const services = document.getElementById("services");
      if (services) {
        setShow(services.getBoundingClientRect().top <= window.innerHeight * 0.5);
        return;
      }
      setShow(window.scrollY > window.innerHeight * 0.85);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  if (hidden) return null;

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noreferrer noopener"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`group fixed bottom-6 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-3 rounded-xl bg-[#2a2a2a]/70 px-7 py-4 font-body text-[15px] font-medium text-white shadow-xl backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#2a2a2a]/85 ${show ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
    >
      Start a project
      <Arrow className="h-3 w-auto transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
