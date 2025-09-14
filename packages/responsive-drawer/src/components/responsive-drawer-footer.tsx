import { DrawerFooter } from "@patternmode/drawer";
import { SheetFooter } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerFooterProps = { children?: React.ReactNode; className?: string } & React.ComponentPropsWithoutRef<"div">;

export const ResponsiveDrawerFooter: React.FC<ResponsiveDrawerFooterProps> = ({ children, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) return <DrawerFooter {...props}>{children}</DrawerFooter>;
  return <SheetFooter {...props}>{children}</SheetFooter>;
};

