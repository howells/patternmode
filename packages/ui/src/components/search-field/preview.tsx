import { SearchField } from "./component";

const sampleItems = [
  { id: "1", label: "Button", description: "Interactive button element" },
  { id: "2", label: "Input", description: "Text input field" },
  { id: "3", label: "Card", description: "Container for content" },
];

export function SearchFieldExample() {
  return (
    <SearchField
      placeholder="Search components..."
      items={sampleItems}
      onItemSelect={() => {}}
    />
  );
}
