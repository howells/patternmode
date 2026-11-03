export interface ReferenceRow {
  /** Rendered in mono when it is an identifier or a value rather than a key name. */
  code?: boolean;
  description: string;
  name: string;
}

export interface CatalogueEntry {
  /** What the package handles for you, from keyboard to reduced motion. */
  access: {
    intro: string;
    rows: ReferenceRow[];
    title: "Accessibility" | "Keyboard and accessibility";
  };
  /** The paragraph under the component name on its own page. */
  lead: string;
  name: string;
  /** npm package name; also the key for the version read from its manifest. */
  packageName: string;
  /** Three neighbours, by slug. */
  related: [string, string, string];
  /** One line for a Related card on another component's page. */
  relatedLine: string;
  slug: string;
  /** The caption under the component's tile in the Home catalogue. */
  summary: string;
}

const HANDLES = "What it handles without extra wiring.";

/**
 * The thirteen components, in the order the Home catalogue lays them out:
 * Stacksheet and Tags take the two wide tiles that open and close the grid.
 */
export const catalogue: CatalogueEntry[] = [
  {
    access: {
      intro: HANDLES,
      rows: [
        { description: "Pops the top sheet. Turn off with closeOnEscape: false.", name: "Escape" },
        {
          description:
            "Each sheet is a dialog. Focus moves in on open and returns to the opener on close.",
          name: "Focus",
        },
        {
          code: true,
          description: 'Names the dialog. Defaults to "Sheet dialog"; set it per sheet.',
          name: "ariaLabel",
        },
        {
          description: "Sheets crossfade instead of sliding: 200ms in, 150ms out.",
          name: "Reduced motion",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "Sheets you open, push and pop from anywhere in a React app. Side sheets on desktop, bottom sheets on phones, from one API.",
    name: "Stacksheet",
    packageName: "@patternmode/stacksheet",
    related: ["aperto", "scrollframe", "verge"],
    relatedLine: "Sheets you open, push and pop.",
    slug: "stacksheet",
    summary:
      "Sheets that push, pop and replace from anywhere in the app. Side sheets on desktop, bottom sheets with snap points on phones, from one API.",
  },
  {
    access: {
      intro: HANDLES,
      rows: [
        {
          description: "Move the focused boundary by one step. Each handle is a slider.",
          name: "Arrow keys",
        },
        { description: "Move ten steps.", name: "Page Up, Page Down" },
        {
          description: "Move the boundary as far as minValue allows. No segment drops below it.",
          name: "Home, End",
        },
        {
          description: "The bar is a fieldset; its legend names each segment and value.",
          name: "Legend",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "Colour, gradient, image and palette swatches. A distribution bar edits how a palette divides; a display shows it read-only.",
    name: "Swatch",
    packageName: "@patternmode/swatch",
    related: ["parquet", "channel", "halo"],
    relatedLine: "Colour and palette swatches.",
    slug: "swatch",
    summary:
      "Colours, gradients, images and weighted palettes on one size scale, with selected, transparent and unavailable states.",
  },
  {
    access: {
      intro: HANDLES,
      rows: [
        {
          code: true,
          description: "Names the scroll area. Every example in the README passes one.",
          name: "aria-label",
        },
        {
          description: "Real buttons that take the focus ring from --ring and scroll one step.",
          name: "Previous, Next",
        },
        {
          description: "Fades stop animating and the controls scroll instantly.",
          name: "Reduced motion",
        },
        {
          description: "Stay mounted, so wheel and touch scrolling still work.",
          name: "Hidden scrollbars",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "A scroll area whose edge fades show only while there is more to see, with quiet scrollbars and optional previous and next buttons.",
    name: "ScrollFrame",
    packageName: "@patternmode/scrollframe",
    related: ["deck", "stacksheet", "thumbnail"],
    relatedLine: "Scroll areas with fades and quiet scrollbars.",
    slug: "scrollframe",
    summary:
      "Edge fades that show only while there’s more to scroll, with optional next and previous controls.",
  },
  {
    access: {
      intro: "Decide the alt text from the row around the image.",
      rows: [
        {
          code: true,
          description: "The default. If the row already names the thing, repeating it is noise.",
          name: 'alt=""',
        },
        {
          code: true,
          description:
            "Your own element keeps its own alt and props. The frame doesn't wrap or clone them.",
          name: "children",
        },
        {
          description: "Follows prefers-color-scheme. A black edge on a dark surface would vanish.",
          name: "Dark mode",
        },
      ],
      title: "Accessibility",
    },
    lead: "A framed image. The edge is drawn inside the picture, so it reads as a window onto the image rather than a field holding one.",
    name: "Thumbnail",
    packageName: "@patternmode/thumbnail",
    related: ["aperto", "verge", "swatch"],
    relatedLine: "A framed image with an inset edge.",
    slug: "thumbnail",
    summary: "An inset hairline, so an image reads as a window rather than a form field.",
  },
  {
    access: {
      intro: "Keyboard and touch work without extra wiring. Touch hit areas are yours to size.",
      rows: [
        {
          description:
            "Tabbing into the row reveals the slot. Controls stay in the tab order at rest.",
          name: "Tab",
        },
        {
          description:
            "Nothing hides, and controls get a wider gap. Give each one a 48×48px hit area.",
          name: "Touch",
        },
        {
          code: true,
          description: "Renders the real element, so a row in a list can be an li and a cell a td.",
          name: "as",
        },
        { description: "The fade is dropped.", name: "Reduced motion" },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "Row actions that rest hidden and appear on hover, on focus, and always on touch. They hold their space throughout, so nothing moves.",
    name: "Verge",
    packageName: "@patternmode/verge",
    related: ["tags", "thumbnail", "stacksheet"],
    relatedLine: "Row actions that appear on hover or focus.",
    slug: "verge",
    summary:
      "Row controls that appear on hover and focus, and always on touch, without moving anything.",
  },
  {
    access: {
      intro:
        "A mark with a label is an image with a name. Without one it is hidden from assistive technology.",
      rows: [
        {
          code: true,
          description:
            'Gives the mark role="img" and that name. Without it the mark is aria-hidden.',
          name: "label",
        },
        {
          description: "Use for progress nobody has measured yet. Zero means measured and empty.",
          name: "Null",
        },
        {
          description: "Changes snap instead of animating. Set motion={false} to always snap.",
          name: "Reduced motion",
        },
      ],
      title: "Accessibility",
    },
    lead: "A small progress mark in quarter steps. Not measured yet looks different from nothing done.",
    name: "Status",
    packageName: "@patternmode/status",
    related: ["swatch", "channel", "tags"],
    relatedLine: "A small progress mark in quarter steps.",
    slug: "status",
    summary:
      "Progress in quarter steps, with its own mark for not yet known, which is different from zero.",
  },
  {
    access: {
      intro: "The deck is one focusable slider. Arrow keys advance it.",
      rows: [
        {
          description: "Advances to the right, if right is an allowed direction.",
          name: "ArrowRight",
        },
        {
          description: "Advances to the left, if left is an allowed direction.",
          name: "ArrowLeft",
        },
        {
          code: true,
          description: "Names the deck. The current card is announced as the slider's value.",
          name: "aria-label",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "A stack of cards you drag, fling or arrow through. It can cycle forever or run out, and late cards rise in from beneath.",
    name: "Deck",
    packageName: "@patternmode/deck",
    related: ["aperto", "scrollframe", "thumbnail"],
    relatedLine: "A stack of cards you swipe through.",
    slug: "deck",
    summary:
      "A stack of cards you swipe or key through, on a loop or until it runs out. Late cards rise in from below.",
  },
  {
    access: {
      intro: "The mosaic is a picture. Put the same values in text beside it.",
      rows: [
        {
          description:
            "The mosaic carries no name of its own, and hover labels can't be reached by keyboard. List the values nearby.",
          name: "Text alternative",
        },
        {
          description:
            "Built-in labels pick light or dark text from each tile's perceptual lightness.",
          name: "Label contrast",
        },
        {
          description: "The morph is switched off. disableMotion does the same everywhere.",
          name: "Reduced motion",
        },
      ],
      title: "Accessibility",
    },
    lead: "A colour mosaic where each tile's area is its weight. When the palette changes, the tiles re-pack and morph into place.",
    name: "Parquet",
    packageName: "@patternmode/parquet",
    related: ["swatch", "status", "briolette"],
    relatedLine: "Shows palette weight as tile area.",
    slug: "parquet",
    summary:
      "A colour mosaic where each tile’s area is its share, re-tiling as the palette changes.",
  },
  {
    access: {
      intro: "Both controls take arrow keys.",
      rows: [
        { description: "On the pad, nudge saturation.", name: "Left, Right" },
        { description: "On the pad, nudge lightness.", name: "Up, Down" },
        { description: "Takes larger steps.", name: "Shift" },
        {
          description: "The arc is a hidden slider, so arrow keys set hue from 0 to 359.",
          name: "Hue",
        },
        {
          code: true,
          description:
            'A hidden fieldset legend, used when there is no aria-label. Defaults to "Color".',
          name: "label",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "A round colour picker. The pad sets saturation and lightness; a short arc beside it sets hue.",
    name: "Halo",
    packageName: "@patternmode/halo",
    related: ["briolette", "channel", "swatch"],
    relatedLine: "A round picker for saturation and lightness.",
    slug: "halo",
    summary:
      "A round saturation and lightness pad with a small hue arc. Drag it or use the arrow keys.",
  },
  {
    access: {
      intro: "Built on Base UI, which handles focus, keys, pointer input and forms.",
      rows: [
        {
          code: true,
          description:
            'Names the slider. In a range the thumbs become "start" and "end"; thumbLabels renames them.',
          name: "label",
        },
        {
          code: true,
          description: 'Announces values in your own words, such as "warmer" rather than a number.',
          name: "getValueText",
        },
        {
          code: true,
          description: "How far the arrow keys and the larger keyboard steps move a thumb.",
          name: "step, largeStep",
        },
        {
          description: "The press animation follows the reduced motion setting.",
          name: "Reduced motion",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "A gradient slider for one colour channel, with glass thumbs. One value or a range. Your app supplies the gradient and the colour maths.",
    name: "Channel",
    packageName: "@patternmode/channel",
    related: ["halo", "swatch", "briolette"],
    relatedLine: "A gradient slider for one colour channel.",
    slug: "channel",
    summary: "Gradient sliders with glass thumbs, for one value or a range, sized to match Swatch.",
  },
  {
    access: {
      intro: "Open, move between items and close without a pointer.",
      rows: [
        {
          description:
            "Open the focused thumbnail. Each one is a button named “Open” and the item’s title.",
          name: "Enter, Space",
        },
        {
          description: "Move to the previous or next item while open.",
          name: "ArrowLeft, ArrowRight",
        },
        {
          description: "Closes, and focus returns to the thumbnail that opened it.",
          name: "Escape",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "Thumbnails that open into a full image or video in place, and close back into the thumbnail they came from.",
    name: "Aperto",
    packageName: "@patternmode/aperto",
    related: ["thumbnail", "deck", "stacksheet"],
    relatedLine: "Opens a thumbnail into a full image.",
    slug: "aperto",
    summary:
      "A thumbnail that opens into the full image or video and closes back into place. Drag down to dismiss.",
  },
  {
    access: {
      intro: "Everything you can do by dragging, you can do with keys.",
      rows: [
        { description: "Spin the sphere.", name: "Arrow keys" },
        { description: "Selects the facet facing you.", name: "Enter" },
        { description: "Clears the value.", name: "Escape" },
        { code: true, description: 'Names the sphere. Defaults to "Color".', name: "label" },
        {
          description: "No idle drift, inertia or morphs. Only direct moves remain.",
          name: "Reduced motion",
        },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "A spinnable sphere of colour facets. Pick one and the sphere repaints with close neighbours of it, so each choice narrows the next.",
    name: "Briolette",
    packageName: "@patternmode/briolette",
    related: ["halo", "channel", "parquet"],
    relatedLine: "A spinnable colour sphere.",
    slug: "briolette",
    summary:
      "A spinnable colour sphere of 80 facets. Pick one and the rest repaint as its near neighbours.",
  },
  {
    access: {
      intro: "A combobox you can run from the keyboard alone.",
      rows: [
        {
          description: "On the trigger, open the list and move focus to search.",
          name: "Enter, Space",
        },
        {
          description:
            "Move through options. Focus stays in search; aria-activedescendant follows.",
          name: "ArrowUp, ArrowDown",
        },
        {
          description: "Selects the active option, or creates the typed tag.",
          name: "Enter",
        },
        { description: "Commits what you've typed as a tag.", name: "Comma" },
        { description: "In an empty search, removes the last tag.", name: "Backspace" },
      ],
      title: "Keyboard and accessibility",
    },
    lead: "Badges, removable tag chips, and a selector for choosing, creating and removing tags from a list.",
    name: "Tags",
    packageName: "@patternmode/tags",
    related: ["verge", "swatch", "status"],
    relatedLine: "Chips and a selector for choosing tags.",
    slug: "tags",
    summary:
      "Tag chips and a tag picker with search, create and paste. Commas or new lines add several at once, without duplicates.",
  },
];

export const findEntry = (slug: string): CatalogueEntry => {
  const entry = catalogue.find((item) => item.slug === slug);
  if (entry === undefined) {
    throw new Error(`No catalogue entry for "${slug}"`);
  }
  return entry;
};

export const isComponentSlug = (slug: string): boolean =>
  catalogue.some((item) => item.slug === slug);
