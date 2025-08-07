"use client";

import type { FieldSchema } from "./component";
import React from "react";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from "../description-list/component";
import { Input } from "../input/component";
import { Subheading } from "../subheading/component";
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

export function FieldArrayPreview(props: FieldArrayPreviewProps) {
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
              <React.Fragment key={`${item.text}-${index}`}>
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
