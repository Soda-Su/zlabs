import { ImageResponse } from "next/og";
import { PixelAvatar } from "../avatar";
import { archetypeRegistry, paletteRegistry } from "../data";
import { getDisplayScoresForResult } from "../logic";
import { deserializeResultState } from "../logic";
import { QuadrantMap } from "../quadrant-map";

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
  const palette = paletteRegistry.find((item) => item.id === result.recipe.palette) ?? paletteRegistry[0];
  const scores = getDisplayScoresForResult(result);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "34px",
          background:
            "linear-gradient(135deg, rgba(247,247,245,1) 0%, rgba(242,240,235,1) 100%)",
          color: "#171717",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: "28px",
            borderRadius: "32px",
            border: "1px solid rgba(23,23,23,0.08)",
            padding: "28px",
            background:
              "radial-gradient(circle at 14% 18%, rgba(255,255,255,0.72), transparent 22%), radial-gradient(circle at 85% 18%, rgba(126,245,255,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0.95), rgba(251,249,245,0.99))",
            boxShadow: "0 22px 70px rgba(16,16,16,0.06)"
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "24px"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 20,
                  color: "rgba(23,23,23,0.54)"
                }}
              >
                <span>Your AI Archetype</span>
                <span>thezlabs.org</span>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(23,23,23,0.1)",
                  background: "rgba(255,255,255,0.82)",
                  fontSize: 22,
                  color: "rgba(23,23,23,0.6)"
                }}
              >
                {result.signal === "speculative" ? "Speculative" : "Grounded"} signal
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 70,
                  lineHeight: 0.96,
                  letterSpacing: "-0.03em",
                  fontWeight: 620
                }}
              >
                {definition.title}
              </h1>
              <p
                style={{
                  margin: 0,
                  maxWidth: "580px",
                  fontSize: 30,
                  lineHeight: 1.34,
                  color: "rgba(23,23,23,0.68)"
                }}
              >
                {definition.oneLiner}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "14px",
                alignItems: "stretch"
              }}
            >
              <div
                style={{
                  minWidth: "220px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  padding: "16px 18px",
                  borderRadius: "22px",
                  border: "1px solid rgba(23,23,23,0.08)",
                  background: "rgba(255,255,255,0.78)"
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: "rgba(23,23,23,0.46)"
                  }}
                >
                  Work map
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <QuadrantMap
                    drive={scores.drive}
                    orbit={scores.orbit}
                    currentLabel={definition.name}
                    size={216}
                    compact
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {definition.traits.map((trait) => (
                  <span
                    key={trait}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: "40px",
                      padding: "0 18px",
                      borderRadius: "999px",
                      border: "1px solid rgba(23,23,23,0.08)",
                      background: "rgba(255,255,255,0.88)",
                      fontSize: 20,
                      color: "rgba(23,23,23,0.6)"
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "18px",
                paddingTop: "4px"
              }}
            >
              <p
                style={{
                  margin: 0,
                  maxWidth: "580px",
                  fontSize: 20,
                  lineHeight: 1.5,
                  color: "rgba(23,23,23,0.52)"
                }}
              >
                {definition.labLine}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "6px"
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: "rgba(23,23,23,0.42)"
                  }}
                >
                  Palette
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    minHeight: "38px",
                    padding: "0 16px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.86)",
                    border: "1px solid rgba(23,23,23,0.08)",
                    fontSize: 19,
                    color: "rgba(23,23,23,0.6)"
                  }}
                >
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "999px",
                      background: palette.accent,
                      border: "1px solid rgba(23,23,23,0.08)"
                    }}
                  />
                  {palette.label}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              width: "382px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
                padding: "18px 18px 22px",
                borderRadius: "28px",
                border: "1px solid rgba(23,23,23,0.08)",
                background:
                  "radial-gradient(circle at 50% 10%, rgba(255,255,255,0.72), transparent 30%), linear-gradient(180deg, rgba(245,243,238,0.95), rgba(255,255,255,0.92))"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  fontSize: 16,
                  color: "rgba(23,23,23,0.46)"
                }}
              >
                <span>{result.recipe.expression}</span>
                <span>{result.recipe.accessory}</span>
              </div>
              <PixelAvatar
                archetype={result.archetype}
                recipe={result.recipe}
                size={316}
              />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  width: "100%"
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: "56px",
                    borderRadius: "18px",
                    border: "1px solid rgba(23,23,23,0.08)",
                    background: "rgba(255,255,255,0.78)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px 14px"
                  }}
                >
                  <span style={{ fontSize: 14, color: "rgba(23,23,23,0.44)" }}>
                    Expression
                  </span>
                  <span style={{ fontSize: 18, color: "rgba(23,23,23,0.68)" }}>
                    {result.recipe.expression}
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    minHeight: "56px",
                    borderRadius: "18px",
                    border: "1px solid rgba(23,23,23,0.08)",
                    background: "rgba(255,255,255,0.78)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "10px 14px"
                  }}
                >
                  <span style={{ fontSize: 14, color: "rgba(23,23,23,0.44)" }}>
                    Accessory
                  </span>
                  <span style={{ fontSize: 18, color: "rgba(23,23,23,0.68)" }}>
                    {result.recipe.accessory}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
