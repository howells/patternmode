import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 120,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#52525b", // zinc-600
        borderRadius: "20px", // Rounded corners for iOS
      }}
    >
      {/* Pilcrow icon as SVG */}
      <svg
        fill="none"
        height="120"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        style={{ transform: "scaleX(-1)" }}
        viewBox="0 0 24 24"
        width="120" // Flip horizontally like in logo
      >
        <path d="M13 4v16" />
        <path d="M17 4v16" />
        <path d="M19 4H9.5a4.5 4.5 0 0 0 0 9H13" />
      </svg>
    </div>,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
