"use client";

import { Button, Checkbox, DescriptionDetails, DescriptionList, DescriptionTerm, Fieldset, FieldsetLegend, Form, FormControl, FormField, Textarea } from "@patternmode/ui";
import React from "react";
import type { ComponentExample } from "../../lib/component-config-types";

// Basic auto-resizing textarea
export const DefaultExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-lg">
      <Textarea
        placeholder="Start typing and watch the textarea grow automatically..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

// Add metadata directly to the component
DefaultExample.meta = {
  title: "Auto-Resizing Textarea",
  description: "Basic textarea that automatically adjusts height based on content"
};

// With initial content
export const WithContentExample = () => {
  const [value, setValue] = React.useState(
    "This textarea starts with some content.\n\nTry adding more lines to see it expand automatically.\n\nThe height adjusts based on the content length.",
  );

  return (
    <div className="w-full max-w-lg">
      <Textarea
        placeholder="Enter your message..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

WithContentExample.meta = {
  title: "With Initial Content",
  description: "Textarea with pre-filled content demonstrating auto-resize"
};

// With min and max rows
export const WithRowConstraintsExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-lg">
      <Form>
        <FormField
          name="message"
          label="Message (2-6 rows)"
          description="Try typing multiple lines to see the constraints in action"
        >
          <Textarea
            placeholder="This textarea has a minimum of 2 rows and maximum of 6 rows..."
            value={value}
            onChange={e => setValue(e.target.value)}
            minRows={2}
            maxRows={6}
          />
        </FormField>
      </Form>
    </div>
  );
};

WithRowConstraintsExample.meta = {
  title: "With Row Constraints",
  description: "Textarea with minimum and maximum row limits"
};

// Error state
export const WithErrorExample = () => {
  const [value, setValue] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const hasError = touched && value.length < 10;

  return (
    <div className="w-full max-w-lg">
      <Form>
        <FormField
          name="description"
          label="Description (min 10 characters)"
          description={hasError ?
            `Please enter at least 10 characters (${value.length}/10)` :
            "Enter at least 10 characters"
          }
          required
        >
          <Textarea
            placeholder="Enter at least 10 characters..."
            value={value}
            onChange={e => setValue(e.target.value)}
            onBlur={() => setTouched(true)}
            hasError={hasError}
            minRows={2}
            maxRows={8}
          />
        </FormField>
      </Form>
    </div>
  );
};

WithErrorExample.meta = {
  title: "Error State",
  description: "Textarea with error styling and validation"
};

// Disabled state
export const DisabledExample = () => {
  return (
    <div className="w-full max-w-lg">
      <Textarea
        placeholder="This textarea is disabled"
        value="This content cannot be edited"
        disabled
        minRows={3}
      />
    </div>
  );
};

DisabledExample.meta = {
  title: "Disabled State",
  description: "Non-interactive textarea with disabled styling"
};

// Fixed height (no auto-resize)
export const FixedHeightExample = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-lg">
      <Textarea
        placeholder="This textarea has a fixed height and will scroll when content overflows..."
        value={value}
        onChange={e => setValue(e.target.value)}
        autoResize={false}
        rows={4}
      />
    </div>
  );
};

FixedHeightExample.meta = {
  title: "Fixed Height",
  description: "Textarea with auto-resize disabled for fixed height"
};

// With height change callback
export const WithHeightCallbackExample = () => {
  const [value, setValue] = React.useState("");
  const [height, setHeight] = React.useState<number | null>(null);
  const [rowHeight, setRowHeight] = React.useState<number | null>(null);

  return (
    <div className="w-full max-w-lg">
        <Textarea
          placeholder="Type content to see height changes tracked below..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onHeightChange={(newHeight, meta) => {
            setHeight(newHeight);
            setRowHeight(meta.rowHeight);
          }}
          minRows={2}
          maxRows={10}
        />


      {height && (
        <DescriptionList>
          <DescriptionTerm>Current height</DescriptionTerm>
          <DescriptionDetails>{height}px</DescriptionDetails>
          <DescriptionTerm>Row height</DescriptionTerm>
          <DescriptionDetails>{rowHeight}px</DescriptionDetails>
          <DescriptionTerm>Approximate rows</DescriptionTerm>
          <DescriptionDetails>
            {rowHeight ? Math.round(height / rowHeight) : "N/A"}
          </DescriptionDetails>
        </DescriptionList>
      )}
    </div>
  );
};

