"use client";

import { 
  Radio, 
  RadioItem, 
  RadioLabel, 
  RadioOption, 
  RadioCard, 
  RadioCardOption, 
  RadioIndicator 
} from "@patternmode/ui";

interface RadioExampleProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "card";
  disabled?: boolean;
}

export function RadioExample({
  size = "md",
  variant = "default",
  disabled = false,
}: RadioExampleProps) {

  return (
    <div className="space-y-8">
      {/* Basic radio options */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Basic Radio Options</h3>
        <div className="space-y-3">
          <RadioOption 
            value="option1" 
            label="Option 1" 
            description="This is the first option"
            size={size}
            disabled={disabled}
          />
          <RadioOption 
            value="option2" 
            label="Option 2" 
            description="This is the second option"
            size={size}
            disabled={disabled}
          />
          <RadioOption 
            value="option3" 
            label="Option 3" 
            description="This is the third option"
            size={size}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Size variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Size Variants</h3>
        <div className="space-y-3">
          <RadioOption 
            value="small" 
            label="Small Radio" 
            description="Small size variant"
            size="sm"
          />
          <RadioOption 
            value="medium" 
            label="Medium Radio" 
            description="Medium size variant"
            size="md"
          />
          <RadioOption 
            value="large" 
            label="Large Radio" 
            description="Large size variant"
            size="lg"
          />
        </div>
      </div>

      {/* Card-style radios */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Card Style</h3>
        <div className="space-y-3">
          <RadioCardOption 
            value="starter" 
            title="Starter Plan" 
            description="Perfect for personal projects and small websites. Includes basic features and 1GB storage."
            size={size}
            disabled={disabled}
          />
          <RadioCardOption 
            value="professional" 
            title="Professional Plan" 
            description="Ideal for growing businesses and medium-scale applications. Advanced features and 10GB storage."
            size={size}
            disabled={disabled}
          />
          <RadioCardOption 
            value="enterprise" 
            title="Enterprise Plan" 
            description="Advanced features for large-scale applications. Unlimited storage and priority support."
            size={size}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Card size variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Card Size Variants</h3>
        <div className="space-y-3">
          <RadioCardOption 
            value="small-card" 
            title="Small Card" 
            description="Compact card style with minimal padding"
            size="sm"
          />
          <RadioCardOption 
            value="medium-card" 
            title="Medium Card" 
            description="Default card size with balanced spacing"
            size="md"
          />
          <RadioCardOption 
            value="large-card" 
            title="Large Card" 
            description="Spacious card layout with generous padding"
            size="lg"
          />
        </div>
      </div>

      {/* Custom structure */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Custom Structure</h3>
        <div className="space-y-4">
          <RadioLabel size="md">
            <RadioItem value="custom1" size="md" />
            <div className="flex flex-col">
              <span className="font-medium">Custom Radio 1</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Built with individual components for maximum flexibility
              </span>
            </div>
          </RadioLabel>
          
          <RadioLabel size="md">
            <RadioItem value="custom2" size="md" />
            <div className="flex flex-col">
              <span className="font-medium">Custom Radio 2</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Full control over styling and layout
              </span>
            </div>
          </RadioLabel>

          <RadioLabel size="md">
            <RadioItem value="custom3" size="md" disabled />
            <div className="flex flex-col">
              <span className="font-medium">Disabled Custom Radio</span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Shows disabled state with custom styling
              </span>
            </div>
          </RadioLabel>
        </div>
      </div>

      {/* Disabled states */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Disabled States</h3>
        <div className="space-y-3">
          <RadioOption 
            value="enabled" 
            label="Enabled Option" 
            description="This option is available for selection"
          />
          <RadioOption 
            value="disabled" 
            label="Disabled Option" 
            description="This option is not available"
            disabled
          />
        </div>
      </div>
    </div>
  );
}