import { getObjectSizingStyle, joinClassNames } from "@patternmode/system";
import type { CSSProperties, MouseEvent } from "react";

import { getSwatchAtmosphereBackground } from "./SwatchAtmosphere";
import { getSwatchColorsBackground, isLightColor } from "./SwatchColors";
import { getSwatchSizeVariableStyle, type SwatchProps } from "./SwatchTypes";

export function Swatch({
	"aria-label": ariaLabel,
	background,
	children,
	className,
	color,
	colors,
	density,
	flat = false,
	gravity,
	icon: Icon,
	isLight,
	objectFit,
	objectPosition,
	onRemove,
	raised = false,
	removeLabel,
	role: _role,
	selected = false,
	shape = "circle",
	showRing = true,
	size = "base",
	style,
	texture,
	unavailable = false,
	...props
}: SwatchProps) {
	const colorsBackground = getSwatchColorsBackground(colors);
	const atmosphereBackground =
		texture === "atmosphere"
			? getSwatchAtmosphereBackground(colors, { density, gravity })
			: undefined;
	const fill = background ?? atmosphereBackground ?? colorsBackground ?? color;
	const light =
		isLight ??
		(color && !background && !colorsBackground
			? isLightColor(color as string)
			: false);
	const resolvedRemoveLabel =
		removeLabel ?? (ariaLabel ? `Remove ${ariaLabel}` : "Remove");

	const rootStyle = {
		...getSwatchSizeVariableStyle(size),
		"--patternmode-swatch-fill": fill,
		...style,
	} as CSSProperties;
	const mediaStyle = getObjectSizingStyle({
		fit: objectFit,
		position: objectPosition,
	}) as CSSProperties;

	function handleRemove(event: MouseEvent<HTMLButtonElement>) {
		event.stopPropagation();
		onRemove?.();
	}

	const swatchContent = (
		<>
			<span aria-hidden="true" className="patternmode-swatch__fill" />
			{children ? (
				<span className="patternmode-swatch__media" style={mediaStyle}>
					{children}
				</span>
			) : null}
			{flat ? null : (
				<span aria-hidden="true" className="patternmode-swatch__scrim" />
			)}
			{selected && Icon ? (
				<span className="patternmode-swatch__icon">
					<Icon aria-hidden="true" focusable="false" />
				</span>
			) : null}
			{unavailable ? (
				<span aria-hidden="true" className="patternmode-swatch__slash" />
			) : null}
		</>
	);

	if (onRemove) {
		return (
			<fieldset
				{...props}
				aria-label={ariaLabel}
				className={joinClassNames("patternmode-swatch", className)}
				data-flat={flat ? "true" : undefined}
				data-raised={raised ? "true" : undefined}
				data-selected={selected ? "true" : undefined}
				data-shape={shape}
				data-show-ring={showRing ? "true" : "false"}
				data-size={size}
				data-slot="swatch"
				data-tone={light ? "light" : "dark"}
				data-unavailable={unavailable ? "true" : undefined}
				style={rootStyle}
			>
				{swatchContent}
				<button
					aria-label={resolvedRemoveLabel}
					className="patternmode-swatch__remove"
					onClick={handleRemove}
					type="button"
				>
					<svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
						<path d="M5.5 5.5l9 9M14.5 5.5l-9 9" />
					</svg>
				</button>
			</fieldset>
		);
	}

	return (
		<span
			{...props}
			aria-label={ariaLabel}
			className={joinClassNames("patternmode-swatch", className)}
			data-flat={flat ? "true" : undefined}
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
			{swatchContent}
		</span>
	);
}
