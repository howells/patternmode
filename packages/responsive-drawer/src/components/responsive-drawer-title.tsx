import { DrawerTitle } from "@patternmode/drawer";
import { SheetTitle } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerTitleProps = { children?: React.ReactNode; className?: string } & React.ComponentPropsWithoutRef<"div">;

export const ResponsiveDrawerTitle: React.FC<ResponsiveDrawerTitleProps> = ({ children, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) return <DrawerTitle {...props}>{children}</DrawerTitle>;
  return <SheetTitle {...props}>{children}</SheetTitle>;
};

