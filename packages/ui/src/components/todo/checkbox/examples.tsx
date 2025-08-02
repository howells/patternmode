"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import { Checkbox } from "@patternmode/ui";

import React from "react";

// Default checkbox
export const DefaultExample = () => <Checkbox />;

// Checked checkbox
export const CheckedExample = () => <Checkbox checked={true} />;

// Indeterminate checkbox
export const IndeterminateExample = () => <Checkbox checked="indeterminate" />;

// Disabled checkboxes
export const DisabledExample = () => (
  <div className="space-x-4 flex items-center">
    <Checkbox disabled />
    <Checkbox checked={true} disabled />
    <Checkbox checked="indeterminate" disabled />
  </div>
);

// Checkbox with label
export const WithLabelExample = () => (
  <label className="flex items-center gap-2 cursor-pointer">
    <Checkbox />
    <span className="text-sm font-medium">Accept terms and conditions</span>
  </label>
);

// Controlled checkbox
export const ControlledExample = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox
          checked={checked}
          onCheckedChange={setChecked}
        />
        <span className="text-sm font-medium">
          Subscribe to newsletter
        </span>
      </label>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Checkbox is
        {" "}
        {checked ? "checked" : "unchecked"}
      </p>
    </div>
  );
};

// Checkbox group
export const GroupExample = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const items = [
    { id: "email", label: "Email notifications" },
    { id: "sms", label: "SMS notifications" },
    { id: "push", label: "Push notifications" },
  ];

  const handleChange = (itemId: string, checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedItems([...selectedItems, itemId]);
    }
    else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Notification Preferences</h3>
      {items.map(item => (
        <label key={item.id} className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={selectedItems.includes(item.id)}
            onCheckedChange={checked => handleChange(item.id, checked)}
          />
          <span className="text-sm">{item.label}</span>
        </label>
      ))}
    </div>
  );
};

// Indeterminate parent checkbox
export const IndeterminateParentExample = () => {
  const [parentChecked, setParentChecked] = React.useState<boolean | "indeterminate">(false);
  const [childStates, setChildStates] = React.useState({
    option1: false,
    option2: false,
    option3: false,
  });

  React.useEffect(() => {
    const checkedCount = Object.values(childStates).filter(Boolean).length;
    if (checkedCount === 0) {
      setParentChecked(false);
    }
    else if (checkedCount === Object.keys(childStates).length) {
      setParentChecked(true);
    }
    else {
      setParentChecked("indeterminate");
    }
  }, [childStates]);

  const handleParentChange = (checked: boolean | "indeterminate") => {
    const newState = checked === true;
    setChildStates({
      option1: newState,
      option2: newState,
      option3: newState,
    });
  };

  const handleChildChange = (child: keyof typeof childStates, checked: boolean | "indeterminate") => {
    setChildStates({
      ...childStates,
      [child]: checked === true,
    });
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 cursor-pointer font-medium">
        <Checkbox
          checked={parentChecked}
          onCheckedChange={handleParentChange}
        />
        <span className="text-sm">Select all</span>
      </label>
      <div className="ml-6 space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={childStates.option1}
            onCheckedChange={checked => handleChildChange("option1", checked)}
          />
          <span className="text-sm">Option 1</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={childStates.option2}
            onCheckedChange={checked => handleChildChange("option2", checked)}
          />
          <span className="text-sm">Option 2</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            checked={childStates.option3}
            onCheckedChange={checked => handleChildChange("option3", checked)}
          />
          <span className="text-sm">Option 3</span>
        </label>
      </div>
    </div>
  );
};

// Different sizes
export const SizesExample = () => (
  <div className="flex items-center gap-4">
    <Checkbox className="h-3 w-3" />
    <Checkbox className="h-4 w-4" />
    <Checkbox className="h-5 w-5" />
    <Checkbox className="h-6 w-6" />
  </div>
);

// Custom styling
export const CustomStyleExample = () => (
  <Checkbox
    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
  />
); export const CheckboxExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "CheckedExample",
    title: "Checked",
    description: "Checked example",
    component: CheckedExample,
  },
  {
    id: "IndeterminateExample",
    title: "Indeterminate",
    description: "Indeterminate example",
    component: IndeterminateExample,
  },
  {
    id: "DisabledExample",
    title: "Disabled",
    description: "Disabled example",
    component: DisabledExample,
  },
  {
    id: "WithLabelExample",
    title: "With Label",
    description: "With Label example",
    component: WithLabelExample,
  },
  {
    id: "ControlledExample",
    title: "Controlled",
    description: "Controlled example",
    component: ControlledExample,
  },
  {
    id: "GroupExample",
    title: "Group",
    description: "Group example",
    component: GroupExample,
  },
  {
    id: "IndeterminateParentExample",
    title: "Indeterminate Parent",
    description: "Indeterminate Parent example",
    component: IndeterminateParentExample,
  },
  {
    id: "SizesExample",
    title: "Sizes",
    description: "Sizes example",
    component: SizesExample,
  },
  {
    id: "CustomStyleExample",
    title: "Custom Style",
    description: "Custom Style example",
    component: CustomStyleExample,
  },
  {
    id: "CheckboxExample",
    title: "Checkbox",
    description: "Checkbox example",
    component: CheckboxExample,
  },
];
