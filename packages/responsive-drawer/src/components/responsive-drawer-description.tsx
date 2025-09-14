import { DrawerDescription } from "@patternmode/drawer";
import { SheetDescription } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerDescriptionProps = { children?: React.ReactNode; className?: string } & React.ComponentPropsWithoutRef<"div">;

export const ResponsiveDrawerDescription: React.FC<ResponsiveDrawerDescriptionProps> = ({ children, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) return <DrawerDescription {...props}>{children}</DrawerDescription>;
  return <SheetDescription {...props}>{children}</SheetDescription>;
};

