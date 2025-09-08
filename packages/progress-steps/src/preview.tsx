"use client";

import { ProgressSteps } from "./component";
import type { ProgressStepsProps } from "./types";

export function ProgressStepsPreview(props: ProgressStepsProps) {
  const defaults: ProgressStepsProps = {
    orientation: "vertical",
    current: 1,
    steps: [
      { title: "Account", description: "Create your account" },
      { title: "Profile", description: "Add personal details" },
      { title: "Billing", description: "Set up payment" },
      { title: "Confirm" },
    ],
  };
  return <ProgressSteps {...defaults} {...props} />;
}

export const progressStepsPreviewProps = [
  {
    name: "orientation",
    type: "select",
    options: ["vertical", "horizontal"],
    defaultValue: "vertical",
    description: "Layout orientation",
  },
];
