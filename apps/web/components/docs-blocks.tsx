import type { ReactNode } from "react";

import type { ReferenceRow } from "@/lib/catalogue";

import "./docs-blocks.css";

export interface PropEntry {
  defaultValue?: string;
  description: string;
  name: string;
  required?: boolean;
  type: string;
}

export interface ApiSection {
  description: string;
  name: string;
  props: PropEntry[];
}

/**
 * A titled block of named rows, each beside what it does: the keyboard and
 * accessibility notes, and a component's features.
 */
export const ReferenceRows = ({
  id,
  lead,
  rows,
  title,
}: {
  id: string;
  lead?: string;
  rows: readonly ReferenceRow[];
  title: string;
}) => (
  <section aria-labelledby={id} className="reference-block">
    <div className="reference-heading">
      <h3 className="reference-title" id={id}>
        {title}
      </h3>
      {lead === undefined ? null : <p className="reference-lead">{lead}</p>}
    </div>
    <dl className="reference-rows">
      {rows.map((row) => (
        <div className="reference-row" key={row.name}>
          <dt className="reference-key">{row.name}</dt>
          <dd className="reference-value">{row.description}</dd>
        </div>
      ))}
    </dl>
  </section>
);

/** A titled block in a component's reference. */
export const DocsBlock = ({ children, title }: { children: ReactNode; title: string }) => (
  <section className="docs-block">
    <div className="docs-header">
      <h3>{title}</h3>
    </div>
    {children}
  </section>
);

/** A code sample on a dark ground that keeps its lines whole. */
export const CodeBlock = ({ children }: { children: string }) => (
  <pre className="code-block">
    <code>{children}</code>
  </pre>
);

/**
 * Props, parts and options: each section names its component, then one row per
 * prop with its type and default in mono and what it does underneath.
 */
export const ApiTable = ({ sections }: { sections: ApiSection[] }) => (
  <div className="api-list">
    {sections.map((section) => (
      <section className="api-section" key={section.name}>
        <div className="api-section-header">
          <h4>{section.name}</h4>
          <p>{section.description}</p>
        </div>
        <dl className="prop-list">
          {section.props.map((prop) => (
            <div className="prop-row" key={prop.name}>
              <dt>
                {prop.name}
                {prop.required === true ? <span className="prop-required">required</span> : null}
              </dt>
              <dd className="prop-signature">
                <span className="prop-type">{prop.type}</span>
                {prop.defaultValue !== undefined && prop.defaultValue !== "" ? (
                  <span className="prop-default">
                    <span className="prop-default-label">Default</span> {prop.defaultValue}
                  </span>
                ) : null}
              </dd>
              <dd className="prop-description">{prop.description}</dd>
            </div>
          ))}
        </dl>
      </section>
    ))}
  </div>
);
