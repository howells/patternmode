import type {
	ComponentType,
	CSSProperties,
	HTMLAttributes,
	MouseEvent,
	SVGProps,
} from "react";

export const SWATCH_SIZES = [
	"2xs",
	"xs",
	"sm",
	"base",
	"lg",
	"xl",
	"2xl",
	"3xl",
] as const;

export const SWATCH_SHAPES = ["circle", "pill", "square"] as const;

export type SwatchSize = (typeof SWATCH_SIZES)[number];
export type SwatchShape = (typeof SWATCH_SHAPES)[number];
export type SwatchColorStop = string | { color: string; ratio?: number };
export type SwatchIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface SwatchProps extends HTMLAttributes<HTMLSpanElement> {
	background?: string;
	color?: string;
	colors?: SwatchColorStop[];
	icon?: SwatchIcon;
	isLight?: boolean;
	onRemove?: () => void;
	raised?: boolean;
	selected?: boolean;
	shape?: SwatchShape;
	showRing?: boolean;
	size?: SwatchSize;
	unavailable?: boolean;
}

function joinClasses(
	...parts: Array<false | null | string | undefined>
): string | undefined {
	const out = parts.filter(Boolean).join(" ").trim();
	return out.length > 0 ? out : undefined;
}

function normalizeHex(hex: string): string | null {
	const value = hex.trim().replace(/^#/, "");
	if (/^[\da-f]{3}$/i.test(value)) {
		return value
			.split("")
			.map((part) => part + part)
			.join("");
	}
	if (/^[\da-f]{6}$/i.test(value)) {
		return value;
	}
	return null;
}

function isLightColor(color: string): boolean {
	const normalized = normalizeHex(color);
	if (!normalized) {
		return false;
	}

	const red = Number.parseInt(normalized.slice(0, 2), 16);
	const green = Number.parseInt(normalized.slice(2, 4), 16);
	const blue = Number.parseInt(normalized.slice(4, 6), 16);
	const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
	return luminance > 0.62;
}

function toColorStop(stop: SwatchColorStop): { color: string; ratio?: number } {
	return typeof stop === "string" ? { color: stop } : stop;
}

function getRatioWeight(ratio: number | undefined): number {
	if (ratio === undefined) {
		return 1;
	}

	return Number.isFinite(ratio) ? Math.max(0, ratio) : 0;
}

export function getSwatchColorsBackground(
	colors: SwatchColorStop[] | undefined,
): string | undefined {
	if (!colors || colors.length === 0) {
		return undefined;
	}

	if (colors.length === 1) {
		return toColorStop(colors[0] as SwatchColorStop).color;
	}

	const stops = colors.map(toColorStop);
	const weights = stops.map((stop) => getRatioWeight(stop.ratio));
	const rawTotal = weights.reduce((sum, ratio) => sum + ratio, 0);
	const useEqualWeights = rawTotal <= 0;
	const total = useEqualWeights ? stops.length : rawTotal;
	let cursor = 0;
	const parts = stops.map((stop, index) => {
		const ratio = useEqualWeights ? 1 : (weights[index] ?? 0);
		const start = cursor;
		const end =
			index === stops.length - 1 ? 100 : cursor + (ratio / total) * 100;
		cursor = end;
		return `${stop.color} ${formatPercent(start)} ${formatPercent(end)}`;
	});

	return `linear-gradient(90deg, ${parts.join(", ")})`;
}

function formatPercent(value: number): string {
	return `${Number.isInteger(value) ? value : Number(value.toFixed(2))}%`;
}

export function Swatch({
	"aria-label": ariaLabel,
	background,
	children,
	className,
	color,
	colors,
	icon: Icon,
	isLight,
	onRemove,
	raised = false,
	role: _role,
	selected = false,
	shape = "circle",
	showRing = true,
	size = "base",
	style,
	unavailable = false,
	...props
}: SwatchProps) {
	const colorsBackground = getSwatchColorsBackground(colors);
	const fill = background ?? colorsBackground ?? color;
	const light =
		isLight ??
		(color && !background && !colorsBackground
			? isLightColor(color as string)
			: false);

	const rootStyle = {
		"--howells-swatch-fill": fill,
		...style,
	} as CSSProperties;

	function handleRemove(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		onRemove?.();
	}

	return (
		<span
			{...props}
			aria-label={ariaLabel}
			className={joinClasses("howells-swatch", className)}
			data-raised={raised ? "true" : undefined}
			data-selected={selected ? "true" : undefined}
			data-shape={shape}
			data-show-ring={showRing ? "true" : "false"}
			data-size={size}
			data-slot="swatch"
			data-tone={light ? "light" : "dark"}
			data-unavailable={unavailable ? "true" : undefined}
			role="img"
			style={rootStyle}
		>
			<span aria-hidden="true" className="howells-swatch__fill" />
			{children ? (
				<span className="howells-swatch__media">{children}</span>
			) : null}
			<span aria-hidden="true" className="howells-swatch__scrim" />
			{selected && Icon ? (
				<span className="howells-swatch__icon">
					<Icon aria-hidden="true" focusable="false" />
				</span>
			) : null}
			{unavailable ? (
				<span aria-hidden="true" className="howells-swatch__slash" />
			) : null}
			{onRemove ? (
				<button
					aria-label="Remove"
					className="howells-swatch__remove"
					onClick={handleRemove}
					type="button"
				>
					<svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
						<path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
					</svg>
				</button>
			) : null}
		</span>
	);
}
