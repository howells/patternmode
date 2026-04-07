import "../src/storybook.css";
import "@patternmode/tailwind-config/shared-styles.css";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "centered",

    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "#ffffff" },
        { name: "dark", value: "#111827" },
        { name: "muted", value: "#f3f4f6" },
      ],
    },

    actions: {
      argTypesRegex: "^on.*",
    },

    options: {
      storySort: {
        method: "alphabetical",
        order: ["Button", "*", "Layout"],
      },
    },

    a11y: {
      test: "todo",
    },
  },
  tags: ["autodocs"],
};

export default preview;
