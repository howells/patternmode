"use client";

import React, { useState } from "react";
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@patternmode/ui";
import { Button } from "../button/button";
import { Rocket, Truck, Zap } from "lucide-react";

export function RadioCardGroupExample() {
  const [value, setValue] = useState("basic");

  return (
    <RadioCardGroup value={value} onValueChange={(value) => setValue(value as string)}>
      <RadioCardItem value="basic">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Basic Plan
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Perfect for individuals and small projects
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="pro">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Pro Plan
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Best for growing teams and businesses
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="enterprise">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Enterprise Plan
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              Advanced features for large organizations
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>
    </RadioCardGroup>
  );
}

export function DefaultExample() {
  const [plan, setPlan] = useState("starter");

  return (
    <RadioCardGroup value={plan} onValueChange={(value) => setPlan(value as string)}>
      <RadioCardItem value="starter">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                Starter
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                $9<span className="text-sm font-normal text-zinc-500">/mo</span>
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
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="professional">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                Professional
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                $29
                <span className="text-sm font-normal text-zinc-500">/mo</span>
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
          <RadioCardIndicator />
        </div>
      </RadioCardItem>
    </RadioCardGroup>
  );
}

export function HorizontalExample() {
  const [shipping, setShipping] = useState("standard");

  return (
    <RadioCardGroup value={shipping} onValueChange={(value) => setShipping(value as string)}>
      <RadioCardItem value="standard">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-start space-x-3">
            <Truck className="mt-0.5 size-5 text-zinc-600 dark:text-zinc-400" />
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Standard Shipping
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                5-7 business days • Free
              </div>
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="express">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-start space-x-3">
            <Zap className="mt-0.5 size-5 text-zinc-600 dark:text-zinc-400" />
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Express Shipping
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                2-3 business days • $9.99
              </div>
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="overnight">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-start space-x-3">
            <Rocket className="mt-0.5 size-5 text-zinc-600 dark:text-zinc-400" />
            <div>
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Overnight Shipping
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Next business day • $24.99
              </div>
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>
    </RadioCardGroup>
  );
}

export function HorizontalRadioCardGroup() {
  const [size, setSize] = useState("medium");

  return (
    <RadioCardGroup
      value={size}
      onValueChange={(value) => setSize(value as string)}
      orientation="horizontal"
      className="grid-cols-3"
    >
      <RadioCardItem value="small">
        <div className="text-center">
          <div className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
            Small
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">32GB</div>
          <div className="mt-2 flex justify-center">
            <RadioCardIndicator />
          </div>
        </div>
      </RadioCardItem>

      <RadioCardItem value="medium">
        <div className="text-center">
          <div className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
            Medium
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">64GB</div>
          <div className="mt-2 flex justify-center">
            <RadioCardIndicator />
          </div>
        </div>
      </RadioCardItem>

      <RadioCardItem value="large">
        <div className="text-center">
          <div className="mb-1 font-medium text-zinc-900 dark:text-zinc-50">
            Large
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">128GB</div>
          <div className="mt-2 flex justify-center">
            <RadioCardIndicator />
          </div>
        </div>
      </RadioCardItem>
    </RadioCardGroup>
  );
}

export function DisabledRadioCardGroup() {
  const [value, setValue] = useState("available1");

  return (
    <RadioCardGroup value={value} onValueChange={(value) => setValue(value as string)}>
      <RadioCardItem value="available1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Available Option 1
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              This option is selectable
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="disabled" disabled>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Disabled Option
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              This option is not available
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>

      <RadioCardItem value="available2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-medium text-zinc-900 dark:text-zinc-50">
              Available Option 2
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              This option is also selectable
            </div>
          </div>
          <RadioCardIndicator />
        </div>
      </RadioCardItem>
    </RadioCardGroup>
  );
}

export function ControlledRadioCardGroup() {
  const [selectedValue, setSelectedValue] = useState("option2");

  return (
    <div className="space-y-4">
      <div className="text-sm">
        <strong>Selected:</strong> {selectedValue}
      </div>

      <RadioCardGroup value={selectedValue} onValueChange={(value) => setSelectedValue(value as string)}>
        <RadioCardItem value="option1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Option 1
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                First selectable option
              </div>
            </div>
            <RadioCardIndicator />
          </div>
        </RadioCardItem>

        <RadioCardItem value="option2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="font-medium text-zinc-900 dark:text-zinc-50">
                Option 2
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Second selectable option
              </div>
            </div>
            <RadioCardIndicator />
          </div>
        </RadioCardItem>
      </RadioCardGroup>

      <div className="flex gap-2">
        <Button
          onClick={() => setSelectedValue("option1")}
          size="sm"
          variant="outline"
        >
          Select Option 1
        </Button>
        <Button
          onClick={() => setSelectedValue("option2")}
          size="sm"
          variant="outline"
        >
          Select Option 2
        </Button>
      </div>
    </div>
  );
}