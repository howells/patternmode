/** Colour conversions using sRGB and Björn Ottosson's OKLab matrices.
 * @see https://bottosson.github.io/posts/oklab/
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 */
import { clamp, wrapHue } from "./math";

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface OklabColor {
  L: number;
  a: number;
  b: number;
}

export interface OklchColor {
  L: number;
  C: number;
  h: number;
}

const INVALID_HEX_DIGIT = /[^\da-f]/iu;
const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/** Accepts three or six hex digits, with an optional hash; invalid input is null. */
export const hexToRgb = (hex: string): RgbColor | null => {
  const digits = hex.startsWith("#") ? hex.slice(1) : hex;
  if ((digits.length !== 3 && digits.length !== 6) || INVALID_HEX_DIGIT.test(digits)) {
    return null;
  }
  const full = digits.length === 3 ? digits.replaceAll(/./gu, "$&$&") : digits;
  return {
    b: Number.parseInt(full.slice(4, 6), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    r: Number.parseInt(full.slice(0, 2), 16),
  };
};

/** Encodes rounded, clamped 0–255 sRGB channels as lowercase hex. */
export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${[r, g, b]
    .map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0"))
    .join("")}`;

/** Hue wraps in degrees; saturation and lightness clamp to 0–100. */
export const hslToRgb = (h: number, s: number, l: number): RgbColor => {
  if (![h, s, l].every(Number.isFinite)) {
    throw new TypeError("HSL channels must be finite numbers.");
  }
  const hue = wrapHue(h);
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const offset = lightness - chroma / 2;
  const channels = (r: number, g: number, b: number): RgbColor => ({
    b: Math.round((b + offset) * 255),
    g: Math.round((g + offset) * 255),
    r: Math.round((r + offset) * 255),
  });
  switch (Math.floor(hue / 60)) {
    case 0: {
      return channels(chroma, secondary, 0);
    }
    case 1: {
      return channels(secondary, chroma, 0);
    }
    case 2: {
      return channels(0, chroma, secondary);
    }
    case 3: {
      return channels(0, secondary, chroma);
    }
    case 4: {
      return channels(secondary, 0, chroma);
    }
    default: {
      return channels(chroma, 0, secondary);
    }
  }
};

/** Converts HSL degrees/percentages to hex, including out-of-range normalisation. */
export const hslToHex = (h: number, s: number, l: number): string => {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

/** Converts hex to integer HSL channels, or null for invalid hex. */
export const hexToHsl = (hex: string): HslColor | null => {
  const rgb = hexToRgb(hex);
  if (rgb === null) {
    return null;
  }
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const high = Math.max(r, g, b);
  const low = Math.min(r, g, b);
  const lightness = (high + low) / 2;
  const difference = high - low;
  if (difference === 0) {
    return { h: 0, l: Math.round(lightness * 100), s: 0 };
  }
  let hue: number;
  if (high === r) {
    hue = ((g - b) / difference + (g < b ? 6 : 0)) / 6;
  } else if (high === g) {
    hue = ((b - r) / difference + 2) / 6;
  } else {
    hue = ((r - g) / difference + 4) / 6;
  }
  const saturation = lightness > 0.5 ? difference / (2 - high - low) : difference / (high + low);
  return {
    h: Math.round(hue * 360) % 360,
    l: Math.round(lightness * 100),
    s: Math.round(saturation * 100),
  };
};

const decodeSrgb = (channel: number): number => {
  const value = channel / 255;
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
};

/** Converts gamma-encoded sRGB channels (0–255) to perceptual OKLab. */
export const rgbToOklab = (red: number, green: number, blue: number): OklabColor => {
  const r = decodeSrgb(red);
  const g = decodeSrgb(green);
  const b = decodeSrgb(blue);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
};

/** Invalid hex stays null, rather than acquiring a colour identity. */
export const hexToOklab = (hex: string): OklabColor | null => {
  const rgb = hexToRgb(hex);
  return rgb === null ? null : rgbToOklab(rgb.r, rgb.g, rgb.b);
};

/** Euclidean distance in perceptual OKLab coordinates. */
export const oklabDistance = (left: OklabColor, right: OklabColor): number =>
  Math.hypot(left.L - right.L, left.a - right.a, left.b - right.b);

/** Linear-light RGB is deliberately unclipped so gamut checks can see overflow. */
export const oklabToLinearRgb = (lab: OklabColor): RgbColor => {
  const lRoot = lab.L + 0.3963377922 * lab.a + 0.2158037585 * lab.b;
  const mRoot = lab.L - 0.1055613462 * lab.a - 0.0638541748 * lab.b;
  const sRoot = lab.L - 0.0894841821 * lab.a - 1.291485548 * lab.b;
  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;
  return {
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    g: -1.2684380046 * l + 2.609757401 * m - 0.3413193965 * s,
    r: 4.0767416613 * l - 3.3077115904 * m + 0.2309699291 * s,
  };
};

const encodeSrgb = (channel: number): number => {
  const value = clamp(channel, 0, 1);
  const encoded = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;
  return Math.round(encoded * 255);
};

/** Encodes OKLab as hex, clipping any out-of-gamut RGB channels. */
export const oklabToHex = (lab: OklabColor): string => {
  const rgb = oklabToLinearRgb(lab);
  return rgbToHex(encodeSrgb(rgb.r), encodeSrgb(rgb.g), encodeSrgb(rgb.b));
};

export const oklabToOklch = (lab: OklabColor): OklchColor => {
  const hue = Math.atan2(lab.b, lab.a) * RAD_TO_DEG;
  return { C: Math.hypot(lab.a, lab.b), L: lab.L, h: hue < 0 ? hue + 360 : hue };
};

/** OKLCh hue is in degrees; chroma and lightness use the OKLab scale. */
export const oklchToOklab = (lch: OklchColor): OklabColor => ({
  L: lch.L,
  a: lch.C * Math.cos(lch.h * DEG_TO_RAD),
  b: lch.C * Math.sin(lch.h * DEG_TO_RAD),
});

/**
 * Perceptual (OKLab) lightness above which a color reads as "light", meaning
 * black text on it out-contrasts white text.
 *
 * It is the WCAG contrast crossover, not a taste value. Black and white text
 * tie where (Y + 0.05) / 0.05 = 1.05 / (Y + 0.05), so Y = sqrt(1.05 * 0.05) -
 * 0.05 (about 0.179). For a neutral, OKLab L is the cube root of Y, which puts
 * the crossover at L 0.5637. Above it black text has more contrast; below it
 * white does. The previous 0.62 sat above the crossover, so mid tones between
 * the two got white text at lower contrast than black would have had.
 */
const LIGHT_LIGHTNESS_THRESHOLD = Math.cbrt(Math.sqrt(1.05 * 0.05) - 0.05);

const VALID_HEX = /^(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/iu;

const NAMED_COLOR_LIGHTNESS = new Map([
  ["black", 0],
  ["transparent", 0],
  ["white", 1],
]);

/**
 * Splits a CSS color function body into channel tokens, accepting both the
 * legacy comma syntax and the modern space syntax. Alpha (after `/` or as a
 * fourth comma argument) is ignored — tone only depends on the channels.
 */
const getColorFunctionChannels = (color: string, names: readonly string[]): string[] | null => {
  // Indexed groups, not named: vendored copies of this file must compile
  // under consumer tsconfigs targeting ES2017 (named groups need ES2018+).
  // eslint-disable-next-line prefer-named-capture-group -- ES2017 portability
  const match = /^([a-z]+)\(\s*([^)]+?)\s*\)$/iu.exec(color.trim());
  if (match === null) {
    return null;
  }

  const [, name = "", body = ""] = match;
  if (!names.includes(name.toLowerCase())) {
    return null;
  }

  const channels = (body.split("/")[0] ?? "").split(/[\s,]+/u).filter(Boolean);
  return channels.length >= 3 ? channels.slice(0, 3) : null;
};

/** Parses a channel token against its full-scale value; percentages map to it. */
const parseChannel = (token: string, scale: number): number | null => {
  // oxlint-disable-next-line unicorn/prefer-number-coercion -- parseFloat reads the leading number and ignores a trailing unit such as `%`, which Number() turns into NaN.
  const value = Number.parseFloat(token);
  if (!Number.isFinite(value)) {
    return null;
  }

  return token.endsWith("%") ? (value / 100) * scale : value;
};

const getRgbFunctionLightness = (color: string): number | null => {
  const channels = getColorFunctionChannels(color, ["rgb", "rgba"]);
  if (channels === null) {
    return null;
  }

  const [red, green, blue] = channels.map((token) => parseChannel(token, 255));
  if (red === null || green === null || blue === null) {
    return null;
  }

  return rgbToOklab(red ?? 0, green ?? 0, blue ?? 0).L;
};

const getHslFunctionLightness = (color: string): number | null => {
  const channels = getColorFunctionChannels(color, ["hsl", "hsla"]);
  if (channels === null) {
    return null;
  }

  // oxlint-disable-next-line unicorn/prefer-number-coercion -- parseFloat accepts an angle unit such as `120deg` and an empty token is NaN; Number() rejects the unit and turns "" into 0.
  const hue = Number.parseFloat(channels[0] ?? "");
  const saturation = parseChannel(channels[1] ?? "", 100);
  const lightness = parseChannel(channels[2] ?? "", 100);
  if (!Number.isFinite(hue) || saturation === null || lightness === null) {
    return null;
  }

  const rgb = hslToRgb(hue, saturation, lightness);
  return rgbToOklab(rgb.r, rgb.g, rgb.b).L;
};

/** `oklab()`/`oklch()` lead with the perceptual L channel; use it directly. */
const getOkFunctionLightness = (color: string): number | null => {
  const channels = getColorFunctionChannels(color, ["oklab", "oklch"]);
  if (channels === null) {
    return null;
  }

  return parseChannel(channels[0] ?? "", 1);
};

/**
 * Hex with three, four, six or eight digits, after trimming. Alpha is dropped,
 * as it is for the function syntaxes: tone only depends on the channels. Every
 * digit is validated, alpha included.
 */
const getHexLightness = (color: string): number | null => {
  const trimmed = color.trim();
  const digits = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  if (!VALID_HEX.test(digits)) {
    return null;
  }
  const channels =
    digits.length === 4 || digits.length === 8 ? digits.slice(0, -digits.length / 4) : digits;
  return hexToOklab(channels)?.L ?? null;
};

/**
 * Perceptual (OKLab) lightness of a CSS color, or `null` when it cannot be
 * read. Parses hex (3, 4, 6 or 8 digits), `rgb()`/`rgba()`, `hsl()`/`hsla()`,
 * `oklab()`/`oklch()`, and the named colors `white`/`black`/`transparent`.
 * Anything else — other named colors, `hwb()`, `var()`, `color-mix()` — is
 * `null`, never a guess.
 */
export const getColorLightness = (color: string): number | null =>
  NAMED_COLOR_LIGHTNESS.get(color.trim().toLowerCase()) ??
  getRgbFunctionLightness(color) ??
  getHslFunctionLightness(color) ??
  getOkFunctionLightness(color) ??
  getHexLightness(color);

/**
 * Whether a color reads as light, by perceptual (OKLab) lightness above a
 * single shared threshold — so contrast treatment (e.g. dark foreground over a
 * light fill) is decided the same way wherever a weighted color is rendered.
 * Returns `null` when the color cannot be parsed (see
 * {@link getColorLightness}): the caller decides what an unknown tone means.
 */
export const isLightColor = (color: string): boolean | null => {
  const lightness = getColorLightness(color);
  return lightness === null ? null : lightness > LIGHT_LIGHTNESS_THRESHOLD;
};
