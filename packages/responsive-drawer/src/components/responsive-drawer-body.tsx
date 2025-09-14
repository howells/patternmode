import { SheetBody } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerBodyProps = { children?: React.ReactNode; className?: string } & React.ComponentPropsWithoutRef<"div">;

export const ResponsiveDrawerBody: React.FC<ResponsiveDrawerBodyProps> = ({ children, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) {
    return (
      <div className="px-4" {...props}>
        {children}
      </div>
    );
  }
  return <SheetBody {...props}>{children}</SheetBody>;
};

