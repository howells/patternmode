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

// One distilled, single-weight line glyph per component on a shared 48×48 grid,
// true to what the component renders. Pure line, no fills — quiet and precise.
const CATALOG_ICONS: Record<string, ReactNode> = {
  Aperto: (
    <>
      <rect height="9" rx="1.5" width="9" x="14" y="25" />
      <rect height="12" rx="2" width="12" x="23" y="13" />
    </>
  ),
  Briolette: (
    <path d="M24 10L36.1 17L36.1 31L24 38L11.9 31L11.9 17ZM31 24L27.5 30L20.5 30L17 24L20.5 18L27.5 18ZM31 24L36.1 31M31 24L36.1 17M27.5 18L36.1 17M27.5 18L24 10M20.5 18L24 10M20.5 18L11.9 17M17 24L11.9 17M17 24L11.9 31M20.5 30L11.9 31M20.5 30L24 38M27.5 30L24 38M27.5 30L36.1 31" />
  ),
  Deck: (
    <>
      <rect height="17" rx="2" width="15" x="14" y="17" />
      <rect height="17" rx="2" width="15" x="19" y="15" />
    </>
  ),
  Halo: (
    <>
      <circle cx="24" cy="23" r="8.5" />
      <path d="M24 34A11 11 0 0 0 35 23" />
      <circle cx="30" cy="17" fill="currentColor" r="1.4" stroke="none" />
    </>
  ),
  Parquet: (
    <>
      <rect height="20" rx="2" width="20" x="14" y="14" />
      <path d="M22 14v20M22 25h12" />
    </>
  ),
  ScrollFrame: (
    <>
      <rect height="20" rx="2" width="20" x="14" y="14" />
      <path d="M18 19h12M18 24h12M18 29h7" />
    </>
  ),
  Stacksheet: (
    <>
      <path d="M14 18.5a2.5 2.5 0 0 1 2.5-2.5h15a2.5 2.5 0 0 1 2.5 2.5" />
      <rect height="15" rx="2" width="24" x="12" y="21" />
      <path d="M21 25h6" />
    </>
  ),
  Status: (
    <>
      <path d="M24 15a9 9 0 1 1-9 9" />
      <circle cx="24" cy="15" fill="currentColor" r="1.2" stroke="none" />
    </>
  ),
  Swatch: (
    <>
      <rect height="18" rx="2" width="20" x="14" y="15" />
      <path d="M23 15v18M29 15v18" />
    </>
  ),
  Tags: (
    <>
      <rect height="7" rx="2.5" width="20" x="14" y="17" />
      <rect height="7" rx="2.5" width="13" x="14" y="26" />
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
    strokeWidth={1.1}
    viewBox="0 0 48 48"
  >
    {CATALOG_ICONS[title] ?? <rect height="20" rx="3" width="20" x="14" y="14" />}
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
        strokeWidth="1.1"
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
