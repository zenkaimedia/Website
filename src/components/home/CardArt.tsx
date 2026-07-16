const PATTERNS = {
  grid: (
    <pattern id="p-grid" width="18" height="18" patternUnits="userSpaceOnUse">
      <path d="M18 0H0V18" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </pattern>
  ),
  dots: (
    <pattern id="p-dots" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="currentColor" />
    </pattern>
  ),
  diagonal: (
    <pattern id="p-diagonal" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d="M0 0V14" stroke="currentColor" strokeWidth="0.75" />
    </pattern>
  ),
  waves: (
    <pattern id="p-waves" width="40" height="20" patternUnits="userSpaceOnUse">
      <path d="M0 10 Q10 0 20 10 T40 10" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </pattern>
  ),
} as const;

type PatternKey = keyof typeof PATTERNS;

export default function CardArt({ pattern }: { pattern: PatternKey }) {
  const id = `p-${pattern}`;
  return (
    <svg className="absolute inset-0 h-full w-full text-current opacity-[0.14]" aria-hidden="true">
      <defs>{PATTERNS[pattern]}</defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
