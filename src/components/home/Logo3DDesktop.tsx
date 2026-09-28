"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";

/* The 3D hero logo only shows on desktop (md+). Loading it through this
   wrapper keeps Three.js out of the initial bundle: the WebGL code is fetched
   only once a desktop-width viewport is detected, so phones never download,
   parse or run it. Until then the same box renders empty (no layout shift).

   Machines without a GPU (software WebGL — SwiftShader/llvmpipe: Google's
   Lighthouse/PageSpeed runners, some VMs and old PCs) would render the scene
   on the CPU every frame and freeze the page, so they get a static chrome
   still of the logo instead and never load Three.js at all. */
const Logo3D = dynamic(() => import("./Logo3D"), { ssr: false });

const STILL = "/assets/general/logo-chrome.webp";

/** True when WebGL is hardware-accelerated (not a software rasteriser). */
function hasHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ?? canvas.getContext("webgl")) as
      | WebGLRenderingContext
      | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(
      info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)
    );
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

export default function Logo3DDesktop({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const [mode, setMode] = useState<"none" | "3d" | "still">("none");

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      if (mq.matches) setMode((m) => (m === "none" ? (hasHardwareWebGL() ? "3d" : "still") : m));
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (mode === "3d") return <Logo3D className={className} style={style} />;
  if (mode === "still")
    return (
      <div className={className} style={style} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={STILL} alt="Zenkai Media logo" className="h-full w-full object-contain" />
      </div>
    );
  return <div className={className} style={style} aria-hidden="true" />;
}
