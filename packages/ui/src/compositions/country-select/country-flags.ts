/**
 * Country flag component lookup by ISO 3166-1 alpha-2 code.
 *
 * country-flag-icons only provides named exports (one per country code).
 * We use a lazy-init pattern to load the module once and provide a
 * typed record for dynamic access by country code.
 */
import type { ComponentType, HTMLAttributes, SVGAttributes } from "react";

type HTMLSVGElement = HTMLElement & SVGElement;

interface FlagProps
  extends HTMLAttributes<HTMLSVGElement>,
    SVGAttributes<HTMLSVGElement> {}

export type FlagComponent = ComponentType<FlagProps>;

let _flags: Record<string, FlagComponent> | null = null;

async function loadFlags(): Promise<Record<string, FlagComponent>> {
  if (_flags) {
    return _flags;
  }
  const mod = await import("country-flag-icons/react/1x1");
  _flags = mod as unknown as Record<string, FlagComponent>;
  return _flags;
}

/** Pre-load flags on module init (non-blocking). */
const flagsPromise = loadFlags();

/**
 * Get a flag component by country code. Returns null if not loaded yet or code is invalid.
 * After first render, flags are always available synchronously via the cached module.
 */
export function getFlag(code: string): FlagComponent | null {
  return _flags?.[code] ?? null;
}

/** Await this to ensure flags are loaded before first render. */
export { flagsPromise };
