import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "Too Many Ideas, Too Little Energy";
export const size = ogImageSize;
export const contentType = ogImageContentType;

function IdeaField() {
  return (
    <svg
      width="1200"
      height="390"
      viewBox="0 0 1200 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        inset: "auto 0 0 0",
        width: "100%",
        height: "62%"
      }}
    >
      <g opacity="0.98">
        <path
          d="M74 268C174 196 280 175 392 205C495 233 573 302 692 296C816 290 884 203 1015 186C1086 177 1143 188 1194 219"
          stroke="#151515"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M0 312H1200"
          stroke="#151515"
          strokeWidth="18"
          strokeLinecap="round"
        />
      </g>

      <g>
        {([
          [168, 58, "#EE4E22"],
          [255, 102, "#73C8EF"],
          [342, 42, "#F38AD8"],
          [468, 96, "#BEE9A8"],
          [584, 50, "#FFD34F"],
          [708, 114, "#EE4E22"],
          [846, 54, "#73C8EF"],
          [986, 98, "#F38AD8"]
        ] as const).map(([cx, cy, fill], index) => (
          <g key={`${cx}-${cy}`}>
            <path
              d={`M${cx} ${cy + 50}C${Number(cx) - 18} ${Number(cy) + 34} ${
                Number(cx) - 20
              } ${Number(cy) + 12} ${cx} ${cy}C${Number(cx) + 20} ${
                Number(cy) + 12
              } ${Number(cx) + 18} ${Number(cy) + 34} ${cx} ${cy + 50}Z`}
              fill={String(fill)}
            />
            <circle cx={Number(cx)} cy={Number(cy) + 20} r="23" fill={String(fill)} />
            <path
              d={`M${Number(cx) - 13} ${Number(cy) + 66}H${Number(cx) + 13}`}
              stroke="#151515"
              strokeWidth="5"
              strokeLinecap="round"
              opacity={index % 2 === 0 ? 0.75 : 0.45}
            />
          </g>
        ))}
      </g>

      <g transform="translate(504 184)">
        <rect x="0" y="0" width="206" height="98" rx="34" fill="#FFFFFF" />
        <rect x="20" y="20" width="122" height="58" rx="20" fill="#151515" />
        <rect x="156" y="24" width="22" height="50" rx="9" fill="#151515" />
        <rect x="28" y="28" width="64" height="42" rx="14" fill="#D7EE72" />
      </g>

      <g stroke="#151515" strokeLinecap="round" opacity="0.28">
        <path d="M168 132V298" strokeWidth="4" />
        <path d="M255 176V298" strokeWidth="4" />
        <path d="M342 116V298" strokeWidth="4" />
        <path d="M468 170V298" strokeWidth="4" />
        <path d="M584 124V298" strokeWidth="4" />
        <path d="M708 188V298" strokeWidth="4" />
        <path d="M846 128V298" strokeWidth="4" />
        <path d="M986 172V298" strokeWidth="4" />
      </g>
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, #f7efe2 0%, #f0dfc4 56%, #e4c68f 100%)",
          color: "#151515",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(21,21,21,0.09) 0.9px, transparent 1px), radial-gradient(rgba(255,255,255,0.42) 0.8px, transparent 1px)",
            backgroundSize: "9px 9px, 13px 13px",
            backgroundPosition: "0 0, 4px 5px",
            opacity: 0.74
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "42px 46px 34px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "rgba(21,21,21,0.66)",
              fontSize: 22
            }}
          >
            <span>Z Labs Editorial</span>
            <span>thezlabs.org</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "690px",
              gap: "18px",
              marginTop: "26px"
            }}
          >
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "10px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(21,21,21,0.12)",
                background: "rgba(255,255,255,0.48)",
                fontSize: 22,
                color: "rgba(21,21,21,0.7)"
              }}
            >
              Ideas, energy, sequence
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 70,
                fontWeight: 650,
                lineHeight: 1.02
              }}
            >
              Too Many Ideas, Too Little Energy
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: "610px",
                color: "rgba(21,21,21,0.74)",
                fontSize: 28,
                lineHeight: 1.34
              }}
            >
              A founder note on idea surplus, option debt, and choosing what
              gets to live now.
            </div>
          </div>
        </div>

        <IdeaField />
      </div>
    ),
    size
  );
}
