/**
 * External dependencies.
 */
import { ImageResponse } from "next/og";

/**
 * Internal dependencies.
 */
import { siteConfig } from "../utils";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0c1018",
          backgroundImage:
            "radial-gradient(900px 500px at 15% 0%, rgba(122,107,240,0.35), transparent 65%)," +
            "radial-gradient(700px 500px at 100% 100%, rgba(94,200,240,0.22), transparent 60%)",
          fontFamily: "sans-serif",
          color: "#f2f3f7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="52" height="52" viewBox="0 0 32 32" fill="none">
            <circle cx="8.5" cy="16" r="3.75" fill="#7a9eff" />
            <path
              d="M15.5 9.5a9 9 0 0 1 0 13"
              stroke="#9b8cf5"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M21.5 5.5a15 15 0 0 1 0 21"
              stroke="#e56ab8"
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity="0.65"
            />
          </svg>
          <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em" }}>
            {siteConfig.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              lineHeight: 1.02,
            }}
          >
            {siteConfig.tagline}
          </span>
          <span style={{ fontSize: 30, color: "#a5a9b4", maxWidth: 880, lineHeight: 1.4 }}>
            Run Google Lighthouse on one page or hundreds, then compare the scores side by side.
          </span>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Performance", "Accessibility", "Best Practices", "SEO"].map((label) => (
            <span
              key={label}
              style={{
                fontSize: 22,
                color: "#c9ccd6",
                border: "1px solid rgba(242,243,247,0.18)",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
