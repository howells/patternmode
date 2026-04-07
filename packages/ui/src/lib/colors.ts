/**
 * Default patternmodel color palette - 65 swatches organized in 13 rows x 5 columns.
 *
 * Matches the primary_color_family mappings used by the search/vectors system.
 * Organized by color family, starting with neutrals (most common for patternmodels)
 * then progressing through the color wheel.
 *
 * Row layout: Neutrals (5 rows) → Yellow → Green → Teal → Blue → Purple → Pink → Red → Orange
 */
export const DEFAULT_MATERIAL_COLORS = [
  // Row 1: Pure neutrals (white → black)
  "fbfbfb", // white
  "dfdfdf", // light gray
  "b7b5b8", // gray
  "777777", // medium gray
  "000000", // black

  // Row 2: Cool grays / Blue-grays
  "eef2f5", // cool white
  "d8dbe2", // silver
  "aeb6b9", // cool gray
  "646c79", // steel
  "002f43", // dark blue-gray

  // Row 3: Warm grays / Greige
  "f6f6ee", // warm white
  "ece9da", // greige light
  "cfd0c0", // sage gray
  "948d7b", // warm gray
  "615b4d", // brown gray

  // Row 4: Warm beige / Taupe
  "f4f0e7", // ivory
  "ded6cb", // beige
  "c9ae9b", // taupe
  "927668", // warm brown
  "4b2a23", // dark brown

  // Row 5: Cream / Tan
  "fffce9", // cream white
  "f9efd4", // cream
  "efdcb2", // light tan
  "c5af8a", // tan
  "9e805c", // brown

  // Row 6: Yellow / Gold
  "fffdc4", // light yellow
  "ffef76", // yellow
  "f0d262", // gold
  "dba946", // amber
  "b37b3e", // brown-gold

  // Row 7: Yellow-green / Olive
  "d7daaf", // sage
  "d0cb6d", // olive
  "88a85f", // green
  "269141", // bright green
  "29642e", // forest

  // Row 8: Teal / Cyan
  "d8ecea", // light teal
  "a7dfd6", // aqua
  "54b3ab", // teal
  "008d9e", // dark teal
  "006268", // deep teal

  // Row 9: Blue
  "ccd8e4", // light blue
  "9abacf", // sky blue
  "5f89bb", // blue
  "0e5aa8", // royal blue
  "012360", // navy

  // Row 10: Purple / Violet
  "ddcfde", // lavender
  "b89abe", // light purple
  "a26e95", // purple
  "69227e", // dark purple
  "3b0550", // deep purple

  // Row 11: Pink
  "f6c7d1", // light pink
  "f179a6", // pink
  "d94792", // hot pink
  "d2006b", // magenta
  "8a0151", // burgundy

  // Row 12: Red
  "fcbaac", // light coral
  "ff6c64", // coral red
  "e1455b", // red
  "df002d", // pure red
  "b30038", // dark red

  // Row 13: Orange
  "feba71", // light orange
  "ff983b", // orange
  "fa6000", // bright orange
  "cf3a00", // rust
  "9f2000", // dark orange
] as const;

export type MaterialColor = (typeof DEFAULT_MATERIAL_COLORS)[number];

const HSL_LIGHTNESS_REGEX = /hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*(\d+)%?\s*\)/;

/**
 * Number of columns in the default color grid layout
 */
export const DEFAULT_COLOR_COLUMNS = 5;

/**
 * Preview color indices for collapsed state - 27 colors representing ALL color families.
 * Each of the 13 color rows gets 2 representatives (light + medium/dark), plus 1 extra neutral.
 *
 * Goal: Show the full spectrum in mini mode. Expanded mode adds more shades within each family.
 */
export const PREVIEW_COLOR_INDICES = [
  // Row 1: Neutrals (3 - full range)
  0, // white
  2, // gray
  4, // black
  // Row 2: Cool grays (2)
  5, // cool white
  7, // cool gray
  // Row 3: Warm grays (2)
  10, // warm white
  12, // sage gray
  // Row 4: Beige/taupe (2)
  16, // beige
  18, // taupe
  // Row 5: Cream/tan (2)
  21, // cream
  23, // tan
  // Row 6: Yellow (2)
  26, // yellow
  28, // amber
  // Row 7: Green (2)
  31, // olive
  33, // bright green
  // Row 8: Teal (2)
  36, // aqua
  38, // dark teal
  // Row 9: Blue (2)
  41, // sky blue
  43, // royal blue
  // Row 10: Purple (2)
  46, // light purple
  48, // dark purple
  // Row 11: Pink (2)
  51, // pink
  53, // magenta
  // Row 12: Red (2)
  56, // coral red
  58, // pure red
  // Row 13: Orange (2)
  61, // orange
  63, // rust
] as const;

