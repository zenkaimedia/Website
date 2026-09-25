/* Dot-built icons (white circles), matching the approved 2×5 hamburger:
   same dot-to-spacing ratio (3.43px dots on a ~4.08px pitch → 0.84).

   Dot centres are measured from the original artwork, in its own pixel units:
     cross.png (3920²), rightdownarrow.png (3920²), right-arrow.png (1270×2112).
   Each viewBox is the dot bounding box plus one radius of padding, so the
   rendered width/height is exactly the icon's footprint. */

type IconProps = { className?: string };

function Dots({
  viewBox,
  r,
  points,
  className = "",
}: {
  viewBox: string;
  r: number;
  points: [number, number][];
  className?: string;
}) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" className={`fill-white ${className}`}>
      {points.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </svg>
  );
}

/* ✕ — 13 dots, two diagonals through a shared centre (cross.png).
   Mean pitch 412.6 → r = 0.42 × pitch. */
const CROSS: [number, number][] = [
  [1091.4, 985.6], [2812.3, 985.6],
  [1396.0, 1298.3], [2514.0, 1298.3],
  [1689.8, 1599.5], [2221.7, 1599.7],
  [1955.2, 1872.1],
  [1689.8, 2144.0], [2221.2, 2144.3],
  [1396.3, 2438.6], [2513.9, 2438.9],
  [1091.3, 2733.6], [2812.6, 2733.6],
];
export function DotCross({ className = "" }: IconProps) {
  return <Dots viewBox="918 812.3 2067.9 2094.6" r={173.3} points={CROSS} className={className} />;
}

/* ↘ — 13 dots: a diagonal into an L corner (rightdownarrow.png).
   Row/column pitch ~445 → r = 0.42 × pitch. */
const CORNER: [number, number][] = [
  [1017.2, 984.0], [1514.3, 1491.5], [1989.5, 1985.2], [2403.1, 2475.3], // diagonal
  [2826.5, 1084.4], [2825.0, 1603.1], [2826.0, 2077.0], [2828.0, 2528.7], // right column
  [1093.4, 2896.8], [1555.9, 2896.7], [2007.6, 2896.7], [2445.8, 2897.3], // bottom row
  [2840.9, 2931.0], // corner
];
export function DotArrowDownRight({ className = "" }: IconProps) {
  return <Dots viewBox="830.3 797.1 2197.5 2320.8" r={186.9} points={CORNER} className={className} />;
}

/* Telephone handset — 64 dots on a 13×13 grid, read dot-for-dot off the
   reference (receiver runs from the upper-left earpiece down to the lower-right
   mouthpiece). Reference dots are 9px on an 11.4px pitch → radius 0.394 of the
   step. Drawn in currentColor so it follows its container (white/black).
   "1" = dot. */
const PHONE_ROWS = [
  "0110000000000",
  "1111000000000",
  "1111100000000",
  "1111100000000",
  "1111000000000",
  "0111000000000",
  "0111100000000",
  "0011110000000",
  "0001111001100",
  "0000111111110",
  "0000011111111",
  "0000001111111",
  "0000000011110",
];
const PHONE_STEP = 10;
const PHONE: [number, number][] = PHONE_ROWS.flatMap((row, y) =>
  [...row].flatMap((cell, x) =>
    cell === "1" ? [[x * PHONE_STEP + PHONE_STEP / 2, y * PHONE_STEP + PHONE_STEP / 2] as [number, number]] : []
  )
);
export function DotPhone({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 130 130" aria-hidden="true" fill="currentColor" className={className}>
      {PHONE.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.94} />
      ))}
    </svg>
  );
}

/* › — 5-dot chevron, rebuilt on an exact grid from the reference button:
   dots step 10 units across and 10 down (a true 45°), radius 4.18 (0.418 of
   the step, as measured), tip on the middle row. viewBox = dot extents, so the
   icon's box is its visual footprint (≈10 × 17px at the reference size). */
const CHEVRON: [number, number][] = [
  [4.18, 4.18],
  [14.18, 14.18],
  [24.18, 24.18],
  [14.18, 34.18],
  [4.18, 44.18],
];
export function DotChevron({ className = "" }: IconProps) {
  return <Dots viewBox="0 0 28.36 48.36" r={4.18} points={CHEVRON} className={className} />;
}
