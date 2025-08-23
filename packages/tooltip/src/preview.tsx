"use client";

import { ComponentPreview } from "@patternmode/config/component-preview";
import type { PreviewProps } from "@patternmode/ui/types/preview-props-type";
import { DefaultExample, PositionsExample, VariantsExample, SizesExample, ArrowExample, RichContentExample, ControlledExample, DelayExample, IconButtonsExample, AlignmentExample } from "./examples";

export const TooltipPreview = (props: PreviewProps) => (
  <ComponentPreview
    {...props}
    examples={{
      default: DefaultExample,
      positions: PositionsExample,
      variants: VariantsExample,
      sizes: SizesExample,
      "no-arrow": ArrowExample,
      "rich-content": RichContentExample,
      controlled: ControlledExample,
      delay: DelayExample,
      "icon-tooltip": IconButtonsExample,
      alignment: AlignmentExample,
    }}
  />
);

export const tooltipPreviewProps: PreviewProps = {
  componentId: "tooltip",
  componentName: "Tooltip",
  category: "overlay",
};

