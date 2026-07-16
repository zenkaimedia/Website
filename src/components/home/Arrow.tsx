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
  const src =
    dir === "down"
      ? "/assets/general/down-arrow.png"
      : "/assets/general/right-arrow.png";
  const size = dir === "down" ? "h-2.5 w-auto" : "h-3 w-auto";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${size} shrink-0 object-contain ${invert ? "[filter:invert(1)]" : ""} ${className}`}
    />
  );
}
