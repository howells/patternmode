"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

import { useApertoContext } from "./context";

export interface ApertoPortalProps {
  children: ReactNode;
  /** Container element for the portal (default: document.body) */
  container?: HTMLElement;
}

const ApertoPortal = ({ children, container }: ApertoPortalProps) => {
  const { open } = useApertoContext();

  // `AnimatePresence` owns mount/unmount so Motion can play exit animations
  // (and the shared-element layout morph) before the subtree leaves the DOM.
  // `keepMounted` keeps Base UI's Portal rendering its children even after its
  // internal `mounted` state flips to false on close, so those exit animations
  // run instead of the content vanishing instantly. The Popup/Backdrop then
  // override Base UI's `hidden` attribute to stay visible until Motion is done.
  return (
    <AnimatePresence>
      {open && (
        <Dialog.Portal container={container} keepMounted>
          {children}
        </Dialog.Portal>
      )}
    </AnimatePresence>
  );
};

export { ApertoPortal };
