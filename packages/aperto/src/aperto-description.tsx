"use client";

import * as Dialog from "@radix-ui/react-dialog";
import type { ComponentPropsWithRef } from "react";

const ApertoDescription = ({ ref, ...props }: ComponentPropsWithRef<typeof Dialog.Description>) => (
  <Dialog.Description data-slot="aperto-description" ref={ref} {...props} />
);

ApertoDescription.displayName = "ApertoDescription";

export { ApertoDescription };
