"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";

/* The 3D hero logo only shows on desktop (md+). Loading it through this
   wrapper keeps Three.js out of the initial bundle: the WebGL code is fetched
   only once a desktop-width viewport is detected, so phones never download,
   parse or run it. Until then the same box renders empty (no layout shift). */
const Logo3D = dynamic(() => import("./Logo3D"), { ssr: false });

export default function Logo3DDesktop({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (mq.matches) setDesktop(true);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return desktop ? (
    <Logo3D className={className} style={style} />
  ) : (
    <div className={className} style={style} aria-hidden="true" />
  );
}
