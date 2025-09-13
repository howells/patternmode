"use client";

import { useState } from "react";
import { CheckboxCard, CheckboxCards } from "./components";

// Default checkbox cards
export const DefaultExample = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <CheckboxCards onValueChange={setSelectedValues} value={selectedValues}>
      <CheckboxCard value="starter">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-zinc-900 dark:text-zinc-50">Starter</div>
              <div className="text-lg text-zinc-900 dark:text-zinc-50">
                $9
                <span className="font-normal text-sm text-zinc-500">/mo</span>
              </div>
            </div>
            <div className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
              Perfect for personal projects
            </div>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>• 5 projects</li>
              <li>• 1GB storage</li>
              <li>• Email support</li>
            </ul>
          </div>
        </div>
      </CheckboxCard>

      <CheckboxCard value="professional">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-zinc-900 dark:text-zinc-50">
                Professional
              </div>
              <div className="text-lg text-zinc-900 dark:text-zinc-50">
                $29
                <span className="font-normal text-sm text-zinc-500">/mo</span>
              </div>
            </div>
            <div className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
              Best for small teams
            </div>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>• Unlimited projects</li>
              <li>• 10GB storage</li>
              <li>• Priority support</li>
              <li>• Team collaboration</li>
            </ul>
          </div>
        </div>
      </CheckboxCard>

      <CheckboxCard showIndicator={false} value="enterprise">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-zinc-900 dark:text-zinc-50">
                Enterprise (No Indicator)
              </div>
              <div className="text-lg text-zinc-900 dark:text-zinc-50">
                $99
                <span className="font-normal text-sm text-zinc-500">/mo</span>
              </div>
            </div>
            <div className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
              For large organizations
            </div>
            <ul className="space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <li>• Everything included</li>
              <li>• Custom integrations</li>
              <li>• Dedicated support</li>
            </ul>
          </div>
        </div>
      </CheckboxCard>
    </CheckboxCards>
  );
};

// Controlled checkbox cards
export const ControlledExample = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>(["option2"]);

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <strong>Selected:</strong> {selectedValues.join(", ") || "None"}
      </div>

      <CheckboxCards onValueChange={setSelectedValues} value={selectedValues}>
        <CheckboxCard value="option1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Option 1
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                First selectable option
              </div>
            </div>
          </div>
        </CheckboxCard>

        <CheckboxCard value="option2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Option 2
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Second selectable option
              </div>
            </div>
          </div>
        </CheckboxCard>
      </CheckboxCards>
    </div>
  );
};

// Mixed states (some disabled)
export const MixedStatesExample = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([
    "available1",
  ]);

  return (
    <CheckboxCards onValueChange={setSelectedValues} value={selectedValues}>
      <CheckboxCard value="available1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Available Option 1
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              This option is selectable
            </div>
          </div>
        </div>
      </CheckboxCard>

      <CheckboxCard disabled value="disabled">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Disabled Option
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              This option is not available
            </div>
          </div>
        </div>
      </CheckboxCard>

      <CheckboxCard value="available2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Available Option 2
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              This option is also selectable
            </div>
          </div>
        </div>
      </CheckboxCard>
    </CheckboxCards>
  );
};

// Horizontal layout
export const HorizontalExample = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>(["medium"]);

  return (
    <CheckboxCards
      className="grid-cols-3"
      onValueChange={setSelectedValues}
      value={selectedValues}
    >
      <CheckboxCard value="small">
        <div className="text-center">
          <div className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
            Small
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">32GB</div>
        </div>
      </CheckboxCard>

      <CheckboxCard value="medium">
        <div className="text-center">
          <div className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
            Medium
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">64GB</div>
        </div>
      </CheckboxCard>

      <CheckboxCard value="large">
        <div className="text-center">
          <div className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
            Large
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">128GB</div>
        </div>
      </CheckboxCard>
    </CheckboxCards>
  );
};

// Example demonstrating showIndicator functionality
export const ShowIndicatorExample = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>(["visible"]);

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <strong>Selected:</strong> {selectedValues.join(", ") || "None"}
      </div>

      <CheckboxCards onValueChange={setSelectedValues} value={selectedValues}>
        <CheckboxCard value="visible">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                With Indicator
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                This card shows the checkbox indicator (default behavior)
              </div>
            </div>
          </div>
        </CheckboxCard>

        <CheckboxCard showIndicator={false} value="hidden">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                No Indicator
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                This card hides the checkbox indicator
              </div>
            </div>
          </div>
        </CheckboxCard>

        <CheckboxCard showIndicator={true} value="explicit">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Explicit Indicator
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                This card explicitly shows the indicator
              </div>
            </div>
          </div>
        </CheckboxCard>
      </CheckboxCards>
    </div>
  );
};
