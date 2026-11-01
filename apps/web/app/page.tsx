import type { Metadata } from "next";
import Link from "next/link";

import { PlatePreview } from "@/components/plate-preview";
import { catalogue, plateNumber } from "@/lib/catalogue";

export const metadata: Metadata = {
  description: "Interface components by Daniel Howells, one React package each.",
  title: "Patternmode",
};

const Home = () => (
  <main className="catalogue" id="content">
    <header className="contents-head">
      <h1 className="type-title">Patternmode</h1>
      <p className="contents-lead type-lead">
        Interface components by Daniel Howells. {catalogue.length} so far, each its own React
        package, all on one warm theme.
      </p>
    </header>

    <ol className="plates">
      {catalogue.map((entry, index) => (
        <li key={entry.slug}>
          <Link className="plate-row" href={`/${entry.slug}`}>
            <span className="plate-row-text">
              <span className="plate-row-number type-ui">{plateNumber(index)}</span>
              <span className="plate-row-name">{entry.name}</span>
              <span className="plate-row-description type-body">{entry.description}</span>
            </span>
            <span className="plate-row-figure" data-component={entry.slug}>
              <span className="plate-row-figure-inner">
                <PlatePreview name={entry.name} />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>

    <footer className="colophon type-ui">
      Patternmode by Daniel Howells. MIT licence. Set in Inter and Hedvig Letters Serif.
    </footer>
  </main>
);

export default Home;