/**
 * Check if a color string is a light color (for contrast/border visibility).
 * Supports hex strings (with or without #) and HSL strings.
 */
export function isLightColor(color: string): boolean {
  // Handle HSL format: hsl(h, s%, l%)
  if (color.startsWith("hsl")) {
    const match = color.match(HSL_LIGHTNESS_REGEX);
    if (match?.[1]) {
      const lightness = Number.parseInt(match[1], 10);
      return lightness > 70;
    }
    return false;
  }

  // Handle hex format (with or without #)
  const hex = color.replace("#", "");
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  // Relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
}

/**
 * Maps hex color codes to primary_color_family values from the database.
 * Categories: Gray, Brown, Beige, White, Blue, Green, Black, Taupe, Red, Yellow, Orange, Pink, Purple, Teal
 */
export const COLOR_TO_FAMILY: Record<string, string> = {
  // Row 1: Neutral grays
  fbfbfb: "White",
  dfdfdf: "Gray",
  b7b5b8: "Gray",
  "777777": "Gray",
  "000000": "Black",

  // Row 2: Cool grays / Blue-grays
  eef2f5: "White",
  d8dbe2: "Gray",
  aeb6b9: "Gray",
  "646c79": "Gray",
  "002f43": "Blue",

  // Row 3: Warm grays / Greige
  f6f6ee: "White",
  ece9da: "Beige",
  cfd0c0: "Beige",
  "948d7b": "Taupe",
  "615b4d": "Brown",

  // Row 4: Warm beige / Taupe
  f4f0e7: "White",
  ded6cb: "Beige",
  c9ae9b: "Taupe",
  "927668": "Taupe",
  "4b2a23": "Brown",

  // Row 5: Cream / Tan
  fffce9: "White",
  f9efd4: "Beige",
  efdcb2: "Beige",
  c5af8a: "Taupe",
  "9e805c": "Brown",

  // Row 6: Yellow / Gold
  fffdc4: "Yellow",
  ffef76: "Yellow",
  f0d262: "Yellow",
  dba946: "Yellow",
  b37b3e: "Orange",

  // Row 7: Yellow-green / Olive
  d7daaf: "Green",
  d0cb6d: "Green",
  "88a85f": "Green",
  "269141": "Green",
  "29642e": "Green",

  // Row 8: Teal / Cyan
  d8ecea: "Teal",
  a7dfd6: "Teal",
  "54b3ab": "Teal",
  "008d9e": "Teal",
  "006268": "Teal",

  // Row 9: Blue
  ccd8e4: "Blue",
  "9abacf": "Blue",
  "5f89bb": "Blue",
  "0e5aa8": "Blue",
  "012360": "Blue",

  // Row 10: Purple / Violet
  ddcfde: "Purple",
  b89abe: "Purple",
  a26e95: "Purple",
  "69227e": "Purple",
  "3b0550": "Purple",

  // Row 11: Pink
  f6c7d1: "Pink",
  f179a6: "Pink",
  d94792: "Pink",
  d2006b: "Pink",
  "8a0151": "Pink",

  // Row 12: Red
  fcbaac: "Red",
  ff6c64: "Red",
  e1455b: "Red",
  df002d: "Red",
  b30038: "Red",

  // Row 13: Orange
  feba71: "Orange",
  ff983b: "Orange",
  fa6000: "Orange",
  cf3a00: "Orange",
  "9f2000": "Orange",
};

/**
 * Get the primary color family for a hex code
 */
export function getColorFamily(hex: string): string | null {
  const normalized = hex.toLowerCase().replace("#", "");
  return COLOR_TO_FAMILY[normalized] ?? null;
}

/**
 * Convert a hex color string to HSL format.
 * @param hex - Hex color without # (e.g., "fbfbfb")
 * @returns HSL string (e.g., "hsl(0, 0%, 98%)")
 */
