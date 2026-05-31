import { m } from "motion/react";
import type { CSSProperties } from "react";

import type { Side } from "../types";

export function BottomHandle({ onDismiss }: { onDismiss?: () => void }) {
	return (
		<button
			aria-label="Dismiss"
			className="absolute inset-x-0 top-0 z-10 flex w-full cursor-grab touch-none items-center justify-center border-none bg-transparent pt-2.5 pb-2"
			data-stacksheet-handle=""
			onClick={onDismiss}
			type="button"
		>
			<div
				aria-hidden="true"
				className="h-[5px] w-9 rounded-full bg-current/15"
			/>
		</button>
	);
}

export function SideHandle({
	side,
	isHovered,
	onDismiss,
}: {
	side: Side;
	isHovered: boolean;
	onDismiss?: () => void;
}) {
	const position: CSSProperties =
		side === "right" ? { right: "100%" } : { left: "100%" };

	return (
		<m.div
			animate={{ opacity: isHovered ? 1 : 0 }}
			aria-label="Dismiss"
			className="absolute top-0 bottom-0 flex w-6 cursor-grab touch-none items-center justify-center"
			data-stacksheet-handle=""
			onClick={onDismiss}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onDismiss?.();
				}
			}}
			role="button"
			style={position}
			tabIndex={0}
			transition={{ duration: isHovered ? 0.15 : 0.4, ease: "easeOut" }}
		>
			<div aria-hidden="true" className="h-8 w-1 rounded-full bg-current/20" />
		</m.div>
	);
}
