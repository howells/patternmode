import { ApiTable, CodeBlock, ComponentPage, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { StatusDemo } from "@/components/status-demo";

export const metadata: Metadata = {
  description:
    "Animated filled status marks with authored SVG transitions for scale and symbolic states.",
  title: "Status | Patternmode",
};

const statusApi: ApiSection[] = [
  {
    description: "Animated SVG status mark for scale and symbolic states.",
    name: "StatusMark",
    props: [
      {
        description:
          "Numeric status value. Values are clamped from 0 to 100 and snapped to the nearest discrete visual step.",
        name: "value",
        type: "number",
      },
      {
        description:
          "Named status. Scale statuses map to the same visual steps as value; symbolic statuses override value.",
        name: "status",
        type: '"empty" | "quarter" | "half" | "three-quarter" | "full" | "pending" | "blocked" | "paused" | "unknown" | "unavailable" | "complete"',
      },
      {
        defaultValue: '"neutral"',
        description:
          "Semantic color treatment. Tone changes color only; shape carries status meaning.",
        name: "tone",
        type: '"neutral" | "accent" | "success" | "warning" | "danger" | "muted"',
      },
      {
        defaultValue: '"base"',
        description: "Patternmode size token used for the mark dimensions.",
        name: "size",
        type: '"2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"',
      },
      {
        defaultValue: '"smooth"',
        description:
          "Transition preset. Status uses motion/react while respecting reduced-motion preferences.",
        name: "motion",
        type: '"smooth" | "snap" | "reduced" | false',
      },
      {
        defaultValue: "true",
        description: "Shows the soft base disc and filled quadrant segments for scale states.",
        name: "fill",
        type: "boolean",
      },
      {
        defaultValue: "true",
        description:
          "Shows the outer track ring. When fill is false, the ring carries the stroked progress arc.",
        name: "border",
        type: "boolean",
      },
      {
        description:
          "Optional CSS color for the active stroke, glyphs, and segment fill fallback. Overrides tone.",
        name: "color",
        type: "string",
      },
      {
        description: "Optional CSS color for the filled progress segments.",
        name: "fillColor",
        type: "string",
      },
      {
        description: "Optional CSS color for the empty track beneath the active status.",
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
        border
        color="#315c4b"
        fill
        fillColor="#315c4b2e"
      />
      <StatusMark status="blocked" label="Blocked" tone="danger" />
    </div>
  );
}`;

export default function StatusPage() {
  return (
    <ComponentPage
      description="Filled segmented status marks with Patternmode-authored SVG, lucide-compatible geometry, optional colors, and motion/react transitions."
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
    </ComponentPage>
  );
}
