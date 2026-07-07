"use client";

import { Dialog } from "@base-ui/react/dialog";
import type { ComponentPropsWithRef } from "react";

const ApertoTitle = ({ ref, ...props }: ComponentPropsWithRef<typeof Dialog.Title>) => (
  <Dialog.Title data-slot="aperto-title" ref={ref} {...props} />
);

ApertoTitle.displayName = "ApertoTitle";

export { ApertoTitle };
