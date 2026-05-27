import { FocusTrap } from "focus-trap-react";
import type { ReactNode, RefObject } from "react";
import { useEffect, useState } from "react";

const LAYERED_MODAL_SELECTORS = [
	'[role="dialog"][data-state="open"]',
	'[role="alertdialog"][data-state="open"]',
	"[data-radix-popper-content-wrapper]",
	"[data-radix-focus-guard]",
].join(", ");

export function ModalFocusTrap({
	enabled,
	active,
	fallbackRef,
	children,
}: {
	enabled: boolean;
	active: boolean;
	fallbackRef: RefObject<HTMLElement | null>;
	children: ReactNode;
}) {
	const paused = useLayeredModalFocused(enabled && active);

	if (!enabled) {
		return children;
	}
	return (
		<FocusTrap
			active={active}
			focusTrapOptions={{
				initialFocus: false,
				returnFocusOnDeactivate: true,
				escapeDeactivates: false,
				allowOutsideClick: true,
				checkCanFocusTrap: () =>
					new Promise<void>((resolve) =>
						requestAnimationFrame(() => resolve()),
					),
				fallbackFocus: () => {
					if (fallbackRef.current) {
						return fallbackRef.current;
					}
					return document.body;
				},
			}}
			paused={paused}
		>
			{children}
		</FocusTrap>
	);
}

function useLayeredModalFocused(active: boolean): boolean {
	const [layered, setLayered] = useState(false);

	useEffect(() => {
		if (!active) {
			setLayered(false);
			return;
		}
		const evaluate = () => {
			const target = document.activeElement;
			if (!target || target === document.body) {
				setLayered(false);
				return;
			}
			const inLayer =
				target instanceof Element &&
				target.closest(LAYERED_MODAL_SELECTORS) !== null;
			setLayered(inLayer);
		};
		evaluate();
		const handler = () => evaluate();
		document.addEventListener("focusin", handler, true);
		return () => document.removeEventListener("focusin", handler, true);
	}, [active]);

	return layered;
}
