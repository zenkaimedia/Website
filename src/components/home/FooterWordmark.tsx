"use client";

import { useRef, useState, type CSSProperties } from "react";

/* Giant "Zenkai" wordmark. A dim base image sits on the black footer; on hover
   a brighter version is revealed through a soft spotlight that follows the
   cursor (before.webp → after.webp). */
export default function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (!hover) setHover(true);
  };

  // Soft, coreless falloff so the reveal is a gentle glow rather than a hard disc.
  const spotlight =
    "radial-gradient(circle 23.75rem at var(--mx) var(--my), #000 0%, transparent 60%)";

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative select-none"
      style={{ "--mx": "50%", "--my": "50%" } as CSSProperties}
    >
      {/* Dim base */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/footerlogo/before.webp"
        srcSet="/assets/footerlogo/before-800.webp 800w, /assets/footerlogo/before.webp 1920w"
        sizes="100vw"
        width={1920}
        height={504}
        loading="lazy"
        alt="Zenkai"
        className="block h-auto w-full opacity-25"
      />
      {/* Brighter reveal, masked to a spotlight at the cursor */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/footerlogo/after.webp"
        srcSet="/assets/footerlogo/after-800.webp 800w, /assets/footerlogo/after.webp 1920w"
        sizes="100vw"
        width={1920}
        height={504}
        loading="lazy"
        alt="Zenkai Media"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 block h-auto w-full transition-opacity duration-300 ease-out"
        style={{
          opacity: hover ? 0.28 : 0,
          WebkitMaskImage: spotlight,
          maskImage: spotlight,
        }}
      />
    </div>
  );
}
