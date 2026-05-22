import { ImageResponse } from "next/og";
import { ExportSafePixelAvatar } from "../avatar";
import { archetypeRegistry } from "../data";
import { deserializeResultState } from "../logic";

const CARD_WIDTH = 3600;
const CARD_HEIGHT = 1890;

function traitLine(traits: readonly string[]) {
  return traits.join(" / ");
}

function titleFontSize(title: string) {
  if (title.length > 18) {
    return "180px";
  }

  if (title.length > 14) {
    return "188px";
  }

  return "214px";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const result =
    deserializeResultState(url.searchParams) ??
    {
      archetype: "catalyst" as const,
      signal: "speculative" as const,
      recipe: {
        palette: "electric" as const,
        expression: "mischief" as const,
        accessory: "star" as const,
        aura: "flare" as const,
        frame: "beacon" as const
      }
    };

  const definition = archetypeRegistry[result.archetype];

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "72px",
          background: "#ece9e2",
          color: "#171717",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            gap: "132px",
            padding: "156px",
            borderRadius: "84px",
            border: "2px solid rgba(23,23,23,0.08)",
            background: "#f8f6f1",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              flex: "1 1 0%",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingRight: "24px"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "72px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "58px",
                  lineHeight: 1,
                  color: "rgba(23,23,23,0.46)"
                }}
              >
                <span>Your AI Archetype</span>
                <span>thezlabs.org</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "42px",
                  maxWidth: "1640px"
                }}
              >
                <h1
                  style={{
                    margin: 0,
                    fontSize: titleFontSize(definition.title),
                    lineHeight: 0.95,
                    letterSpacing: "-0.05em",
                    fontWeight: 620
                  }}
                >
                  {definition.title}
                </h1>

                <p
                  style={{
                    margin: 0,
                    maxWidth: "1320px",
                    fontSize: "78px",
                    lineHeight: 1.18,
                    color: "rgba(23,23,23,0.7)"
                  }}
                >
                  {definition.oneLiner}
                </p>

                <p
                  style={{
                    margin: 0,
                    fontSize: "48px",
                    lineHeight: 1.2,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    color: "rgba(23,23,23,0.42)"
                  }}
                >
                  {traitLine(definition.traits)}
                </p>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                maxWidth: "1480px",
                display: "flex",
                flexDirection: "column",
                gap: "38px",
                paddingTop: "48px",
                borderTop: "2px solid rgba(23,23,23,0.08)"
              }}
            >
              <span
                style={{
                  fontSize: "46px",
                  lineHeight: 1,
                  color: "rgba(23,23,23,0.42)"
                }}
              >
                In your lab
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: "84px",
                  lineHeight: 1.16,
                  color: "rgba(23,23,23,0.74)"
                }}
              >
                {definition.labLine}
              </p>
            </div>
          </div>

          <div
            style={{
              width: "1220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "72px",
                borderRadius: "68px",
                border: "2px solid rgba(23,23,23,0.08)",
                background: "#f2efe8"
              }}
            >
              <ExportSafePixelAvatar
                archetype={result.archetype}
                recipe={result.recipe}
                size={980}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: CARD_WIDTH,
      height: CARD_HEIGHT
    }
  );

  imageResponse.headers.set(
    "Content-Disposition",
    `attachment; filename="${result.archetype}-avatar-card.png"`
  );

  return imageResponse;
}
