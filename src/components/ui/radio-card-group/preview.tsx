"use client";

import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Rocket, Truck, Wifi, Zap } from "lucide-react";
import { useState } from "react";
import {
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
} from "@patternmode/ui";

interface RadioCardGroupExampleProps {
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function RadioCardGroupExample({
  orientation = "vertical",
  size = "md",
  disabled = false,
}: RadioCardGroupExampleProps) {
  const [planValue, setPlanValue] = useState("basic");
  const [pricingValue, setPricingValue] = useState("starter");
  const [shippingValue, setShippingValue] = useState("standard");
  const [sizeValue, setSizeValue] = useState("medium");
  const [controlledValue, setControlledValue] = useState("option2");
  const [disabledValue, setDisabledValue] = useState("available1");

  return (
    <div className="space-y-8">
      {/* Basic radio card group */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Radio Card Group</h3>
        <RadioCardGroup
          value={planValue}
          onValueChange={(value) => setPlanValue(value as string)}
          orientation={orientation}
          size={size}
          disabled={disabled}
        >
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
        <p className="text-sm text-zinc-600">Selected: {planValue}</p>
      </div>

      {/* With pricing */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Pricing</h3>
        <RadioCardGroup value={pricingValue} onValueChange={(value) => setPricingValue(value as string)}>
          <RadioCardItem value="starter">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                    Starter
                  </div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    $9
                    <span className="text-sm font-normal text-zinc-500">
                      /mo
                    </span>
                  </div>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Perfect for personal projects
                </div>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
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
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                    Professional
                  </div>
                  <div className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                    $29
                    <span className="text-sm font-normal text-zinc-500">
                      /mo
                    </span>
                  </div>
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                  Best for small teams
                </div>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
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
      </div>

      {/* With icons */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Icons</h3>
        <RadioCardGroup value={shippingValue} onValueChange={(value) => setShippingValue(value as string)}>
          <RadioCardItem value="standard">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <Truck className="size-5 text-zinc-600 dark:text-zinc-400 mt-0.5" />
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
              <div className="flex items-start space-x-3 flex-1">
                <Zap className="size-5 text-zinc-600 dark:text-zinc-400 mt-0.5" />
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
              <div className="flex items-start space-x-3 flex-1">
                <Rocket className="size-5 text-zinc-600 dark:text-zinc-400 mt-0.5" />
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
      </div>

      {/* Horizontal layout */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Horizontal Layout</h3>
        <RadioCardGroup
          value={sizeValue}
          onValueChange={(value) => setSizeValue(value as string)}
          orientation="horizontal"
          className="grid-cols-3"
        >
          <RadioCardItem value="small">
            <div className="text-center">
              <Cpu className="size-6 mx-auto mb-2 text-zinc-600 dark:text-zinc-400" />
              <div className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                Small
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                2 cores
              </div>
              <div className="mt-3 flex justify-center">
                <RadioCardIndicator />
              </div>
            </div>
          </RadioCardItem>

          <RadioCardItem value="medium">
            <div className="text-center">
              <HardDrive className="size-6 mx-auto mb-2 text-zinc-600 dark:text-zinc-400" />
              <div className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                Medium
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                4 cores
              </div>
              <div className="mt-3 flex justify-center">
                <RadioCardIndicator />
              </div>
            </div>
          </RadioCardItem>

          <RadioCardItem value="large">
            <div className="text-center">
              <Wifi className="size-6 mx-auto mb-2 text-zinc-600 dark:text-zinc-400" />
              <div className="font-medium text-zinc-900 dark:text-zinc-50 mb-1">
                Large
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                8 cores
              </div>
              <div className="mt-3 flex justify-center">
                <RadioCardIndicator />
              </div>
            </div>
          </RadioCardItem>
        </RadioCardGroup>
      </div>

      {/* With disabled options */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">With Disabled Options</h3>
        <RadioCardGroup value={disabledValue} onValueChange={(value) => setDisabledValue(value as string)}>
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
      </div>

      {/* Controlled example */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Controlled State</h3>
        <div className="space-y-3">
          <div className="text-sm text-zinc-600">
            Selected: <strong>{controlledValue}</strong>
          </div>

          <RadioCardGroup
            value={controlledValue}
            onValueChange={(value) => setControlledValue(value as string)}
          >
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
              onClick={() => setControlledValue("option1")}
              size="sm"
              variant="outline"
            >
              Select Option 1
            </Button>
            <Button
              onClick={() => setControlledValue("option2")}
              size="sm"
              variant="outline"
            >
              Select Option 2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
