import { PageShell } from "@howells/site-ui";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  description: "Component catalog for Patternmode interface primitives.",
  title: "Patternmode",
};

interface CatalogEntry {
  description: string;
  href: string;
  title: string;
}

const components: CatalogEntry[] = [
  {
    description: "Typed Sheet Stacks with push, navigate, replace, and composable Sheet Parts.",
    href: "/stacksheet",
    title: "Stacksheet",
  },
  {
    description:
      "Thumbnail-to-expanded media transitions with image, video, and keyboard navigation.",
    href: "/aperto",
    title: "Aperto",
  },
  {
    description:
      "Card Decks with cyclic stacks, finite advance flows, velocity gestures, and keyboard control.",
    href: "/deck",
    title: "Deck",
  },
  {
    description:
      "Color, gradient, image, and weighted palette swatches with selection affordances.",
    href: "/swatch",
    title: "Swatch",
  },
  {
    description: "Round saturation and lightness picker with a compact hue smile arc.",
    href: "/halo",
    title: "Halo",
  },
  {
    description:
      "Spinnable geodesic color sphere whose facets refine around each selection in OKLab.",
    href: "/briolette",
    title: "Briolette",
  },
  {
    description:
      "Proportional color mosaic that re-tiles and morphs as a palette's weights change.",
    href: "/parquet",
    title: "Parquet",
  },
  {
    description: "Animated discrete progress marks with explicit null and fill or border variants.",
    href: "/status",
    title: "Status",
  },
  {
    description: "Radix-backed scroll containers with eased fades and movement controls.",
    href: "/scrollframe",
    title: "ScrollFrame",
  },
  {
    description:
      "Composable tag pills and token inputs with keyboard entry, suggestions, and duplicate prevention.",
    href: "/tags",
    title: "Tags",
  },
];

// One bespoke monochrome glyph per component on a shared 48×48 grid: each pairs
// outline structure with a tonal fill and a small solid accent, true to what the
// component actually renders. Tints use currentColor at reduced opacity.
const CATALOG_ICONS: Record<string, ReactNode> = {
  Aperto: (
    <>
      <rect
        fill="currentColor"
        height="10"
        opacity="0.5"
        rx="2"
        stroke="none"
        width="10"
        x="13"
        y="24"
      />
      <rect height="16" rx="3" width="16" x="20" y="14" />
    </>
  ),
  Briolette: (
    <>
      <path d="M19 21l5-9 5 9z" fill="currentColor" opacity="0.18" stroke="none" />
      <path d="M24 12 33 21 24 36 15 21ZM15 21h18M19 21l5-9 5 9M24 21v15" />
    </>
  ),
  Deck: (
    <>
      <rect
        fill="currentColor"
        height="17"
        opacity="0.22"
        rx="2.5"
        stroke="none"
        width="15"
        x="14"
        y="17"
      />
      <rect height="18" rx="2.5" width="15" x="19" y="15" />
    </>
  ),
  Halo: (
    <>
      <circle cx="24" cy="21" r="8" />
      <circle cx="27" cy="18" fill="currentColor" r="2" stroke="none" />
      <path d="M15 30a11 11 0 0 0 18 0" />
    </>
  ),
  Parquet: (
    <>
      <path
        d="M15.5 13H23V27H13V15.5A2.5 2.5 0 0 1 15.5 13Z"
        fill="currentColor"
        opacity="0.55"
        stroke="none"
      />
      <path
        d="M23 24H35V32.5A2.5 2.5 0 0 1 32.5 35H23Z"
        fill="currentColor"
        opacity="0.28"
        stroke="none"
      />
      <rect height="22" rx="2.5" width="22" x="13" y="13" />
      <path d="M23 13v22M13 27h10M23 24h12" />
    </>
  ),
  ScrollFrame: (
    <>
      <rect
        fill="currentColor"
        height="4.5"
        opacity="0.16"
        rx="2"
        stroke="none"
        width="20"
        x="14"
        y="14"
      />
      <rect height="22" rx="3" width="22" x="13" y="13" />
      <path d="M17 21h9M17 25.5h9M17 30h6" />
      <path d="M31 19v7" opacity="0.6" />
    </>
  ),
  Stacksheet: (
    <>
      <path d="M18 16h12" opacity="0.4" />
      <rect height="15" rx="3" width="22" x="13" y="20" />
      <rect fill="currentColor" height="1.6" rx="0.8" stroke="none" width="6" x="21" y="23.5" />
    </>
  ),
  Status: (
    <>
      <path d="M24 24 24 18A6 6 0 1 1 18 24Z" fill="currentColor" stroke="none" />
      <circle cx="24" cy="24" r="9" />
    </>
  ),
  Swatch: (
    <>
      <rect
        fill="currentColor"
        height="20"
        opacity="0.35"
        stroke="none"
        width="6.5"
        x="23"
        y="14"
      />
      <rect height="20" rx="3" width="22" x="13" y="14" />
      <path d="M23 14v20M29.5 14v20" />
    </>
  ),
  Tags: (
    <>
      <rect
        fill="currentColor"
        height="10"
        opacity="0.3"
        rx="5"
        stroke="none"
        width="13"
        x="13"
        y="19"
      />
      <rect height="10" rx="5" width="9.5" x="27.5" y="19" />
    </>
  ),
};

const CatalogPreview = ({ title }: Pick<CatalogEntry, "title">) => (
  <svg
    aria-hidden="true"
    className="catalog-icon"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.75}
    viewBox="0 0 48 48"
  >
    {CATALOG_ICONS[title] ?? <rect height="22" rx="3" width="22" x="13" y="13" />}
  </svg>
);

const CatalogCard = ({ description, href, title }: CatalogEntry) => (
  <a className="catalog-card" href={href}>
    <div className="catalog-card-preview" data-component={title.toLowerCase()}>
      <CatalogPreview title={title} />
    </div>
    <div className="catalog-card-body">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </a>
);

const PlaceholderCard = () => (
  <div className="catalog-card catalog-card-placeholder">
    <div className="catalog-card-preview catalog-card-preview-placeholder">
      <svg
        aria-hidden="true"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </div>
    <div className="catalog-card-body">
      <h2>More coming</h2>
      <p>New components are in progress.</p>
    </div>
  </div>
);

const Home = () => (
  <PageShell>
    <header className="catalog-intro">
      <h1>Patternmode</h1>
      <p>Focused React interface components. {components.length} shipped, more on the way.</p>
    </header>

    <div className="catalog-grid">
      {components.map((entry) => (
        <CatalogCard key={entry.href} {...entry} />
      ))}
      <PlaceholderCard />
    </div>
  </PageShell>
);

export default Home;
