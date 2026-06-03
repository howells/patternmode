import type { ReactNode } from "react";

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

export const PageShell = ({ children }: { children: ReactNode }) => (
  <main className="site-shell">{children}</main>
);

export const Intro = ({
  description,
  links,
  title,
}: {
  description: string;
  links?: ReactNode;
  title: string;
}) => (
  <header className="intro">
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
    {links ? <nav aria-label="Product links">{links}</nav> : null}
  </header>
);

export const ProductSection = ({
  children,
  description,
  id,
  title,
}: {
  children: ReactNode;
  description: string;
  id: string;
  title: string;
}) => (
  <section aria-labelledby={`${id}-title`} className="product-section" id={id}>
    <div className="product-heading">
      <h2 id={`${id}-title`}>{title}</h2>
      <p>{description}</p>
    </div>
    {children}
  </section>
);

export const DocsBlock = ({ children, title }: { children: ReactNode; title: string }) => (
  <section className="docs-block">
    <div className="docs-header">
      <h3>{title}</h3>
    </div>
    {children}
  </section>
);

export const CodeBlock = ({
  children,
  install = false,
}: {
  children: string;
  install?: boolean;
}) => (
  <pre className={install ? "code-block code-block-install" : "code-block"}>
    <code>{children}</code>
  </pre>
);

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
                {prop.required ? (
                  <span className="required-marker" title="required">
                    *
                  </span>
                ) : null}
              </dt>
              <dd>
                <span className="prop-type">{prop.type}</span>
                {prop.defaultValue ? (
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

export const LinkSet = ({ children }: { children: ReactNode }) => (
  <div className="link-set">{children}</div>
);

export const BackLink = ({
  href = "/",
  label = "Patternmode",
}: {
  href?: string;
  label?: string;
}) => (
  <a className="back-link" href={href}>
    <svg
      aria-hidden="true"
      fill="none"
      height="12"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="12"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    {label}
  </a>
);

export const ComponentPage = ({
  children,
  description,
  title,
}: {
  children: ReactNode;
  description: string;
  title: string;
}) => (
  <main className="site-shell">
    <header className="component-header">
      <BackLink />
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
    {children}
  </main>
);
