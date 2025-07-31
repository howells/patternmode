"use client";

import { useQuery } from "@tanstack/react-query";

interface IconValidationData {
  kebabNames: Set<string>;
  pascalNames: Set<string>;
}

/**
 * Fetch all valid icon names from the API for validation purposes.
 * Uses a large limit to get all icons in a single request for session-long caching.
 */
async function fetchValidIcons(): Promise<IconValidationData> {
  const response = await fetch("/api/icons?limit=9999");
  
  if (!response.ok) {
    throw new Error("Failed to fetch valid icons");
  }

  const data = await response.json();
  
  const kebabNames = new Set<string>();
  const pascalNames = new Set<string>();
  
  data.icons.forEach((icon: { kebab: string; pascal: string }) => {
    kebabNames.add(icon.kebab);
    pascalNames.add(icon.pascal);
  });

  return { kebabNames, pascalNames };
}

/**
 * Hook to validate icon names against the official Lucide React library.
 * Fetches all valid icons once per session and caches them indefinitely.
 * 
 * @returns Object with validation functions for both kebab-case and PascalCase names
 */
export function useIconValidation() {
  const { data, isLoading, error } = useQuery<IconValidationData>({
    queryKey: ["valid-icons"],
    queryFn: fetchValidIcons,
    staleTime: Infinity, // Never consider stale - icons don't change during session
    gcTime: Infinity, // Keep in cache indefinitely (formerly cacheTime)
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnReconnect: false, // Don't refetch on network reconnect
  });

  /**
   * Check if a kebab-case icon name is valid (e.g., "arrow-down", "file-json-2")
   */
  const isValidKebabIcon = (name: string): boolean => {
    if (!data || !name || typeof name !== "string") return false;
    return data.kebabNames.has(name);
  };

  /**
   * Check if a PascalCase icon name is valid (e.g., "ArrowDown", "FileJson2")
   */
  const isValidPascalIcon = (name: string): boolean => {
    if (!data || !name || typeof name !== "string") return false;
    return data.pascalNames.has(name);
  };

  /**
   * Check if any icon name is valid (attempts both kebab-case and PascalCase)
   */
  const isValidIcon = (name: string): boolean => {
    return isValidKebabIcon(name) || isValidPascalIcon(name);
  };

  return {
    isValidKebabIcon,
    isValidPascalIcon,
    isValidIcon,
    isLoading,
    error,
    // Expose the raw data for advanced use cases
    validIcons: data,
  };
}