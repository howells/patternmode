"use client";

import { useSyncExternalStore } from "react";

import type { HomeSectionId } from "@/lib/home-sections";

/*
 * The Home pane reports which section is in view; the header reads it to
 * draw its underline. A tiny external store keeps the two apart without a
 * provider around the whole app.
 */

let activeSection: HomeSectionId | null = null;
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const setActiveSection = (next: HomeSectionId | null) => {
  if (next === activeSection) {
    return;
  }
  activeSection = next;
  for (const listener of listeners) {
    listener();
  }
};

export const useActiveSection = () =>
  useSyncExternalStore(
    subscribe,
    () => activeSection,
    () => null,
  );

/*
 * Pane scroll positions, so back and forward land where the reader left.
 * The body never scrolls, so the browser's own restoration has nothing to
 * restore; each pane saves its offset per history entry instead. An entry is
 * marked with a token in history.state the first time a pane saves on it.
 * The browser keeps that state across back, forward and reload, and a fresh
 * navigation creates an entry without one, so a token means "visited".
 */

const ENTRY_KEY = "patternmodeScrollEntry";

const readEntryToken = (): number | null => {
  const state: unknown = history.state;
  if (!(state instanceof Object) || !(ENTRY_KEY in state)) {
    return null;
  }
  const token = Number(state[ENTRY_KEY]);
  return Number.isNaN(token) ? null : token;
};

const claimEntryToken = (): number => {
  const existing = readEntryToken();
  if (existing !== null) {
    return existing;
  }
  const token = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  // Keep the router's own state: it tells the app router the entry is its own.
  history.replaceState({ ...history.state, [ENTRY_KEY]: token }, "");
  return token;
};

const storageKey = (token: number, key: string) => `patternmode:scroll:${token}:${key}`;

export const saveScroll = (key: string, top: number) => {
  const token = claimEntryToken();
  try {
    sessionStorage.setItem(storageKey(token, key), String(Math.round(top)));
  } catch {
    // Private mode or a full quota: restoration is a nicety, not a requirement.
  }
};

/** The offset saved on this history entry, or null on a fresh navigation. */
export const readRestorableScroll = (key: string): number | null => {
  const token = readEntryToken();
  if (token === null) {
    return null;
  }
  try {
    const value = sessionStorage.getItem(storageKey(token, key));
    return value === null ? null : Number(value);
  } catch {
    return null;
  }
};
