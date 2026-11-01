import Link from "next/link";
import type { ReactNode } from "react";

import { findPlate } from "@/lib/catalogue";

/**
 * One component's page: its name set large, a line on what it does, the live
 * demo straight after, then the documentation, and a page turn to its
 * neighbours in the index.
 */
export const Plate = ({ children, slug }: { children: ReactNode; slug: string }) => {
  const { entry, next, previous } = findPlate(slug);

  return (
    <main className="plate" id="content">
      <header className="plate-head">
        <h1 className="plate-title type-display">{entry.name}</h1>
        <p className="plate-lead type-lead">{entry.description}</p>
      </header>
      {children}
      <nav aria-label="Previous and next" className="plate-turn">
        {previous === undefined ? (
          <span />
        ) : (
          <Link className="plate-turn-link" href={`/${previous.slug}`} rel="prev">
            <span className="plate-turn-label type-ui">Previous</span>
            <span className="plate-turn-name type-title">{previous.name}</span>
          </Link>
        )}
        {next === undefined ? (
          <Link className="plate-turn-link plate-turn-link--next" href="/">
            <span className="plate-turn-label type-ui">All components</span>
            <span className="plate-turn-name type-title">Patternmode</span>
          </Link>
        ) : (
          <Link className="plate-turn-link plate-turn-link--next" href={`/${next.slug}`} rel="next">
            <span className="plate-turn-label type-ui">Next</span>
            <span className="plate-turn-name type-title">{next.name}</span>
          </Link>
        )}
      </nav>
    </main>
  );
};
