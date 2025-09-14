import { DrawerClose } from "@patternmode/drawer";
import { SheetClose } from "@patternmode/sheet";
import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

export type ResponsiveDrawerCloseProps = {
  children?: React.ReactNode;
  className?: string;
  render?: React.ReactElement<Record<string, unknown>>;
};

export const ResponsiveDrawerClose: React.FC<ResponsiveDrawerCloseProps> = ({ children, render, ...props }) => {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  if (isMobile) {
    if (render) {
      return (
        <DrawerClose asChild {...props}>
          {render}
        </DrawerClose>
      );
    }
    return <DrawerClose {...props}>{children}</DrawerClose>;
  }
  if (render) {
    return (
      <SheetClose render={render} {...props}>
        {children}
      </SheetClose>
    );
  }
  return <SheetClose {...props}>{children}</SheetClose>;
};

