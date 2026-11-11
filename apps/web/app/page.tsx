import type { Metadata } from "next";
import Link from "next/link";

import { CatalogueDrawing } from "@/components/catalogue-previews";
import { CopyCommand } from "@/components/copy-command";
import { HeroSheet } from "@/components/hero-sheet";
import { HomePane } from "@/components/home-pane";
import { SiteFooter } from "@/components/site-footer";
import { catalogue } from "@/lib/catalogue";
import { readTokenSwatches } from "@/lib/theme-tokens";
import type { TokenSwatch } from "@/lib/theme-tokens";
import "./home.css";

export const metadata: Metadata = {
  description:
    "A warm theme for shadcn, and the parts it doesn’t ship. Daniel Howells’s interface library: one theme and small React packages.",
  title: "Patternmode",
};

const THEME_COMMAND = "npx shadcn add https://patternmode.com/r/theme.json";

const FACES = [
  {
    className: "face-serif",
    glyph: "Aa",
    name: "Hedvig Letters Serif",
    note: "Display and titles. One weight.",
  },
  {
    className: "face-sans",
    glyph: "Aa",
    name: "Inter",
    note: "Interface text. Full font, with cv01, cv02, cv11.",
  },
  { className: "face-mono", glyph: "01", name: "Geist Mono", note: "Figures and code. Tabular." },
];

const TYPE_ROLES = [
  { role: "type-display", sample: "Patternmode", spec: "Hedvig 36–72 / 1.05" },
  { role: "type-title", sample: "Sheets that stack and step back", spec: "Hedvig 24 / 32" },
  { role: "type-heading", sample: "Install the theme", spec: "Inter 16 / 24" },
  {
    role: "type-label",
    sample: "Evergreen, 48% of the palette",
    spec: "Inter 14 / 20, weight 500",
  },
  {
    role: "type-lead",
    sample: "The paragraph under a title that sets the scene.",
    spec: "Inter 16–18 / 1.6",
  },
  { role: "type-figure", sample: "12,783.25", spec: "Inter 36–48 / 1" },
  {
    role: "type-body",
    sample:
      "Reading text and descriptions at the body base. Keep measures around 45 to 65 characters.",
    spec: "Inter 14 / 21",
  },
  {
    role: "type-ui",
    sample: "Controls, navigation, list rows and field labels",
    spec: "Inter 13 / 18",
  },
  { role: "type-meta", sample: "Updated 4 minutes ago · 12 items", spec: "Inter 12 / 16" },
  { role: "type-data", sample: "#315C4B · 1,204.50 · 0.0086", spec: "Geist Mono 13 / 18" },
];

const INSTALL_STEPS = [
  {
    command: THEME_COMMAND,
    description: "Colour tokens, the ten type roles and the three fonts, written into globals.css.",
    title: "Theme",
  },
  {
    command: "pnpm add @patternmode/stacksheet @patternmode/swatch",
    description: "Add the ones you need and pin them once in your workspace catalogue.",
    title: "Components",
  },
  {
    command: "npx shadcn add @patternmode/swatch",
    description: "Copies a component into your repo. A copy no longer gets fixes.",
    note: "Add the @patternmode registry to components.json first.",
    title: "Editable source",
  },
];

const WIDE_TILES = new Set(["stacksheet", "tags"]);

const TokenList = ({
  label,
  tokens,
  tone,
}: {
  label: string;
  tokens: TokenSwatch[];
  tone: "dark" | "light";
}) => (
  <ul aria-label={label} className="token-list" data-tone={tone}>
    {tokens.map((token) => (
      <li className="token-row" key={token.name}>
        <span className="token-swatch" style={{ background: token.swatch }} />
        <span className="token-name">{token.name}</span>
        <span className="token-value">{token.value}</span>
      </li>
    ))}
  </ul>
);

const Hero = () => (
  <section aria-labelledby="hero-title" className="hero">
    <div className="hero-copy">
      <h1 className="hero-title" id="hero-title">
        A warm theme for shadcn, and the parts it doesn’t ship.
      </h1>
      <p className="hero-lead">
        Patternmode is Daniel Howells’s interface library. A shadcn theme sets the type and colour.
        Small React packages handle the behaviour registries leave to you.
      </p>
      <div className="hero-actions">
        <CopyCommand command={THEME_COMMAND} />
        <Link className="hero-browse" href="/#components">
          Browse components
        </Link>
      </div>
    </div>
    <HeroSheet />
  </section>
);

