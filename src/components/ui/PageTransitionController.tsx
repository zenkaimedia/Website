"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const LEAVE_MS = 320; // must match the leave transition in PageTransition.tsx
const IN_MS = 700; // must match the zk-pt-rise animation in PageTransition.tsx
const LINE_S = 0.65; // per-line text reveal
const LINE_STAGGER_S = 0.08;

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Vertical bands, one per rendered line of `el`, relative to its padding box. */
function lineBands(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects())
    .filter((r) => r.width > 0 && r.height > 0)
    .sort((a, b) => a.top - b.top);

  const lines: { top: number; bottom: number }[] = [];
  for (const r of rects) {
    const last = lines[lines.length - 1];
    const mid = (r.top + r.bottom) / 2;
    if (last && mid < last.bottom) {
      last.top = Math.min(last.top, r.top);
      last.bottom = Math.max(last.bottom, r.bottom);
    } else {
      lines.push({ top: r.top, bottom: r.bottom });
    }
  }

  // Butt the bands together (split any gap/overlap at its midpoint) so no
  // sliver of text falls between two masks; outer edges cover the whole box.
  const box = el.getBoundingClientRect();
  const originY = box.top + el.clientTop;
  return lines.map((l, i) => {
    const prev = lines[i - 1];
    const next = lines[i + 1];
    const top = prev ? (prev.bottom + l.top) / 2 : box.top;
    const bottom = next ? (l.bottom + next.top) / 2 : box.bottom;
    return { top: top - originY, height: bottom - top };
  });
}

/* Masked line-by-line rise for one heading. The real heading is never
   restructured: it's hidden while stacked copies — each clipped to a single
   line — slide up into place, then the copies are removed and the original
   shown again, pixel-identical. Also used by in-page text reveals. */
export function revealLines(el: HTMLElement): Promise<void> {
  const bands = lineBands(el);
  if (!bands.length) return Promise.resolve();

  const cs = getComputedStyle(el);
  const prev = { position: el.style.position, visibility: el.style.visibility };
  if (cs.position === "static") el.style.position = "relative";

  const overlay = document.createElement("div");
  overlay.setAttribute("aria-hidden", "true");
  overlay.style.cssText =
    "position:absolute;inset:0;pointer-events:none;visibility:visible;";

  const movers = bands.map((band) => {
    const mask = document.createElement("div");
    // Clip vertically only, so glyphs that overhang the box sideways survive.
    mask.style.cssText = `position:absolute;left:0;right:0;top:${band.top}px;height:${band.height}px;clip-path:inset(0 -100vw);`;
    const mover = document.createElement("div");
    mover.style.cssText =
      "position:absolute;inset:0;opacity:0;transform:translateY(100%);will-change:transform,opacity;";
    const copy = document.createElement("div");
    copy.style.cssText = `position:absolute;left:0;top:${-band.top}px;width:${el.clientWidth}px;padding:${cs.padding};box-sizing:border-box;`;
    el.childNodes.forEach((n) => copy.appendChild(n.cloneNode(true)));
    mover.appendChild(copy);
    mask.appendChild(mover);
    overlay.appendChild(mask);
    return mover;
  });

  el.appendChild(overlay);
  el.style.visibility = "hidden";

  const runs = movers.map((m, i) =>
    animate(
      m,
      { opacity: [0, 1], transform: ["translateY(100%)", "translateY(0%)"] },
      { duration: LINE_S, delay: i * LINE_STAGGER_S, ease: EASE }
    )
  );

  return Promise.all(runs).then(() => {
    overlay.remove();
    el.style.position = prev.position;
    el.style.visibility = prev.visibility;
  });
}

let enterRun = 0; // a newer arrival wins if you navigate again mid-reveal

function enter() {
  const html = document.documentElement;
  if (!html.classList.contains("zk-pt-enter")) return;
  const run = ++enterRun;
  const w = window as unknown as { __zkPtFallback?: number };
  clearTimeout(w.__zkPtFallback);

  // Hero headlines currently on screen get the line reveal.
  const vh = window.innerHeight;
  const headings = Array.from(document.querySelectorAll<HTMLElement>("main h1")).filter((h) => {
    const r = h.getBoundingClientRect();
    return r.height > 0 && r.bottom > 0 && r.top < vh;
  });
  const reveals = headings.map(revealLines);

  html.classList.add("zk-pt-in");
  html.classList.remove("zk-pt-enter");

  const blocks = new Promise((r) => setTimeout(r, IN_MS + 50));
  Promise.all([blocks, ...reveals]).finally(() => {
    if (run === enterRun) html.classList.remove("zk-pt-in");
  });
}

// Wait for webfonts so line breaks are measured on the final layout.
function enterWhenFontsReady() {
  const fontsReady = document.fonts?.ready ?? Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 300))]).then(enter);
}

export default function PageTransitionController() {
  const router = useRouter();
  const pathname = usePathname();
  const leaving = useRef(false);
  const pending = useRef<string | null>(null); // path we're transitioning to

  // Arrival via a full document load (direct fallback when the client router
  // hard-navigates, e.g. right after a new deploy) — pre-paint script set it up.
  useEffect(enterWhenFontsReady, []);

  // Arrival via client-side routing: runs after the new route commits but
  // before it paints, so the incoming page is never seen un-hidden.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const arrived = pending.current !== null && pending.current === pathname;
    if (!arrived) {
      // Back/forward (or any route change we didn't start): no transition —
      // just make sure a half-finished fade-out can't leave the page hidden.
      if (html.classList.contains("zk-pt-leave")) {
        html.classList.remove("zk-pt-leave");
        leaving.current = false;
        pending.current = null;
      }
      return;
    }
    pending.current = null;
    leaving.current = false;
    try {
      sessionStorage.removeItem("zk-pt");
    } catch {}
    html.classList.add("zk-pt-enter");
    html.classList.remove("zk-pt-leave");
    enterWhenFontsReady();
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;

    function onClick(e: MouseEvent) {
      if (leaving.current || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.hasAttribute("download")) return;
      if (a.target && a.target !== "_self") return;
      const raw = a.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;

      const url = new URL(a.href, window.location.href);
      // External, mailto:, tel: etc. all have a different (or "null") origin.
      if (url.origin !== window.location.origin) return;
      // Same page (hash jumps, re-clicks) keeps its existing behaviour.
      if (url.pathname === window.location.pathname) return;

      // Internal route → Next's client-side router (no document reload).
      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      if (reducedMotion()) {
        router.push(href);
        return;
      }

      leaving.current = true;
      pending.current = url.pathname;
      try {
        sessionStorage.setItem("zk-pt", JSON.stringify({ p: url.pathname, t: Date.now() }));
      } catch {}

      // Fetch the next route while the current one fades out.
      router.prefetch(href);
      html.classList.add("zk-pt-leave");
      window.setTimeout(() => router.push(href), LEAVE_MS);
    }

    // Back/forward can restore this page from the bfcache mid-fade — undo it.
    function onPageShow(e: PageTransitionEvent) {
      if (!e.persisted) return;
      leaving.current = false;
      pending.current = null;
      html.classList.remove("zk-pt-leave");
    }

    window.addEventListener("click", onClick);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router]);

  return null;
}
