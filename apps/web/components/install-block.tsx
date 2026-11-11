import { CodeBlock } from "@howells/site-ui";

import { CopyCommand } from "@/components/copy-command";

/**
 * "Install and use" in a component's reference: the install command, then a
 * usage sample on a dark ground that keeps its lines whole and scrolls
 * sideways rather than wrapping.
 */
export const InstallBlock = ({
  command,
  example,
  lead,
}: {
  command: string;
  example: string;
  /** One line on how the component is meant to be held. */
  lead: string;
}) => (
  <section aria-labelledby="install-title" className="reference-block">
    <div className="reference-heading">
      <h3 className="reference-title" id="install-title">
        Install and use
      </h3>
      <p className="reference-lead">{lead}</p>
    </div>
    <CopyCommand command={command} />
    <CodeBlock>{example}</CodeBlock>
  </section>
);
