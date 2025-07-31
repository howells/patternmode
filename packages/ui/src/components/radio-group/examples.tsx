"use client";

import { Button, RadioGroup, RadioGroupItem, RadioOption } from "@patternmode/ui";
import React, { useState } from "react";

export function RadioGroupExample() {
  const [value, setValue] = useState("option1");

  return (
    <RadioGroup value={value} onValueChange={value => setValue(value as string)}>
      <RadioOption value="option1" label="Option 1" />
      <RadioOption value="option2" label="Option 2" />
      <RadioOption value="option3" label="Option 3" />
    </RadioGroup>
  );
}

export function DefaultExample() {
  const [value, setValue] = useState("small");

  return (
    <RadioGroup value={value} onValueChange={value => setValue(value as string)} orientation="horizontal">
      <RadioOption value="small" label="Small" />
      <RadioOption value="medium" label="Medium" />
      <RadioOption value="large" label="Large" />
    </RadioGroup>
  );
}

export function HorizontalExample() {
  const [plan, setPlan] = useState("basic");

  return (
    <RadioGroup value={plan} onValueChange={value => setPlan(value as string)}>
      <RadioOption
        value="basic"
        label="Basic Plan"
        description="Perfect for individuals and small projects"
      />
      <RadioOption
        value="pro"
        label="Pro Plan"
        description="Best for growing teams and businesses"
      />
      <RadioOption
        value="enterprise"
        label="Enterprise Plan"
        description="Advanced features for large organizations"
      />
    </RadioGroup>
  );
}

export function DisabledExample() {
  const [value1, setValue1] = useState("option1");
  const [value2, setValue2] = useState("option1");
  const [value3, setValue3] = useState("option1");

  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-2 text-sm font-medium">Small</h4>
        <RadioGroup value={value1} onValueChange={value => setValue1(value as string)} size="sm">
          <RadioOption value="option1" label="Option 1" size="sm" />
          <RadioOption value="option2" label="Option 2" size="sm" />
        </RadioGroup>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Medium</h4>
        <RadioGroup value={value2} onValueChange={value => setValue2(value as string)} size="md">
          <RadioOption value="option1" label="Option 1" size="md" />
          <RadioOption value="option2" label="Option 2" size="md" />
        </RadioGroup>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">Large</h4>
        <RadioGroup value={value3} onValueChange={value => setValue3(value as string)} size="lg">
          <RadioOption value="option1" label="Option 1" size="lg" />
          <RadioOption value="option2" label="Option 2" size="lg" />
        </RadioGroup>
      </div>
    </div>
  );
}

export function DisabledRadioGroup() {
  const [value, setValue] = useState("available1");

  return (
    <RadioGroup value={value} onValueChange={value => setValue(value as string)}>
      <RadioOption value="available1" label="Available Option 1" />
      <RadioOption value="available2" label="Available Option 2" />
      <RadioOption
        value="disabled"
        label="Disabled Option"
        description="This option is not selectable"
        disabled
      />
      <RadioOption value="available3" label="Available Option 3" />
    </RadioGroup>
  );
}

export function ControlledRadioGroup() {
  const [selectedValue, setSelectedValue] = useState("option2");

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <strong>Selected:</strong>
        {" "}
        {selectedValue}
      </div>

      <RadioGroup value={selectedValue} onValueChange={value => setSelectedValue(value as string)}>
        <RadioOption value="option1" label="Option 1" />
        <RadioOption value="option2" label="Option 2" />
        <RadioOption value="option3" label="Option 3" />
      </RadioGroup>

      <div className="flex gap-2">
        <Button
          onClick={() => setSelectedValue("option1")}
          size="sm"
          variant="outline"
        >
          Select Option 1
        </Button>
        <Button
          onClick={() => setSelectedValue("option3")}
          size="sm"
          variant="outline"
        >
          Select Option 3
        </Button>
      </div>
    </div>
  );
}

export function RadioGroupCustomStructure() {
  const [value, setValue] = useState("custom1");

  return (
    <RadioGroup value={value} onValueChange={value => setValue(value as string)}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="custom1" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Custom Item 1</span>
          <span className="text-xs text-zinc-500">With custom layout</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value="custom2" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Custom Item 2</span>
          <span className="text-xs text-zinc-500">
            Full control over structure
          </span>
        </div>
      </div>
    </RadioGroup>
  );
}
