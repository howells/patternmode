import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	ComponentPage,
	DocsBlock,
} from "@howells/site-ui";
import { StacksheetDemo } from "@/components/stacksheet-demo";

const stacksheetApi: ApiSection[] = [
	{
		name: "createStacksheet",
		description: "Creates an isolated sheet stack instance.",
		props: [
			{
				name: "config",
				type: "StacksheetConfig",
				description:
					"Side, width, modal behavior, drag settings, snap points, and spring presets.",
			},
			{
				name: "StacksheetProvider",
				type: "Component",
				description:
					"Wraps the app and renders the stack portal. Pass registered sheets and optional class overrides.",
			},
			{
				name: "useSheet",
				type: "Hook",
				description:
					"Returns open, push, navigate, replace, swap, pop, and close actions.",
			},
		],
	},
	{
		name: "Sheet",
		description: "Composable panel parts for custom layouts.",
		props: [
			{
				name: "Header / Body / Footer",
				type: "Components",
				description: "Panel regions with scroll and drag handling.",
			},
			{
				name: "Back / Close",
				type: "Components",
				description: "Built-in navigation controls for nested stacks.",
			},
		],
	},
];

const stacksheetExample = `import { createStacksheet } from "@howells/stacksheet";
import "@howells/stacksheet/styles.css";

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
			description="Typed sheet stacks with push, navigate, replace, and composable panel parts."
			title="Stacksheet"
		>
			<StacksheetDemo />
			<DocsBlock title="Install">
				<CodeBlock install>npm install @howells/stacksheet</CodeBlock>
				<CodeBlock>{stacksheetExample}</CodeBlock>
			</DocsBlock>
			<DocsBlock title="Core API">
				<ApiTable sections={stacksheetApi} />
			</DocsBlock>
			<p className="read-more">
				Read the package README for callbacks, snap points, accessibility, and
				styling details.
			</p>
		</ComponentPage>
	);
}
