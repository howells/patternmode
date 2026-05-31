import type { ComponentType } from "react";
import type { StoreApi } from "zustand";

import type { SheetActions, StacksheetSnapshot } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: maps store heterogeneous components — type safety is at the call site
export type AnyComponent = ComponentType<any>;

export type StoreState<TMap extends object> = StacksheetSnapshot<TMap> &
  SheetActions<TMap>;

/** Return type of createSheetStore — store plus ad-hoc component maps */
export interface SheetStoreBundle<TMap extends object> {
  /** Generated type key → Component (for renderer lookup) */
  componentMap: Map<string, AnyComponent>;
  /** Component → generated type key (dedup) */
  componentRegistry: Map<AnyComponent, string>;
  store: StoreApi<StoreState<TMap>>;
}

/** Pre-resolved args — skips resolveArgs entirely */
export interface ResolvedItem {
  ariaLabel?: string;
  data: Record<string, unknown>;
  id: string;
  type: string;
}
