import type { ReactNode } from "react";

/**
 * The reference's "States and variants": each cell is a live specimen on a
 * quiet inset, named, with the prop that produces it. The stage keeps the
 * one composed demo; the variations wait here beside it.
 */
export const VariantsBlock = ({
  children,
  id,
  lead,
  title = "States and variants",
}: {
  children: ReactNode;
  id: string;
  lead: string;
  title?: string;
}) => (
  <section aria-labelledby={id} className="reference-block">
    <div className="reference-heading">
      <h3 className="reference-title" id={id}>
        {title}
      </h3>
      <p className="reference-lead">{lead}</p>
    </div>
    <ul className="variant-cells">{children}</ul>
  </section>
);

export const VariantCell = ({
  children,
  code,
  name,
}: {
  children: ReactNode;
  code: string;
  name: string;
}) => (
  <li className="variant-cell">
    <div className="variant-preview">{children}</div>
    <div className="variant-caption">
      <p className="variant-name">{name}</p>
      <code className="variant-code">{code}</code>
    </div>
  </li>
);
