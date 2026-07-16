"use client";

import { useEffect, useState } from "react";
import { Arrow } from "./Arrow";

/* Non-interactive hero scroll hint. The arrow bounces gently, and the whole
   thing fades out once the user has scrolled past the hero. */
export default function ScrollIndicator() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 select-none transition-opacity duration-500 sm:block ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Whole hint (text + arrow) bounces together */}
      <div className="flex animate-[scrollNudge_1.4s_ease-in-out_infinite] flex-row items-center justify-center gap-2 font-mono text-[0.9rem] uppercase tracking-[0.25em] text-white/40">
        Scroll
        <Arrow dir="down" />
      </div>
    </div>
  );
}
