"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

const ApertoClose = ({ children, ref, ...props }: ComponentPropsWithRef<typeof Dialog.Close>) => (
  <Dialog.Close data-slot="aperto-close" ref={ref} {...props}>
    {children ?? <X aria-hidden="true" size={17} strokeWidth={2} />}
  </Dialog.Close>
);

ApertoClose.displayName = "ApertoClose";

export { ApertoClose };
