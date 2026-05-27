export const PATTERNMODE_SIZES = [
	"2xs",
	"xs",
	"sm",
	"base",
	"lg",
	"xl",
	"2xl",
	"3xl",
] as const;

export type PatternmodeSize = (typeof PATTERNMODE_SIZES)[number];
export type CssSize = number | string;

export const PATTERNMODE_SIZE_VALUES = {
	"2xs": "1rem",
	xs: "1.25rem",
	sm: "1.5rem",
	base: "2rem",
	lg: "2.5rem",
	xl: "3rem",
	"2xl": "3.5rem",
	"3xl": "4rem",
} as const satisfies Record<PatternmodeSize, string>;

export const PATTERNMODE_SIZE_PIXELS = {
	"2xs": 16,
	xs: 20,
	sm: 24,
	base: 32,
	lg: 40,
	xl: 48,
	"2xl": 56,
	"3xl": 64,
} as const satisfies Record<PatternmodeSize, number>;

export function getPatternmodeSizeValue(size: PatternmodeSize): string {
	return PATTERNMODE_SIZE_VALUES[size];
}

export function toCssSize(value: CssSize | undefined): string | undefined {
	if (typeof value === "number") {
		return `${value}px`;
	}
	return value;
}

export function getSizeVariableStyle(
	size: PatternmodeSize,
	variableName = "--patternmode-size",
): Record<string, string> {
	return {
		[variableName]: getPatternmodeSizeValue(size),
	};
}

export type ClassNameValue = false | null | string | undefined;

export function joinClassNames(...parts: ClassNameValue[]): string | undefined {
	const out = parts.filter(Boolean).join(" ").trim();
	return out.length > 0 ? out : undefined;
}

export const BREAKPOINT_VALUES = {
	"2xs": 320,
	xs: 480,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
	"3xl": 1920,
} as const;

export type Breakpoint = keyof typeof BREAKPOINT_VALUES | "base";

export const BREAKPOINTS = [
	"2xs",
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"3xl",
] as const satisfies readonly (keyof typeof BREAKPOINT_VALUES)[];

export type ResponsiveMode = "screen" | "container";
export type ResponsiveValue<T> =
	| T
	| (Partial<Record<Breakpoint, T>> & { base?: T });

export const SCREEN_PREFIX = {
	base: "",
	"2xs": "2xs:",
	xs: "xs:",
	sm: "sm:",
	md: "md:",
	lg: "lg:",
	xl: "xl:",
	"2xl": "2xl:",
	"3xl": "3xl:",
} as const satisfies Record<Breakpoint, string>;

export const CONTAINER_PREFIX = {
	base: "",
	"2xs": "@2xs:",
	xs: "@xs:",
	sm: "@sm:",
	md: "@md:",
	lg: "@lg:",
	xl: "@xl:",
	"2xl": "@2xl:",
	"3xl": "@3xl:",
} as const satisfies Record<Breakpoint, string>;

export function isResponsiveValue<T>(
	value: ResponsiveValue<T> | undefined,
): value is Partial<Record<Breakpoint, T>> & { base?: T } {
	return !!value && typeof value === "object" && !Array.isArray(value);
}

export function getBreakpointPrefix(
	breakpoint: Breakpoint,
	mode: ResponsiveMode = "screen",
): string {
	return mode === "container"
		? CONTAINER_PREFIX[breakpoint]
		: SCREEN_PREFIX[breakpoint];
}

export function getResponsiveClasses<T extends number | string>(
	value: ResponsiveValue<T> | undefined,
	classMap: Record<T, string>,
	mode: ResponsiveMode = "screen",
): string[] {
	if (value === undefined) {
		return [];
	}

	if (!isResponsiveValue(value)) {
		const className = classMap[value as T];
		return className ? [className] : [];
	}

	const classes: string[] = [];
	if (value.base !== undefined) {
		const className = classMap[value.base as T];
		if (className) {
			classes.push(className);
		}
	}

	for (const breakpoint of BREAKPOINTS) {
		const breakpointValue = value[breakpoint];
		if (breakpointValue === undefined) {
			continue;
		}

		const className = classMap[breakpointValue as T];
		if (className) {
			classes.push(`${getBreakpointPrefix(breakpoint, mode)}${className}`);
		}
	}

	return classes;
}

export function pushResponsiveClasses<T extends number | string>(
	classes: string[],
	value: ResponsiveValue<T> | undefined,
	classMap: Record<T, string>,
	mode: ResponsiveMode = "screen",
): void {
	classes.push(...getResponsiveClasses(value, classMap, mode));
}

export const OBJECT_FITS = [
	"contain",
	"cover",
	"fill",
	"none",
	"scale-down",
] as const;

export type ObjectFit = (typeof OBJECT_FITS)[number];

export interface ObjectSizing {
	fit?: ObjectFit;
	height?: CssSize;
	position?: string;
	width?: CssSize;
}

export interface ObjectSizingStyle {
	height: string;
	objectFit: ObjectFit;
	objectPosition: string;
	width: string;
}

export function getObjectSizingStyle(
	sizing: ObjectSizing = {},
): ObjectSizingStyle {
	return {
		height: toCssSize(sizing.height) ?? "100%",
		objectFit: sizing.fit ?? "cover",
		objectPosition: sizing.position ?? "center",
		width: toCssSize(sizing.width) ?? "100%",
	};
}
