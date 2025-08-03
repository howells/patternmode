"use client";

import type { LucideIcon } from "lucide-react";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../button";

type CopyButtonProps = {
  /**
   * Text content to copy to clipboard.
   * The string that will be written to the user's clipboard when the button is clicked.
   */
  text: string;
  /**
   * Label text for the copy state.
   * Text displayed on the button before copying (default: "Copy").
   */
  copyLabel?: string;
  /**
   * Label text for the copied state.
   * Text displayed on the button after successful copying (default: "Copied").
   */
  copiedLabel?: string;
  /**
   * Icon component for the copy state.
   * Lucide icon displayed before copying (default: Copy icon).
   */
  copyIcon?: LucideIcon;
  /**
   * Icon component for the copied state.
   * Lucide icon displayed after successful copying (default: Check icon).
   */
  copiedIcon?: LucideIcon;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  ref?: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Button component for copying text content to the clipboard with visual feedback.
 */
export const CopyButton = ({
  ref,
  text,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  copyIcon: CopyIcon = Copy,
  copiedIcon: CopiedIcon = Check,
  className,
  ...props
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    catch (err) {
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
};

CopyButton.displayName = "CopyButton";

export { type CopyButtonProps };
