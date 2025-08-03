"use client";

import type { FieldSchema } from "./component";
import React from "react";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from "../description-list";
import { Input } from "../input";
import { Subheading } from "../subheading";
import { Textarea } from "../textarea/component";
import { FieldArray } from "./component";

// Define the structure for accordion items
type AccordionItem = {
  text: string;
};

// Props that users can configure in the prop explorer
export type FieldArrayPreviewProps = {
  minItems?: number;
  maxItems?: number;
  showItemLabels?: boolean;
  itemLabel?: string;
  addButtonText?: string;
  sortable?: boolean;
  className?: string;
};

// Prop metadata for the prop explorer
export const fieldArrayPreviewProps = [
  {
    name: "minItems",
    type: "number",
    description: "Minimum number of items required.",
    defaultValue: 1,
  },
  {
    name: "maxItems",
    type: "number",
    description: "Maximum number of items allowed.",
    defaultValue: 5,
  },
  {
    name: "showItemLabels",
    type: "boolean",
    description: "Whether to show item labels/numbers.",
    defaultValue: true,
  },
  {
    name: "itemLabel",
    type: "string",
    description: "Custom label for each item.",
    defaultValue: "Accordion Item",
  },
  {
    name: "addButtonText",
    type: "string",
    description: "Text for the add button.",
    defaultValue: "Add Accordion Item",
  },
  {
    name: "sortable",
    type: "boolean",
    description: "Whether items can be reordered.",
    defaultValue: false,
  },
];

export function FieldArrayExample(props: FieldArrayPreviewProps) {
  const {
    minItems = 1,
    maxItems = 5,
    showItemLabels = true,
    itemLabel,
    addButtonText = "Add Item",
    sortable = false,
    className = "",
  } = props;

  // State for accordion items
  const [accordionItems, setAccordionItems] = React.useState<AccordionItem[]>([
    {
      text: "What is Patternmode?",
    },
    {
      text: "How do I install it?",
    },
  ]);

  // Schema definition for accordion items
  const accordionSchema: FieldSchema[] = [
    {
      key: "text",
      type: "input",
      defaultValue: "New item",
      label: "Text",
      placeholder: "Enter text...",
      required: true,
    },
  ];

  // Custom component map using your actual Patternmode components
  const componentMap = {
    input: ({ value, onChange, ...props }: any) => (
      <Input
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    ),
    textarea: ({ value, onChange, ...props }: any) => (
      <Textarea
        value={value || ""}
        onChange={e => onChange(e.target.value)}
        {...props}
      />
    ),
  };

  return (
    <div className={`w-128 max-w-full ${className}`}>
      <div className="space-y-6">

        <FieldArray<AccordionItem>
          items={accordionItems}
          onItemsChange={setAccordionItems}
          schema={accordionSchema}
          minItems={minItems}
          maxItems={maxItems}
          addButtonText={addButtonText}
          sortable={sortable}
          componentMap={componentMap}
          showItemLabels={showItemLabels}
          itemLabel={itemLabel}
        />

        {/* Preview of the resulting accordion structure */}
        <div>
          <Subheading level={4} className="mb-3">
            Preview Output
          </Subheading>
          <DescriptionList>
            {accordionItems.map((item, index) => (
              <React.Fragment key={index}>
                <DescriptionTerm>Item {index + 1}</DescriptionTerm>
                <DescriptionDetails>{item.text}</DescriptionDetails>
              </React.Fragment>
            ))}
          </DescriptionList>
        </div>
      </div>
    </div>
  );
}

// Alternative example showing custom render function
export function CustomFieldArrayExample() {
  const [items, setItems] = React.useState([
    { name: "John Doe", email: "john@example.com", role: "admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "user" },
  ]);

  const userSchema: FieldSchema[] = [
    {
      key: "name",
      type: "input",
      defaultValue: "",
      label: "Full Name",
      placeholder: "Enter full name...",
      required: true,
    },
    {
      key: "email",
      type: "input",
      defaultValue: "",
      label: "Email Address",
      placeholder: "Enter email address...",
      required: true,
      props: { type: "email" },
    },
    {
      key: "role",
      type: "select",
      defaultValue: "user",
      label: "Role",
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
        { label: "Moderator", value: "moderator" },
      ],
    },
  ];

  return (
    <div className="w-128 max-w-full">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
            User Management Example
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Example with different field types and custom rendering.
          </p>
        </div>

        <FieldArray
          items={items}
          onItemsChange={setItems}
          schema={userSchema}
          minItems={1}
          maxItems={10}
          addButtonText="Add User"
          showItemLabels={true}
          itemLabel="User"
          componentMap={{
            input: ({ value, onChange, ...props }: any) => (
              <Input
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                {...props}
              />
            ),
            select: ({ value, onChange, options = [], ...props }: any) => (
              <select
                value={value || ""}
                onChange={e => onChange(e.target.value)}
                className="flex w-full rounded-md border px-3 py-2 shadow-xs outline-hidden transition-colors sm:text-sm text-zinc-900 dark:text-zinc-50 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700/30"
                {...props}
              >
                {options.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ),
          }}
        />
      </div>
    </div>
  );
}
