"use client";

import { Stack } from "@patternmode/stack";
import React from "react";
import { ThemeToggle } from "./component";

export const DefaultExample = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <ThemeToggle
      onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
      theme={theme}
    />
  );
};

export const SizesExample = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <Stack align="center" direction="horizontal" gap={4}>
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        size="xs"
        theme={theme}
      />
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        size="sm"
        theme={theme}
      />
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        size="base"
        theme={theme}
      />
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        size="lg"
        theme={theme}
      />
    </Stack>
  );
};

export const VariantsExample = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <Stack align="center" direction="horizontal" gap={4}>
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        theme={theme}
        variant="primary"
      />
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        theme={theme}
        variant="secondary"
      />
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        theme={theme}
        variant="outline"
      />
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        theme={theme}
        variant="ghost"
      />
    </Stack>
  );
};

export const RoundedExample = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <Stack align="center" direction="horizontal" gap={4}>
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        rounded={false}
        theme={theme}
      />
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        rounded={true}
        theme={theme}
      />
    </Stack>
  );
};

export const LoadingExample = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleToggle = () => {
    setIsLoading(true);
    // Simulate async theme change
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ThemeToggle isLoading={isLoading} onToggle={handleToggle} theme={theme} />
  );
};

export const DarkThemeExample = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  return (
    <div className="rounded-md bg-zinc-900 p-4">
      <ThemeToggle
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        theme={theme}
      />
    </div>
  );
};

export const DisabledExample = () => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  return (
    <Stack align="center" direction="horizontal" gap={4}>
      <ThemeToggle
        disabled
        onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
        theme={theme}
      />
      <ThemeToggle
        disabled
        onToggle={() => {
          /* noop */
        }}
        theme="dark"
      />
    </Stack>
  );
};
