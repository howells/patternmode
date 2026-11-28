"use client";

import { useSyncExternalStore } from "react";

import { EMPTY_GRID_PARAMS, MAX_PAGE_SIZE, paramKey, readGridSearchParams } from "./state";
import type {
  GridAddress,
  GridAddressParams,
  GridAddressWriteOptions,
  SerializedGridParams,
} from "./types";

export {
  DEFAULT_PAGE_SIZES,
  EMPTY_GRID_PARAMS,
  MAX_PAGE_SIZE,
  columnIdFromDef,
  normalizePinSide,
  paramKey,
  parseColumnsParam,
  parseFiltersParam,
  parsePxWidth,
  parseSortingParam,
  readGridSearchParams,
  serializeGridState,
} from "./state";
export type { GridColumnsState, ReadGridSearchParamsOptions } from "./state";

const PARAM_KEYS: readonly (keyof SerializedGridParams)[] = [
  "cols",
  "filters",
  "page",
  "pageSize",
  "q",
  "sort",
];

const listeners = new Set<() => void>();
let popstateBound = false;

const notifyListeners = () => {
  for (const listener of listeners) {
    listener();
  }
};

const subscribeAddress = (onStoreChange: () => void): (() => void) => {
  listeners.add(onStoreChange);

  if (typeof window !== "undefined" && !popstateBound) {
    window.addEventListener("popstate", notifyListeners);
    popstateBound = true;
  }

  return () => {
    listeners.delete(onStoreChange);

    if (typeof window !== "undefined" && listeners.size === 0 && popstateBound) {
      window.removeEventListener("popstate", notifyListeners);
      popstateBound = false;
    }
  };
};

const snapshotCache = new Map<string, { params: GridAddressParams; search: string }>();

const readCachedWindowParams = (prefix: string, maxPageSize: number): GridAddressParams => {
  if (typeof window === "undefined") {
    return EMPTY_GRID_PARAMS;
  }

  const { search } = window.location;
  const cacheKey = `${prefix}\0${maxPageSize}`;
  const cached = snapshotCache.get(cacheKey);

  if (cached !== undefined && cached.search === search) {
    return cached.params;
  }

  const params = readGridSearchParams(new URLSearchParams(search), { maxPageSize, prefix });
  snapshotCache.set(cacheKey, { params, search });

  return params;
};

export interface UseBrowserGridAddressOptions {
  /** Server-rendered initial params so SSR and client hydration match with zero flash. */
  initialParams?: GridAddressParams | undefined;
  /** Upper bound for parsed `pageSize`. Defaults to 250. */
  maxPageSize?: number | undefined;
  /** Optional parameter prefix so multiple URL-synced grids can share one page. */
  prefix?: string | undefined;
}

/**
 * Built-in SSR-safe browser URL state adapter backed by `URLSearchParams`,
 * `useSyncExternalStore`, and the History API. Uses `replaceState` by default
 * and `pushState` only when `{ history: "push" }` is requested (e.g. paging).
 */
export const useBrowserGridAddress = (options?: UseBrowserGridAddressOptions): GridAddress => {
  const prefix = options?.prefix ?? "";
  const maxPageSize = options?.maxPageSize ?? MAX_PAGE_SIZE;
  const serverSnapshot = options?.initialParams ?? EMPTY_GRID_PARAMS;

  const params = useSyncExternalStore(
    subscribeAddress,
    () => readCachedWindowParams(prefix, maxPageSize),
    () => serverSnapshot,
  );

  const write = (values: SerializedGridParams, writeOptions?: GridAddressWriteOptions) => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);

    for (const key of PARAM_KEYS) {
      const paramName = paramKey(key, prefix);
      const value = values[key];

      if (value === null || value === "") {
        url.searchParams.delete(paramName);
      } else {
        url.searchParams.set(paramName, String(value));
      }
    }

    const nextUrl = url.toString();

    if (nextUrl === window.location.href) {
      return;
    }

    if (writeOptions?.history === "push") {
      window.history.pushState(null, "", nextUrl);
    } else {
      window.history.replaceState(null, "", nextUrl);
    }

    notifyListeners();
  };

  return { params, write };
};
