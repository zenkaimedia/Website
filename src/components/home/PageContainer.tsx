import type { ReactNode } from "react";

/* Single source of truth for the homepage's horizontal layout. Every standard
   content section wraps its content in this, so all left/right edges line up on
   one invisible grid. Only the horizontal rhythm lives here — sections keep
   their own vertical padding, background and other styles (passed via
   `className`). */
export default function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[108.125rem] px-5 sm:px-6 md:px-6 ${className}`}>
      {children}
    </div>
  );
}
