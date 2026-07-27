"use client";

import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";

/* Mobile-only whole-page light↔dark flip for the home body, driven by the
   Approach showcase image crossing mid-screen (image below → white, above →
   black), reversing on scroll-up.

   The ENTIRE body sits under ONE invert filter here (exactly like the insights
   InvertShell) so every section flips as a single unit — upper and lower stay
   perfectly in sync, with no colour-vs-filter drift. Two published variables
   keep images original through the flip (see globals.css `.mflip-shell …
   img.flip-photo`): shell-direct photos re-apply `--mflip`; photos inside the
   counter-inverted lower block re-apply `--mflip-inv`. Icons/wordmarks are not
   tagged, so they keep theming with the flip.

   Mobile-only: at md+ the filter is forced to `none` so the desktop gif's
   sticky scroll-zoom is untouched. */
const DarkContext = createContext(false);
const SetDarkContext = createContext<(v: boolean) => void>(() => {});

export const useMobileDark = () => useContext(DarkContext);
export const useSetMobileDark = () => useContext(SetDarkContext);

export default function MobileFlipProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const style = {
    "--mflip": dark
      ? "invert(1) hue-rotate(180deg)"
      : "invert(0) hue-rotate(0deg)",
    "--mflip-inv": dark
      ? "invert(0) hue-rotate(0deg)"
      : "invert(1) hue-rotate(180deg)",
  } as CSSProperties;

  return (
    <SetDarkContext.Provider value={setDark}>
      <DarkContext.Provider value={dark}>
        <div
          style={style}
          className="mflip-shell bg-white transition-[filter] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)] [filter:var(--mflip)] md:bg-transparent md:![filter:none] md:transition-none"
        >
          {children}
        </div>
      </DarkContext.Provider>
    </SetDarkContext.Provider>
  );
}
