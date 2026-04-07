import { create } from "@storybook/theming";

/**
 * Custom Storybook theme using Inter font
 * The pink M logo favicon is served from /public/favicon.svg
 */
export default create({
  base: "light",

  // Typography - Inter for all text
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: "monospace",

  // Branding
  brandTitle: "PatternMode",
  brandUrl: "https://patternmode.dev",

  // Colors aligned with our design system (gray palette)
  colorPrimary: "#18181b", // gray-900
  colorSecondary: "#3f3f46", // gray-700

  // UI
  appBg: "#f4f4f5", // gray-100
  appContentBg: "#ffffff",
  appPreviewBg: "#f3f4f6",
  appBorderColor: "#e4e4e7", // gray-200
  appBorderRadius: 8,

  // Text colors
  textColor: "#18181b", // gray-900
  textInverseColor: "#fafafa", // gray-50

  // Toolbar
  barTextColor: "#71717a", // gray-500
  barSelectedColor: "#18181b", // gray-900
  barHoverColor: "#3f3f46", // gray-700
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#e4e4e7", // gray-200
  inputTextColor: "#18181b", // gray-900
  inputBorderRadius: 6,
});
