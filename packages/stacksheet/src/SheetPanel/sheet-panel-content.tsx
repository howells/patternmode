import type { ComponentType, ReactNode } from "react";

import type { HeaderRenderProps } from "../types";
import { DefaultHeader } from "./default-header";

export const PanelInnerContent = ({
  isComposable,
  shouldRender,
  Content,
  data,
  renderHeader,
  headerProps,
  headerClassName,
}: {
  isComposable: boolean;
  shouldRender: boolean;
  Content: ComponentType<Record<string, unknown>> | undefined;
  data: Record<string, unknown>;
  renderHeader?: false | ((props: HeaderRenderProps) => ReactNode);
  headerProps: HeaderRenderProps;
  headerClassName: string | undefined;
}) => {
  if (isComposable) {
    return shouldRender && Content ? <Content {...data} /> : null;
  }

  return (
    <>
      {renderHeader ? (
        renderHeader(headerProps)
      ) : (
        <DefaultHeader {...headerProps} className={headerClassName} />
      )}
      {shouldRender && Content && (
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
          data-stacksheet-no-drag=""
        >
          <Content {...data} />
        </div>
      )}
    </>
  );
};

PanelInnerContent.displayName = "PanelInnerContent";
