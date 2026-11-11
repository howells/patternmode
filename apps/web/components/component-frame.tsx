import Link from "next/link";
import type { ReactNode } from "react";

import { ScrollPane } from "@/components/scroll-pane";
import { SiteFooter } from "@/components/site-footer";
import { findEntry } from "@/lib/catalogue";
import { readPackageFacts } from "@/lib/package-facts";
import "./component-frame.css";

/**
 * Every component page: the name, what it does and its live demo held still
 * on a plate on the left, with the reference scrolling on its own beside it.
 * On narrow screens the two become one column under the header.
 */
export const ComponentFrame = ({
  caption,
  children,
  demo,
  slug,
}: {
  /** One line under the plate saying what to try. */
  caption?: string;
  children: ReactNode;
  demo: ReactNode;
  slug: string;
}) => {
  const entry = findEntry(slug);
  const facts = readPackageFacts(entry.packageName);
  const related = entry.related.map((relatedSlug) => findEntry(relatedSlug));

  return (
    <ScrollPane
      as="main"
      aria-labelledby="component-title"
      className="frame"
      id="content"
      memoryKey={`${slug}:page`}
      tabIndex={-1}
    >
      <header className="frame-identity">
        <div className="frame-name">
          <h1 className="frame-title" id="component-title">
            {entry.name}
          </h1>
          <p className="frame-lead">{entry.lead}</p>
        </div>
        <p className="frame-package">{entry.packageName}</p>
      </header>

      <div className="frame-body">
        <section aria-label={`${entry.name} demo`} className="frame-stage">
          <div className="frame-plate">{demo}</div>
          {caption === undefined ? null : <p className="frame-caption">{caption}</p>}
        </section>

        <ScrollPane
          aria-label={`${entry.name} reference`}
          as="section"
          className="frame-reference"
          memoryKey={`${slug}:reference`}
        >
          <div className="reference">
            <h2 className="sr-only">Reference</h2>
            {children}

            <section aria-labelledby="access-title" className="reference-block">
              <div className="reference-heading">
                <h3 className="reference-title" id="access-title">
                  {entry.access.title}
                </h3>
                <p className="reference-lead">{entry.access.intro}</p>
              </div>
              <dl className="reference-rows">
                {entry.access.rows.map((row) => (
                  <div className="reference-row" key={row.name}>
                    <dt className="reference-key">{row.name}</dt>
                    <dd className="reference-value">{row.description}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="package-title" className="reference-block">
              <div className="reference-heading">
                <h3 className="reference-title" id="package-title">
                  Package
                </h3>
              </div>
              <dl className="package-facts">
                <div>
                  <dt>Package</dt>
                  <dd className="package-fact-code">{entry.packageName}</dd>
                </div>
                <div>
                  <dt>Version</dt>
                  <dd className="package-fact-code">{facts.version}</dd>
                </div>
                <div>
                  <dt>Needs</dt>
                  <dd className="package-fact-code">{facts.needs.join(", ")}</dd>
                </div>
                <div>
                  <dt>Licence</dt>
                  <dd>{facts.licence}</dd>
                </div>
              </dl>
            </section>

            <nav aria-labelledby="related-title" className="reference-block">
              <div className="reference-heading">
                <h3 className="reference-title" id="related-title">
                  Related
                </h3>
              </div>
              <ul className="related-list">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link className="related-card" href={`/${item.slug}`}>
                      <span className="related-name">{item.name}</span>
                      <span className="related-line">{item.relatedLine}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <SiteFooter />
          </div>
        </ScrollPane>
      </div>
    </ScrollPane>
  );
};
