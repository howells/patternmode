import { ApiTable, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { ReactNode } from "react";

import { ComponentFrame } from "@/components/component-frame";
import { InstallBlock } from "@/components/install-block";
import { findEntry } from "@/lib/catalogue";

/**
 * The component page most packages share: the demo on its plate, then the
 * reference: states and variants, install and use, and the Core API. Pages
 * with sections of their own compose ComponentFrame directly.
 *
 * Each page keeps its own route so it bundles only its own demo; one dynamic
 * route would ship every demo's JS and CSS to every page.
 */
export const PackageDocs = ({
  api,
  caption,
  demo,
  example,
  installLead,
  readMore,
  slug,
  variants,
}: {
  api: ApiSection[];
  /** One line under the plate saying what to try. */
  caption?: string;
  demo: ReactNode;
  /** The usage sample under the install command. */
  example: string;
  /** One line on how the component is meant to be held. */
  installLead: string;
  /** A closing line pointing at the package README. */
  readMore?: string;
  slug: string;
  /** The "States and variants" block, first in the reference. */
  variants?: ReactNode;
}) => (
  <ComponentFrame caption={caption} demo={demo} slug={slug}>
    {variants}
    <InstallBlock
      command={`npm i ${findEntry(slug).packageName}`}
      example={example}
      lead={installLead}
    />
    <DocsBlock title="Core API">
      <ApiTable sections={api} />
    </DocsBlock>
    {readMore === undefined ? null : <p className="read-more">{readMore}</p>}
  </ComponentFrame>
);
