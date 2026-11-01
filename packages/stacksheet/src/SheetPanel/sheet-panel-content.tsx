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
  Content: ComponentType<SheetData> | undefined;
  data: SheetData;
  renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
  headerProps: HeaderRenderProps;
}) => {
  if (isComposable) {
    return shouldRender && Content !== undefined ? <Content {...data} /> : null;
  }
  const customHeader =
    renderHeader !== undefined && renderHeader !== false ? renderHeader : undefined;

  return (
    <>
      {customHeader === undefined ? <DefaultHeader /> : customHeader(headerProps)}
      {shouldRender && Content !== undefined && (
        <section
          aria-label="Sheet content"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
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
