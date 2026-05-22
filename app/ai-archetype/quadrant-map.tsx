type QuadrantMapProps = {
  drive: number;
  orbit: number;
  currentLabel?: string;
  size?: number;
  compact?: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function getQuadrantPoint(drive: number, orbit: number) {
  const x = 50 + (clamp(drive, -2, 2) / 2) * 22;
  const y = 50 - (clamp(orbit, -2, 2) / 2) * 22;

  return { x, y };
}

export function QuadrantMap({
  drive,
  orbit,
  currentLabel,
  size = 320,
  compact = false
}: QuadrantMapProps) {
  const point = getQuadrantPoint(drive, orbit);
  const labelSize = compact ? 4.8 : 5.4;
  const axisSize = compact ? 4.4 : 4.8;
  const pointRadius = compact ? 3.2 : 3.8;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <rect
        x="4"
        y="4"
        width="92"
        height="92"
        rx="12"
        fill="rgba(255,255,255,0.72)"
        stroke="rgba(16,16,16,0.08)"
      />
      <line x1="50" y1="12" x2="50" y2="88" stroke="rgba(16,16,16,0.18)" strokeWidth="1.2" />
      <line x1="12" y1="50" x2="88" y2="50" stroke="rgba(16,16,16,0.18)" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="1.4" fill="rgba(16,16,16,0.24)" />

      <text x="50" y="8" textAnchor="middle" fontSize={axisSize} fill="rgba(16,16,16,0.56)">
        Social
      </text>
      <text x="50" y="96" textAnchor="middle" fontSize={axisSize} fill="rgba(16,16,16,0.56)">
        Solo
      </text>
      <text x="7" y="53" textAnchor="start" fontSize={axisSize} fill="rgba(16,16,16,0.56)">
        Observe
      </text>
      <text x="93" y="53" textAnchor="end" fontSize={axisSize} fill="rgba(16,16,16,0.56)">
        Act
      </text>

      <text x="19" y="24" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Guardian
      </text>
      <text x="19" y="30" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Mirror
      </text>
      <text x="81" y="24" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Conductor
      </text>
      <text x="81" y="30" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Catalyst
      </text>
      <text x="19" y="72" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Cartographer
      </text>
      <text x="19" y="78" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Dreamer
      </text>
      <text x="81" y="72" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Tinkerer
      </text>
      <text x="81" y="78" textAnchor="middle" fontSize={labelSize} fill="rgba(16,16,16,0.42)">
        Alchemist
      </text>

      <circle cx={point.x} cy={point.y} r={pointRadius + 2.6} fill="rgba(26,102,178,0.12)" />
      <circle
        cx={point.x}
        cy={point.y}
        r={pointRadius}
        fill="#ffffff"
        stroke="rgba(41,116,221,0.92)"
        strokeWidth="2.2"
      />

      {currentLabel ? (
        <g>
          <rect
            x={point.x - 14}
            y={point.y - 13}
            width="28"
            height="7"
            rx="3.5"
            fill="rgba(255,255,255,0.94)"
            stroke="rgba(16,16,16,0.08)"
          />
          <text
            x={point.x}
            y={point.y - 8.1}
            textAnchor="middle"
            fontSize={compact ? 3.4 : 3.8}
            fill="rgba(16,16,16,0.68)"
          >
            {currentLabel}
          </text>
        </g>
      ) : null}
    </svg>
  );
}
