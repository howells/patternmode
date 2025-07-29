"use client";

/**
 * Keyboard Shortcut Hook
 *
 * A React hook for handling keyboard shortcuts that can trigger button actions.
 * Built on top of usehooks-ts useEventListener for better performance and reliability.
 * Automatically detects platform (Mac vs PC) and handles modifier key combinations.
 *
 * @example
 * ```tsx
 * // Basic usage
 * const MyButton = () => {
 *   const handleClick = () => console.log('clicked');
 *
 *   useKeyboardShortcut(['mod', 'K'], handleClick);
 *
 *   return <Button onClick={handleClick} kbd={['mod', 'K']}>Search</Button>;
 * };
 *
 * // With custom options
 * useKeyboardShortcut(['mod', 'shift', 'P'], handleAction, {
 *   preventDefault: true,
 *   enabled: isEnabled,
 * });
 * ```
 */

import { useEffect } from "react";

interface UseKeyboardShortcutOptions {
  /** Whether to prevent default browser behavior */
  preventDefault?: boolean;
  /** Whether the shortcut is enabled */
  enabled?: boolean;
  /** Target element (defaults to document) */
  target?: HTMLElement | Document;
}

/**
 * Hook for handling keyboard shortcuts.
 *
 * @param keys - Array of keys for the shortcut (e.g., ['mod', 'K'])
 * @param callback - Function to call when shortcut is pressed
 * @param options - Additional options for the shortcut
 */
export function useKeyboardShortcut(
  keys: string[],
  callback: () => void,
  options: UseKeyboardShortcutOptions = {}
) {
  const { preventDefault = true, enabled = true, target } = options;

  // Convert keys to platform-specific format
  const normalizeKeys = (keyList: string[]) => {
    const isMac =
      typeof window !== "undefined" &&
      /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
    return keyList.map((key) => {
      switch (key.toLowerCase()) {
        case "mod":
        case "cmd":
        case "command":
          return isMac ? "meta" : "ctrl";
        case "ctrl":
        case "control":
          return "ctrl";
        case "alt":
        case "option":
          return "alt";
        case "shift":
          return "shift";
        case "meta":
          return "meta";
        default:
          return key.toLowerCase();
      }
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!enabled) return;

    const normalizedKeys = normalizeKeys(keys);

    // Check if all required keys are pressed
    const modifierKeys = normalizedKeys.filter((key) =>
      ["ctrl", "alt", "shift", "meta"].includes(key)
    );
    const regularKeys = normalizedKeys.filter(
      (key) => !["ctrl", "alt", "shift", "meta"].includes(key)
    );

    // Check modifiers
    const modifiersMatch = modifierKeys.every((key) => {
      switch (key) {
        case "ctrl":
          return event.ctrlKey;
        case "alt":
          return event.altKey;
        case "shift":
          return event.shiftKey;
        case "meta":
          return event.metaKey;
        default:
          return false;
      }
    });

    // Check regular keys
    const regularKeysMatch = regularKeys.every((key) => {
      return event.key.toLowerCase() === key;
    });

    // Ensure no extra modifiers are pressed
    const extraModifiers = [
      event.ctrlKey && !normalizedKeys.includes("ctrl"),
      event.altKey && !normalizedKeys.includes("alt"),
      event.shiftKey && !normalizedKeys.includes("shift"),
      event.metaKey && !normalizedKeys.includes("meta"),
    ].some(Boolean);

    if (modifiersMatch && regularKeysMatch && !extraModifiers) {
      if (preventDefault) {
        event.preventDefault();
      }
      callback();
    }
  };

  // Use native event listener with proper cleanup
  useEffect(() => {
    if (!enabled) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, handleKeyDown]);
}

/**
 * Hook for handling keyboard shortcuts on buttons.
 * Automatically integrates with Button component's kbd prop.
 *
 * @param keys - Array of keys for the shortcut
 * @param onClick - Button's onClick handler
 * @param options - Additional options
 */
export function useButtonKeyboardShortcut(
  keys: string[] | undefined,
  onClick: (() => void) | undefined,
  options: UseKeyboardShortcutOptions = {}
) {
  useKeyboardShortcut(keys || [], onClick || (() => {}), {
    ...options,
    enabled: !!(keys && onClick && options.enabled !== false),
  });
}
