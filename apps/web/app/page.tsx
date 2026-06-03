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
