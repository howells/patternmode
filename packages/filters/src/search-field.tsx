"use client";

import { cn } from "cn";
import { Search } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { usePageKey } from "./use-page-key";
import type { ShortcutScope } from "./use-page-key";

export interface SearchFieldProps {
  className?: string;
  delayMs?: number;
  /** Names the field for assistive tech: "Search products". */
  label: string;
  onSearch: (value: string) => void;
  placeholder: string;
  /** Optional container scope so multiple search bars on one page do not collide. */
  scopeRef?: ShortcutScope;
  /** Enable the global `/` shortcut to focus this field. Defaults to true. */
  shortcut?: boolean;
  value: string;
}

/**
 * A list's search field. It keeps its own text while typing and hands it on
 * after a pause, so URL or server queries update once per search, not per key.
 * "/" jumps to it from anywhere on the page.
 */
export const SearchField = ({
  className,
  delayMs = 250,
  label,
  onSearch,
  placeholder,
  scopeRef,
  shortcut = true,
  value,
}: SearchFieldProps) => {
  const input = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSubmittedRef = useRef(value);
  const [text, setText] = useState(value);
  const [given, setGiven] = useState(value);

  if (given !== value) {
    setGiven(value);
    if (value !== text.trim()) {
      setText(value);
    }
  }

  const commit = (next: string) => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (next !== lastSubmittedRef.current || next !== value) {
      lastSubmittedRef.current = next;
      onSearch(next);
    }
  };

  const commitFromEffect = useEffectEvent(commit);

  useEffect(() => {
    const trimmed = text.trim();

    if (trimmed === lastSubmittedRef.current && trimmed === value) {
      return () => {
        // Already synchronized.
      };
    }

    const timer = setTimeout(() => {
      timerRef.current = null;
      commitFromEffect(trimmed);
    }, delayMs);

    timerRef.current = timer;

    return () => {
      clearTimeout(timer);
      if (timerRef.current === timer) {
        timerRef.current = null;
      }
    };
  }, [delayMs, text, value]);

  usePageKey(
    "/",
    () => {
      input.current?.focus();
    },
    shortcut,
    scopeRef,
  );

  return (
    <label className={cn("patternmode-search-field", className)}>
      <Search aria-hidden="true" className="patternmode-search-field__icon" />
      <span className="patternmode-filters-sr-only">{label}</span>
      <input
        className="patternmode-search-field__input"
        onChange={(event) => {
          setText(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            commit(text.trim());
          }

          if (event.key === "Escape") {
            event.currentTarget.blur();
          }
        }}
        placeholder={placeholder}
        ref={input}
        type="search"
        value={text}
      />
      {shortcut ? (
        <kbd aria-hidden="true" className="patternmode-filters-kbd patternmode-search-field__kbd">
          /
        </kbd>
      ) : null}
    </label>
  );
};
