export interface CatalogueEntry {
  description: string;
  name: string;
  slug: string;
}

/** Alphabetical, the way an index reads. The position is the plate number. */
export const catalogue: CatalogueEntry[] = [
  {
    description: "A thumbnail that opens into the full image or video, and closes back into place.",
    name: "Aperto",
    slug: "aperto",
  },
  {
    description: "A faceted colour sphere you spin. Pick a colour and the facets refine around it.",
    name: "Briolette",
    slug: "briolette",
  },
  {
    description: "Colour sliders on a gradient track, for one value or a range.",
    name: "Channel",
    slug: "channel",
  },
  {
    description: "A stack of cards you swipe, drag or step through with the keyboard.",
    name: "Deck",
    slug: "deck",
  },
  {
    description: "A round saturation and lightness picker with a hue arc underneath.",
    name: "Halo",
    slug: "halo",
  },
  {
    description:
      "A palette drawn as tiles, each sized by its share, that re-tiles as the shares change.",
    name: "Parquet",
    slug: "parquet",
  },
  {
    description: "Scroll areas that fade at the edges and get buttons when there's more to see.",
    name: "ScrollFrame",
    slug: "scrollframe",
  },
  {
    description: "Sheets that stack, push and step back, with typed routes and composable parts.",
    name: "Stacksheet",
    slug: "stacksheet",
  },
  {
    description: "Progress marks in whole steps, with a separate mark for no status yet.",
    name: "Status",
    slug: "status",
  },
  {
    description:
      "Colour, gradient, image and palette swatches, with selected and unavailable states.",
    name: "Swatch",
    slug: "swatch",
  },
  {
    description: "Tag pills and a tag picker with search, suggestions and no duplicates.",
    name: "Tags",
    slug: "tags",
  },
  {
    description: "A framed image with a hairline edge and an optional lift.",
    name: "Thumbnail",
    slug: "thumbnail",
  },
  {
    description: "Row controls that stay hidden until hover or focus, without shifting the layout.",
    name: "Verge",
    slug: "verge",
  },
];

/** Two-digit plate number for an index position, e.g. 4 -> "04". */
export const plateNumber = (index: number): string => String(index + 1).padStart(2, "0");

export const findPlate = (slug: string) => {
  const index = catalogue.findIndex((entry) => entry.slug === slug);
  const entry = catalogue[index];
  if (entry === undefined) {
    throw new Error(`No catalogue entry for "${slug}"`);
  }
  return {
    entry,
    index,
    next: catalogue[index + 1],
    previous: catalogue[index - 1],
  };
};
