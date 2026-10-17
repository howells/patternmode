"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";

const STORAGE_KEY = "patternmode-preview-theme";

const readIsDark = () => document.documentElement.classList.contains("dark");

const readIsDarkOnServer = () => false;

/** The `dark` class on <html> is the stored state; observe it so the button follows any change. */
const subscribeToDarkClass = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["class"], attributes: true });
  return () => {
    observer.disconnect();
  };
};

const toggle = () => {
  const next = !readIsDark();
  document.documentElement.classList.toggle("dark", next);
  localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
};

/**
 * Ghost sun/moon toggle that flips the `dark` class on <html> and persists the
 * choice to localStorage. No next-themes: the app is a single-page preview, so
 * a tiny hand-rolled toggle keeps the dependency surface honest.
 */
export const ThemeToggle = () => {
  const isDark = useSyncExternalStore(subscribeToDarkClass, readIsDark, readIsDarkOnServer);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark =
      stored === "dark" ||
      (stored === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  return (
    <Button aria-label="Toggle dark mode" onClick={toggle} size="icon" variant="ghost">
      {isDark ? <Moon aria-hidden /> : <Sun aria-hidden />}
    </Button>
  );
};
