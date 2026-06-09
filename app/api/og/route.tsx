import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.3), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,0.2), transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: "#14b8a6",
                borderRadius: "4px",
              }}
            />
            <span
              style={{
                fontSize: "28px",
                fontFamily: "monospace",
                color: "#f5f5f7",
                fontWeight: 500,
              }}
            >
              Goon
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "56px",
              fontFamily: "system-ui, sans-serif",
              color: "#f5f5f7",
              textAlign: "center",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              maxWidth: "800px",
              marginBottom: "24px",
            }}
          >
            Describe your business.
            <br />
            Get a{" "}
            <span
              style={{
                background: "linear-gradient(to right, #06b6d4, #14b8a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              live page
            </span>{" "}
            in seconds.
          </h1>

          {/* Subhead */}
          <p
            style={{
              fontSize: "20px",
              fontFamily: "system-ui, sans-serif",
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: "600px",
              lineHeight: 1.5,
            }}
          >
            Goon turns a one-line description into a polished, conversion-ready
            landing page — copy, layout, and design handled. You just ship.
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