const ThemeSection = () => (
  <section aria-labelledby="theme-title" className="home-section home-section--theme" id="theme">
    <div className="section-intro">
      <h2 className="section-title" id="theme-title">
        Theme
      </h2>
      <p className="section-lead">
        Three faces and warm neutrals. Hierarchy comes from size, face and colour, never bold.
      </p>
    </div>
    <div className="theme-content">
      <ul aria-label="Typefaces" className="faces">
        {FACES.map((face) => (
          <li className="face" key={face.name}>
            <span aria-hidden="true" className={`face-glyph ${face.className}`}>
              {face.glyph}
            </span>
            <span className="face-caption">
              <span className="face-name">{face.name}</span>
              <span className="face-note">{face.note}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="token-lists">
        <TokenList
          label="Light theme colours, in OKLCH"
          tokens={readTokenSwatches("light")}
          tone="light"
        />
        <TokenList
          label="Dark theme colours, in OKLCH"
          tokens={readTokenSwatches("dark")}
          tone="dark"
        />
      </div>
    </div>
  </section>
);

const TypeSection = () => (
  <section aria-labelledby="type-title" className="home-section" id="type">
    <div className="section-intro">
      <h2 className="section-title" id="type-title">
        Ten type roles
      </h2>
      <p className="section-lead">
        The same names in every Howells app. Reach for a role, not a size: <code>type-title</code>{" "}
        rather than <code>text-2xl</code>.
      </p>
    </div>
    <dl className="type-roles">
      {TYPE_ROLES.map((item) => (
        <div className="type-role" data-role={item.role} key={item.role}>
          <dt className="type-role-name">{item.role}</dt>
          <dd className={`type-role-sample ${item.role}`}>{item.sample}</dd>
          <dd className="type-role-spec">{item.spec}</dd>
        </div>
      ))}
    </dl>
  </section>
);

const ComponentsSection = () => (
  <section
    aria-labelledby="components-title"
    className="home-section home-section--components"
    id="components"
  >
    <div className="components-intro">
      <h2 className="section-title" id="components-title">
        Components
      </h2>
      <p className="section-lead">
        Each package is one behaviour, named for what it does. They read your shadcn tokens, so they
        take on whatever theme the app already has. MIT licensed.
      </p>
    </div>
    <ul className="catalogue-grid">
      {catalogue.map((entry) => (
        <li
          className="catalogue-tile"
          data-slug={entry.slug}
          data-wide={WIDE_TILES.has(entry.slug) ? "" : undefined}
          key={entry.slug}
        >
          <Link className="catalogue-link" href={`/${entry.slug}`}>
            <span aria-hidden="true" className="catalogue-figure">
              <CatalogueDrawing slug={entry.slug} />
            </span>
            <span className="catalogue-caption">
              <span className="catalogue-heading">
                <span className="catalogue-name">{entry.name}</span>
                <span className="catalogue-package">{entry.packageName}</span>
              </span>
              <span className="catalogue-summary">{entry.summary}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

const InstallSection = () => (
  <section aria-labelledby="install-title" className="install-band" id="install">
    <div className="install-inner">
      <div className="section-intro">
        <h2 className="section-title" id="install-title">
          Install
        </h2>
        <p className="section-lead">
          The theme goes in through shadcn because it has to land in your own CSS. Components come
          from npm, so fixes arrive as upgrades.
        </p>
      </div>
      <ol className="install-steps">
        {INSTALL_STEPS.map((step) => (
          <li className="install-step" key={step.title}>
            <div className="install-step-copy">
              <h3 className="install-step-title">{step.title}</h3>
              <p className="install-step-description">{step.description}</p>
            </div>
            <div className="install-step-command">
              <CopyCommand command={step.command} tone="dark" />
              {step.note === undefined ? null : <p className="install-step-note">{step.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const Home = () => (
  <HomePane>
    <div className="home">
      <Hero />

      <ThemeSection />

      <TypeSection />

      <ComponentsSection />

      <InstallSection />

      <SiteFooter />
    </div>
  </HomePane>
);

export default Home;
