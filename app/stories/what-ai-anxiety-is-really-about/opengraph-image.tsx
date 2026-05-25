import { ImageResponse } from "next/og";
import { ogImageContentType, ogImageSize } from "../../og-shared";

export const alt = "What AI Anxiety Is Really About";
export const size = ogImageSize;
export const contentType = ogImageContentType;

function BridgeArt() {
  return (
    <svg
      width="1200"
      height="360"
      viewBox="0 0 1200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        inset: "auto 0 0 0",
        width: "100%",
        height: "58%"
      }}
    >
      <g stroke="#EE4E22" strokeLinecap="round" strokeLinejoin="round">
        <path d="M-20 228C89 204 152 163 222 98C295 30 332 4 403 4C475 4 559 43 697 108C841 176 938 177 1030 115C1097 70 1148 18 1220 -12" strokeWidth="6" />
        <path d="M-10 236H1210" strokeWidth="16" />
        <path d="M-10 252H1210" strokeWidth="5" opacity="0.58" />
        <path d="M217 34H347V58H217V34Z" fill="#EE4E22" stroke="none" />
        <path d="M223 60H256V286H223V60Z" fill="#EE4E22" stroke="none" />
        <path d="M309 60H342V286H309V60Z" fill="#EE4E22" stroke="none" />
        <path d="M856 18H986V42H856V18Z" fill="#EE4E22" stroke="none" />
        <path d="M862 44H894V286H862V44Z" fill="#EE4E22" stroke="none" />
        <path d="M950 44H982V286H950V44Z" fill="#EE4E22" stroke="none" />
        <path d="M238 58C233 126 231 182 231 236" strokeWidth="5" />
        <path d="M326 58C331 126 334 182 334 236" strokeWidth="5" />
        <path d="M878 42C872 118 870 182 870 236" strokeWidth="5" />
        <path d="M966 42C972 118 975 182 975 236" strokeWidth="5" />
        <path d="M344 112V236" strokeWidth="3" />
        <path d="M388 132V236" strokeWidth="3" />
        <path d="M434 150V236" strokeWidth="3" />
        <path d="M484 166V236" strokeWidth="3" />
        <path d="M536 178V236" strokeWidth="3" />
        <path d="M592 184V236" strokeWidth="3" />
        <path d="M650 184V236" strokeWidth="3" />
        <path d="M708 178V236" strokeWidth="3" />
        <path d="M764 166V236" strokeWidth="3" />
        <path d="M816 150V236" strokeWidth="3" />
        <path d="M165 164V236" strokeWidth="3" />
        <path d="M102 198V236" strokeWidth="3" />
        <path d="M1030 128V236" strokeWidth="3" />
        <path d="M1070 156V236" strokeWidth="3" />
      </g>

      <g>
        <path d="M318 45C333 30 362 28 384 42" stroke="#73C8EF" strokeWidth="10" strokeLinecap="round" />
        <path d="M362 46C389 35 422 43 443 67" stroke="#BEE9A8" strokeWidth="10" strokeLinecap="round" />
        <path d="M307 78C291 88 283 117 289 151" stroke="#F38AD8" strokeWidth="11" strokeLinecap="round" />
        <path d="M399 68C414 86 421 115 414 145" stroke="#FFD34F" strokeWidth="11" strokeLinecap="round" />
        <path d="M292 79V203" stroke="#F38AD8" strokeWidth="8" strokeLinecap="round" />
        <path d="M399 67V188" stroke="#BEE9A8" strokeWidth="7" strokeLinecap="round" />

        <circle cx="435" cy="116" r="24" fill="#FF4EAB" />
        <circle cx="406" cy="132" r="24" fill="#FF4EAB" />
        <circle cx="407" cy="99" r="24" fill="#FF4EAB" />
        <circle cx="462" cy="132" r="24" fill="#FF4EAB" />
        <circle cx="462" cy="99" r="24" fill="#FF4EAB" />
        <circle cx="434" cy="116" r="14" fill="#FFD84C" />

        <rect x="468" y="153" width="88" height="66" rx="18" fill="#FFFFFF" />
        <rect x="477" y="161" width="70" height="48" rx="14" fill="#27262A" />
        <path d="M489 183C489 166 507 164 514 177C520 164 540 166 540 183C540 198 526 208 514 212C501 208 489 198 489 183Z" fill="#111111" />

        <rect x="275" y="90" width="20" height="120" rx="6" fill="#FFD84C" />

        <path d="M961 80C977 66 1003 67 1020 86" stroke="#F38AD8" strokeWidth="12" strokeLinecap="round" />
        <path d="M996 84V205" stroke="#F38AD8" strokeWidth="8" strokeLinecap="round" />
        <path d="M944 192H1040C1047 192 1052 197 1052 204V209C1052 216 1047 221 1040 221H944C937 221 932 216 932 209V204C932 197 937 192 944 192Z" fill="#D7EE72" />
        <path d="M950 230H1034C1041 230 1046 235 1046 242V247C1046 254 1041 259 1034 259H950C943 259 938 254 938 247V242C938 235 943 230 950 230Z" fill="#D7EE72" />
        <path d="M955 268H1029C1036 268 1041 273 1041 280V285C1041 292 1036 297 1029 297H955C948 297 943 292 943 285V280C943 273 948 268 955 268Z" fill="#D7EE72" />
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
            "linear-gradient(180deg, #f9c629 0%, #ffc61d 58%, #efb718 100%)",
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
              "radial-gradient(rgba(255,255,255,0.22) 0.8px, transparent 1px), radial-gradient(rgba(187,79,0,0.08) 0.7px, transparent 0.95px)",
            backgroundSize: "8px 8px, 11px 11px",
            backgroundPosition: "0 0, 3px 4px",
            opacity: 0.65
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
              maxWidth: "640px",
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
                background: "rgba(255,244,197,0.65)",
                fontSize: 22,
                color: "rgba(21,21,21,0.7)"
              }}
            >
              Clarity, not panic
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 72,
                fontWeight: 650,
                lineHeight: 1.01,
                letterSpacing: "-0.04em"
              }}
            >
              What AI Anxiety Is Really About
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: "540px",
                color: "rgba(21,21,21,0.74)",
                fontSize: 28,
                lineHeight: 1.34
              }}
            >
              A calmer editorial on why AI anxiety often reflects shifting
              norms of trust, judgment, and value.
            </div>
          </div>
        </div>

        <BridgeArt />
      </div>
    ),
    size
  );
}
