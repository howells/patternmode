"use client";

import { useEffect, useState } from "react";

export type SidebarViewMode = "grouped" | "alphabetical";

const STORAGE_KEY = "sidebar-view-mode";
const DEFAULT_VIEW: SidebarViewMode = "grouped";

/**
 * Custom hook for managing sidebar view mode with localStorage persistence
 * Handles SSR by using a fallback state until hydration is complete
 */
export function useSidebarView() {
  const [viewMode, setViewMode] = useState<SidebarViewMode>(DEFAULT_VIEW);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage after hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (stored === "grouped" || stored === "alphabetical")) {
        setViewMode(stored as SidebarViewMode);
      }
    }
    catch (error) {
      console.warn("Failed to read from localStorage:", error);
    }
    setIsHydrated(true);
  }, []);

  // Persist to localStorage when viewMode changes (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, viewMode);
      }
      catch (error) {
        console.warn("Failed to write to localStorage:", error);
      }
    }
  }, [viewMode, isHydrated]);

  const toggleViewMode = () => {
    setViewMode(current =>
      current === "grouped" ? "alphabetical" : "grouped",
    );
  };

  const setGroupedView = () => setViewMode("grouped");
  const setAlphabeticalView = () => setViewMode("alphabetical");

  // Add keyboard shortcut for toggling view mode
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey)
        && event.shiftKey
        && event.key === "V"
      ) {
        event.preventDefault();
        toggleViewMode();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleViewMode]);

  return {
    viewMode,
    isGrouped: viewMode === "grouped",
    isAlphabetical: viewMode === "alphabetical",
    isHydrated, // Export hydration state in case components need it
    toggleViewMode,
    setGroupedView,
    setAlphabeticalView,
  };
}
