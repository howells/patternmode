import { oklabToHex, oklchToOklab } from "@patternmode/system";
import theme from "@patternmode/theme/registry/theme/item.json";

export interface TokenSwatch {
  name: string;
  /** The token as sRGB hex, for the swatch fill. */
  swatch: string;
  /** OKLCH lightness, chroma and hue, to three places (hue to the degree). */
  value: string;
}

/** The colours Home lists, in order, by display name and theme token. */
const SHOWN = [
  ["Background", "background"],
  ["Muted", "muted"],
  ["Border", "border"],
  ["Muted foreground", "muted-foreground"],
  ["Foreground", "foreground"],
  ["Ring", "ring"],
] as const;

const OKLCH = /^oklch\((?<l>[\d.]+) (?<c>[\d.]+) (?<h>[\d.]+)\)$/u;

/** Home's token list for one mode, read from the theme's registry item. */
export const readTokenSwatches = (mode: "dark" | "light"): TokenSwatch[] =>
  SHOWN.map(([name, token]) => {
    const source = theme.cssVars[mode][token];
    const parts = OKLCH.exec(source)?.groups;
    if (parts === undefined) {
      throw new Error(`Theme token ${mode} ${token} is not oklch(l c h): ${source}`);
    }
    const lightness = Number(parts.l);
    const chroma = Number(parts.c);
    const hue = Number(parts.h);
    return {
      name,
      swatch: oklabToHex(oklchToOklab({ C: chroma, L: lightness, h: hue })).toUpperCase(),
      value: `${lightness.toFixed(3)} ${chroma.toFixed(3)} ${hue.toFixed(0)}`,
    };
  });
