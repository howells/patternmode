import { ArrowLeftIcon, XIcon } from "../icons";
import type { HeaderRenderProps } from "../types";

export function DefaultHeader({
	isNested,
	onBack,
	onClose,
	className,
}: HeaderRenderProps & { className?: string }) {
	return (
		<div
			className={`flex shrink-0 items-center justify-between px-4 pt-4 pb-2 ${className ?? ""}`}
		>
			<div className="flex items-center gap-2">
				{isNested && (
					<button
						aria-label="Back"
						className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/5 p-0 text-inherit opacity-70 transition-opacity duration-150 hover:opacity-100"
						onClick={onBack}
						type="button"
					>
						<ArrowLeftIcon />
					</button>
				)}
			</div>
			<button
				aria-label="Close"
				className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-black/5 p-0 text-inherit opacity-70 transition-opacity duration-150 hover:opacity-100"
				onClick={onClose}
				type="button"
			>
				<XIcon />
			</button>
		</div>
	);
}
