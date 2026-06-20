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

// One minimal monochrome glyph per component, drawn on a shared 48×48 grid so
// every icon shares stroke weight, optical size, and alignment.
const CATALOG_ICONS: Record<string, ReactNode> = {
  Aperto: (
    <>
      <rect x="14" y="25" width="10" height="9" rx="1.5" />
      <rect x="23" y="14" width="13" height="13" rx="2.5" />
    </>
  ),
  Briolette: (
    <>
      <path d="M24 12 33 21 24 36 15 21Z" />
      <path d="M15 21h18M19 21l5-9 5 9M24 21v15" />
    </>
  ),
  Deck: (
    <>
      <rect height="18" rx="2.5" width="15" x="15" y="16" />
      <rect height="18" rx="2.5" width="15" x="19" y="15" />
    </>
  ),
  Halo: (
    <>
      <circle cx="24" cy="20.5" r="8" />
      <path d="M14.5 30.5a12 12 0 0 0 19 0" />
      <circle cx="33.5" cy="30.5" fill="currentColor" r="1.6" stroke="none" />
    </>
  ),
  Parquet: (
    <>
      <rect height="24" rx="2.5" width="24" x="12" y="12" />
      <path d="M23 12v24M23 24h13" />
    </>
  ),
  ScrollFrame: (
    <>
      <rect height="22" rx="3" width="22" x="13" y="13" />
      <path d="M17 19.5h9M17 24h9M17 28.5h6M30.5 18v8" />
    </>
  ),
  Stacksheet: (
    <>
      <path d="M19 14h10M16.5 18h15" />
      <rect height="13" rx="2.5" width="22" x="13" y="22" />
    </>
  ),
  Status: (
    <>
      <path d="M24 15a9 9 0 1 1-8.5 6" />
      <circle cx="24" cy="15" fill="currentColor" r="1.5" stroke="none" />
    </>
  ),
  Swatch: (
    <>
      <circle cx="17" cy="24" r="4.2" />
      <circle cx="24" cy="24" r="4.2" />
      <circle cx="31" cy="24" r="4.2" />
    </>
  ),
  Tags: (
    <>
      <path d="M16 16.5h8.5l9.5 7.5-9.5 7.5H16a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5z" />
      <circle cx="19.5" cy="20.5" r="1.5" />
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
    strokeWidth={1.5}
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
