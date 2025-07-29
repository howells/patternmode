"use client";

import React from "react";
import { Textarea } from "@patternmode/ui";

// Basic auto-resizing textarea
export const DefaultExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <Textarea
      placeholder="Start typing and watch the textarea grow automatically..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// With initial content
export const WithContentExample = () => {
  const [value, setValue] = React.useState(
    "This textarea starts with some content.\n\nTry adding more lines to see it expand automatically.\n\nThe height adjusts based on the content length."
  );

  return (
    <Textarea
      placeholder="Enter your message..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

// With min and max rows
export const WithRowConstraintsExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Message (2-6 rows)</label>
        <Textarea
          placeholder="This textarea has a minimum of 2 rows and maximum of 6 rows..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          minRows={2}
          maxRows={6}
        />
        <p className="text-xs text-zinc-500">
          Try typing multiple lines to see the constraints in action
        </p>
      </div>
    </div>
  );
};

// Error state
export const WithErrorExample = () => {
  const [value, setValue] = React.useState("");
  const hasError = value.length > 0 && value.length < 10;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Description (min 10 characters)
      </label>
      <Textarea
        placeholder="Enter at least 10 characters..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        hasError={hasError}
        minRows={2}
        maxRows={8}
      />
      {hasError && (
        <p className="text-sm text-red-600">
          Please enter at least 10 characters ({value.length}/10)
        </p>
      )}
    </div>
  );
};

// Disabled state
export const DisabledExample = () => {
  return (
    <Textarea
      placeholder="This textarea is disabled"
      value="This content cannot be edited"
      disabled
      minRows={3}
    />
  );
};

// Fixed height (no auto-resize)
export const FixedHeightExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Fixed Height Textarea</label>
      <Textarea
        placeholder="This textarea has a fixed height and will scroll when content overflows..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoResize={false}
        rows={4}
      />
      <p className="text-xs text-zinc-500">
        Auto-resize is disabled, so this textarea maintains a fixed height
      </p>
    </div>
  );
};

// With height change callback
export const WithHeightCallbackExample = () => {
  const [value, setValue] = React.useState("");
  const [height, setHeight] = React.useState<number | null>(null);
  const [rowHeight, setRowHeight] = React.useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Height Tracking Textarea</label>
        <Textarea
          placeholder="Type content to see height changes tracked below..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onHeightChange={(newHeight, meta) => {
            setHeight(newHeight);
            setRowHeight(meta.rowHeight);
          }}
          minRows={2}
          maxRows={10}
        />
      </div>

      {height && (
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-md text-sm">
          <p>
            <strong>Current height:</strong> {height}px
          </p>
          <p>
            <strong>Row height:</strong> {rowHeight}px
          </p>
          <p>
            <strong>Approximate rows:</strong>{" "}
            {rowHeight ? Math.round(height / rowHeight) : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

// Form integration example
export const FormIntegrationExample = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-md bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
          placeholder="Enter title..."
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description *</label>
        <Textarea
          placeholder="Describe your request in detail..."
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          minRows={3}
          maxRows={8}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Additional Notes</label>
        <Textarea
          placeholder="Any additional information..."
          value={formData.notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          minRows={2}
          maxRows={5}
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

// Performance example with caching
export const PerformanceExample = () => {
  const [value, setValue] = React.useState("");
  const [cacheEnabled, setCacheEnabled] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="cache-toggle"
          checked={cacheEnabled}
          onChange={(e) => setCacheEnabled(e.target.checked)}
          className="rounded"
        />
        <label htmlFor="cache-toggle" className="text-sm font-medium">
          Enable measurement caching (better performance)
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Performance Optimized Textarea
        </label>
        <Textarea
          placeholder="Type content to test performance with/without caching..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          cacheMeasurements={cacheEnabled}
          minRows={2}
          maxRows={12}
        />
        <p className="text-xs text-zinc-500">
          {cacheEnabled
            ? "Caching enabled - measurements are reused for better performance"
            : "Caching disabled - measurements calculated each time"}
        </p>
      </div>
    </div>
  );
};
