"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const ApertoTitle = forwardRef<
  HTMLHeadingElement,
  ComponentPropsWithoutRef<typeof Dialog.Title>
>((props, ref) => {
  return <Dialog.Title data-slot="aperto-title" ref={ref} {...props} />;
});

ApertoTitle.displayName = "ApertoTitle";

export { ApertoTitle };
