import { type RefObject, useCallback, useEffect, useState } from "react";
import type { ResolvedConfig } from "./types";

export function usePanelHeight(
	panelRef: RefObject<HTMLDivElement | null>,
	hasSnapPoints: boolean,
): number {
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const el = panelRef.current;
		if (!(el && hasSnapPoints)) {
			return;
		}
		setHeight(el.offsetHeight);
		const observer = new ResizeObserver(([entry]) => {
			if (entry) {
				setHeight(entry.contentRect.height);
			}
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, [panelRef, hasSnapPoints]);

	return height;
}

export function useViewportHeight(active: boolean): number {
	const getHeight = useCallback(
		() =>
			typeof window === "undefined"
				? 0
				: (window.visualViewport?.height ?? window.innerHeight),
		[],
	);
	const [height, setHeight] = useState(() => getHeight());

	useEffect(() => {
		if (!active || typeof window === "undefined") {
			return;
		}

		const update = () => setHeight(getHeight());
		update();

		window.addEventListener("resize", update);
		window.visualViewport?.addEventListener("resize", update);

		return () => {
			window.removeEventListener("resize", update);
			window.visualViewport?.removeEventListener("resize", update);
		};
	}, [active, getHeight]);

	return height;
}

export function useBodyScale(
	config: ResolvedConfig,
	isOpen: boolean,
	prefersReducedMotion: boolean,
) {
	useEffect(() => {
		if (!config.shouldScaleBackground || prefersReducedMotion) {
			return;
		}

		const wrapper = document.querySelector("[data-stacksheet-wrapper]");
		if (!(wrapper && wrapper instanceof HTMLElement)) {
			return;
		}

		if (isOpen) {
			const scale = config.scaleBackgroundAmount;
			wrapper.style.transition =
				"transform 500ms cubic-bezier(0.32, 0.72, 0, 1), border-radius 500ms cubic-bezier(0.32, 0.72, 0, 1)";
			wrapper.style.transform = `scale(${scale})`;
			wrapper.style.borderRadius = "8px";
			wrapper.style.overflow = "hidden";
			wrapper.style.transformOrigin = "center top";
			return;
		}

		wrapper.style.transform = "";
		wrapper.style.borderRadius = "";
		const handleEnd = () => {
			wrapper.style.transition = "";
			wrapper.style.overflow = "";
			wrapper.style.transformOrigin = "";
		};
		wrapper.addEventListener("transitionend", handleEnd, { once: true });
		return () => wrapper.removeEventListener("transitionend", handleEnd);
	}, [
		isOpen,
		config.shouldScaleBackground,
		config.scaleBackgroundAmount,
		prefersReducedMotion,
	]);
}
