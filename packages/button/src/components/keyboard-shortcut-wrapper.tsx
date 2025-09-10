"use client";

import { useButtonKeyboardShortcut } from "@patternmode/kbd/use-keyboard-shortcut";
import type { FC, ReactNode } from "react";

/**
 * Client-only wrapper that adds keyboard shortcut functionality to buttons.
 * Only renders when keyboard shortcuts are actually needed.
 */
export const KeyboardShortcutWrapper: FC<{
  kbdKeys: string[] | undefined;
  onClick: (() => void) | undefined;
  children: ReactNode;
}> = ({ kbdKeys, onClick, children }) => {
  useButtonKeyboardShortcut(kbdKeys, onClick);
  return <>{children}</>;
};
