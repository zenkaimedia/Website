"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SERVICES, ServiceIcon, type Service } from "./services";
import { Arrow } from "./Arrow";
import { CTA_ARROW } from "./cta";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

const BOOKING_URL = "https://zenkaimedia.dayschedule.com/free-discovery-call";

// Left↔right nudge played when someone clicks the nav link for the page they're
// already on — "you're already here." Runs via the Web Animations API so it
// replays on every click.
const SHAKE_KEYFRAMES: Keyframe[] = [
  { transform: "translateX(0)" },
  { transform: "translateX(-5px)" },
  { transform: "translateX(5px)" },
  { transform: "translateX(-4px)" },
  { transform: "translateX(4px)" },
  { transform: "translateX(-2px)" },
  { transform: "translateX(2px)" },
  { transform: "translateX(0)" },
];

// Shared "glass" styling for both the logo tile and the center nav bar —
// same translucent dark panel, sized to match the measured reference.
const GLASS = "bg-[#24242480] backdrop-blur-md";

// Mobile menu item cards — clamp so they scale with the phone and never go tiny.
const M_CARD_MAIN =
  "flex h-[clamp(3.4rem,13.5vw,3.9rem)] items-center rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-5 font-display text-[clamp(1.375rem,6.5vw,1.75rem)] font-medium text-white/90";
const M_CARD_SUB =
  "flex h-[clamp(3rem,12vw,3.5rem)] shrink-0 items-center rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] px-5 font-display text-[clamp(1.125rem,5vw,1.375rem)] font-medium text-white/90";

// Design tokens derived from the captured measurements (mid navbar
// 701.28×52.2, link pill 130.9×36.61, logo 53.19×52.2, base spacing/padding
// 7.792px). Expressed as clamps so the bar stays fluid across viewports
// instead of being locked to one screen width.
// Fixed, wide panel — the links spread across it in both the closed and open
// states (matching the reference); opening only grows the height for the grid.
// clamp() bounds expressed in rem (÷16) so the caps ride the fluid root and
// stay zoom-invariant too; the vw middle was already fluid. Values unchanged
// at the 1920px design width (1rem = 16px there).
const NAV_WIDTH = "clamp(31.25rem, 45vw, 55rem)";
const LINK_HEIGHT = "clamp(2.5rem, 2.8vw, 2.8rem)";
const LOGO_SIZE = "clamp(3.25rem, 3.9vw, 3.9rem)";
const LOGO_PAD_X = "clamp(0.7rem, 0.95vw, 0.95rem)";
const UNIT = "clamp(0.65rem, 0.8vw, 0.8rem)"; // base spacing/padding token
const CARD_HEIGHT = "clamp(5.25rem, 6.16vw, 6rem)";
const CARD_HEIGHT_HOVER = "clamp(9.375rem, 11.6vw, 11.625rem)";
// Gap between service cards in the grid — measured directly off the
// hover-state reference (~19-20px between cards at ~1558px viewport ≈ 1.28vw),
// distinct from the tighter UNIT token used for the bar's own padding.
const CARD_GAP = "clamp(0.875rem, 1.28vw, 1.25rem)";
// Requested explicitly: border-radius 1vw (clamped so it doesn't get
// oversized on ultra-wide monitors or too tight on small ones).
const NAV_RADIUS = "clamp(0.75rem, 1vw, 1.375rem)";

