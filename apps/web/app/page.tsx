import { PageShell } from "@howells/site-ui";
import type { Metadata } from "next";

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

const CatalogPreview = ({ title }: Pick<CatalogEntry, "title">) => {
  switch (title) {
    case "Stacksheet": {
      return (
        <div className="preview-stacksheet" aria-hidden="true">
          <div className="preview-panel" />
          <div className="preview-panel" />
          <div className="preview-panel" />
        </div>
      );
    }
    case "Deck": {
      return (
        <div className="preview-deck" aria-hidden="true">
          <div className="preview-deck-card" />
          <div className="preview-deck-card" />
          <div className="preview-deck-card" />
        </div>
      );
    }
    case "Swatch": {
      return (
        <div className="preview-swatch-set" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      );
    }
    case "Status": {
      return (
        <div className="preview-status-set" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      );
    }
    case "Halo": {
      return (
        <div className="preview-halo" aria-hidden="true">
          <span className="preview-halo-pad" />
          <svg fill="none" viewBox="0 0 128 128">
            <path d="M 122 75 A 58 58 0 0 1 14 75" />
            <circle cx="122" cy="75" r="6" />
          </svg>
        </div>
      );
    }
    case "Briolette": {
      return (
        <div className="preview-briolette" aria-hidden="true">
          <svg viewBox="0 0 128 128">
            <polygon points="92,64 78,88.2 112.5,92" />
            <polygon points="78,88.2 112.5,92 64,120" />
            <polygon points="78,88.2 50,88.2 64,120" />
            <polygon points="50,88.2 64,120 15.5,92" />
            <polygon points="50,88.2 36,64 15.5,92" />
            <polygon points="36,64 15.5,92 15.5,36" />
            <polygon points="36,64 50,39.8 15.5,36" />
            <polygon points="50,39.8 15.5,36 64,8" />
            <polygon points="50,39.8 78,39.8 64,8" />
            <polygon points="78,39.8 64,8 112.5,36" />
            <polygon points="78,39.8 92,64 112.5,36" />
            <polygon points="92,64 112.5,36 112.5,92" />
            <polygon points="92,64 78,88.2 50,88.2 36,64 50,39.8 78,39.8" />
          </svg>
        </div>
      );
    }
    case "ScrollFrame": {
      return (
        <div className="preview-scroll-area" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      );
    }
    case "Tags": {
      return (
        <div className="preview-tags" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      );
    }
    case "Parquet": {
      return (
        <div className="preview-parquet" aria-hidden="true">
          <svg viewBox="0 0 128 128">
            <rect x="3" y="3" width="60" height="122" rx="2.5" fill="#ffffff" />
            <rect x="67" y="3" width="58" height="60" rx="2.5" fill="#f3f0ea" />
            <rect x="67" y="67" width="28" height="58" rx="2.5" fill="#e9e5df" />
            <rect x="99" y="67" width="26" height="58" rx="2.5" fill="#faf8f4" />
          </svg>
        </div>
      );
    }
    default: {
      return (
        <div className="preview-aperto" aria-hidden="true">
          <div className="preview-thumb" />
          <div className="preview-thumb" />
          <div className="preview-thumb" />
          <div className="preview-thumb" />
        </div>
      );
    }
  }
};

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
