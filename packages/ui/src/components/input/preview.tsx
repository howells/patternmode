import { Input } from "@patternmode/ui";
import React from "react";

export const /**
              *
              */
  InputExample = ({
    size = "base",
    type = "text",
    placeholder = "Enter text...",
    disabled = false,
    hasError = false,
    required = false,
    enableStepper = true,
    prefixText,
    prefixIcon,
    suffixText,
    suffixIcon,
    prefixStyling = true,
    suffixStyling = true,
    ...props
  }: {
    size?: "sm" | "base" | "lg";
    type?:
      | "text"
      | "email"
      | "password"
      | "search"
      | "number"
      | "tel"
      | "url"
      | "file";
    placeholder?: string;
    disabled?: boolean;
    hasError?: boolean;
    required?: boolean;
    enableStepper?: boolean;
    prefixText?: string;
    prefixIcon?: React.ComponentType<{ className?: string }>;
    suffixText?: string;
    suffixIcon?: React.ComponentType<{ className?: string }>;
    prefixStyling?: boolean;
    suffixStyling?: boolean;
  } & React.ComponentProps<typeof Input>) => {
    return (
      <div className="w-full max-w-md">
        <Input
          size={size}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          hasError={hasError}
          required={required}
          enableStepper={enableStepper}
          prefixText={prefixText}
          prefixIcon={prefixIcon}
          suffixText={suffixText}
          suffixIcon={suffixIcon}
          prefixStyling={prefixStyling}
          suffixStyling={suffixStyling}
          {...props}
        />
      </div>
    );
  };
