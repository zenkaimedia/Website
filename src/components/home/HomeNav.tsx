"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SERVICES, DotServiceIcon, type Service } from "./services";
import { Arrow } from "./Arrow";
import { DotCross, DotArrowDownRight, DotPhone } from "./DotIcons";
import { serviceHref, serviceHeroImage } from "./serviceDetails";

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

// Mobile menu item cards — measured off the reference at a 384px-wide phone
// (60.5px tall, 18px text inset, ~9.5px radius, 25px regular text) and scaled
// with vw so they keep those proportions. Near-black panels a shade darker
// than the menu background; pressed/hovered goes full black.
const M_CARD =
  "flex min-h-[clamp(52px,15.75vw,68px)] shrink-0 items-center rounded-[clamp(8px,2.5vw,11px)] bg-black/50 py-2 pl-[clamp(15px,4.7vw,21px)] pr-[clamp(18px,5.9vw,26px)] text-left font-body text-[clamp(21px,6.5vw,29px)] font-normal leading-[1.15] text-white transition-colors duration-200 hover:bg-black active:bg-black";
const M_GAP = "gap-[clamp(3px,1.12vw,6px)]";

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
// Re-measured off the open-panel reference at 1920 (rem = px ÷ 16, fluid):
// 44px tabs, 10px padding/gaps, 66px side tiles, 417 × 119px service cards.
const LINK_HEIGHT = "2.75rem";
const LOGO_SIZE = "4.125rem";
const LOGO_PAD_X = "clamp(0.7rem, 0.95vw, 0.95rem)";
const UNIT = "0.625rem"; // base spacing/padding token
const CARD_HEIGHT = "7.4375rem";
const CARD_HEIGHT_HOVER = "clamp(9.375rem, 11.6vw, 11.625rem)";
const CARD_GAP = "0.625rem";
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
      href={serviceHref(service.title)}
      onClick={() => setServicesOpen(false)}
      style={{ height: CARD_HEIGHT }}
      onMouseEnter={(e) => (e.currentTarget.style.height = CARD_HEIGHT_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.height = CARD_HEIGHT)}
      className={`group/card relative flex flex-col overflow-hidden rounded-[0.625rem] bg-black/30 py-[0.75rem] pl-[0.8125rem] pr-[1.1875rem] transition-[height] duration-500 ${EASE}`}
    >
      {/* Background image — fades + eases in from a slight zoom on hover */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 scale-105 bg-cover bg-center opacity-0 transition-[opacity,transform] duration-[600ms] ${EASE} group-hover/card:scale-100 group-hover/card:opacity-100`}
        style={{ backgroundImage: `url('${serviceHeroImage(service.title)}')` }}
      />
      {/* Legibility overlay */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/45 opacity-0 transition-opacity duration-500 ${EASE} group-hover/card:opacity-100`}
      />

      {/* Header stays on top */}
      {/* Reference card header: 23px faint dot glyph, 20px regular title 11px
         after it, lowercase 13px count at the far right. */}
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex items-center gap-[0.6875rem]">
          <span className="shrink-0 text-white/45 transition-colors group-hover/card:text-white">
            <DotServiceIcon name={service.icon} className="h-[1.4375rem] w-[1.4375rem]" />
          </span>
          <span className="font-body text-[1.25rem] font-normal leading-tight text-white drop-shadow-sm">
            {service.title}
          </span>
        </div>
        <span className="shrink-0 font-body text-[0.8125rem] text-white/40 transition-colors group-hover/card:text-white/75">
          /{service.includes.length} services
        </span>
      </div>
    </a>
  );

  const leftColumn = SERVICES.filter((_, i) => i % 2 === 0);
  const rightColumn = SERVICES.filter((_, i) => i % 2 === 1);

  return (
    <header className="fixed inset-x-0 top-2.5 z-50">
      <div className="relative flex h-20 w-full items-center justify-between px-[clamp(16px,4.4vw,20px)] sm:px-6 md:px-[1.1875rem]">
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
              className="h-[2.5rem] w-[2.5rem] select-none"
            />
          </span>
          {/* Mobile: Zenkai wordmark in a glass tile */}
          <span
            className={`flex h-[clamp(46px,13.5vw,60px)] items-center rounded-xl px-[clamp(8px,2.25vw,11px)] md:hidden ${GLASS}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mobile/logo/logo.png"
              alt="Zenkai Media"
              className="h-[clamp(24px,7.05vw,32px)] w-auto select-none"
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
          className={`absolute left-1/2 top-[0.5625rem] hidden -translate-x-1/2 flex-col ${GLASS} md:flex`}
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
                      ? "bg-black/30 text-white"
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
          <DotPhone className="h-[2.25rem] w-[2.25rem] text-white" />
        </a>

        {/* Right: hamburger (mobile) — opens the full-screen menu */}
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => {
            setMobileSub(false);
            setOpen(true);
          }}
          className={`grid h-[clamp(46px,13.5vw,60px)] w-[clamp(46px,13.5vw,60px)] place-items-center rounded-xl ${GLASS} md:hidden`}
        >
          {/* 2×5 dot grid, proportioned off the reference: dots ~3.4px, 4.1px
              apart across, rows 8.6px apart (viewBox units = px at 384px). */}
          <svg
            viewBox="0 0 19.75 12.03"
            aria-hidden="true"
            className="h-auto w-[clamp(17px,5.15vw,23px)] fill-white"
          >
            {[1.715, 10.315].map((cy) =>
              [1.715, 5.795, 9.875, 13.955, 18.035].map((cx) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.715" />
              ))
            )}
          </svg>
        </button>
      </div>

      {/* Mobile full-screen overlay menu — solid near-black (#080808 at the top
         easing to #161616), so nothing of the page shows through. */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-[linear-gradient(180deg,#080808_0%,#131313_35%,#161616_100%)] px-[clamp(16px,4.4vw,20px)] pb-[clamp(28px,9.1vw,44px)] transition-opacity duration-200 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        {/* Top bar — same geometry as the page header, so the wordmark and ✕
            sit exactly where the logo tile and hamburger were. */}
        <div className="mt-[clamp(9px,2.6vw,12px)] flex h-20 shrink-0 items-center justify-between">
          <a
            href="/"
            aria-label="Zenkai Media home"
            onClick={closeMobile}
            className="flex h-[clamp(46px,13.5vw,60px)] items-center px-[clamp(8px,2.25vw,11px)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/mobile/logo/logo.png"
              alt="Zenkai Media"
              className="h-[clamp(24px,7.05vw,32px)] w-auto select-none"
            />
          </a>
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobile}
            className="grid h-[clamp(46px,13.5vw,60px)] w-[clamp(46px,13.5vw,60px)] place-items-center"
          >
            {/* Dot ✕ at the hamburger's scale (≈20.5px wide at 384px). */}
            <DotCross className="h-auto w-[clamp(18px,5.33vw,24px)]" />
          </button>
        </div>

        {/* Sliding panels: main nav ⇄ services submenu */}
        <div className="relative mt-[clamp(22px,7.6vw,38px)] flex-1 overflow-hidden">
          {/* Main nav */}
          <nav
            aria-hidden={mobileSub}
            className={`absolute inset-0 flex flex-col ${M_GAP} transition-all duration-300 ${EASE} ${mobileSub ? "pointer-events-none -translate-x-6 opacity-0" : "translate-x-0 opacity-100"
              }`}
          >
            <button
              type="button"
              onClick={() => setMobileSub(true)}
              aria-expanded={mobileSub}
              className={M_CARD + " justify-between"}
            >
              Services
              <DotArrowDownRight className="h-auto w-[clamp(13px,4.03vw,18px)]" />
            </button>
            {NAV_LINKS.filter((l) => l.label !== "Services").map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className={M_CARD}
              >
                {link.label}
              </a>
            ))}

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer noopener"
              onClick={closeMobile}
              className="group mt-auto flex h-[clamp(56px,16.8vw,72px)] shrink-0 items-center justify-between rounded-[clamp(14px,4.2vw,18px)] bg-white pl-[clamp(20px,6.9vw,30px)] pr-[clamp(26px,9.1vw,38px)] font-body text-[clamp(16px,5.08vw,22px)] font-normal text-black"
            >
              Start a project
              <Arrow
                invert
                className="h-[clamp(13px,4.14vw,18px)]! transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[6px]"
              />
            </a>
          </nav>

          {/* Services submenu */}
          <div
            aria-hidden={!mobileSub}
            className={`absolute inset-0 flex flex-col ${M_GAP} overflow-y-auto transition-all duration-300 ${EASE} ${mobileSub ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0"
              }`}
          >
            <button
              type="button"
              onClick={() => setMobileSub(false)}
              className={`${M_CARD} gap-[clamp(12px,3.7vw,16px)] pl-[clamp(18px,5.8vw,26px)]!`}
            >
              <DotArrowDownRight className="h-auto w-[clamp(14px,4.25vw,19px)] rotate-180" />
              Back
            </button>
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={serviceHref(s.title)}
                onClick={closeMobile}
                className={M_CARD}
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}