declare const process: undefined | { env?: { NODE_ENV?: string } };

import type { SheetPresentationOptions } from "../types";
import type { AnyComponent, ResolvedItem } from "./StoreTypes";

export function resolvePresentationOptions(
  value: unknown
): SheetPresentationOptions | undefined {
  if (!(value && typeof value === "object")) {
    return undefined;
  }
  const candidate = value as SheetPresentationOptions;
  if (
    candidate.ariaLabel !== undefined &&
    typeof candidate.ariaLabel !== "string"
  ) {
    return undefined;
  }
  return candidate;
}

/**
 * Dev-mode warning: detect likely inline arrow functions passed as ad-hoc components.
 * When a new component reference has the same displayName/name as an existing one,
 * it's almost always an inline arrow being re-created every render.
 */
export function warnInlineComponent(
  component: AnyComponent,
  componentRegistry: Map<AnyComponent, string>,
  warnedNames: Set<string>
): void {
  if (
    typeof process === "undefined" ||
    process?.env?.NODE_ENV === "production"
  ) {
    return;
  }

  const name = component.displayName || component.name;
  if (!name) {
    return;
  }
  if (warnedNames.has(name)) {
    return;
  }

  for (const [existing, key] of componentRegistry) {
    const existingName = existing.displayName || existing.name;
    if (existingName === name) {
      warnedNames.add(name);
      console.warn(
        `[stacksheet] A new component reference with name "${name}" was registered ` +
          `(key: ${key}), but a different reference with the same name already exists. ` +
          `This usually means you're passing an inline arrow function (e.g. ` +
          "open(() => <MySheet />)). Define the component outside of render to avoid " +
          "memory leaks and broken navigate() same-type detection."
      );
      return;
    }
  }
}

/**
 * If `first` is a function (component), register it and return { type, id, data }.
 * Otherwise, pass through the string-based (type, id, data) args unchanged.
 */
export function resolveArgs(
  componentRegistry: Map<AnyComponent, string>,
  componentMap: Map<string, AnyComponent>,
  getNextKey: () => string,
  warnedNames: Set<string>,
  first: unknown,
  second: unknown,
  third: unknown,
  fourth?: unknown
): ResolvedItem {
  if (typeof first === "function") {
    const component = first as AnyComponent;

    let typeKey = componentRegistry.get(component);
    if (!typeKey) {
      warnInlineComponent(component, componentRegistry, warnedNames);
      typeKey = getNextKey();
      componentRegistry.set(component, typeKey);
      componentMap.set(typeKey, component);
    }

    if (typeof second === "string") {
      return {
        ariaLabel: resolvePresentationOptions(fourth)?.ariaLabel,
        type: typeKey,
        id: second,
        data: (third ?? {}) as Record<string, unknown>,
      };
    }
    return {
      ariaLabel: resolvePresentationOptions(third)?.ariaLabel,
      type: typeKey,
      id: crypto.randomUUID(),
      data: (second ?? {}) as Record<string, unknown>,
    };
  }

  return {
    ariaLabel: resolvePresentationOptions(fourth)?.ariaLabel,
    type: first as string,
    id: second as string,
    data: (third ?? {}) as Record<string, unknown>,
  };
}
