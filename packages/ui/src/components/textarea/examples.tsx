"use client";

import { Button, Checkbox, DescriptionDetails, DescriptionList, DescriptionTerm, Fieldset, FieldsetLegend, Form, FormControl, FormField, Textarea } from "@patternmode/ui";
import React from "react";

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

// With min and max rows
export const WithRowConstraintsExample = () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="w-full max-w-lg space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Message (2-6 rows)</label>
          <Textarea
            placeholder="This textarea has a minimum of 2 rows and maximum of 6 rows..."
            value={value}
            onChange={e => setValue(e.target.value)}
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
    const [touched, setTouched] = React.useState(false);
    const hasError = touched && value.length < 10;

    return (
      <div className="w-full max-w-lg space-y-2">
        <label className="text-sm font-medium">
          Description (min 10 characters)
        </label>
        <Textarea
          placeholder="Enter at least 10 characters..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          hasError={hasError}
          minRows={2}
          maxRows={8}
        />
        {hasError && (
          <p className="text-sm text-red-600">
            Please enter at least 10 characters (
            {value.length}
            /10)
          </p>
        )}
      </div>
    );
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

// With height change callback
export const WithHeightCallbackExample = () => {
    const [value, setValue] = React.useState("");
    const [height, setHeight] = React.useState<number | null>(null);
    const [rowHeight, setRowHeight] = React.useState<number | null>(null);

    return (
      <div className="w-full max-w-lg space-y-4">
        <div className="space-y-2">
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
        </div>

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

// Performance example with caching
export const PerformanceExample = () => {
    const [value, setValue] = React.useState("");
    const [cacheEnabled, setCacheEnabled] = React.useState(false);

    return (
      <div className="w-full max-w-lg">
        <Fieldset>
          <FieldsetLegend>Performance Settings</FieldsetLegend>

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
