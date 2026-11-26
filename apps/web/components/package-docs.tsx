import type { ReactNode } from "react";

import { ComponentFrame } from "@/components/component-frame";
import { ApiTable, DocsBlock } from "@/components/docs-blocks";
import type { ApiSection } from "@/components/docs-blocks";
import { InstallBlock } from "@/components/install-block";
import { findEntry } from "@/lib/catalogue";
import { readPackageFacts } from "@/lib/package-facts";

/** Any React app already has these, so the install command leaves them out. */
const HOST_PEERS = new Set(["react", "react-dom"]);

/**
 * The component page every package shares: the demo on its plate, then the
 * reference: states and variants, install and use, the Core API, and any
 * blocks of the page's own. The install command names the package and the
 * peers it needs, read from its manifest.
 *
 * Each page keeps its own route so it bundles only its own demo; one dynamic
 * route would ship every demo's JS and CSS to every page.
 */
export const PackageDocs = ({
  api,
  caption,
  children,
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
  /** Further reference blocks, after the Core API. */
  children?: ReactNode;
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
}) => {
  const { packageName } = findEntry(slug);
  const peers = readPackageFacts(packageName).needs.filter((name) => !HOST_PEERS.has(name));
  const command = ["npm i", packageName, ...peers].join(" ");

  return (
    <ComponentFrame caption={caption} demo={demo} slug={slug}>
      {variants}
      <InstallBlock command={command} example={example} lead={installLead} />
      <DocsBlock title="Core API">
        <ApiTable sections={api} />
      </DocsBlock>
      {children}
      {readMore === undefined ? null : <p className="read-more">{readMore}</p>}
    </ComponentFrame>
  );
};
