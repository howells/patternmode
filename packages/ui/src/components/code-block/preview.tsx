"use client";

import type { CodeBlockProps } from "./code-block";
import { CodeBlock } from "@patternmode/ui";

import React from "react";

type CodeBlockExampleProps = CodeBlockProps;

export function CodeBlockExample(props: CodeBlockProps) {
  return <CodeBlock {...props} />;
}
