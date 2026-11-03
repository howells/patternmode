"use client";

import { useEffect, useRef, useState } from "react";

const CopyIcon = () => (
  <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 16 16" width="14">
    <rect
      height="9"
      rx="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      width="9"
      x="5"
      y="5"
    />
    <path
      d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const CheckIcon = () => (
  <svg aria-hidden="true" fill="none" height="14" viewBox="0 0 16 16" width="14">
    <path
      d="M3.5 8.5l3 3 6-7"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

/** Splits "npx shadcn add url" into the quiet tool and the part you'd change. */
const splitCommand = (command: string): [string, string] => {
  const match = /^(?<tool>(?:npx shadcn add|pnpm add|npm install|npm i) )(?<rest>.*)$/u.exec(
    command,
  );
  return [match?.groups?.tool ?? "", match?.groups?.rest ?? command];
};

/**
 * A one-line install command with a copy button. The command stays real,
 * selectable text; the button announces the copy through a live region.
 */
export const CopyCommand = ({
  command,
  tone = "light",
}: {
  command: string;
  tone?: "dark" | "light";
}) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tool, rest] = splitCommand(command);

  useEffect(
    () => () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    },
    [],
  );

  const showCopied = () => {
    setCopied(true);
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setCopied(false);
    }, 1600);
  };

  // A refused clipboard write rejects before showCopied; it surfaces rather than claiming a copy.
  const copy = async () => {
    await navigator.clipboard.writeText(command);
    showCopied();
  };

  return (
    <div className="copy-command" data-tone={tone}>
      <code className="copy-command-text">
        {tool === "" ? null : <span className="copy-command-tool">{tool}</span>}
        {rest}
      </code>
      <button
        aria-label={`Copy ${command}`}
        className="copy-command-button"
        onClick={() => {
          void copy();
        }}
        type="button"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
};
