"use client";

import type { RefObject } from "react";
import { useEffect, useEffectEvent } from "react";

const isTyping = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.isContentEditable || target.closest("input,textarea,select,[role='combobox']") !== null);

export type ShortcutScope = HTMLElement | RefObject<HTMLElement | null> | null | undefined;

interface RegisteredShortcut {
  key: string;
  press: () => void;
  scope: ShortcutScope;
}

const resolveScopeElement = (scope: ShortcutScope): HTMLElement | null => {
  if (scope === null || scope === undefined) {
    return null;
  }

  return scope instanceof HTMLElement ? scope : scope.current;
};

const registry = new Set<RegisteredShortcut>();
let lastInteractedElement: HTMLElement | null = null;
let listenersAttached = false;

const findOpenModal = (): Element | null =>
  document.querySelector("[aria-modal='true'], dialog[open]");

const collectCandidates = (key: string, modal: Element | null): RegisteredShortcut[] => {
  const candidates: RegisteredShortcut[] = [];

  for (const entry of registry) {
    if (entry.key !== key) {
      continue;
    }

    const scope = resolveScopeElement(entry.scope);

    if (modal === null || (scope !== null && modal.contains(scope))) {
      candidates.push(entry);
    }
  }

  return candidates;
};

const findContaining = (
  candidates: readonly RegisteredShortcut[],
  node: Node | null,
): RegisteredShortcut | undefined =>
  node === null
    ? undefined
    : candidates.find((entry) => resolveScopeElement(entry.scope)?.contains(node) === true);

const pickWinner = (key: string, modal: Element | null): RegisteredShortcut | null => {
  const candidates = collectCandidates(key, modal);

  if (candidates.length <= 1) {
    return candidates[0] ?? null;
  }

  return (
    findContaining(candidates, document.activeElement) ??
    findContaining(candidates, lastInteractedElement) ??
    candidates[0] ??
    null
  );
};

const onTrackTarget = (event: Event) => {
  if (event.target instanceof HTMLElement) {
    lastInteractedElement = event.target;
  }
};

const onDocumentKeyDown = (event: KeyboardEvent) => {
  if (
    event.defaultPrevented ||
    event.isComposing ||
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    isTyping(event.target)
  ) {
    return;
  }

  const winner = pickWinner(event.key.toLowerCase(), findOpenModal());

  if (winner !== null) {
    event.preventDefault();
    winner.press();
  }
};

const syncDocumentListeners = () => {
  if (registry.size > 0 && !listenersAttached) {
    document.addEventListener("keydown", onDocumentKeyDown);
    document.addEventListener("focusin", onTrackTarget, true);
    document.addEventListener("pointerdown", onTrackTarget, true);
    listenersAttached = true;
  } else if (registry.size === 0 && listenersAttached) {
    document.removeEventListener("keydown", onDocumentKeyDown);
    document.removeEventListener("focusin", onTrackTarget, true);
    document.removeEventListener("pointerdown", onTrackTarget, true);
    lastInteractedElement = null;
    listenersAttached = false;
  }
};

/**
 * Runs `onPress` when `key` is pressed on the page, unless a field has focus,
 * a modifier is held, IME composition is active, the event was already handled,
 * or a modal dialog is open outside `scopeRef`. When multiple instances register
 * the same key, only the focused or most recently interacted scope fires.
 */
export const usePageKey = (
  key: string,
  onPress: () => void,
  enabled = true,
  scope?: ShortcutScope,
): void => {
  const press = useEffectEvent(onPress);

  useEffect(() => {
    if (!enabled) {
      return () => {
        // Disabled: no listener registered.
      };
    }

    const entry: RegisteredShortcut = {
      key: key.toLowerCase(),
      press: () => {
        press();
      },
      scope,
    };

    registry.add(entry);
    syncDocumentListeners();

    return () => {
      registry.delete(entry);
      syncDocumentListeners();
    };
  }, [enabled, key, scope]);
};
