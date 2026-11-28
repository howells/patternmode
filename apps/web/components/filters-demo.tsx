"use client";

import "@patternmode/filters/styles.css";
import "@patternmode/status/styles.css";

import {
  AddFilter,
  FilterChip,
  FilterToolbar,
  RuleEditor,
  SearchField,
  initialRule,
  isRuleComplete,
  matchesRule,
  operatorLabels,
  readCellValue,
  ruleSummary,
} from "@patternmode/filters";
import type { FilterField, FilterRule, FilterSpec } from "@patternmode/filters";
import { StatusMark } from "@patternmode/status";
import { Hash, ListChecks, Type } from "lucide-react";
import { useState } from "react";

interface SampleItem {
  id: string;
  name: string;
  price: number;
  status: "draft" | "ready";
}

const pounds = new Intl.NumberFormat("en-GB", {
  currency: "GBP",
  maximumFractionDigits: 0,
  style: "currency",
});

const ITEMS: readonly SampleItem[] = [
  { id: "1", name: "Fumed oak console", price: 4280, status: "ready" },
  { id: "2", name: "Bouclé lounge chair", price: 1850, status: "ready" },
  { id: "3", name: "Honed travertine slab", price: 6400, status: "draft" },
  { id: "4", name: "Fluted linen pendant", price: 690, status: "ready" },
  { id: "5", name: "Saddle-leather dining bench", price: 3150, status: "draft" },
];

type FieldId = "name" | "price" | "status";

const SPECS: Record<FieldId, FilterSpec> = {
  name: { kind: "text", options: [] },
  price: { kind: "number", options: [] },
  status: {
    kind: "option",
    options: [
      { count: 3, label: "Spec ready", tone: "positive", value: "ready" },
      { count: 2, label: "Draft", tone: "warning", value: "draft" },
    ],
  },
};

const FIELDS: readonly (FilterField & { id: FieldId })[] = [
  { hint: "Text", icon: Type, id: "name", label: "Item" },
  { hint: "Choice", icon: ListChecks, id: "status", label: "Status" },
  { hint: "Number", icon: Hash, id: "price", label: "Price" },
];

const isFieldId = (id: string): id is FieldId => id === "name" || id === "price" || id === "status";

const dropRule = (
  current: Partial<Record<FieldId, FilterRule>>,
  id: FieldId,
): Partial<Record<FieldId, FilterRule>> => ({
  name: id === "name" ? undefined : current.name,
  price: id === "price" ? undefined : current.price,
  status: id === "status" ? undefined : current.status,
});

export const FiltersDemo = () => {
  const [query, setQuery] = useState("");
  const [rules, setRules] = useState<Partial<Record<FieldId, FilterRule>>>({
    status: { operator: "any_of", value: ["ready"] },
  });
  const [openId, setOpenId] = useState<FieldId | null>(null);

  const activeFields = FIELDS.filter((field) => rules[field.id] !== undefined);
  const availableFields = FIELDS.filter((field) => rules[field.id] === undefined);

  const matching = ITEMS.filter((item) => {
    if (query !== "" && !item.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return activeFields.every((field) => {
      const rule = rules[field.id];

      return rule === undefined ? true : matchesRule(readCellValue(item[field.id]), rule);
    });
  });

  return (
    <div className="w-full overflow-hidden rounded-fixture-card bg-card shadow-(--shadow-sm)">
      <FilterToolbar
        end={
          <span>
            {matching.length} of {ITEMS.length}
          </span>
        }
      >
        <SearchField
          className="md:w-44"
          delayMs={100}
          label="Search items"
          onSearch={setQuery}
          placeholder="Search items"
          value={query}
        />
        {activeFields.map((field) => {
          const rule = rules[field.id];
          if (rule === undefined) {
            return null;
          }

          return (
            <FilterChip
              field={field.label}
              icon={field.icon}
              key={field.id}
              onOpenChange={(next) => {
                setOpenId(next ? field.id : null);
                if (!next && !isRuleComplete(rule)) {
                  setRules((current) => dropRule(current, field.id));
                }
              }}
              onRemove={() => {
                setRules((current) => dropRule(current, field.id));
              }}
              open={openId === field.id}
              operator={operatorLabels[rule.operator]}
              value={ruleSummary(rule, SPECS[field.id])}
            >
              <RuleEditor
                label={field.label}
                onChange={(next) => {
                  setRules((current) => ({ ...current, [field.id]: next }));
                }}
                rule={rule}
                spec={SPECS[field.id]}
              />
            </FilterChip>
          );
        })}
        <AddFilter
          fields={availableFields}
          onPick={(id) => {
            if (!isFieldId(id)) {
              return;
            }
            setRules((current) => ({
              ...current,
              [id]: current[id] ?? initialRule(SPECS[id].kind),
            }));
            setOpenId(id);
          }}
        />
      </FilterToolbar>
      <ul className="m-0 list-none p-0">
        {matching.length === 0 ? (
          <li className="flex h-24 items-center justify-center type-row text-muted-foreground">
            No matching items
          </li>
        ) : (
          matching.map((item) => (
            <li
              className="flex h-10 items-center gap-2.5 px-4 type-row not-last:border-b not-last:border-border"
              key={item.id}
            >
              <StatusMark
                label={item.status === "ready" ? "Spec ready" : "Draft"}
                size="2xs"
                status={item.status === "ready" ? "half" : "empty"}
                tone={item.status === "ready" ? "accent" : "muted"}
                trackColor="var(--border)"
              />
              <span className="min-w-0 flex-1 truncate">{item.name}</span>
              <span className="text-muted-foreground tabular-nums">
                {pounds.format(item.price)}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
