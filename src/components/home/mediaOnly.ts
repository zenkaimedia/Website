/* Screen-size gating for images that are only visible on one side of the md
   (768px) breakpoint. A hidden <img> still downloads, so the image is wrapped
   in <picture> with a <source> that swaps in this 1×1 blank on the other side
   — the browser then never requests the real file there.

     <picture className="contents">
       <source media={DESKTOP} srcSet={BLANK_IMG} />   ← mobile-only image
       <img src="…" />
     </picture>
*/
export const BLANK_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** Matches where md: styles apply (Tailwind md = 48rem = 768px). */
export const DESKTOP = "(min-width: 768px)";
/** Everything below md. */
export const MOBILE = "(max-width: 767.98px)";