WithHeightCallbackExample.meta = {
  title: "Height Change Tracking",
  description: "Textarea with callback to track height changes"
};

// Form integration example
export const FormIntegrationExample = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    notes: "",
  });

  return (
    <Form
      onValidSubmit={(data) => {
        console.log("Form submitted:", data);
        alert("Form submitted! Check console for data.");
      }}
      className="w-full max-w-lg"
    >
      <FormField name="title" label="Title" required>
        <FormControl
          type="text"
          placeholder="Enter title..."
          value={formData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData(prev => ({ ...prev, title: e.target.value }))}
        />
      </FormField>

      <FormField
        name="description"
        label="Description"
        description="Describe your request in detail"
        required
      >
        <Textarea
          placeholder="Describe your request in detail..."
          value={formData.description}
          onChange={e =>
            setFormData(prev => ({ ...prev, description: e.target.value }))}
          minRows={3}
          maxRows={8}
          required
        />
      </FormField>

      <FormField
        name="notes"
        label="Additional Notes"
        description="Any additional information you'd like to share"
      >
        <Textarea
          placeholder="Any additional information..."
          value={formData.notes}
          onChange={e =>
            setFormData(prev => ({ ...prev, notes: e.target.value }))}
          minRows={2}
          maxRows={5}
        />
      </FormField>

      <Button type="submit" variant="default">
        Submit
      </Button>
    </Form>
  );
};

FormIntegrationExample.meta = {
  title: "Form Integration",
  description: "Complete form example with multiple textareas"
};

// Performance example with caching
export const PerformanceExample = () => {
  const [value, setValue] = React.useState("");
  const [cacheEnabled, setCacheEnabled] = React.useState(false);

  return (
    <div className="w-full max-w-lg">
      <Fieldset>

        <FormField
          name="cacheMeasurements"
          label="Enable measurement caching (better performance)"
          description="Measurements are reused for better performance when enabled"
          orientation="horizontal"
        >
          <Checkbox
            checked={cacheEnabled}
            onCheckedChange={(checked) => setCacheEnabled(checked === true)}
          />
        </FormField>

        <FormField
          name="performanceText"
          label="Performance Optimized Textarea"
          description={cacheEnabled
            ? "Caching enabled - measurements are reused for better performance"
            : "Caching disabled - measurements calculated each time"}
        >
          <Textarea
            placeholder="Type content to test performance with/without caching..."
            value={value}
            onChange={e => setValue(e.target.value)}
            cacheMeasurements={cacheEnabled}
            minRows={2}
            maxRows={12}
          />
        </FormField>
      </Fieldset>
    </div>
  );
};

PerformanceExample.meta = {
  title: "Performance Optimization",
  description: "Textarea with measurement caching for better performance"
};

/**
 * Automatically discover and create examples registry from exports
 * This finds all exported components that have a .meta property
 */
function createExamplesRegistry(): ComponentExample[] {
  const examples: ComponentExample[] = [];

  // Get all exports that are functions with meta property
  const moduleExports = {
    DefaultExample,
    WithContentExample,
    WithRowConstraintsExample,
    WithErrorExample,
    DisabledExample,
    FixedHeightExample,
    WithHeightCallbackExample,
    FormIntegrationExample,
    PerformanceExample
  };

  Object.entries(moduleExports).forEach(([exportName, exportValue]) => {
    if (typeof exportValue === 'function' && exportValue.meta) {
      examples.push({
        id: exportName, // Use the export name as the ID
        ...exportValue.meta,
        component: exportValue
      });
    }
  });

  return examples;
}

/**
 * Registry of all examples with their metadata
 * This is automatically generated from the exports above
 */
export const TEXTAREA_EXAMPLES: ComponentExample[] = createExamplesRegistry();
