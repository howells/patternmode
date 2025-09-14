import { DrawerTrigger } from "@patternmode/drawer";
import { SheetTrigger } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerTriggerProps = {
  children?: React.ReactNode;
  className?: string;
  render?: React.ReactElement<Record<string, unknown>>;
};

export const ResponsiveDrawerTrigger: React.FC<ResponsiveDrawerTriggerProps> = ({ children, render, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) {
    if (render) {
      return (
        <DrawerTrigger asChild {...props}>
          {render}
        </DrawerTrigger>
      );
    }
    return <DrawerTrigger {...props}>{children}</DrawerTrigger>;
  }
  if (render) {
    return (
      <SheetTrigger render={render} {...props}>
        {children}
      </SheetTrigger>
    );
  }
  return <SheetTrigger {...props}>{children}</SheetTrigger>;
};

