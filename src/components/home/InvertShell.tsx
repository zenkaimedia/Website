"use client";

import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";

/* Lets a descendant (the outro) flip the whole upper page dark/light. */
const SetDarkContext = createContext<(v: boolean) => void>(() => {});
export const useSetDark = () => useContext(SetDarkContext);

/* Wraps every "upper" section (hero + all service categories + outro) and,
   when told to go dark, animates a single `filter: invert()` over the whole
   block. Inverting the rendered pixels flips white→black and black→white
   uniformly — the entire page fades between light and dark in one smooth,
   seam-free, fully reversible transition. Nav / contact / footer stay OUTSIDE
   this wrapper so they are never inverted. */
export default function InvertShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const flip = dark
    ? "invert(1) hue-rotate(180deg)"
    : "invert(0) hue-rotate(0deg)";
  const flipInv = dark
    ? "invert(0) hue-rotate(0deg)"
    : "invert(1) hue-rotate(180deg)";
  return (
    <SetDarkContext.Provider value={setDark}>
      <div
        className="invert-shell bg-white transition-[filter] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          // Explicit invert(0) base so the transition interpolates smoothly
          // through grey instead of snapping from `none`.
          filter: flip,
          // Published so content PHOTOS can re-apply the invert and cancel it,
          // staying original through the flip (globals.css `.invert-shell
          // img.flip-photo`). `--sflip` cancels the shell; `--sflip-inv` cancels
          // a shell + counter-invert region. Icons/wordmarks are NOT marked, so
          // they keep theming with the flip.
          "--sflip": flip,
          "--sflip-inv": flipInv,
        } as CSSProperties}
      >
        {children}
      </div>
    </SetDarkContext.Provider>
  );
}
