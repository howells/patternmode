"use client";

import { Button } from "@patternmode/button";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { CopyButtonProps } from "./types";

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
    } catch (_err) {
      /* noop */
    }
  };

  return (
    <Button
      className={className}
      data-testid="copy-button"
      leftIcon={copied ? CopiedIcon : CopyIcon}
      onClick={copyToClipboard}
      ref={ref}
      size="sm"
      variant="ghost"
      {...props}
    >
      {copied ? copiedLabel : copyLabel}
    </Button>
  );
};

CopyButton.displayName = "CopyButton";
