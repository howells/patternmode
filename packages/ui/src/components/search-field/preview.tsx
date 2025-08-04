import { SearchField } from "./component";

const sampleItems = [
  { id: "1", label: "Button", description: "Interactive button element" },
  { id: "2", label: "Input", description: "Text input field" },
  { id: "3", label: "Card", description: "Container for content" },
];

export function SearchFieldPreview() {
  return (
    <SearchField
      placeholder="Search components..."
      items={sampleItems}
      onItemSelect={() => {}}
    />
  );
}

// Preview props configuration for the component explorer
export const searchFieldPreviewProps = [
  {
    name: "placeholder",
    type: "string",
    defaultValue: "Search...",
    description: "Placeholder text shown when the input is empty",
  },
  {
    name: "items",
    type: "SearchFieldItem[]",
    defaultValue: sampleItems,
    description: "Array of items to search through",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: false,
    description: "Whether the search field is disabled",
  },
  {
    name: "loading",
    type: "boolean", 
    defaultValue: false,
    description: "Whether to show loading state",
  },
];
