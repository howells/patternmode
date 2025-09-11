"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { previewCardVariants } from "../variants";

type PreviewCardProps = React.ComponentPropsWithoutRef<
  typeof BasePreviewCard.Root
>;

/**
 * Root preview card component for hover-triggered content previews.
 */
const PreviewCard = (props: PreviewCardProps) => (
  <BasePreviewCard.Root data-testid="preview-card" {...props} />
);

PreviewCard.displayName = "PreviewCard";

export { PreviewCard };
export type { PreviewCardProps };
