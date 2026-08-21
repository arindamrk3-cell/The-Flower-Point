/**
 * GarlandDivider — the signature motif for The Flower Point.
 *
 * A hand-strung marigold-and-leaf garland, drawn as a wavy line so it can
 * stretch to any width. Marigold garlands are the one image that reads as
 * "wedding + puja decoration" at a glance, so this replaces generic hairline
 * borders throughout the site.
 *
 * Props:
 *  - tone: "wine" | "ivory"  — controls the strand color, flowers stay marigold
 *  - flip: boolean           — mirrors the wave vertically
 *  - className: string       — sizing/positioning, e.g. "h-4 w-full"
 */
const GarlandDivider = ({ tone = "wine", flip = false, className = "" }) => {
  const strand = tone === "ivory" ? "#FBF4EC" : "#6E1F32";
  const marigold = "#D89A2D";
  const marigoldDeep = "#B97E1E";
  const leaf = "#4B5842";

  const width = 1200;
  const amplitude = 14;
  const baseline = 30;
  const step = 48;
  const count = Math.floor(width / step);

  const points = Array.from({ length: count + 1 }, (_, i) => {
    const x = i * step;
    const y = baseline + Math.sin(i * 0.9) * amplitude * (flip ? -1 : 1);
    return { x, y, isFlower: i % 2 === 0 };
  });

  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `Q ${points[i - 1].x + step / 2} ${points[i - 1].y} ${p.x} ${p.y}`))
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} 60`}
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path d={path} fill="none" stroke={strand} strokeWidth="1.5" strokeOpacity="0.55" />
      {points.map((p, i) =>
        p.isFlower ? (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill={marigold} />
            <circle cx={p.x} cy={p.y} r="6" fill="none" stroke={marigoldDeep} strokeWidth="0.75" />
            <circle cx={p.x} cy={p.y} r="2" fill={marigoldDeep} />
          </g>
        ) : (
          <path
            key={i}
            d={`M ${p.x - 5} ${p.y} Q ${p.x} ${p.y - 8} ${p.x + 5} ${p.y} Q ${p.x} ${p.y + 4} ${p.x - 5} ${p.y}`}
            fill={leaf}
            opacity="0.85"
          />
        )
      )}
    </svg>
  );
};

export default GarlandDivider;