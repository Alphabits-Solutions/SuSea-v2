import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Enterprise AI Agency";
  const category = searchParams.get("category") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#131315",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(171,199,255,0.18) 0%, transparent 65%)",
            display: "flex",
          }}
        />
        {/* Bottom-left glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-40px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(237,105,16,0.12) 0%, transparent 65%)",
            display: "flex",
          }}
        />

        {/* Category badge */}
        <div style={{ display: "flex", marginBottom: "28px", minHeight: "41px" }}>
          {category ? (
            <div
              style={{
                backgroundColor: "rgba(171,199,255,0.1)",
                border: "1px solid rgba(171,199,255,0.25)",
                borderRadius: "999px",
                padding: "8px 20px",
                color: "#abc7ff",
                fontSize: "15px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                display: "flex",
                alignSelf: "flex-start",
              }}
            >
              {category}
            </div>
          ) : null}
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 55 ? "50px" : title.length > 38 ? "62px" : "72px",
              fontWeight: "800",
              color: "#e4e2e4",
              lineHeight: 1.08,
              maxWidth: "960px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(228,226,228,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Logo mark */}
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #abc7ff 0%, #ed6910 100%)",
                display: "flex",
              }}
            />
            <div
              style={{
                color: "#e4e2e4",
                fontSize: "26px",
                fontWeight: "700",
                letterSpacing: "-0.02em",
                display: "flex",
              }}
            >
              Susea.ai
            </div>
          </div>
          <div
            style={{
              color: "rgba(228,226,228,0.35)",
              fontSize: "16px",
              display: "flex",
            }}
          >
            Enterprise AI Agency
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
