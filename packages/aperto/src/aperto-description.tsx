"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const ApertoDescription = forwardRef<
  HTMLParagraphElement,
  ComponentPropsWithoutRef<typeof Dialog.Description>
>((props, ref) => {
  return (
    <Dialog.Description data-slot="aperto-description" ref={ref} {...props} />
  );
});

ApertoDescription.displayName = "ApertoDescription";

export { ApertoDescription };
