import { DotChevron } from "./DotIcons";

/* Dotted chevron arrows (white on transparent). Pass `invert` on light/white
   backgrounds so the white dots flip to black and stay visible. */
export function Arrow({
  dir = "right",
  invert = false,
  className = "",
}: {
  dir?: "right" | "down";
  invert?: boolean;
  className?: string;
}) {
  const flip = invert ? "[filter:invert(1)]" : "";
  if (dir === "right") {
    // Code-drawn dot chevron (same dot system as the mobile menu icons).
    return <DotChevron className={`h-3 w-auto shrink-0 ${flip} ${className}`} />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/general/down-arrow.png"
      alt=""
      aria-hidden="true"
      className={`h-2.5 w-auto shrink-0 object-contain ${flip} ${className}`}
    />
  );
}
