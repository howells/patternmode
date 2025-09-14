"use client";

// Mobile drawer (Vaul)
import { Drawer } from "@patternmode/drawer";
// Desktop sheet (Base UI Dialog)
import { Sheet } from "@patternmode/sheet";

import { MEDIA_QUERIES } from "@patternmode/utils/breakpoints";
import React from "react";
import { useMediaQuery } from "usehooks-ts";

type ResponsiveDrawerProps = {
  /**
   * Drawer content including trigger and content components.
   * Should contain ResponsiveDrawerTrigger and ResponsiveDrawerContent.
   */
  children?: React.ReactNode;

  /**
   * Whether the drawer is open in controlled mode.
   * When provided, the component operates in controlled mode where open state is managed externally.
   */
  open?: boolean;

  /**
   * Callback fired when the drawer open state changes.
   * Called with the new open state when user interactions would change the state.
   */
  onOpenChange?: (open: boolean) => void;
};

// Subcomponents are defined in their own files under ./components

/**
 * Responsive drawer component that adapts behavior based on screen size.
 */
const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({
  children,
  ...props
}) => {
  const [mounted, setMounted] = React.useState(false);
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR or before mounting, default to Sheet (desktop view)
  if (!mounted) {
    return (
      <Sheet data-testid="responsive-drawer" {...props}>
        {children}
      </Sheet>
    );
  }

  if (isMobile) {
    return (
      <Drawer data-testid="responsive-drawer" {...props}>
        {children}
      </Drawer>
    );
  }

  return (
    <Sheet data-testid="responsive-drawer" {...props}>
      {children}
    </Sheet>
  );
};


export { ResponsiveDrawer };
export type { ResponsiveDrawerProps };
