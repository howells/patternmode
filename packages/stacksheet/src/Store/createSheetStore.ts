import { createStore } from "zustand";
import type { ResolvedConfig, SheetItem } from "../types";
import {
  resolveArgs,
  resolvePresentationOptions,
  warnInlineComponent,
} from "./StoreArgs";
import type {
  AnyComponent,
  ResolvedItem,
  SheetStoreBundle,
  StoreState,
} from "./StoreTypes";

/**
 * Create an isolated Zustand store for a sheet stack instance.
 *
 * Returns a store bundle containing the Zustand store plus two maps
 * that track ad-hoc (component-direct) registrations:
 * - `componentRegistry` — maps `ComponentType` → generated type key (dedup)
 * - `componentMap` — maps generated type key → `ComponentType` (renderer lookup)
 *
 * The ad-hoc counter is scoped per instance to prevent identity leaks across
 * multiple `createStacksheet()` calls or test runs.
 */
export function createSheetStore<TMap extends object>(
  config: ResolvedConfig,
): SheetStoreBundle<TMap> {
  type Item = SheetItem<Extract<keyof TMap, string>>;

  const componentRegistry = new Map<AnyComponent, string>();
  const componentMap = new Map<string, AnyComponent>();

  // Per-instance counter (not module-level) — prevents identity leaks across instances/tests
  let adhocCounter = 0;
  function getNextKey() {
    return `__adhoc_${adhocCounter++}`;
  }

  // Set of component names already warned about (avoid log spam)
  const warnedNames = new Set<string>();

  function resolve(
    first: unknown,
    second: unknown,
    third: unknown,
    fourth?: unknown,
  ) {
    return resolveArgs(
      componentRegistry,
      componentMap,
      getNextKey,
      warnedNames,
      first,
      second,
      third,
      fourth,
    );
  }

  /** Remove registry entries for type keys no longer in the stack */
  function pruneRegistry(remainingStack: readonly SheetItem[]) {
    const usedTypes = new Set(remainingStack.map((item) => item.type));
    for (const [component, typeKey] of componentRegistry) {
      if (!usedTypes.has(typeKey)) {
        componentRegistry.delete(component);
        componentMap.delete(typeKey);
      }
    }
  }

  const store = createStore<StoreState<TMap>>()((set, get) => {
    // ── Internal resolved methods (no double-resolution) ──

    function _openResolved({ type, id, data, ariaLabel }: ResolvedItem) {
      set({
        stack: [{ id, type, data, ariaLabel } as Item],
        isOpen: true,
      });
    }

    function _pushResolved({ type, id, data, ariaLabel }: ResolvedItem) {
      set((state) => {
        const item = { id, type, data, ariaLabel } as Item;
        if (
          Number.isFinite(config.maxDepth) &&
          state.stack.length >= config.maxDepth
        ) {
          return {
            stack: [...state.stack.slice(0, -1), item],
            isOpen: true,
          };
        }
        return {
          stack: [...state.stack, item],
          isOpen: true,
        };
      });
    }

    function _replaceResolved({ type, id, data, ariaLabel }: ResolvedItem) {
      set((state) => {
        const item = { id, type, data, ariaLabel } as Item;
        if (state.stack.length === 0) {
          return { stack: [item], isOpen: true };
        }
        return {
          stack: [...state.stack.slice(0, -1), item],
          isOpen: true,
        };
      });
    }

    return {
      stack: [],
      isOpen: false,

      open(
        first: unknown,
        second?: unknown,
        third?: unknown,
        fourth?: unknown,
      ) {
        _openResolved(resolve(first, second, third, fourth));
      },

      push(
        first: unknown,
        second?: unknown,
        third?: unknown,
        fourth?: unknown,
      ) {
        _pushResolved(resolve(first, second, third, fourth));
      },

      replace(
        first: unknown,
        second?: unknown,
        third?: unknown,
        fourth?: unknown,
      ) {
        _replaceResolved(resolve(first, second, third, fourth));
      },

      swap(first: unknown, second?: unknown, third?: unknown) {
        let type: string;
        let data: Record<string, unknown>;
        const ariaLabel = resolvePresentationOptions(third)?.ariaLabel;

        if (typeof first === "function") {
          const component = first as AnyComponent;
          let typeKey = componentRegistry.get(component);
          if (!typeKey) {
            warnInlineComponent(component, componentRegistry, warnedNames);
            typeKey = getNextKey();
            componentRegistry.set(component, typeKey);
            componentMap.set(typeKey, component);
          }
          type = typeKey;
          data = (second ?? {}) as Record<string, unknown>;
        } else {
          type = first as string;
          data = (second ?? {}) as Record<string, unknown>;
        }

        set((state) => {
          const top = state.stack.at(-1);
          if (!top) {
            return state;
          }
          const newStack = [...state.stack];
          newStack[newStack.length - 1] = {
            id: top.id,
            type,
            data,
            ariaLabel: ariaLabel ?? top.ariaLabel,
          } as Item;
          return { stack: newStack };
        });
      },

      navigate(
        first: unknown,
        second?: unknown,
        third?: unknown,
        fourth?: unknown,
      ) {
        const resolved = resolve(first, second, third, fourth);
        const { stack } = get();
        const top = stack.at(-1);

        if (stack.length === 0) {
          _openResolved(resolved);
          return;
        }

        // For ad-hoc components, check if the top item's type maps to the same
        // component in the registry. For string types, compare directly.
        let isSameType = top?.type === resolved.type;
        if (!isSameType && typeof first === "function") {
          const topComponent = componentMap.get(top?.type ?? "");
          isSameType = topComponent === first;
        }

        if (isSameType) {
          _replaceResolved(resolved);
          return;
        }

        _pushResolved(resolved);
      },

      setData(first: unknown, second?: unknown, third?: unknown) {
        // setData always has an id: (type, id, data) or (Component, id, data)
        const { id, data } = resolve(first, second, third);
        set((state) => {
          const idx = state.stack.findIndex((item) => item.id === id);
          if (idx === -1) {
            return state;
          }
          const updated = [...state.stack];
          updated[idx] = { ...updated[idx], data } as Item;
          return { stack: updated };
        });
      },

      remove(id) {
        set((state) => {
          const next = state.stack.filter((item) => item.id !== id);
          if (next.length === state.stack.length) {
            return state;
          }
          pruneRegistry(next);
          if (next.length === 0) {
            return { stack: [], isOpen: false };
          }
          return { stack: next };
        });
      },

      pop() {
        set((state) => {
          if (state.stack.length <= 1) {
            pruneRegistry([]);
            return { stack: [], isOpen: false };
          }
          const next = state.stack.slice(0, -1);
          pruneRegistry(next);
          return { stack: next, isOpen: true };
        });
      },

      close() {
        pruneRegistry([]);
        set({ stack: [], isOpen: false });
      },
    };
  });

  return { store, componentRegistry, componentMap };
}
