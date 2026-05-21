"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const ApertoClose = forwardRef<
	HTMLButtonElement,
	ComponentPropsWithoutRef<typeof Dialog.Close>
>(({ children, ...props }, ref) => {
	return (
		<Dialog.Close data-slot="aperto-close" ref={ref} {...props}>
			{children ?? <X aria-hidden="true" size={17} strokeWidth={2} />}
		</Dialog.Close>
	);
});

ApertoClose.displayName = "ApertoClose";

export { ApertoClose };
