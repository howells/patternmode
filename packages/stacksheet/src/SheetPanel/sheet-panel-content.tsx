import type { ComponentType, ReactNode } from "react";

import type { HeaderRenderProps, SheetData } from "../types";
import { SAFE_BOTTOM_PADDING } from "../stacking";
import { DefaultHeader } from "./default-header";

export const PanelInnerContent = ({
  isComposable,
  shouldRender,
  Content,
  data,
  renderHeader,
  headerProps,
}: {
  isComposable: boolean;
  shouldRender: boolean;
  Content: ComponentType<SheetData>;
  data: SheetData;
  renderHeader?: (props: HeaderRenderProps) => ReactNode;
  headerProps: HeaderRenderProps;
}) => {
  if (isComposable) {
    return shouldRender ? <Content {...data} /> : null;
  }

  return (
    <>
      {renderHeader === undefined ? <DefaultHeader /> : renderHeader(headerProps)}
      {shouldRender && (
        <section
          aria-label="Sheet content"
          className="patternmode-stacksheet__content"
          style={{ paddingBottom: SAFE_BOTTOM_PADDING }}
          // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex, react-doctor/no-noninteractive-tabindex -- axe requires keyboard access to this overflow scroll region.
          tabIndex={0}
        >
          <Content {...data} />
        </section>
      )}
    </>
  );
};

PanelInnerContent.displayName = "PanelInnerContent";
