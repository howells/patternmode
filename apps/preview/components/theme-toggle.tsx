"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "patternmode-preview-theme";

/**
 * Ghost sun/moon toggle that flips the `dark` class on <html> and persists the
 * choice to localStorage. No next-themes: the app is a single-page preview, so
 * a tiny hand-rolled toggle keeps the dependency surface honest.
 */
export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark =
      stored === "dark" ||
      (stored === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <Button aria-label="Toggle dark mode" onClick={toggle} size="icon" variant="ghost">
      {isDark ? <Moon aria-hidden /> : <Sun aria-hidden />}
    </Button>
  );
};
