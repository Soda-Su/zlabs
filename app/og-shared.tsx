export const ogImageSize = {
  width: 1200,
  height: 630
};

export const ogImageContentType = "image/png";

type OgTemplateProps = {
  kicker: string;
  title: string;
  description: string;
  accent?: "warm" | "cool" | "balanced";
};

const accentMap = {
  warm: {
    primary: "rgba(247, 203, 132, 0.48)",
    secondary: "rgba(236, 160, 121, 0.28)"
  },
  cool: {
    primary: "rgba(156, 191, 238, 0.42)",
    secondary: "rgba(154, 208, 198, 0.24)"
  },
  balanced: {
    primary: "rgba(180, 202, 232, 0.38)",
    secondary: "rgba(241, 207, 164, 0.3)"
  }
} as const;

export function OgTemplate({
  kicker,
  title,
  description,
  accent = "balanced"
}: OgTemplateProps) {
  const colors = accentMap[accent];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "46px",
        background:
          "linear-gradient(135deg, rgba(249,248,245,1) 0%, rgba(244,241,236,1) 100%)",
        color: "#171717",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        position: "relative"
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          inset: "22px",
          borderRadius: "28px",
          border: "1px solid rgba(23,23,23,0.08)",
          overflow: "hidden",
          background: "rgba(255,255,255,0.82)"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 18% 28%, ${colors.secondary} 0, rgba(255,255,255,0) 34%), radial-gradient(circle at 78% 24%, ${colors.primary} 0, rgba(255,255,255,0) 38%), linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.76) 100%)`
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "44px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "rgba(23,23,23,0.56)"
            }}
          >
            <span>{kicker}</span>
            <span>Z Labs</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
              maxWidth: "860px"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                padding: "12px 18px",
                borderRadius: "999px",
                border: "1px solid rgba(23,23,23,0.1)",
                fontSize: 24,
                color: "rgba(23,23,23,0.6)",
                background: "rgba(255,255,255,0.7)"
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                fontSize: 72,
                lineHeight: 1.02,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 30,
                lineHeight: 1.35,
                color: "rgba(23,23,23,0.68)",
                display: "flex",
                maxWidth: "900px"
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 22,
              color: "rgba(23,23,23,0.5)"
            }}
          >
            <span>A quieter room for research, trust, and serious people.</span>
            <span>thezlabs.org</span>
          </div>
        </div>
      </div>
    </div>
  );
}
