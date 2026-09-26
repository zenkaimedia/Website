"use client";

import { useEffect } from "react";

/* Light image protection: blocks the right-click menu and drag-to-save on
   images and videos (and anything marked `data-protected`). Deliberately
   nothing more — keyboard shortcuts, printing, copying text and screenshots
   all behave normally, so clients can save or print pages and accessibility
   tools keep working. */
export default function ProtectionProvider() {
  useEffect(() => {
    const isMedia = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      return !!el && (el.tagName === "IMG" || el.tagName === "VIDEO" || !!el.closest?.("[data-protected]"));
    };

    const onContextMenu = (e: MouseEvent) => {
      if (isMedia(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isMedia(e.target)) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
