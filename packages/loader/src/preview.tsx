"use client";

import { sizes } from "@patternmode/constants/sizes";
import { Loader } from ".";
import type { LoaderProps } from "./types";

export function LoaderPreview(props: LoaderProps) {
  return <Loader {...props} />;
}

// Preview props for prop explorer
export const loaderPreviewProps = [
  {
    name: "size",
    type: "select",
    description: "The size variant of the loader icon.",
    options: [...Object.keys(sizes), "xl"],
    defaultValue: "base",
  },
  {
    name: "label",
    type: "string",
    description:
      "Optional visible label text displayed to the right of the spinner.",
    defaultValue: "",
  },
  {
    name: "aria-label",
    type: "string",
    description:
      "Accessible label for screen readers describing the loading state.",
    defaultValue: "",
  },
];
