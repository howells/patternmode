"use client";

import type { Meta, StoryObj } from "@storybook/react";
import "@patternmode/tailwind-config/shared-styles.css";
import { Text } from "../components/text";
import { VariantGrid } from "./utils/variant-grid";

/** Look up an item by key from an array. Returns the item or a fallback with empty strings. */
function findByKey<T extends { key: string }>(
  items: readonly T[],
  key: string,
): T {
  const found = items.find((item) => item.key === key);
  if (!found) {
    throw new Error(`Missing token: ${key}`);
  }
  return found;
}

const meta = {
  title: "Design System/Tokens",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** Color swatch cell */
function ColorSwatch({ className }: { className: string }) {
  return (
    <div className={`size-10 rounded border border-border ${className}`} />
  );
}

/** Shadow preview cell */
function ShadowPreview({ className }: { className: string }) {
  return <div className={`size-12 rounded bg-white ${className}`} />;
}

/** Blur preview cell */
function BlurPreview({ className }: { className: string }) {
  return (
    <div className="relative size-12 overflow-hidden rounded border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary" />
      <div className={`absolute inset-0 bg-white/50 ${className}`} />
    </div>
  );
}

/** Alpha preview cell */
function AlphaPreview({ className }: { className: string }) {
  return (
    <div className="relative size-10 overflow-hidden rounded border border-border">
      <div className="absolute inset-0 bg-[length:8px_8px] bg-[repeating-conic-gradient(#e5e7eb_0_25%,transparent_0_50%)]" />
      <div className={`absolute inset-0 ${className}`} />
    </div>
  );
}

/** Radius preview cell */
function RadiusPreview({ className }: { className: string }) {
  return <div className={`size-12 bg-primary ${className}`} />;
}

// Color token definitions
const BASE_COLORS = [
  { key: "primary", name: "Primary", class: "bg-primary", value: "#151821" },
  {
    key: "secondary",
    name: "Secondary",
    class: "bg-secondary",
    value: "#F4F4F6",
  },
  { key: "muted", name: "Muted", class: "bg-muted", value: "#E5E6E9" },
  { key: "accent", name: "Accent", class: "bg-accent", value: "#F4F4F6" },
  {
    key: "destructive",
    name: "Destructive",
    class: "bg-destructive",
    value: "#dc2626",
  },
  { key: "border", name: "Border", class: "bg-border", value: "#E5E6E9" },
];

const GRAY_COLORS = [
  { key: "gray-50", name: "Gray 50", class: "bg-gray-50", value: "#f9fafb" },
  { key: "gray-100", name: "Gray 100", class: "bg-gray-100", value: "#f3f4f6" },
  { key: "gray-200", name: "Gray 200", class: "bg-gray-200", value: "#e5e7eb" },
  { key: "gray-300", name: "Gray 300", class: "bg-gray-300", value: "#d1d5db" },
  { key: "gray-400", name: "Gray 400", class: "bg-gray-400", value: "#9ca3af" },
  { key: "gray-500", name: "Gray 500", class: "bg-gray-500", value: "#6b7280" },
  { key: "gray-600", name: "Gray 600", class: "bg-gray-600", value: "#4b5563" },
  { key: "gray-700", name: "Gray 700", class: "bg-gray-700", value: "#374151" },
  { key: "gray-800", name: "Gray 800", class: "bg-gray-800", value: "#1f2937" },
  { key: "gray-900", name: "Gray 900", class: "bg-gray-900", value: "#111827" },
  { key: "gray-950", name: "Gray 950", class: "bg-gray-950", value: "#030712" },
];

const SEMANTIC_COLORS = [
  {
    key: "brand-soft",
    name: "Brand Soft",
    class: "bg-brand-soft",
    value: "#fff7ed",
  },
  {
    key: "brand-accent",
    name: "Brand Accent",
    class: "bg-brand-accent",
    value: "#fdba74",
  },
  {
    key: "brand-foreground",
    name: "Brand FG",
    class: "bg-brand-foreground",
    value: "#9a3412",
  },
  {
    key: "affirmative-soft",
    name: "Affirmative Soft",
    class: "bg-affirmative-soft",
    value: "#f0fdf4",
  },
  {
    key: "affirmative-accent",
    name: "Affirmative Accent",
    class: "bg-affirmative-accent",
    value: "#22c55e",
  },
  {
    key: "affirmative-foreground",
    name: "Affirmative FG",
    class: "bg-affirmative-foreground",
    value: "#14532d",
  },
  {
    key: "warning-soft",
    name: "Warning Soft",
    class: "bg-warning-soft",
    value: "#fffbeb",
  },
  {
    key: "warning-accent",
    name: "Warning Accent",
    class: "bg-warning-accent",
    value: "#fcd34d",
  },
  {
    key: "warning-foreground",
    name: "Warning FG",
    class: "bg-warning-foreground",
    value: "#92400e",
  },
  {
    key: "error-soft",
    name: "Error Soft",
    class: "bg-error-soft",
    value: "#fef2f2",
  },
  {
    key: "error-accent",
    name: "Error Accent",
    class: "bg-error-accent",
    value: "#fca5a5",
  },
  {
    key: "error-foreground",
    name: "Error FG",
    class: "bg-error-foreground",
    value: "#991b1b",
  },
];

const ALPHA_COLORS = [
  {
    key: "black-5",
    name: "Black 5%",
    class: "bg-black/5",
    value: "rgba(0,0,0,0.05)",
  },
  {
    key: "black-10",
    name: "Black 10%",
    class: "bg-black/10",
    value: "rgba(0,0,0,0.10)",
  },
  {
    key: "black-20",
    name: "Black 20%",
    class: "bg-black/20",
    value: "rgba(0,0,0,0.20)",
  },
  {
    key: "black-30",
    name: "Black 30%",
    class: "bg-black/30",
    value: "rgba(0,0,0,0.30)",
  },
  {
    key: "black-50",
    name: "Black 50%",
    class: "bg-black/50",
    value: "rgba(0,0,0,0.50)",
  },
  {
    key: "black-70",
    name: "Black 70%",
    class: "bg-black/70",
    value: "rgba(0,0,0,0.70)",
  },
  {
    key: "white-5",
    name: "White 5%",
    class: "bg-white/5",
    value: "rgba(255,255,255,0.05)",
  },
  {
    key: "white-10",
    name: "White 10%",
    class: "bg-white/10",
    value: "rgba(255,255,255,0.10)",
  },
  {
    key: "white-20",
    name: "White 20%",
    class: "bg-white/20",
    value: "rgba(255,255,255,0.20)",
  },
  {
    key: "white-50",
    name: "White 50%",
    class: "bg-white/50",
    value: "rgba(255,255,255,0.50)",
  },
  {
    key: "white-70",
    name: "White 70%",
    class: "bg-white/70",
    value: "rgba(255,255,255,0.70)",
  },
];

// Shadow token definitions (gray-900 tinted — from Figma)
const BOX_SHADOWS = [
  {
    key: "shadow-2xs",
    name: "2xs",
    class: "shadow-2xs",
    value: "0 1px 0 0 rgb(17 24 39 / 0.10)",
  },
  {
    key: "shadow-xs",
    name: "xs",
    class: "shadow-xs",
    value: "0 1px 2px 0 rgb(17 24 39 / 0.10)",
  },
  {
    key: "shadow-sm",
    name: "sm",
    class: "shadow-sm",
    value: "0 1px 2px -1px, 0 1px 3px 0",
  },
  {
    key: "shadow-md",
    name: "md",
    class: "shadow-md",
    value: "0 2px 4px -2px, 0 4px 6px -1px",
  },
  {
    key: "shadow-lg",
    name: "lg",
    class: "shadow-lg",
    value: "0 4px 6px -4px, 0 10px 15px -3px",
  },
  {
    key: "shadow-xl",
    name: "xl",
    class: "shadow-xl",
    value: "0 8px 10px -6px, 0 20px 25px -5px",
  },
  {
    key: "shadow-2xl",
    name: "2xl",
    class: "shadow-2xl",
    value: "0 25px 50px -12px rgb(17 24 39 / 0.20)",
  },
  {
    key: "shadow-3xl",
    name: "3xl",
    class: "shadow-3xl",
    value: "multi-layer (3 layers, gray-900)",
  },
  {
    key: "shadow-4xl",
    name: "4xl",
    class: "shadow-4xl",
    value: "multi-layer (4 layers, gray-900)",
  },
];

// Inset shadow token definitions (from Figma)
const INSET_SHADOWS = [
  {
    key: "shadow-inner-2xs",
    name: "2xs",
    class: "shadow-inner-2xs",
    value: "inset 0 1px 0 0 rgb(0 0 0 / 0.05)",
  },
  {
    key: "shadow-inner-xs",
    name: "xs",
    class: "shadow-inner-xs",
    value: "inset 0 1px 1px 0 rgb(0 0 0 / 0.05)",
  },
  {
    key: "shadow-inner-sm",
    name: "sm",
    class: "shadow-inner-sm",
    value: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  },
];

const DROP_SHADOWS = [
  {
    key: "drop-shadow-xs",
    name: "xs",
    class: "drop-shadow-xs",
    value: "0 1px 1px rgb(0 0 0 / 0.05)",
  },
  {
    key: "drop-shadow-sm",
    name: "sm",
    class: "drop-shadow-sm",
    value: "0 1px 2px rgb(0 0 0 / 0.15)",
  },
  {
    key: "drop-shadow-md",
    name: "md",
    class: "drop-shadow-md",
    value: "0 3px 3px rgb(0 0 0 / 0.12)",
  },
  {
    key: "drop-shadow-lg",
    name: "lg",
    class: "drop-shadow-lg",
    value: "0 4px 4px rgb(0 0 0 / 0.15)",
  },
  {
    key: "drop-shadow-xl",
    name: "xl",
    class: "drop-shadow-xl",
    value: "0 9px 7px rgb(0 0 0 / 0.1)",
  },
  {
    key: "drop-shadow-2xl",
    name: "2xl",
    class: "drop-shadow-2xl",
    value: "0 25px 25px rgb(0 0 0 / 0.15)",
  },
];

// Blur token definitions
const BLURS = [
  { key: "blur-none", name: "none", class: "blur-none", value: "0" },
  { key: "blur-xs", name: "xs", class: "blur-xs", value: "4px" },
  { key: "blur-sm", name: "sm", class: "blur-sm", value: "8px" },
  { key: "blur-md", name: "md", class: "blur-md", value: "12px" },
  { key: "blur-lg", name: "lg", class: "blur-lg", value: "16px" },
  { key: "blur-xl", name: "xl", class: "blur-xl", value: "24px" },
  { key: "blur-2xl", name: "2xl", class: "blur-2xl", value: "40px" },
  { key: "blur-3xl", name: "3xl", class: "blur-3xl", value: "64px" },
];

// Backdrop blur token definitions (from Figma — same scale as blur)
const BACKDROP_BLURS = [
  {
    key: "backdrop-blur-none",
    name: "none",
    class: "backdrop-blur-none",
    value: "0",
  },
  {
    key: "backdrop-blur-xs",
    name: "xs",
    class: "backdrop-blur-xs",
    value: "4px",
  },
  {
    key: "backdrop-blur-sm",
    name: "sm",
    class: "backdrop-blur-sm",
    value: "8px",
  },
  {
    key: "backdrop-blur-md",
    name: "md",
    class: "backdrop-blur-md",
    value: "12px",
  },
  {
    key: "backdrop-blur-lg",
    name: "lg",
    class: "backdrop-blur-lg",
    value: "16px",
  },
  {
    key: "backdrop-blur-xl",
    name: "xl",
    class: "backdrop-blur-xl",
    value: "24px",
  },
  {
    key: "backdrop-blur-2xl",
    name: "2xl",
    class: "backdrop-blur-2xl",
    value: "40px",
  },
  {
    key: "backdrop-blur-3xl",
    name: "3xl",
    class: "backdrop-blur-3xl",
    value: "64px",
  },
];

// Radius token definitions
const RADII = [
  { key: "rounded-2xs", name: "2xs", class: "rounded-2xs", value: "1px" },
  { key: "rounded-xs", name: "xs", class: "rounded-xs", value: "2px" },
  { key: "rounded-sm", name: "sm", class: "rounded-sm", value: "4px" },
  { key: "rounded-md", name: "md", class: "rounded-md", value: "6px" },
  { key: "rounded-lg", name: "lg", class: "rounded-lg", value: "8px" },
  { key: "rounded-xl", name: "xl", class: "rounded-xl", value: "12px" },
  { key: "rounded-2xl", name: "2xl", class: "rounded-2xl", value: "16px" },
  { key: "rounded-3xl", name: "3xl", class: "rounded-3xl", value: "24px" },
  { key: "rounded-4xl", name: "4xl", class: "rounded-4xl", value: "32px" },
  { key: "rounded-full", name: "full", class: "rounded-full", value: "9999px" },
];

/** Base color tokens */
export const Colors: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "swatch", label: "Swatch" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const color = findByKey(BASE_COLORS, rowKey);
        if (colKey === "swatch") {
          return <ColorSwatch className={color.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {color.key}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {color.value}
          </Text>
        );
      }}
      rowLabels="Color"
      rows={BASE_COLORS.map((c) => ({
        key: c.key,
        label: (
          <Text className="font-medium" size="sm">
            {c.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Gray scale tokens */
export const GrayScale: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "swatch", label: "Swatch" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const color = findByKey(GRAY_COLORS, rowKey);
        if (colKey === "swatch") {
          return <ColorSwatch className={color.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {color.key}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {color.value}
          </Text>
        );
      }}
      rowLabels="Gray"
      rows={GRAY_COLORS.map((c) => ({
        key: c.key,
        label: (
          <Text className="font-medium" size="sm">
            {c.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Semantic color tokens */
export const SemanticColors: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "swatch", label: "Swatch" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const color = findByKey(SEMANTIC_COLORS, rowKey);
        if (colKey === "swatch") {
          return <ColorSwatch className={color.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {color.key}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {color.value}
          </Text>
        );
      }}
      rowLabels="Semantic"
      rows={SEMANTIC_COLORS.map((c) => ({
        key: c.key,
        label: (
          <Text className="font-medium" size="sm">
            {c.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Alpha color tokens */
export const AlphaColors: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "swatch", label: "Swatch" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const color = findByKey(ALPHA_COLORS, rowKey);
        if (colKey === "swatch") {
          return <AlphaPreview className={color.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {color.class}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {color.value}
          </Text>
        );
      }}
      rowLabels="Alpha"
      rows={ALPHA_COLORS.map((c) => ({
        key: c.key,
        label: (
          <Text className="font-medium" size="sm">
            {c.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Box shadow tokens */
export const BoxShadows: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "preview", label: "Preview" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const shadow = findByKey(BOX_SHADOWS, rowKey);
        if (colKey === "preview") {
          return <ShadowPreview className={shadow.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {shadow.class}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {shadow.value}
          </Text>
        );
      }}
      rowLabels="Shadow"
      rows={BOX_SHADOWS.map((s) => ({
        key: s.key,
        label: (
          <Text className="font-mono" size="sm">
            {s.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Inset shadow tokens */
export const InsetShadows: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "preview", label: "Preview" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const shadow = findByKey(INSET_SHADOWS, rowKey);
        if (colKey === "preview") {
          return (
            <div
              className={`size-12 rounded border border-border bg-white ${shadow.class}`}
            />
          );
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {shadow.class}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {shadow.value}
          </Text>
        );
      }}
      rowLabels="Inset Shadow"
      rows={INSET_SHADOWS.map((s) => ({
        key: s.key,
        label: (
          <Text className="font-mono" size="sm">
            {s.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Drop shadow tokens */
export const DropShadows: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "preview", label: "Preview" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const shadow = findByKey(DROP_SHADOWS, rowKey);
        if (colKey === "preview") {
          return <ShadowPreview className={shadow.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {shadow.class}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {shadow.value}
          </Text>
        );
      }}
      rowLabels="Drop Shadow"
      rows={DROP_SHADOWS.map((s) => ({
        key: s.key,
        label: (
          <Text className="font-mono" size="sm">
            {s.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Blur tokens */
export const Blurs: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "preview", label: "Preview" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const blur = findByKey(BLURS, rowKey);
        if (colKey === "preview") {
          return <BlurPreview className={blur.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {blur.class}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {blur.value}
          </Text>
        );
      }}
      rowLabels="Blur"
      rows={BLURS.map((b) => ({
        key: b.key,
        label: (
          <Text className="font-mono" size="sm">
            {b.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Backdrop blur preview cell */
function BackdropBlurPreview({ className }: { className: string }) {
  return (
    <div className="relative size-12 overflow-hidden rounded border border-border">
      <div className="absolute inset-0 bg-[length:8px_8px] bg-[repeating-conic-gradient(#6b7280_0_25%,#d1d5db_0_50%)]" />
      <div className={`absolute inset-0 bg-white/30 ${className}`} />
    </div>
  );
}

/** Backdrop blur tokens */
export const BackdropBlurs: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "preview", label: "Preview" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const blur = findByKey(BACKDROP_BLURS, rowKey);
        if (colKey === "preview") {
          return <BackdropBlurPreview className={blur.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {blur.class}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {blur.value}
          </Text>
        );
      }}
      rowLabels="Backdrop Blur"
      rows={BACKDROP_BLURS.map((b) => ({
        key: b.key,
        label: (
          <Text className="font-mono" size="sm">
            {b.name}
          </Text>
        ),
      }))}
    />
  ),
};

/** Border radius tokens */
export const BorderRadius: Story = {
  render: () => (
    <VariantGrid
      columns={[
        { key: "preview", label: "Preview" },
        { key: "token", label: "Token" },
        { key: "value", label: "Value" },
      ]}
      renderCell={(rowKey, colKey) => {
        const radius = findByKey(RADII, rowKey);
        if (colKey === "preview") {
          return <RadiusPreview className={radius.class} />;
        }
        if (colKey === "token") {
          return (
            <Text className="font-mono" size="xs">
              {radius.class}
            </Text>
          );
        }
        return (
          <Text className="font-mono text-muted-foreground" size="xs">
            {radius.value}
          </Text>
        );
      }}
      rowLabels="Radius"
      rows={RADII.map((r) => ({
        key: r.key,
        label: (
          <Text className="font-mono" size="sm">
            {r.name}
          </Text>
        ),
      }))}
    />
  ),
};
