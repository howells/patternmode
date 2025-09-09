"use client";

import { cx } from "@patternmode/utils/cx";
import type React from "react";
import { useSidebar } from "../sidebar-store";
import type { SidebarMobileProps } from "../types";
import { sidebarMobileVariants, sidebarOverlayVariants } from "../variants";
import {
  SidebarDialogBackdrop,
  SidebarDialogPopup,
  SidebarDialogPortal,
  SidebarDialogRoot,
} from "./sidebar-dialog";

const SidebarMobile: React.FC<SidebarMobileProps> = ({
  children,
  ...props
}) => {
  const state = useSidebar((s) => s.state);
  const setState = useSidebar((s) => s.setState);

  return (
    <SidebarDialogRoot
      onOpenChange={(open) => setState(open ? "open" : "collapsed")}
      open={state === "open"}
      {...props}
    >
      <SidebarDialogPortal>
        <SidebarDialogBackdrop
          className={cx(
            sidebarOverlayVariants(),
            "z-40 bg-black/50 backdrop-blur-sm"
          )}
        />
        <SidebarDialogPopup className={sidebarMobileVariants()}>
          {children}
        </SidebarDialogPopup>
      </SidebarDialogPortal>
    </SidebarDialogRoot>
  );
};

SidebarMobile.displayName = "SidebarMobile";

export { SidebarMobile };
