import type { ComponentConfig } from "@/lib/component-config-types";

export const componentConfig: ComponentConfig = {
  id: "combobox",
  name: "Combobox",
  description:
    "A searchable dropdown component with support for async data loading and custom rendering.",
  category: "inputs" as const,
  icon: "ChevronDown",

  installation: {
    npm: "downshift @tanstack/react-query"
  },
  importStatement: `import { Combobox } from "@/components/ui/combobox";`,
  componentId: "ComboboxExample",
  props: [
    {
      name: "size",
      type: "select",
      options: ["sm", "base", "lg"],
      defaultValue: "base",
      description: "The size of the combobox."
    },
    {
      name: "placeholder",
      type: "text",
      defaultValue: "Select an option...",
      description: "Placeholder text shown when no value is selected."
    },
    {
      name: "searchPlaceholder",
      type: "text",
      defaultValue: "Search...",
      description: "Placeholder text for the search input."
    },
    {
      name: "emptyMessage",
      type: "text",
      defaultValue: "No results found.",
      description: "Message shown when no items match the search."
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the combobox is disabled."
    },
    {
      name: "hasError",
      type: "boolean",
      defaultValue: false,
      description: "Whether to show error styling."
    },
    {
      name: "searchDebounce",
      type: "number",
      defaultValue: 300,
      description: "Debounce delay for search in milliseconds."
    },
    {
      name: "clearSearchOnSelect",
      type: "boolean",
      defaultValue: true,
      description: "Whether to clear search input when item is selected."
    }
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic combobox with static options.",
      code: `<Combobox
  options={[
    { id: "1", label: "Apple", value: "apple" },
    { id: "2", label: "Banana", value: "banana" },
    { id: "3", label: "Cherry", value: "cherry" },
  ]}
  value={value}
  onValueChange={setValue}
  placeholder="Choose a fruit..."
/>`
    },
    {
      id: "async",
      title: "Async",
      description: "Combobox with async data loading.",
      code: `<Combobox
  fetchData={fetchFruits}
  queryKey={["fruits"]}
  value={value}
  onValueChange={setValue}
  placeholder="Search fruits..."
/>`
    },
    {
      id: "icons",
      title: "Icons API",
      description: "Combobox loading icons from API.",
      code: `<Combobox
  fetchData={fetchIcons}
  queryKey={["icons"]}
  value={value}
  onValueChange={setValue}
  placeholder="Search icons..."
/>`
    },
    {
      id: "custom-rendering",
      title: "Custom Rendering",
      description: "Combobox with custom item and trigger rendering.",
      code: `<Combobox
  options={fruits}
  value={value}
  onValueChange={setValue}
  renderItem={(item) => (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
      <span>{item.label}</span>
    </div>
  )}
/>`
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Different sizes of the combobox.",
      code: `<Combobox size="sm" />
<Combobox size="base" />
<Combobox size="lg" />`
    },
    {
      id: "error",
      title: "Error State",
      description: "Combobox in error state.",
      code: `<Combobox
  options={fruits}
  value={value}
  onValueChange={setValue}
  hasError={true}
/>`
    }
  ]
};