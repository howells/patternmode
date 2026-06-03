import { createStore } from "zustand";
import type { ResolvedConfig, SheetItem } from "../types";
import { resolveArgs, resolvePresentationOptions, warnInlineComponent } from "./store-args";
import type { AnyComponent, ResolvedItem, SheetStoreBundle, StoreState } from "./store-types";
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
export const createSheetStore = <TMap extends object>(
  config: ResolvedConfig,
): SheetStoreBundle<TMap> => {
  type Item = SheetItem<Extract<keyof TMap, string>>;
  const componentRegistry = new Map<AnyComponent, string>();
  const componentMap = new Map<string, AnyComponent>();
  // Per-instance counter (not module-level) — prevents identity leaks across instances/tests
  let adhocCounter = 0;
  const getNextKey = () => {
    const key = `__adhoc_${adhocCounter}`;
    adhocCounter += 1;
    return key;
  };
  // Set of component names already warned about (avoid log spam)
  const warnedNames = new Set<string>();
  const resolve = (first: unknown, second: unknown, third: unknown, fourth?: unknown) =>
    resolveArgs(
      componentRegistry,
      componentMap,
      getNextKey,
      warnedNames,
      first,
      second,
      third,
      fourth,
    );
  /** Remove registry entries for type keys no longer in the stack */
  const pruneRegistry = (remainingStack: readonly SheetItem[]) => {
    const usedTypes = new Set(remainingStack.map((item) => item.type));
    for (const [component, typeKey] of componentRegistry) {
      if (!usedTypes.has(typeKey)) {
        componentRegistry.delete(component);
        componentMap.delete(typeKey);
      }
    }
  };
  const store = createStore<StoreState<TMap>>()((set, get) => {
    // ── Internal resolved methods (no double-resolution) ──
    const _openResolved = ({ type, id, data, ariaLabel }: ResolvedItem) => {
      set({
        isOpen: true,
        stack: [{ ariaLabel, data, id, type } as Item],
      });
    };
    const _pushResolved = ({ type, id, data, ariaLabel }: ResolvedItem) => {
      set((state) => {
        const item = { ariaLabel, data, id, type } as Item;
        if (Number.isFinite(config.maxDepth) && state.stack.length >= config.maxDepth) {
          return {
            isOpen: true,
            stack: [...state.stack.slice(0, -1), item],
          };
        }
        return {
          isOpen: true,
          stack: [...state.stack, item],
        };
      });
    };
    const _replaceResolved = ({ type, id, data, ariaLabel }: ResolvedItem) => {
      set((state) => {
        const item = { ariaLabel, data, id, type } as Item;
        if (state.stack.length === 0) {
          return { isOpen: true, stack: [item] };
        }
        return {
          isOpen: true,
          stack: [...state.stack.slice(0, -1), item],
        };
      });
    };
    return {
      close: () => {
        pruneRegistry([]);
        set({ isOpen: false, stack: [] });
      },
      isOpen: false,
      navigate: (first: unknown, second?: unknown, third?: unknown, fourth?: unknown) => {
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
      open: (first: unknown, second?: unknown, third?: unknown, fourth?: unknown) => {
        _openResolved(resolve(first, second, third, fourth));
      },
      pop: () => {
        set((state) => {
          if (state.stack.length <= 1) {
            pruneRegistry([]);
            return { isOpen: false, stack: [] };
          }
          const next = state.stack.slice(0, -1);
          pruneRegistry(next);
          return { isOpen: true, stack: next };
        });
      },
      push: (first: unknown, second?: unknown, third?: unknown, fourth?: unknown) => {
        _pushResolved(resolve(first, second, third, fourth));
      },
      remove: (id) => {
        set((state) => {
          const next = state.stack.filter((item) => item.id !== id);
          if (next.length === state.stack.length) {
            return state;
          }
          pruneRegistry(next);
          if (next.length === 0) {
            return { isOpen: false, stack: [] };
          }
          return { stack: next };
        });
      },
      replace: (first: unknown, second?: unknown, third?: unknown, fourth?: unknown) => {
        _replaceResolved(resolve(first, second, third, fourth));
      },
      setData: (first: unknown, second?: unknown, third?: unknown) => {
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
      stack: [],
      swap: (first: unknown, second?: unknown, third?: unknown) => {
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
            ariaLabel: ariaLabel ?? top.ariaLabel,
            data,
            id: top.id,
            type,
          } as Item;
          return { stack: newStack };
        });
      },
    };
  });
  return { componentMap, componentRegistry, store };
};
