import type { Preview } from "@storybook/react";

import "../src/storybook.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "paper",
      values: [
        { name: "paper", value: "#f8fafc" },
        { name: "ink", value: "#101827" },
      ],
    },
    controls: {
      expanded: true,
    },
    layout: "centered",
  },
};

export default preview;