export function hexToHsl(hex: string): string {
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
      default:
        break;
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/**
 * Get the lightness value from a hex color (0-100).
 */
export function getHexLightness(hex: string): number {
  const r = Number.parseInt(hex.slice(0, 2), 16) / 255;
  const g = Number.parseInt(hex.slice(2, 4), 16) / 255;
  const b = Number.parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  return Math.round(l * 100);
}

/**
 * Color ring structure for the radial picker.
 */
export interface ColorRing {
  colors: string[];
  ring: number;
}

/**
 * Curated colors for the radial picker, organized by hue wheel.
 * Colors progress clockwise: red → orange → yellow → green → teal → blue → purple → pink
 * Ring 0: 1 (white center)
 * Ring 1: 6 (light pastels, ~60° apart)
 * Ring 2: 12 (medium tones, ~30° apart)
 * Ring 3: 18 (saturated colors, ~20° apart)
 * Ring 4: 24 (dark colors + neutrals)
 */
export const MATERIAL_COLOR_RINGS: ColorRing[] = [
  // Ring 0: Center - white
  {
    ring: 0,
    colors: [hexToHsl("fbfbfb")],
  },
  // Ring 1: 6 light pastels (~60° spacing around wheel)
  {
    ring: 1,
    colors: [
      hexToHsl("fcbaac"), // peach (H:10)
      hexToHsl("fffdc4"), // light yellow (H:58)
      hexToHsl("d7daaf"), // light green (H:64)
      hexToHsl("d8ecea"), // light teal (H:174)
      hexToHsl("ccd8e4"), // light blue (H:210)
      hexToHsl("f6c7d1"), // light pink (H:347)
    ],
  },
  // Ring 2: 12 medium tones (~30° spacing)
  {
    ring: 2,
    colors: [
      hexToHsl("ff6c64"), // coral (H:3)
      hexToHsl("feba71"), // light orange (H:31)
      hexToHsl("ffef76"), // yellow (H:53)
      hexToHsl("d0cb6d"), // olive (H:57)
      hexToHsl("88a85f"), // green (H:86)
      hexToHsl("a7dfd6"), // aqua (H:170)
      hexToHsl("54b3ab"), // teal (H:175)
      hexToHsl("9abacf"), // sky blue (H:204)
      hexToHsl("5f89bb"), // blue (H:213)
      hexToHsl("b89abe"), // lavender (H:290)
      hexToHsl("f179a6"), // pink (H:338)
      hexToHsl("e1455b"), // red (H:352)
    ],
  },
  // Ring 3: 18 saturated/dark colors (~20° spacing)
  {
    ring: 3,
    colors: [
      hexToHsl("df002d"), // pure red (H:348)
      hexToHsl("cf3a00"), // rust (H:17)
      hexToHsl("fa6000"), // bright orange (H:23)
      hexToHsl("ff983b"), // orange (H:28)
      hexToHsl("dba946"), // amber (H:40)
      hexToHsl("f0d262"), // gold (H:47)
      hexToHsl("269141"), // bright green (H:135)
      hexToHsl("29642e"), // forest (H:125)
      hexToHsl("008d9e"), // dark teal (H:186)
      hexToHsl("006268"), // deep teal (H:183)
      hexToHsl("0e5aa8"), // royal blue (H:210)
      hexToHsl("012360"), // navy (H:219)
      hexToHsl("69227e"), // dark purple (H:286)
      hexToHsl("3b0550"), // deep purple (H:283)
      hexToHsl("a26e95"), // purple (H:315)
      hexToHsl("d94792"), // hot pink (H:329)
      hexToHsl("d2006b"), // magenta (H:329)
      hexToHsl("b30038"), // dark red (H:341)
    ],
  },
  // Ring 4: 24 colors - warm tones, neutrals, and darks (completing the palette)
  {
    ring: 4,
    colors: [
      hexToHsl("4b2a23"), // dark brown (H:10)
      hexToHsl("9f2000"), // dark orange (H:12)
      hexToHsl("927668"), // taupe dark (H:20)
      hexToHsl("c9ae9b"), // taupe (H:25)
      hexToHsl("b37b3e"), // brown orange (H:31)
      hexToHsl("9e805c"), // brown (H:33)
      hexToHsl("c5af8a"), // tan (H:38)
      hexToHsl("efdcb2"), // beige (H:41)
      hexToHsl("f9efd4"), // cream (H:44)
      hexToHsl("ded6cb"), // warm beige (H:35)
      hexToHsl("cfd0c0"), // sage (H:64)
      hexToHsl("8a0151"), // burgundy (H:325)
      hexToHsl("ddcfde"), // light purple (H:296)
      hexToHsl("002f43"), // dark blue-gray (H:198)
      hexToHsl("d8dbe2"), // silver (H:222)
      hexToHsl("eef2f5"), // cool white (H:206)
      hexToHsl("f4f0e7"), // warm white (H:42)
      hexToHsl("f6f6ee"), // ivory (H:60)
      hexToHsl("fffce9"), // cream white (H:52)
      hexToHsl("ece9da"), // warm white (H:50)
      hexToHsl("dfdfdf"), // light gray
      hexToHsl("aeb6b9"), // cool gray
      hexToHsl("646c79"), // steel gray
      hexToHsl("000000"), // black
    ],
  },
];

/**
 * Flat array of all patternmodel colors in HSL format.
 */
export const DEFAULT_MATERIAL_COLORS_HSL =
  DEFAULT_MATERIAL_COLORS.map(hexToHsl);
