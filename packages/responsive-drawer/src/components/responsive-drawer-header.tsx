import { DrawerHeader } from "@patternmode/drawer";
import { SheetHeader } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerHeaderProps = { children?: React.ReactNode; className?: string } & React.ComponentPropsWithoutRef<"div">;

export const ResponsiveDrawerHeader: React.FC<ResponsiveDrawerHeaderProps> = ({ children, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) return <DrawerHeader {...props}>{children}</DrawerHeader>;
  return <SheetHeader {...props}>{children}</SheetHeader>;
};

