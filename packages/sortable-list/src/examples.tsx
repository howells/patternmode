"use client";

import { useState } from "react";
import { SortableList } from "./component";
import type { SortableListItem } from "./types";

// Default example with all features
export const DefaultExample = () => {
  const [items, setItems] = useState<SortableListItem[]>([
    { id: "1", label: "ID", active: true },
    { id: "2", label: "URI", active: true },
    { id: "3", label: "Navigation Label", active: true },
    { id: "4", label: "Link", active: true },
    { id: "5", label: "Ancestors", active: false },
    { id: "6", label: "Authors", active: false },
    { id: "7", label: "Date Created", active: false },
    { id: "8", label: "Date Updated", active: false },
  ]);

  return (
    <div className="max-w-md">
      <SortableList items={items} onChange={setItems} />
      <div className="mt-4 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-md">
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">Active items:</p>
        <pre className="text-xs">
          {JSON.stringify(
            items.filter((item) => item.active).map((item) => item.label),
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  );
};

// Example without checkboxes (reorder only)
export const ReorderOnlyExample = () => {
  const [items, setItems] = useState<SortableListItem[]>([
    { id: "1", label: "First Item" },
    { id: "2", label: "Second Item" },
    { id: "3", label: "Third Item" },
    { id: "4", label: "Fourth Item" },
    { id: "5", label: "Fifth Item" },
  ]);

  return (
    <div className="max-w-md">
      <SortableList items={items} onChange={setItems} showCheckbox={false} />
    </div>
  );
};

// Example without drag handles (checkbox only)
export const CheckboxOnlyExample = () => {
  const [items, setItems] = useState<SortableListItem[]>([
    { id: "1", label: "Option 1", active: true },
    { id: "2", label: "Option 2", active: false },
    { id: "3", label: "Option 3", active: true },
    { id: "4", label: "Option 4", active: false },
    { id: "5", label: "Option 5", active: false },
  ]);

  return (
    <div className="max-w-md">
      <SortableList items={items} onChange={setItems} showDragHandle={false} allowReorder={false} />
    </div>
  );
};

// Example with disabled items
export const WithDisabledItemsExample = () => {
  const [items, setItems] = useState<SortableListItem[]>([
    { id: "1", label: "Enabled Item 1", active: true },
    { id: "2", label: "Disabled Item 1", active: true, disabled: true },
    { id: "3", label: "Enabled Item 2", active: false },
    { id: "4", label: "Disabled Item 2", active: false, disabled: true },
    { id: "5", label: "Enabled Item 3", active: true },
  ]);

  return (
    <div className="max-w-md">
      <SortableList items={items} onChange={setItems} />
    </div>
  );
};

// Size variations
export const SizesExample = () => {
  const items: SortableListItem[] = [
    { id: "1", label: "Small Item 1", active: true },
    { id: "2", label: "Small Item 2", active: false },
    { id: "3", label: "Small Item 3", active: true },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <div className="max-w-md">
          <SortableList items={items} size="sm" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Base (Default)</h3>
        <div className="max-w-md">
          <SortableList items={items} size="base" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <div className="max-w-md">
          <SortableList items={items} size="lg" />
        </div>
      </div>
    </div>
  );
};

// Form fields example
export const FormFieldsExample = () => {
  const [items, setItems] = useState<SortableListItem[]>([
    { id: "id", label: "ID", active: true },
    { id: "uri", label: "URI", active: true },
    { id: "nav-label", label: "Navigation Label", active: true },
    { id: "link", label: "Link", active: true },
    { id: "ancestors", label: "Ancestors", active: false },
    { id: "authors", label: "Authors", active: false },
    { id: "date-created", label: "Date Created", active: false },
    { id: "date-updated", label: "Date Updated", active: false },
    { id: "drafts", label: "Drafts", active: false },
    { id: "entry-type", label: "Entry Type", active: false },
    { id: "expiry-date", label: "Expiry Date", active: false },
    { id: "header-theme", label: "Header Theme", active: false },
    { id: "image", label: "Image", active: false },
    { id: "last-edited-by", label: "Last Edited By", active: false },
    { id: "parent", label: "Parent", active: false },
    { id: "post-date", label: "Post Date", active: false },
    { id: "revision-notes", label: "Revision Notes", active: false },
    { id: "seo-settings", label: "SEO Settings", active: false },
    { id: "section", label: "Section", active: false },
    { id: "slug", label: "Slug", active: false },
    { id: "status", label: "Status", active: false },
    { id: "summary", label: "Summary", active: false },
    { id: "uid", label: "UID", active: false },
  ]);

  const handleSave = () => {
    const activeFields = items.filter((item) => item.active);
    console.log("Active fields in order:", activeFields.map((f) => f.label));
    alert(`Saved ${activeFields.length} active fields`);
  };

  return (
    <div className="max-w-md">
      <h3 className="text-sm font-medium mb-3">Select and order form fields</h3>
      <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
        <SortableList items={items} onChange={setItems} />
      </div>
      <button
        type="button"
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Field Configuration
      </button>
    </div>
  );
};

