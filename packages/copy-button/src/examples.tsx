"use client";

import { CopyButton } from "./component";

export const DefaultExample = () => <CopyButton text="Hello, World!" />;

export const CustomLabelsExample = () => (
  <CopyButton
    copiedLabel="Code Copied!"
    copyLabel="Copy Code"
    text="console.log('Hello, World!');"
  />
);

export const LongTextExample = () => (
  <CopyButton
    copiedLabel="Text Copied!"
    copyLabel="Copy Text"
    text="This is a longer piece of text that demonstrates how the copy button works with more substantial content that users might want to copy to their clipboard."
  />
);

export const ApiKeyExample = () => (
  <CopyButton
    className="text-xs"
    copiedLabel="Key Copied!"
    copyLabel="Copy API Key"
    text="sk-1234567890abcdef1234567890abcdef"
  />
);
