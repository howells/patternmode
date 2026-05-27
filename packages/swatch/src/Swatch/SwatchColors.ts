import type { SwatchColorStop } from "./SwatchTypes";

export function isLightColor(color: string): boolean {
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

function toColorStop(stop: SwatchColorStop): { color: string; ratio?: number } {
	return typeof stop === "string" ? { color: stop } : stop;
}

function getRatioWeight(ratio: number | undefined): number {
	if (ratio === undefined) {
		return 1;
	}

	return Number.isFinite(ratio) ? Math.max(0, ratio) : 0;
}

function formatPercent(value: number): string {
	return `${Number.isInteger(value) ? value : Number(value.toFixed(2))}%`;
}
