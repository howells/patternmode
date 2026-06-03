import { ApiTable, CodeBlock, ComponentPage, DocsBlock } from "@howells/site-ui";
import type { ApiSection } from "@howells/site-ui";
import type { Metadata } from "next";

import { StacksheetDemo } from "@/components/stacksheet-demo";

export const metadata: Metadata = {
  description: "Typed Sheet Stacks with push, navigate, replace, and composable Sheet Parts.",
  title: "Stacksheet | Patternmode",
};

const stacksheetApi: ApiSection[] = [
  {
    description: "Creates an isolated sheet stack instance.",
    name: "createStacksheet",
    props: [
      {
        description: "Side, width, modal behavior, drag settings, snap points, and spring presets.",
        name: "config",
        type: "StacksheetConfig",
      },
      {
        description:
          "Wraps the app and renders the stack portal. Pass registered sheets and optional class overrides.",
        name: "StacksheetProvider",
        type: "Component",
      },
      {
        description: "Returns open, push, navigate, replace, swap, pop, and close actions.",
        name: "useSheet",
        type: "Hook",
      },
    ],
  },
  {
    description: "Composable Sheet Parts for custom layouts.",
    name: "Sheet",
    props: [
      {
        description: "Sheet regions with scroll and drag handling.",
        name: "Header / Body / Footer",
        type: "Components",
      },
      {
        description: "Built-in navigation controls for nested stacks.",
        name: "Back / Close",
        type: "Components",
      },
    ],
  },
];

const stacksheetExample = `import { createStacksheet } from "@patternmode/stacksheet";
import "@patternmode/stacksheet/styles.css";

const { StacksheetProvider, useSheet } = createStacksheet<{
  Settings: { title: string };
}>();

function OpenSettings() {
  const { open } = useSheet();
  return (
    <button onClick={() => open("Settings", "settings", { title: "Settings" })}>
      Open
    </button>
  );
}`;

export default function StacksheetPage() {
  return (
    <ComponentPage
      description="Typed Sheet Stacks with push, navigate, replace, and composable Sheet Parts."
      title="Stacksheet"
    >
      <StacksheetDemo />
      <DocsBlock title="Install">
        <CodeBlock install>npm install @patternmode/stacksheet</CodeBlock>
        <CodeBlock>{stacksheetExample}</CodeBlock>
      </DocsBlock>
      <DocsBlock title="Core API">
        <ApiTable sections={stacksheetApi} />
      </DocsBlock>
      <p className="read-more">
        Read the package README for callbacks, snap points, accessibility, and styling details.
      </p>
    </ComponentPage>
  );
}
