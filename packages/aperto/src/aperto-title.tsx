"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ComponentPropsWithRef } from "react";

const ApertoTitle = ({ ref, ...props }: ComponentPropsWithRef<typeof Dialog.Title>) => (
  <Dialog.Title data-slot="aperto-title" ref={ref} {...props} />
);

ApertoTitle.displayName = "ApertoTitle";

export { ApertoTitle };
