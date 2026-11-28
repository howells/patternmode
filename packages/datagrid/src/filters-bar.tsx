"use client";
"use no memo";

import {
  AddFilter,
  FilterChip,
  RuleEditor,
  filterRuleSchema,
  isRuleComplete,
  operatorLabels,
  ruleSummary,
} from "@patternmode/filters";
import type { FilterSpec, ShortcutScope } from "@patternmode/filters";
import type { RowData } from "@tanstack/react-table";

import type { DataGridTableInstance } from "./features";
import { columnLabel, filterKinds } from "./fields";
import { startFilter } from "./filter-state";

export interface DataGridFiltersProps<TData extends RowData> {
  onOpenChange: (columnId: string | null) => void;
  openId: string | null;
  scopeRef?: ShortcutScope;
  shortcut: boolean;
  specs: ReadonlyMap<string, FilterSpec>;
  table: DataGridTableInstance<TData>;
}

/**
 * The grid's filters: a chip for each rule in force, then "Filter" to add one.
 * A rule left without a value is dropped when its chip closes. Custom non-rule
 * filter values are safely ignored rather than throwing.
 */
export const DataGridFilters = <TData extends RowData>({
  onOpenChange,
  openId,
  scopeRef,
  shortcut,
  specs,
  table,
}: DataGridFiltersProps<TData>) => {
  const { columnFilters } = table.state;
  const filtered = new Set(columnFilters.map((filter) => filter.id));

  return (
    <>
      {columnFilters.map(({ id, value }) => {
        const column = table.getColumn(id);
        const spec = specs.get(id);

        if (column === undefined || spec === undefined) {
          return null;
        }

        const parsed = filterRuleSchema.safeParse(value);

        if (!parsed.success) {
          return null;
        }

        const rule = parsed.data;
        const label = columnLabel(column);

        return (
          <FilterChip
            field={label}
            icon={filterKinds[spec.kind].icon}
            key={id}
            onOpenChange={(next) => {
              onOpenChange(next ? id : null);

              if (!next && !isRuleComplete(rule)) {
                column.setFilterValue(undefined);
              }
            }}
            onRemove={() => {
              column.setFilterValue(undefined);
            }}
            open={openId === id}
            operator={operatorLabels[rule.operator]}
            value={ruleSummary(rule, spec)}
          >
            <RuleEditor
              label={label}
              onChange={(next) => {
                column.setFilterValue(next);
              }}
              rule={rule}
              spec={spec}
            />
          </FilterChip>
        );
      })}
      <AddFilter
        fields={[...specs].flatMap(([id, spec]) => {
          const column = table.getColumn(id);

          return column === undefined || filtered.has(id)
            ? []
            : [{ ...filterKinds[spec.kind], id, label: columnLabel(column) }];
        })}
        onPick={(id) => {
          const column = table.getColumn(id);
          const spec = specs.get(id);

          if (column !== undefined && spec !== undefined) {
            startFilter(column, spec, onOpenChange);
          }
        }}
        scopeRef={scopeRef}
        shortcut={shortcut}
      />
    </>
  );
};
