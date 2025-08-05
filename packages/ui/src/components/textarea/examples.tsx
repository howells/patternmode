"use client";

import React from "react";

import { DescriptionDetails, DescriptionList, DescriptionTerm } from "../description-list/component";
import { Form, FormField } from "../form/component";
import { Textarea } from "./component";

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

// Textarea with initial content
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
          description={hasError
            ? `Please enter at least 10 characters (${value.length}/10)`
            : "Enter at least 10 characters"}
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
          <DescriptionDetails>
            {height}
            px
          </DescriptionDetails>
          <DescriptionTerm>Row height</DescriptionTerm>
          <DescriptionDetails>
            {rowHeight}
            px
          </DescriptionDetails>
          <DescriptionTerm>Approximate rows</DescriptionTerm>
          <DescriptionDetails>
            {rowHeight ? Math.round(height / rowHeight) : "N/A"}
          </DescriptionDetails>
        </DescriptionList>
      )}
    </div>
  );
};
