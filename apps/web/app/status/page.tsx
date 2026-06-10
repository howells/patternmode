import { ApiTable, CodeBlock, ComponentDocsShell, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { StatusDemo } from "@/components/status-demo";

export const metadata: Metadata = {
  description: "Animated discrete progress marks with fill and border variants.",
  title: "Status | Patternmode",
};

const statusApi: ApiSection[] = [
  {
    description: "Animated SVG status mark for discrete progress steps.",
    name: "StatusMark",
    props: [
      {
        description:
          "Numeric progress input. Values are clamped from 0 to 100 and snapped to the nearest quarter step.",
        name: "value",
        type: "number",
      },
      {
        description:
          "Named progress step. Use null only when progress is explicitly not yet known or measured.",
        name: "status",
        type: '"null" | "empty" | "quarter" | "half" | "three-quarter" | "full"',
      },
      {
        defaultValue: '"neutral"',
        description: "Visual emphasis treatment. Tone changes color only.",
        name: "tone",
        type: '"neutral" | "accent" | "muted"',
      },
      {
        defaultValue: '"base"',
        description: "Patternmode size token used for the mark dimensions.",
        name: "size",
        type: '"2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"',
      },
      {
        defaultValue: '"smooth"',
        description: "Transition preset for movement between progress steps.",
        name: "motion",
        type: '"smooth" | "snap" | "reduced" | false',
      },
      {
        defaultValue: '"fill"',
        description:
          "Visual treatment for known progress. Null progress renders the same dashed placeholder in every variant.",
        name: "variant",
        type: '"fill" | "border"',
      },
      {
        description: "Optional CSS color for active progress. Overrides tone.",
        name: "color",
        type: "string",
      },
      {
        description: "Optional CSS color for inactive track and placeholder structure.",
        name: "trackColor",
        type: "string",
      },
      {
        description:
          "Accessible label. Omit only when adjacent text already names the same state and the mark should be decorative.",
        name: "label",
        type: "string",
      },
    ],
  },
];

const statusExample = `import { StatusMark } from "@patternmode/status";
import "@patternmode/status/styles.css";

export function BuildStatus() {
  return (
    <div>
      <StatusMark
        value={75}
        label="Almost complete"
        color="#315c4b"
        trackColor="#edeae2"
      />
      <StatusMark status="null" label="Not measured yet" />
    </div>
  );
}`;

export default function StatusPage() {
  return (
    <ComponentDocsShell
      description="Discrete progress marks with fill and border variants, explicit null progress, optional colors, and motion/react transitions."
      title="Status"
    >
      <StatusDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/status</CodeBlock>
        <CodeBlock>{statusExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={statusApi} />
      </DocsBlock>
    </ComponentDocsShell>
  );
}
