import {
	type ApiSection,
	ApiTable,
	CodeBlock,
	ComponentPage,
	DocsBlock,
} from "@howells/site-ui";
import { TagsDemo } from "@/components/tags-demo";

const tagsApi: ApiSection[] = [
	{
		name: "Badge",
		description:
			"Shadcn-compatible badge base with variant and asChild support.",
		props: [
			{
				name: "variant",
				type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
				defaultValue: '"default"',
				description: "Matches the normal shadcn Badge variant names.",
			},
			{
				name: "asChild",
				type: "boolean",
				defaultValue: "false",
				description: "Renders the badge styles onto a child via Radix Slot.",
			},
		],
	},
	{
		name: "Tag",
		description:
			"Badge extension for selected filters, labels, metadata, and removable tokens.",
		props: [
			{
				name: "variant",
				type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"',
				defaultValue: '"secondary"',
				description: "Inherited from the Badge base.",
			},
			{
				name: "size",
				type: '"sm" | "base" | "lg"',
				defaultValue: '"base"',
				description: "Controls compact, default, or large sizing.",
			},
			{
				name: "onRemove",
				type: "() => void",
				description: "Adds an accessible remove button inside the tag.",
			},
			{
				name: "selected",
				type: "boolean",
				defaultValue: "false",
				description: "Adds a selected treatment without changing semantics.",
			},
		],
	},
	{
		name: "TagSelector",
		description:
			"Controlled object-based tag selector with Popover content, ScrollFrame selected tags, creation, keyboard navigation, paste parsing, and Stacksheet-style parts.",
		props: [
			{
				name: "value",
				type: "readonly TagItem[]",
				description:
					"The selected items. Selection order follows this array order.",
			},
			{
				name: "onChange",
				type: "(items: TagItem[]) => void",
				description: "Called with the next selected item objects.",
			},
			{
				name: "options",
				type: "readonly TagItem[]",
				description:
					"The consumer-owned option catalog. Selected options stay visible and toggle off by id.",
			},
			{
				name: "onCreateItem",
				type: "(label: string) => Promise<TagItem> | TagItem",
				description:
					"Enables creation through the create option, Enter/comma, and paste. The consumer returns the new object.",
			},
			{
				name: "renderTag",
				type: "(props: TagRenderProps) => ReactNode",
				description:
					"Renders selected items with any component. Patternmode provides Tag as the convenient default.",
			},
			{
				name: "renderOption",
				type: "(props: TagOptionRenderProps) => ReactNode",
				description: "Renders command options while preserving provided props.",
			},
			{
				name: "emptyMessage",
				type: "ReactNode",
				defaultValue: '"No tags found."',
				description: "Empty command-list state when no option can be shown.",
			},
		],
	},
	{
		name: "TagSelector parts",
		description:
			"Composable selector parts for Stacksheet-style layouts: Root, Trigger, Content, Search, List, Option, and Empty.",
		props: [
			{
				name: "TagSelector.Root",
				type: "TagSelectorRootProps",
				description:
					"Owns state wiring, filtering, creation, serialization, and Popover context.",
			},
			{
				name: "TagSelector.Trigger",
				type: "TagSelectorTriggerProps",
				description:
					"Renders selected tags in a horizontal ScrollFrame by default.",
			},
			{
				name: "TagSelector.Content",
				type: "TagSelectorContentProps",
				description: "Popover-backed command surface.",
			},
			{
				name: "TagSelector.Search | List | Option | Empty",
				type: "component parts",
				description:
					"Search input, option list, explicit option renderer, and empty state.",
			},
		],
	},
];

const tagsExample = `import { Tag, TagSelector, type TagItem } from "@patternmode/tags";
import "@patternmode/tags/styles.css";

function Example() {
  const [tags, setTags] = useState<TagItem[]>([
    { id: "accessible", label: "Accessible" },
  ]);
  const options = [
    { id: "accessible", label: "Accessible" },
    { id: "command-menu", label: "Command menu" },
    { id: "reusable", label: "Reusable" },
  ];

  return (
    <>
      <Tag variant="outline" onRemove={() => null}>
        Accessible
      </Tag>
      <TagSelector
        aria-label="Component tags"
        value={tags}
        onChange={setTags}
        options={options}
        onCreateItem={(label) => ({
          id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          label,
        })}
      />
    </>
  );
}`;

export default function TagsPage() {
	return (
		<ComponentPage
			description="Badge-based tag pills and controlled command selectors for filtering, categorizing, and lightweight metadata workflows."
			title="Tags"
		>
			<TagsDemo />
			<DocsBlock title="Install">
				<CodeBlock install>npm install @patternmode/tags</CodeBlock>
				<CodeBlock>{tagsExample}</CodeBlock>
			</DocsBlock>
			<DocsBlock title="Core API">
				<ApiTable sections={tagsApi} />
			</DocsBlock>
		</ComponentPage>
	);
}
