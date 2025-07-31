// CopyButton Component [v1.0.0]

/**
 * CopyButton Component
 * 
 * A button component for copying text to the clipboard with visual feedback.
 * Uses the Clipboard API for reliable text copying and provides temporary
 * success state with customizable icons and labels.
 * 
 * Features:
 * - One-click text copying to clipboard
 * - Visual feedback with state transition
 * - Customizable icons and labels
 * - Built on the Button component
 * - Automatic reset after 2 seconds
 * 
 * @example
 * ```tsx
 * // Basic copy button
 * <CopyButton text="Hello, World!" />
 * 
 * // Custom labels and icons
 * <CopyButton
 *   text="npm install @patternmode/react"
 *   copyLabel="Copy Command"
 *   copiedLabel="Command Copied!"
 *   copyIcon={Terminal}
 *   copiedIcon={CheckCircle}
 * />
 * 
 * // Code snippet copy
 * <CopyButton
 *   text={codeSnippet}
 *   copyLabel="Copy Code"
 *   className="ml-2"
 * />
 * 
 * // API key copy with custom styling
 * <CopyButton
 *   text={apiKey}
 *   copyLabel="Copy API Key"
 *   copiedLabel="Key Copied"
 *   className="text-xs"
 * />
 * ```
 */

"use client";

import { Check, Copy, LucideIcon } from "lucide-react";
import React, { useState } from "react";

import { cx } from "../../lib/utils";
import { Button } from "../button/button";

/**
 * Props for the CopyButton component.
 * 
 * Configuration for copy functionality including text content,
 * visual customization, and button properties.
 * 
 * @interface CopyButtonProps
 * @extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">
 */
interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Text content to copy to clipboard */
  text: string;
  /** Label text for the copy state (default: "Copy") */
  copyLabel?: string;
  /** Label text for the copied state (default: "Copied") */
  copiedLabel?: string;
  /** Icon component for the copy state (default: Copy) */
  copyIcon?: LucideIcon;
  /** Icon component for the copied state (default: Check) */
  copiedIcon?: LucideIcon;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A button component for copying text to the clipboard.
 * 
 * Provides one-click text copying with visual feedback and state management.
 * Uses the Clipboard API for reliable copying and automatically resets the
 * success state after 2 seconds. Handles copy failures gracefully.
 *
 * @param text - Text content to copy to clipboard
 * @param copyLabel - Label text for the copy state
 * @param copiedLabel - Label text for the copied state
 * @param copyIcon - Icon component for the copy state
 * @param copiedIcon - Icon component for the copied state
 * @param className - Additional CSS classes
 *
 *
 * @id copy-button
 * @name Copy Button
 * @component
 * @example
 * ```tsx
 * // Basic copy button
 * <CopyButton text="Hello, World!" />
 * 
 * // Custom labels and icons
 * <CopyButton
 *   text="npm install @patternmode/react"
 *   copyLabel="Copy Command"
 *   copiedLabel="Command Copied!"
 *   copyIcon={Terminal}
 *   copiedIcon={CheckCircle}
 * />
 * 
 * // Code snippet copy
 * <CopyButton
 *   text={codeSnippet}
 *   copyLabel="Copy Code"
 *   className="ml-2"
 * />
 * 
 * // API key copy with custom styling
 * <CopyButton
 *   text={apiKey}
 *   copyLabel="Copy API Key"
 *   copiedLabel="Key Copied"
 *   className="text-xs"
 * />
 * 
 * // Long content copy
 * <CopyButton
 *   text={JSON.stringify(data, null, 2)}
 *   copyLabel="Copy JSON"
 *   copiedLabel="JSON Copied"
 * />
 * ```
 */
/**
 * A button component that copies text to the clipboard with customizable labels and icons.
 *
 * @id copy-button
 * @name Copy Button
 * @component
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      text,
      copyLabel = "Copy",
      copiedLabel = "Copied",
      copyIcon: CopyIcon = Copy,
      copiedIcon: CopiedIcon = Check,
      className,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    /**
     * Copies text to clipboard using the Clipboard API.
     * 
     * Handles the copy operation with visual feedback and automatic
     * state reset after 2 seconds. Logs errors if copying fails.
     */
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <Button
        ref={ref}
        variant="ghost"
        size="sm"
        onClick={copyToClipboard}
        leftIcon={copied ? CopiedIcon : CopyIcon}
        className={className}
        {...props}
      >
        {copied ? copiedLabel : copyLabel}
      </Button>
    );
  }
);

CopyButton.displayName = "CopyButton";

export { type CopyButtonProps };
