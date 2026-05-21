"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

import { useApertoContext } from "./context";

export interface ApertoPortalProps {
	children: ReactNode;
	/** Container element for the portal (default: document.body) */
	container?: HTMLElement;
}

function ApertoPortal({ children, container }: ApertoPortalProps) {
	const { open } = useApertoContext();

	return (
		<AnimatePresence>
			{open && (
				<Dialog.Portal container={container} forceMount>
					{children}
				</Dialog.Portal>
			)}
		</AnimatePresence>
	);
}

export { ApertoPortal };
