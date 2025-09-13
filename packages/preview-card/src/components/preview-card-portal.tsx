"use client";

import { PreviewCard as BasePreviewCard } from "@base-ui-components/react/preview-card";
import type React from "react";

type PreviewCardPortalProps = React.ComponentPropsWithoutRef<
  typeof BasePreviewCard.Portal
>;

/**
 * Portal component for rendering preview card content outside normal DOM flow.
 */
const PreviewCardPortal = (props: PreviewCardPortalProps) => (
  <BasePreviewCard.Portal {...props} />
);

PreviewCardPortal.displayName = "PreviewCardPortal";

export { PreviewCardPortal };
export type { PreviewCardPortalProps };
