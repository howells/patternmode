"use client";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@patternmode/description-list";
import { Input } from "@patternmode/input";
import { Subheading } from "@patternmode/subheading";
import { Textarea } from "@patternmode/textarea";
import React from "react";
import type { FieldSchema } from "./component";
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
    input: ({
      value,
      onChange,
      ...restProps
    }: { value: string; onChange: (v: string) => void } & React.ComponentProps<
      typeof Input
    >) => (
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        value={value || ""}
        {...restProps}
      />
    ),
    textarea: ({
      value,
      onChange,
      ...restProps
    }: { value: string; onChange: (v: string) => void } & React.ComponentProps<
      typeof Textarea
    >) => (
      <Textarea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        value={value || ""}
        {...restProps}
      />
    ),
  };

  return (
    <div className={`w-128 max-w-full ${className}`}>
      <div className="space-y-6">
        <FieldArray<AccordionItem>
          addButtonText={addButtonText}
          componentMap={componentMap}
          itemLabel={itemLabel}
          items={accordionItems}
          maxItems={maxItems}
          minItems={minItems}
          onItemsChange={setAccordionItems}
          schema={accordionSchema}
          showItemLabels={showItemLabels}
          sortable={sortable}
        />

        {/* Preview of the resulting accordion structure */}
        <div>
          <Subheading className="mb-3" level={4}>
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
