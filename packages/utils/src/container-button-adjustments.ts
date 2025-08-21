import type { Size } from "@patternmode/config/sizes";

/**
 * Centralized Container Button Adjustments
 *
 * Provides consistent height and border radius adjustments for buttons
 * when they're inside containers like toggle groups and tabs.
 * This ensures buttons fit properly within their containers without
 * making the containers too large.
 */

/**
 * Get the height adjustment for buttons inside a container based on container size
 */
export function getContainerButtonHeightAdjustment(
	containerSize: Size,
): string {
	const adjustments = {
		xs: "0.375rem", // 6px - accounts for p-0.5 (2px top + 2px bottom) + extra 2px
		sm: "0.375rem", // 6px - accounts for p-0.5 (2px top + 2px bottom) + extra 2px
		base: "0.375rem", // 6px - accounts for p-0.5 (2px top + 2px bottom) + extra 2px
		lg: "0.625rem", // 10px - accounts for p-1 (4px top + 4px bottom) + extra 2px
	};

	return adjustments[containerSize];
}

/**
 * Get the border radius adjustment for buttons inside a container based on container size
 */
export function getContainerButtonBorderRadiusAdjustment(
	containerSize: Size,
): string {
	const adjustments = {
		xs: "0.125rem", // 2px - accounts for p-0.5 (2px top + 2px bottom)
		sm: "0.125rem", // 2px - accounts for p-0.5 (2px top + 2px bottom)
		base: "0.125rem", // 2px - accounts for p-0.5 (2px top + 2px bottom)
		lg: "0.25rem", // 4px - accounts for p-1 (4px top + 4px bottom)
	};

	return adjustments[containerSize];
}

/**
 * Get the container border radius for a given size
 */
export function getContainerBorderRadius(containerSize: Size): string {
	const borderRadii = {
		xs: "0.125rem", // 2px
		sm: "0.25rem", // 4px
		base: "0.375rem", // 6px
		lg: "0.5rem", // 8px
	};

	return borderRadii[containerSize];
}

/**
 * Generate CSS classes for button height adjustments inside a container
 */
export function getContainerButtonHeightClasses(containerSize: Size): string[] {
	const heightAdjustment = getContainerButtonHeightAdjustment(containerSize);

	return [
		`[&_button]:!h-[calc(var(--control-height-${containerSize})-${heightAdjustment})]`,
		`[&_button]:!min-h-[calc(var(--control-height-${containerSize})-${heightAdjustment})]`,
	];
}

/**
 * Generate CSS classes for button border radius adjustments inside a container
 */
export function getContainerButtonBorderRadiusClasses(
	containerSize: Size,
): string[] {
	const containerRadius = getContainerBorderRadius(containerSize);
	const adjustment = getContainerButtonBorderRadiusAdjustment(containerSize);

	return [`[&_button]:!rounded-[calc(${containerRadius}-${adjustment})]`];
}

/**
 * Generate all CSS classes needed for button adjustments inside a container
 */
export function getContainerButtonAdjustmentClasses(
	containerSize: Size,
): string[] {
	return [
		...getContainerButtonHeightClasses(containerSize),
		...getContainerButtonBorderRadiusClasses(containerSize),
	];
}

/**
 * Pre-computed CSS classes for each container size
 */
export const containerButtonAdjustments = {
	xs: getContainerButtonAdjustmentClasses("xs"),
	sm: getContainerButtonAdjustmentClasses("sm"),
	base: getContainerButtonAdjustmentClasses("base"),
	lg: getContainerButtonAdjustmentClasses("lg"),
} as const;
