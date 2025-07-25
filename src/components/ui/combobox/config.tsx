import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import {
  AsyncExample,
  ClearableExample,
  CustomRenderExample,
  DefaultExample,
  InfiniteScrollExample,
  NonSearchableExample,
  WithHookExample,
  WithIconsExample,
} from "./examples";

export const componentConfig: ComponentConfig = {
  id: "combobox",
  name: "Combobox",
  description:
    "Searchable select component built with Command and Popover, combining text input with dropdown selection.",
  category: "inputs" as const,
  icon: "Search",

  importStatement: `import { Combobox, type ComboboxOption } from "@/components/ui/combobox";`,
  componentId: "ComboboxExample",
  props: [
    {
      name: "placeholder",
      type: "string",
      defaultValue: "Select option...",
      description: "Placeholder text for the trigger button.",
    },
    {
      name: "searchPlaceholder",
      type: "string",
      defaultValue: "Search options...",
      description: "Placeholder text for the search input.",
    },
    {
      name: "emptyMessage",
      type: "string",
      defaultValue: "No options found.",
      description: "Message to show when no options match the search.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: false,
      description: "Whether the combobox is disabled.",
    },
  ],
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic combobox with searchable options.",
      code: `const DefaultExample = () => {
  const [value, setValue] = useState("");

  const options: ComboboxOption[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "orange", label: "Orange" }
  ];

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select a fruit..."
      searchPlaceholder="Search fruits..."
    />
  );
};`,
    },
    {
      id: "with-icons",
      title: "With Icons",
      description: "Combobox options with left icons.",
      code: `const WithIconsExample = () => {
  const [value, setValue] = useState("");

  const options: ComboboxOption[] = [
    {
      value: "home",
      label: "Home",
      leftIcon: ({ className }) => <Home className={className} />
    },
    {
      value: "profile",
      label: "Profile",
      leftIcon: ({ className }) => <User className={className} />
    },
    {
      value: "settings",
      label: "Settings",
      leftIcon: ({ className }) => <Settings className={className} />
    },
    {
      value: "help",
      label: "Help",
      leftIcon: ({ className }) => <HelpCircle className={className} />
    }
  ];

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select a page..."
      searchPlaceholder="Search pages..."
    />
  );
};`,
    },
    {
      id: "with-disabled-options",
      title: "With Disabled Options",
      description: "Combobox with some disabled options.",
      code: `const WithDisabledOptionsExample = () => {
  const [value, setValue] = useState("");

  const options: ComboboxOption[] = [
    { value: "option1", label: "Available Option 1" },
    { value: "option2", label: "Available Option 2" },
    { value: "option3", label: "Disabled Option", disabled: true },
    { value: "option4", label: "Available Option 3" },
    { value: "option5", label: "Another Disabled Option", disabled: true }
  ];

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select an option..."
      searchPlaceholder="Search options..."
    />
  );
};`,
    },
    {
      id: "custom-render",
      title: "Custom Render",
      description: "Combobox with custom item and trigger rendering.",
      code: `const CustomRenderExample = () => {
  const [value, setValue] = useState("");

  const options: ComboboxOption[] = [
    {
      value: "john",
      label: "John Doe",
      leftIcon: ({ className }) => <User className={className} />
    },
    {
      value: "jane",
      label: "Jane Smith",
      leftIcon: ({ className }) => <User className={className} />
    },
    {
      value: "bob",
      label: "Bob Johnson",
      leftIcon: ({ className }) => <User className={className} />
    }
  ];

  return (
    <Combobox
      options={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select a user..."
      searchPlaceholder="Search users..."
      renderTrigger={(selectedOption) =>
        selectedOption ? (
          <div className="flex items-center gap-2">
            <User className="size-4" />
            <div className="text-left">
              <div className="font-medium">{selectedOption.label}</div>
            </div>
          </div>
        ) : (
          "Select a user..."
        )
      }
      renderItem={(option) => (
        <>
          <Check className={value === option.value ? "mr-2 h-4 w-4" : "mr-2 h-4 w-4 opacity-0"} />
          <User className="mr-2 size-4" />
          <div className="flex-1">
            <div className="font-medium">{option.label}</div>
          </div>
        </>
      )}
    />
  );
};`,
    },
    {
      id: "controlled-state",
      title: "Controlled State",
      description: "Fully controlled combobox with external state management.",
      code: `const ControlledStateExample = () => {
  const [value, setValue] = useState("apple");
  const [searchTerm, setSearchTerm] = useState("");

  const allOptions: ComboboxOption[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "orange", label: "Orange" }
  ];

  const filteredOptions = allOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <strong>Selected:</strong> {value || "None"}
      </div>

      <Combobox
        options={filteredOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select a fruit..."
        searchPlaceholder="Search fruits..."
      />

      <div className="flex gap-2">
        <Button
          onClick={() => setValue("banana")}
          size="sm"
          variant="outline"
        >
          Select Banana
        </Button>
        <Button
          onClick={() => setValue("")}
          size="sm"
          variant="outline"
        >
          Clear Selection
        </Button>
      </div>
    </div>
  );
};`,
    },
    {
      id: "with-hook",
      title: "With useCombobox Hook",
      description: "Using the provided hook for state management.",
      code: `const WithHookExample = () => {
  const combobox = useCombobox("apple");

  const options: ComboboxOption[] = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
    { value: "grape", label: "Grape" },
    { value: "orange", label: "Orange" }
  ];

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <strong>Selected:</strong> {combobox.value || "None"}
      </div>

      <Combobox
        options={options}
        value={combobox.value}
        onValueChange={combobox.setValue}
        placeholder="Select a fruit..."
        searchPlaceholder="Search fruits..."
      />
    </div>
  );
};`,
    },
  ],
};
