"use client";

import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import type React from "react";

/**
 * Sidebar dialog root component.
 */
const SidebarDialogRoot: React.FC<
  React.ComponentProps<typeof BaseDialog.Root>
> = (props) => <BaseDialog.Root {...props} />;
SidebarDialogRoot.displayName = "SidebarDialogRoot";

/**
 * Sidebar dialog portal component.
 */
const SidebarDialogPortal: React.FC<
  React.ComponentProps<typeof BaseDialog.Portal>
> = (props) => <BaseDialog.Portal {...props} />;
SidebarDialogPortal.displayName = "SidebarDialogPortal";

/**
 * Sidebar dialog backdrop component.
 */
const SidebarDialogBackdrop: React.FC<
  React.ComponentProps<typeof BaseDialog.Backdrop>
> = (props) => <BaseDialog.Backdrop {...props} />;
SidebarDialogBackdrop.displayName = "SidebarDialogBackdrop";

/**
 * Sidebar dialog popup component.
 */
const SidebarDialogPopup: React.FC<
  React.ComponentProps<typeof BaseDialog.Popup>
> = (props) => <BaseDialog.Popup {...props} />;
SidebarDialogPopup.displayName = "SidebarDialogPopup";

export {
  SidebarDialogBackdrop,
  SidebarDialogPortal,
  SidebarDialogPopup,
  SidebarDialogRoot,
};
