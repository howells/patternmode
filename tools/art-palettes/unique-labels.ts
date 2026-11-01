// Gives every colour in one palette a distinct label.
//
// ColorScope names a colour by its quantised neighbourhood, so two extracted
// colours that differ only a little come back with the same name ("Muted Blue"
// twice in The Bedroom). Shown side by side in a Parquet, a repeated name reads
// as a mistake. This qualifies each repeated name by the dimension that actually
// separates its colours, measured in OKLCH, rather than numbering them.
//
// A group of same-named colours is sorted along whichever of lightness, chroma
// or hue spreads it furthest, then split at the largest gap. A side holding one
// colour takes a qualifier; a side holding several keeps the name and is split
// again on its own spread.

interface LabelledColor {
  color: string;
  label: string;
}

interface Oklch {
  C: number;
  L: number;
  h: number;
}

type Axis = "C" | "L" | "h";

const toLinear = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

const toOklch = (hex: string): Oklch => {
  const digits = hex.replace("#", "");
  const r = toLinear(Number.parseInt(digits.slice(0, 2), 16));
  const g = toLinear(Number.parseInt(digits.slice(2, 4), 16));
  const b = toLinear(Number.parseInt(digits.slice(4, 6), 16));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bAxis = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return {
    C: Math.hypot(a, bAxis),
    L: lightness,
    h: ((Math.atan2(bAxis, a) * 180) / Math.PI + 360) % 360,
  };
};

/** Distance a hue sits from yellow-orange, the warm pole, in degrees. */
const warmthDistance = (hue: number): number =>
  Math.min(Math.abs(hue - 60), 360 - Math.abs(hue - 60));

/** Position along an axis, in OKLab units so the three axes compare fairly. */
const axisValue = (axis: Axis, color: Oklch, meanChroma: number): number => {
  if (axis === "h") {
    // Arc length at the group's mean chroma; nearer the warm pole sorts higher.
    return (-warmthDistance(color.h) * Math.PI * meanChroma) / 180;
  }
  return color[axis];
};

const replaceLeading = (label: string, words: readonly string[], replacement: string): string => {
  const [first = "", ...rest] = label.split(" ");
  return words.includes(first) && rest.length > 0
    ? [replacement, ...rest].join(" ")
    : `${replacement} ${label}`;
};

interface SplitNames {
  high: string;
  low: string;
}

/** Qualifiers for the high and low side of a split, by axis. */
const qualify = (axis: Axis, label: string): SplitNames => {
  if (axis === "L") {
    // "Mid Gray" splits into Mid Gray and Dark Gray: the lighter keeps the
    // name, because "Light Gray" is usually already taken in the same palette.
    if (label.startsWith("Mid ")) {
      return { high: label, low: replaceLeading(label, ["Mid"], "Dark") };
    }
    return { high: `Light ${label}`, low: `Dark ${label}` };
  }
  if (axis === "C") {
    return { high: `Rich ${label}`, low: `Dusty ${label}` };
  }
  return {
    high: replaceLeading(label, ["Warm", "Cool"], "Warm"),
    low: replaceLeading(label, ["Warm", "Cool"], "Cool"),
  };
};

const splitGroup = (members: { color: Oklch; index: number }[], label: string, out: string[]) => {
  if (members.length === 1) {
    const [only] = members;
    if (only !== undefined) {
      out[only.index] = label;
    }
    return;
  }

  let chromaTotal = 0;
  for (const member of members) {
    chromaTotal += member.color.C;
  }
  const meanChroma = chromaTotal / members.length;
  const spread = (axis: Axis) => {
    const values = members.map((member) => axisValue(axis, member.color, meanChroma));
    return Math.max(...values) - Math.min(...values);
  };
  let axis: Axis = "L";
  for (const candidate of ["C", "h"] as const) {
    if (spread(candidate) > spread(axis)) {
      axis = candidate;
    }
  }
  const sorted = members.toSorted(
    (left, right) =>
      axisValue(axis, right.color, meanChroma) - axisValue(axis, left.color, meanChroma),
  );

  let cut = 1;
  let widest = -1;
  for (let index = 1; index < sorted.length; index += 1) {
    const previous = sorted[index - 1];
    const current = sorted[index];
    if (previous !== undefined && current !== undefined) {
      const gap =
        axisValue(axis, previous.color, meanChroma) - axisValue(axis, current.color, meanChroma);
      if (gap > widest) {
        widest = gap;
        cut = index;
      }
    }
  }

  const high = sorted.slice(0, cut);
  const low = sorted.slice(cut);
  const names = qualify(axis, label);
  splitGroup(high, high.length === 1 ? names.high : label, out);
  splitGroup(low, low.length === 1 ? names.low : label, out);
};

export const uniqueLabels = (colors: readonly LabelledColor[]): string[] => {
  const out = colors.map((entry) => entry.label);
  const groups = new Map<string, { color: Oklch; index: number }[]>();
  for (const [index, entry] of colors.entries()) {
    const group = groups.get(entry.label) ?? [];
    group.push({ color: toOklch(entry.color), index });
    groups.set(entry.label, group);
  }

  for (const [label, members] of groups) {
    if (members.length > 1) {
      splitGroup(members, label, out);
    }
  }

  const seen = new Set<string>();
  for (const label of out) {
    if (seen.has(label)) {
      throw new Error(`uniqueLabels left a repeated label: ${label}`);
    }
    seen.add(label);
  }
  return out;
};
