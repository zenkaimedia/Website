import PageTransitionController from "./PageTransitionController";

/* Page-to-page transition (animation only — no layout/design changes).

   The site's links are plain <a> tags; PageTransitionController catches the
   internal ones and routes them through Next's client-side router (no document
   reload):
   • Leaving: the page body fades out (the fixed navbar + floating CTA stay
     put), then router.push() swaps in the new route.
   • Arriving: the new route is hidden before it paints, then revealed —
     sections fade up, the hero <h1> rises line-by-line out of a mask.
   If Next ever falls back to a full document load, the pre-paint script below
   picks up the hand-off flag and runs the same arrival (no flash).

   Refresh, direct URLs and back/forward never set the flag, so they behave
   exactly as before. Reduced motion skips the whole thing. */

const CSS = `
@media (prefers-reduced-motion: no-preference) {
  html.zk-pt-enter main > :not(header) { opacity: 0; }
  html.zk-pt-in main > :not(header) {
    animation: zk-pt-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  html.zk-pt-leave main > :not(header) {
    opacity: 0 !important;
    transition: opacity 320ms cubic-bezier(0.22, 1, 0.36, 1) !important;
  }
}
@keyframes zk-pt-rise {
  from { opacity: 0; transform: translateY(1.5rem); }
  to { opacity: 1; transform: none; }
}
`;

// Runs before <main> is parsed. Only fires when this load was started by the
// transition (flag written on click, matched to this exact path, short-lived).
// Safety net: if the controller hasn't taken over within 2.5s (very slow
// device, JS failure), play the plain section fade-up so the page still shows.
const PRE_PAINT = `try{var d=document.documentElement,s=sessionStorage.getItem('zk-pt');sessionStorage.removeItem('zk-pt');if(s&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var o=JSON.parse(s);if(o.p===location.pathname&&Date.now()-o.t<15000){d.classList.add('zk-pt-enter');window.__zkPtFallback=setTimeout(function(){d.classList.add('zk-pt-in');d.classList.remove('zk-pt-enter');setTimeout(function(){d.classList.remove('zk-pt-in')},800)},2500)}}}catch(e){}`;

export default function PageTransition() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      <PageTransitionController />
    </>
  );
}