export default function HomeNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(false); // mobile "Services" submenu
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMobile = () => {
    setOpen(false);
    setMobileSub(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function openServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }
  function scheduleCloseServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }

  const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  const renderServiceCard = (service: Service) => (
    <a
      key={service.title}
      href="/services"
      onClick={() => setServicesOpen(false)}
      style={{ height: CARD_HEIGHT }}
      onMouseEnter={(e) => (e.currentTarget.style.height = CARD_HEIGHT_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.height = CARD_HEIGHT)}
      className={`group/card relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-[height] duration-500 ${EASE}`}
    >
      {/* Background image — fades + eases in from a slight zoom on hover */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 scale-105 bg-cover bg-center opacity-0 transition-[opacity,transform] duration-[600ms] ${EASE} group-hover/card:scale-100 group-hover/card:opacity-100`}
        style={{ backgroundImage: `url('${service.image}')` }}
      />
      {/* Legibility overlay */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/45 opacity-0 transition-opacity duration-500 ${EASE} group-hover/card:opacity-100`}
      />

      {/* Header stays on top */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70 transition-colors group-hover/card:border-white/30 group-hover/card:bg-black/40 group-hover/card:text-white">
            <ServiceIcon name={service.icon} className="h-[1.125rem] w-[1.125rem]" />
          </span>
          <span className="font-display text-[0.9375rem] font-semibold text-white drop-shadow-sm">
            {service.title}
          </span>
        </div>
        <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/35 transition-colors group-hover/card:text-white/75">
          /{service.includes.length} services
        </span>
      </div>
    </a>
  );

  const leftColumn = SERVICES.filter((_, i) => i % 2 === 0);
  const rightColumn = SERVICES.filter((_, i) => i % 2 === 1);

  return (
    <header className="fixed inset-x-0 top-2.5 z-50">
      <div className="relative flex h-20 w-full items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Left: logo mark in a rounded tile — same glass panel as the nav */}
        <a href="/" aria-label="Zenkai Media home" className="flex shrink-0 items-center">
          {/* Desktop: chrome mark in a glass tile */}
          <span
            style={{ height: LOGO_SIZE, width: LOGO_SIZE, paddingLeft: LOGO_PAD_X, paddingRight: LOGO_PAD_X }}
            className={`hidden place-items-center rounded-2xl md:grid ${GLASS}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo1.png"
              alt=""
              aria-hidden="true"
              style={{ filter: "invert(1)" }}
              className="h-8 w-8 select-none"
            />
          </span>
          {/* Mobile: Zenkai wordmark in a glass tile */}
          <span
            className={`flex h-[clamp(3rem,12vw,3.5rem)] items-center rounded-xl px-[clamp(0.75rem,3.5vw,1.1rem)] md:hidden ${GLASS}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mobile/logo/logo.png"
              alt="Zenkai Media"
              className="h-[clamp(1.55rem,6.5vw,2rem)] w-auto select-none"
            />
          </span>
        </a>

        {/* Center: unified nav bar — a pill that morphs into the services
           panel in place, so the whole bar grows instead of a separate
           floating card appearing below it. Only the grid inside animates
           (via AnimatePresence below); the bar itself just wraps content,
           so there's nothing here fighting that animation. */}
        <nav
          onMouseLeave={scheduleCloseServices}
          aria-label="Site navigation"
          style={{
            width: NAV_WIDTH,
            borderRadius: NAV_RADIUS,
            paddingTop: UNIT,
            paddingLeft: UNIT,
            paddingRight: UNIT,
            paddingBottom: UNIT,
          }}
          className={`absolute left-1/2 top-[0.875rem] hidden -translate-x-1/2 flex-col ${GLASS} md:flex`}
        >
          {/* Row of equal-width link pills */}
          <div className="flex items-center" style={{ gap: UNIT, height: LINK_HEIGHT }}>
            {NAV_LINKS.map((link) =>
              link.label === "Services" ? (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                  onFocus={openServices}
                  onClick={(e) => {
                    // Already on the Services page — shake instead of navigating.
                    if (pathname === link.href) {
                      e.preventDefault();
                      e.currentTarget.animate(SHAKE_KEYFRAMES, {
                        duration: 450,
                        easing: "ease-in-out",
                      });
                    }
                  }}
                  aria-expanded={servicesOpen}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`flex h-full flex-1 items-center justify-center rounded-[10px] font-body text-base transition-all duration-300 ${servicesOpen
                      ? "bg-white/[0.06] text-white"
                      : "text-white hover:bg-white/[0.06]"
                    }`}
                >
                  {link.label}
                </a>
              ) : pathname === link.href ? (
                // Current page — looks & hovers like a normal link, but clicking
                // shakes it instead of navigating ("you're already here").
                <a
                  key={link.label}
                  href={link.href}
                  aria-current="page"
                  onClick={(e) => {
                    e.preventDefault();
                    e.currentTarget.animate(SHAKE_KEYFRAMES, {
                      duration: 450,
                      easing: "ease-in-out",
                    });
                  }}
                  className="flex h-full flex-1 items-center justify-center rounded-[10px] font-body text-base text-white transition-all duration-300 hover:bg-white/[0.06]"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex h-full flex-1 items-center justify-center rounded-[10px] font-body text-base text-white transition-all duration-300 hover:bg-white/[0.06]"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Services grid — CSS grid-rows (0fr→1fr) reveal. Unlike a JS
             height:auto animation, this reliably reaches full height inside the
             same panel, so the bar grows in place and any card's hover growth
             expands it too. */}
          <div
            onMouseEnter={openServices}
            onMouseLeave={scheduleCloseServices}
            aria-hidden={!servicesOpen}
            className={`grid transition-[grid-template-rows] duration-300 ${EASE} ${servicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div
                className={`flex items-start transition-opacity duration-300 ${servicesOpen ? "opacity-100" : "opacity-0"
                  }`}
                style={{ gap: CARD_GAP, paddingTop: UNIT }}
              >
                <div className="flex flex-1 flex-col" style={{ gap: CARD_GAP }}>
                  {leftColumn.map(renderServiceCard)}
                </div>
                <div className="flex flex-1 flex-col" style={{ gap: CARD_GAP }}>
                  {rightColumn.map(renderServiceCard)}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Right: phone-icon tile (desktop) — books a call */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Book a free discovery call"
          style={{ height: LOGO_SIZE, width: LOGO_SIZE }}
          className={`hidden shrink-0 place-items-center rounded-2xl ${GLASS} transition-colors hover:bg-[#2a2a2a80] md:grid`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/phone-icon.png"
            alt=""
            aria-hidden="true"
            className="h-7 w-7 object-contain"
          />
        </a>

        {/* Right: hamburger (mobile) — opens the full-screen menu */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => {
            setMobileSub(false);
            setOpen(true);
          }}
          className={`grid h-[clamp(3rem,12vw,3.5rem)] w-[clamp(3rem,12vw,3.5rem)] place-items-center rounded-xl ${GLASS} md:hidden`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/general/hamburger.png"
            alt=""
            aria-hidden="true"
            className="h-[clamp(1.4rem,6vw,1.75rem)] w-[clamp(1.4rem,6vw,1.75rem)] object-contain"
          />
        </button>
      </div>

      {/* Mobile full-screen overlay menu — translucent + blurred so the page
         behind stays faintly visible. */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-black/75 px-6 pb-8 pt-4 backdrop-blur-2xl transition-opacity duration-200 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        {/* Top bar: wordmark + close */}
        <div className="flex h-16 shrink-0 items-center justify-between">
          <a href="/" aria-label="Zenkai Media home" onClick={closeMobile}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mobile/logo/logo.png"
              alt="Zenkai Media"
              className="h-[2.75rem] w-auto select-none"
            />
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobile}
            className="grid h-[clamp(3rem,12vw,3.5rem)] w-[clamp(3rem,12vw,3.5rem)] place-items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/general/cross.png"
              alt=""
              aria-hidden="true"
              className="h-[clamp(1.4rem,6vw,1.75rem)] w-[clamp(1.4rem,6vw,1.75rem)] object-contain"
            />
          </button>
        </div>

        {/* Sliding panels: main nav ⇄ services submenu */}
        <div className="relative flex-1 overflow-hidden">
          {/* Main nav */}
          <nav
            aria-hidden={mobileSub}
            className={`absolute inset-0 flex flex-col gap-[clamp(0.5rem,2.5vw,0.75rem)] pt-4 transition-all duration-300 ${EASE} ${mobileSub ? "pointer-events-none -translate-x-6 opacity-0" : "translate-x-0 opacity-100"
              }`}
          >
            <button
              type="button"
              onClick={() => setMobileSub(true)}
              aria-expanded={mobileSub}
              className={M_CARD_MAIN + " justify-between"}
            >
              Services
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/general/rightdownarrow.png"
                alt=""
                aria-hidden="true"
                className="h-[clamp(1.1rem,5vw,1.4rem)] w-auto object-contain"
              />
            </button>
            {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className={M_CARD_MAIN}
              >
                {link.label}
              </a>
            ))}

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={closeMobile}
              className="group mt-auto flex h-[clamp(3.4rem,13.5vw,3.9rem)] items-center justify-between rounded-xl bg-[#c4c4c4] px-6 font-body text-[clamp(1rem,4.5vw,1.15rem)] font-medium text-[#141414] transition-colors duration-300 hover:bg-white"
            >
              Start a project
              <Arrow invert className={CTA_ARROW} />
            </a>
          </nav>

          {/* Services submenu */}
          <div
            aria-hidden={!mobileSub}
            className={`absolute inset-0 flex flex-col gap-[clamp(0.4rem,2vw,0.6rem)] pt-4 transition-all duration-300 ${EASE} ${mobileSub ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0"
              }`}
          >
            <button
              type="button"
              onClick={() => setMobileSub(false)}
              className="flex h-[clamp(3rem,12vw,3.5rem)] shrink-0 items-center gap-3 rounded-xl bg-white/[0.1] px-5 font-mono text-[clamp(0.7rem,3.2vw,0.85rem)] uppercase tracking-[0.2em] text-white/80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/general/leftuparrow.png"
                alt=""
                aria-hidden="true"
                className="h-[clamp(1rem,4.5vw,1.25rem)] w-auto object-contain"
              />
              Back
            </button>
            <nav className="flex flex-col gap-[clamp(0.4rem,2vw,0.6rem)] overflow-y-auto">
              {SERVICES.map((s) => (
                <a
                  key={s.title}
                  href="/services"
                  onClick={closeMobile}
                  className={M_CARD_SUB}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}