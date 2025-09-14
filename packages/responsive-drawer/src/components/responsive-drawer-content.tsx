import { DrawerContent } from "@patternmode/drawer";
import { SheetContent } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerContentProps = {
  children?: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">;

export const ResponsiveDrawerContent: React.FC<ResponsiveDrawerContentProps> = ({ children, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) return <DrawerContent {...props}>{children}</DrawerContent>;
  return <SheetContent {...props}>{children}</SheetContent>;
};

