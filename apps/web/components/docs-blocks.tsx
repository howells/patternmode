import type { ReactNode } from "react";

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

/** Props, parts and options, one card per section. */
export const ApiTable = ({ sections }: { sections: ApiSection[] }) => (
  <div className="api-list">
    {sections.map((section) => (
      <section className="api-section" key={section.name}>
        <div className="api-section-header">
          <h4>
            <code>{section.name}</code>
          </h4>
          <p>{section.description}</p>
        </div>
        <dl className="prop-list">
          {section.props.map((prop) => (
            <div className="prop-row" key={prop.name}>
              <dt>
                <code>{prop.name}</code>
                {prop.required === true ? (
                  <span className="required-marker" title="required">
                    *
                  </span>
                ) : null}
              </dt>
              <dd>
                <span className="prop-type">{prop.type}</span>
                {prop.defaultValue !== undefined && prop.defaultValue !== "" ? (
                  <span className="prop-default">{prop.defaultValue}</span>
                ) : null}
                <span className="prop-description">{prop.description}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    ))}
  </div>
);
