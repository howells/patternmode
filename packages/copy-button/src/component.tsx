"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@patternmode/button";
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
			data-testid="copy-button"
			{...props}
		>
			{copied ? copiedLabel : copyLabel}
		</Button>
	);
};

CopyButton.displayName = "CopyButton";
