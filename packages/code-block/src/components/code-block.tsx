"use client";

import { CopyButton } from "@patternmode/copy-button";
import { cx } from "@patternmode/utils/cx";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light";
import type { CodeBlockProps } from "../types";
import {
  codeBlockHeaderVariants,
  codeBlockLanguageLabelVariants,
  codeBlockVariants,
} from "../variants";

/**
 * Syntax-highlighted code display component with copy functionality.
 */
const CodeBlock = ({
  ref,
  children,
  language = "tsx",
  className,
  theme = "auto",
}: CodeBlockProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const codeString = React.useMemo(() => {
    if (typeof children === "string") {
      return children;
    }
    return String(children || "");
  }, [children]);

  // Determine theme
  const isDark = React.useMemo(() => {
    if (theme === "light") {
      return false;
    }
    if (theme === "dark") {
      return true;
    }
    // Auto detection based on system preference or CSS
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  }, [theme]);

  // Listen for system theme changes only when theme is "auto"
  const [systemIsDark, setSystemIsDark] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Use system theme only when theme is "auto"
  const effectiveIsDark = theme === "auto" ? systemIsDark : isDark;

  return (
    <div
      className={cx(codeBlockVariants(), className)}
      data-testid="code-block"
      ref={ref}
    >
      <div className={codeBlockHeaderVariants()}>
        <span className={codeBlockLanguageLabelVariants()}>{language}</span>
        <CopyButton text={codeString} />
      </div>
      <SyntaxHighlighter
        codeTagProps={{
          style: {
            fontSize: "0.875rem",
            fontFamily:
              "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace",
          },
        }}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          maxWidth: "100%",
          overflowX: "auto",
        }}
        language={language}
        style={effectiveIsDark ? oneDark : oneLight}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
