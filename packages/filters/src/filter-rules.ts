import { z } from "zod";

/**
 * A filter rule on one field: an operator and the value it compares against.
 * Each field filters as one kind, which decides the operators it offers.
 */
export type FilterKind = "boolean" | "date" | "number" | "option" | "text";

export type FilterTone = "danger" | "info" | "neutral" | "positive" | "warning";

export interface FilterOption {
  readonly value: string;
  readonly label: string;
  /** How many rows hold it. */
  readonly count?: number;
  readonly tone?: FilterTone;
}

export interface FilterSpec {
  readonly kind: FilterKind;
  readonly options: readonly FilterOption[];
}

const textOperator = z.enum(["contains", "not_contains", "is", "is_not"]);
const numberOperator = z.enum(["eq", "neq", "gt", "gte", "lt", "lte"]);
const dateOperator = z.enum(["on", "before", "after"]);
const booleanOperator = z.enum(["is_true", "is_false"]);
const optionOperator = z.enum(["any_of", "none_of"]);
const presenceOperator = z.enum(["empty", "set"]);

export const filterRuleSchema = z.discriminatedUnion("operator", [
  z.strictObject({ operator: textOperator, value: z.string() }),
  z.strictObject({ operator: numberOperator, value: z.number().nullable() }),
  z.strictObject({
    operator: z.literal("between"),
    value: z.tuple([z.number().nullable(), z.number().nullable()]),
  }),
  z.strictObject({ operator: dateOperator, value: z.string() }),
  z.strictObject({
    operator: z.literal("between_dates"),
    value: z.tuple([z.string().nullable(), z.string().nullable()]),
  }),
  z.strictObject({ operator: booleanOperator, value: z.null() }),
  z.strictObject({ operator: optionOperator, value: z.array(z.string()) }),
  z.strictObject({ operator: presenceOperator, value: z.null() }),
]);

export type FilterRule = z.infer<typeof filterRuleSchema>;

export type FilterOperator = FilterRule["operator"];

export const filterEntrySchema = z.strictObject({ id: z.string() }).and(filterRuleSchema);

export const filterOperators: Record<FilterKind, readonly FilterOperator[]> = {
  boolean: booleanOperator.options,
  date: [...dateOperator.options, "between_dates", "empty", "set"],
  number: [...numberOperator.options, "between", "empty", "set"],
  option: optionOperator.options,
  text: [...textOperator.options, "empty", "set"],
};

export const operatorLabels: Record<FilterOperator, string> = {
  after: "is after",
  any_of: "is any of",
  before: "is before",
  between: "is between",
  between_dates: "is between",
  contains: "contains",
  empty: "is empty",
  eq: "is",
  gt: "is more than",
  gte: "is at least",
  is: "is",
  is_false: "is false",
  is_not: "is not",
  is_true: "is true",
  lt: "is less than",
  lte: "is at most",
  neq: "is not",
  none_of: "is none of",
  not_contains: "does not contain",
  on: "is on",
  set: "is not empty",
};

/**
 * A cell's value as rules read it. Values outside the known primitives become
 * `other`, which only presence tests can match.
 */
export type Cell =
  | { readonly kind: "blank" }
  | { readonly kind: "boolean"; readonly value: boolean }
  | { readonly kind: "date"; readonly day: number; readonly iso: string }
  | { readonly kind: "list"; readonly values: readonly string[] }
  | { readonly kind: "number"; readonly value: number }
  | { readonly kind: "other" }
  | { readonly kind: "text"; readonly value: string };

const ISO_DATE_PREFIX = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})(?:$|[T\s])/u;

/** Parses an ISO date string (`YYYY-MM-DD` or ISO timestamp) into a UTC midnight epoch ms. */
export const parseIsoDateDay = (value: string): number | null => {
  const match = ISO_DATE_PREFIX.exec(value.trim());

  if (match?.groups === undefined) {
    return null;
  }

  const year = Number(match.groups.year);
  const month = Number(match.groups.month);
  const day = Number(match.groups.day);
  const ms = Date.UTC(year, month - 1, day);
  const check = new Date(ms);

  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day
  ) {
    return null;
  }

  return ms;
};

const dateToIso = (date: Date): string => {
  const year = String(date.getUTCFullYear()).padStart(4, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const dateToCell = (date: Date): Cell => {
  if (Number.isNaN(date.getTime())) {
    return { kind: "blank" };
  }

  const day = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  return { day, iso: dateToIso(date), kind: "date" };
};

export const cellSchema = z.union([
  z.null().transform((): Cell => ({ kind: "blank" })),
  z.undefined().transform((): Cell => ({ kind: "blank" })),
  z
    .number()
    .transform((value): Cell =>
      Number.isFinite(value) ? { kind: "number", value } : { kind: "blank" },
    ),
  z.boolean().transform((value): Cell => ({ kind: "boolean", value })),
  z.date().transform(dateToCell),
  z
    .string()
    .transform((value): Cell => (value === "" ? { kind: "blank" } : { kind: "text", value })),
  z
    .array(z.union([z.string(), z.number()]))
    .transform((values): Cell =>
      values.length === 0 ? { kind: "blank" } : { kind: "list", values: values.map(String) },
    ),
]);

export type CellInput = z.input<typeof cellSchema>;

const readListCell = (items: readonly (number | string)[]): Cell => {
  if (items.length === 0) {
    return { kind: "blank" };
  }

  const values: string[] = [];

  for (const item of items) {
    // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path primitive narrowing avoids per-cell Zod allocations across 50k+ rows
    if (typeof item === "string") {
      values.push(item);
      // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path primitive narrowing avoids per-cell Zod allocations across 50k+ rows
    } else if (typeof item === "number") {
      values.push(String(item));
    } else {
      return { kind: "other" };
    }
  }

  return { kind: "list", values };
};

/** Fast, zero-schema normalization of a cell input into a filterable `Cell`. */
export const readCellValue = (raw: CellInput): Cell => {
  if (raw === null || raw === undefined) {
    return { kind: "blank" };
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path primitive narrowing avoids per-cell Zod allocations across 50k+ rows
  if (typeof raw === "string") {
    return raw === "" ? { kind: "blank" } : { kind: "text", value: raw };
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path primitive narrowing avoids per-cell Zod allocations across 50k+ rows
  if (typeof raw === "number") {
    return Number.isFinite(raw) ? { kind: "number", value: raw } : { kind: "blank" };
  }

  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- hot-path primitive narrowing avoids per-cell Zod allocations across 50k+ rows
  if (typeof raw === "boolean") {
    return { kind: "boolean", value: raw };
  }

  if (raw instanceof Date) {
    return dateToCell(raw);
  }

  if (Array.isArray(raw)) {
    return readListCell(raw);
  }

  return { kind: "other" };
};

type TextOperator = z.infer<typeof textOperator>;
type NumberOperator = z.infer<typeof numberOperator>;
type DateOperator = z.infer<typeof dateOperator>;
type BooleanOperator = z.infer<typeof booleanOperator>;

export type TextRule = Extract<FilterRule, { operator: TextOperator }>;
export type NumberRule = Extract<FilterRule, { operator: NumberOperator }>;
export type BetweenRule = Extract<FilterRule, { operator: "between" }>;
export type DateRule = Extract<FilterRule, { operator: DateOperator }>;
export type BetweenDatesRule = Extract<FilterRule, { operator: "between_dates" }>;
export type BooleanRule = Extract<FilterRule, { operator: BooleanOperator }>;
export type OptionRule = Extract<FilterRule, { operator: z.infer<typeof optionOperator> }>;

const textOperators: ReadonlySet<FilterOperator> = new Set(textOperator.options);
const numberOperators: ReadonlySet<FilterOperator> = new Set(numberOperator.options);
const dateOperators: ReadonlySet<FilterOperator> = new Set(dateOperator.options);
const booleanOperators: ReadonlySet<FilterOperator> = new Set(booleanOperator.options);
const optionOperators: ReadonlySet<FilterOperator> = new Set(optionOperator.options);

export const isTextRule = (rule: FilterRule): rule is TextRule => textOperators.has(rule.operator);

export const isNumberRule = (rule: FilterRule): rule is NumberRule =>
  numberOperators.has(rule.operator);

export const isBetweenRule = (rule: FilterRule): rule is BetweenRule => rule.operator === "between";

export const isDateRule = (rule: FilterRule): rule is DateRule => dateOperators.has(rule.operator);

export const isBetweenDatesRule = (rule: FilterRule): rule is BetweenDatesRule =>
  rule.operator === "between_dates";

export const isBooleanRule = (rule: FilterRule): rule is BooleanRule =>
  booleanOperators.has(rule.operator);

export const isOptionRule = (rule: FilterRule): rule is OptionRule =>
  optionOperators.has(rule.operator);

const initialRuleFactories: Record<FilterKind, () => FilterRule> = {
  boolean: () => ({ operator: "is_true", value: null }),
  date: () => ({ operator: "on", value: "" }),
  number: () => ({ operator: "eq", value: null }),
  option: () => ({ operator: "any_of", value: [] }),
  text: () => ({ operator: "contains", value: "" }),
};

/** The rule a new filter starts with, returning a fresh object each call. */
export const initialRule = (kind: FilterKind): FilterRule => initialRuleFactories[kind]();

const firstNumber = (rule: FilterRule): number | null => {
  if (isNumberRule(rule)) {
    return rule.value;
  }

  return isBetweenRule(rule) ? rule.value[0] : null;
};

const firstDate = (rule: FilterRule): string => {
  if (isDateRule(rule)) {
    return rule.value;
  }

  return isBetweenDatesRule(rule) ? (rule.value[0] ?? "") : "";
};

/** Moves a rule to another operator of the same kind, keeping what still fits. */
export const withOperator = (rule: FilterRule, operator: FilterOperator): FilterRule => {
  const text = textOperator.safeParse(operator);

  if (text.success) {
    return { operator: text.data, value: isTextRule(rule) ? rule.value : "" };
  }

  const number = numberOperator.safeParse(operator);

  if (number.success) {
    return { operator: number.data, value: firstNumber(rule) };
  }

  const date = dateOperator.safeParse(operator);

  if (date.success) {
    return { operator: date.data, value: firstDate(rule) };
  }

  const bool = booleanOperator.safeParse(operator);

  if (bool.success) {
    return { operator: bool.data, value: null };
  }

  const option = optionOperator.safeParse(operator);

  if (option.success) {
    return {
      operator: option.data,
      value: isOptionRule(rule) ? [...rule.value] : [],
    };
  }

  const presence = presenceOperator.safeParse(operator);

  if (presence.success) {
    return { operator: presence.data, value: null };
  }

  if (operator === "between_dates") {
    const start = firstDate(rule);

    return { operator: "between_dates", value: [start === "" ? null : start, null] };
  }

  return { operator: "between", value: [firstNumber(rule), null] };
};

/** A rule still waiting for its value filters nothing. */
export const isRuleComplete = (rule: FilterRule): boolean => {
  if (isBetweenRule(rule)) {
    return rule.value[0] !== null || rule.value[1] !== null;
  }

  if (isBetweenDatesRule(rule)) {
    return (
      (rule.value[0] !== null && parseIsoDateDay(rule.value[0]) !== null) ||
      (rule.value[1] !== null && parseIsoDateDay(rule.value[1]) !== null)
    );
  }

  if (isDateRule(rule)) {
    return parseIsoDateDay(rule.value) !== null;
  }

  if (isNumberRule(rule)) {
    return rule.value !== null;
  }

  if (isTextRule(rule)) {
    return rule.value.trim().length > 0;
  }

  if (isOptionRule(rule)) {
    return rule.value.length > 0;
  }

  return true;
};

/** The values a cell holds, as option/text values. */
export const cellValues = (cell: Cell): readonly string[] => {
  if (cell.kind === "list") {
    return cell.values;
  }

  if (cell.kind === "text") {
    return [cell.value];
  }

  if (cell.kind === "number" || cell.kind === "boolean") {
    return [String(cell.value)];
  }

  return cell.kind === "date" ? [cell.iso] : [];
};

const cellDateDay = (cell: Cell): number | null => {
  if (cell.kind === "date") {
    return cell.day;
  }

  if (cell.kind === "text") {
    return parseIsoDateDay(cell.value);
  }

  return null;
};

const comparisons: Record<NumberOperator, (data: number, value: number) => boolean> = {
  eq: (data, value) => data === value,
  gt: (data, value) => data > value,
  gte: (data, value) => data >= value,
  lt: (data, value) => data < value,
  lte: (data, value) => data <= value,
  neq: (data, value) => data !== value,
};

const textTests: Record<TextOperator, (text: string, needle: string) => boolean> = {
  contains: (text, needle) => text.includes(needle),
  is: (text, needle) => text === needle,
  is_not: (text, needle) => text !== needle,
  not_contains: (text, needle) => !text.includes(needle),
};

const cellTextLower = (cell: Cell): string => {
  if (cell.kind === "text") {
    return cell.value.toLocaleLowerCase();
  }

  if (cell.kind === "blank" || cell.kind === "other") {
    return "";
  }

  return cellValues(cell).join(", ").toLocaleLowerCase();
};

export interface CompiledRule {
  /** False when the rule is incomplete and matches every cell. */
  readonly active: boolean;
  readonly test: (cell: Cell) => boolean;
}

const PASS_ALL: CompiledRule = {
  active: false,
  test: () => true,
};

const compiledCache = new WeakMap<FilterRule, CompiledRule>();

const compileNumberRule = (rule: NumberRule): CompiledRule => {
  const target = rule.value;

  if (target === null) {
    return PASS_ALL;
  }

  if (rule.operator === "neq") {
    return {
      active: true,
      test: (cell) => cell.kind === "blank" || (cell.kind === "number" && cell.value !== target),
    };
  }

  const compare = comparisons[rule.operator];

  return {
    active: true,
    test: (cell) => cell.kind === "number" && compare(cell.value, target),
  };
};

const compileDateRule = (rule: DateRule): CompiledRule => {
  const target = parseIsoDateDay(rule.value);

  if (target === null) {
    return PASS_ALL;
  }

  if (rule.operator === "on") {
    return { active: true, test: (cell) => cellDateDay(cell) === target };
  }

  const compare =
    rule.operator === "before" ? (day: number) => day < target : (day: number) => day > target;

  return {
    active: true,
    test: (cell) => {
      const day = cellDateDay(cell);

      return day !== null && compare(day);
    },
  };
};

const compileBetweenDatesRule = (rule: BetweenDatesRule): CompiledRule => {
  const min = rule.value[0] === null ? null : parseIsoDateDay(rule.value[0]);
  const max = rule.value[1] === null ? null : parseIsoDateDay(rule.value[1]);

  return {
    active: true,
    test: (cell) => {
      const day = cellDateDay(cell);

      return day !== null && (min === null || day >= min) && (max === null || day <= max);
    },
  };
};

const compileBooleanRule = (rule: BooleanRule): CompiledRule => {
  const expected = rule.operator === "is_true";

  return {
    active: true,
    test: (cell) => {
      if (cell.kind === "boolean") {
        return cell.value === expected;
      }

      if (cell.kind === "text") {
        const lower = cell.value.toLowerCase();

        return expected ? lower === "true" : lower === "false";
      }

      return false;
    },
  };
};

const compileOptionRule = (rule: OptionRule): CompiledRule => {
  const chosen = new Set(rule.value);
  const invert = rule.operator === "none_of";

  return {
    active: true,
    test: (cell) => {
      const hit =
        cell.kind === "text"
          ? chosen.has(cell.value)
          : cellValues(cell).some((value) => chosen.has(value));

      return invert ? !hit : hit;
    },
  };
};

const buildCompiledRule = (rule: FilterRule): CompiledRule => {
  if (!isRuleComplete(rule)) {
    return PASS_ALL;
  }

  if (isTextRule(rule)) {
    const needle = rule.value.trim().toLocaleLowerCase();
    const check = textTests[rule.operator];

    return { active: true, test: (cell) => check(cellTextLower(cell), needle) };
  }

  if (isNumberRule(rule)) {
    return compileNumberRule(rule);
  }

  if (isBetweenRule(rule)) {
    const [min, max] = rule.value;

    return {
      active: true,
      test: (cell) =>
        cell.kind === "number" &&
        (min === null || cell.value >= min) &&
        (max === null || cell.value <= max),
    };
  }

  if (isDateRule(rule)) {
    return compileDateRule(rule);
  }

  if (isBetweenDatesRule(rule)) {
    return compileBetweenDatesRule(rule);
  }

  if (isBooleanRule(rule)) {
    return compileBooleanRule(rule);
  }

  if (isOptionRule(rule)) {
    return compileOptionRule(rule);
  }

  return {
    active: true,
    test:
      rule.operator === "empty" ? (cell) => cell.kind === "blank" : (cell) => cell.kind !== "blank",
  };
};

/**
 * Compiles a rule once into a reusable predicate (hoisting Sets, lowercase
 * needles, and date bounds out of the per-row loop). Results are cached per
 * rule object reference via `WeakMap`.
 */
export const compileRule = (rule: FilterRule): CompiledRule => {
  const cached = compiledCache.get(rule);

  if (cached !== undefined) {
    return cached;
  }

  const compiled = buildCompiledRule(rule);
  compiledCache.set(rule, compiled);

  return compiled;
};

/** Whether a cell passes a rule. A rule still waiting for its value passes every cell. */
export const matchesRule = (cell: Cell, rule: FilterRule): boolean => compileRule(rule).test(cell);

const rangeBound = (value: string | null): string => (value === null || value === "" ? "…" : value);

const summarizeDatesRange = ([min, max]: BetweenDatesRule["value"]): string | undefined => {
  const start = rangeBound(min);
  const end = rangeBound(max);

  return start === "…" && end === "…" ? undefined : `${start}–${end}`;
};

/** The chip's value summary: "Wolf-Gordon, TileBar", "2–12", "oak", "2026-04-15". */
export const ruleSummary = (rule: FilterRule, spec: FilterSpec): string | undefined => {
  if (isOptionRule(rule)) {
    const labels = rule.value.map(
      (value) => spec.options.find((option) => option.value === value)?.label ?? value,
    );

    return labels.length > 0 ? labels.join(", ") : undefined;
  }

  if (isBetweenRule(rule)) {
    const [min, max] = rule.value;

    return min === null && max === null ? undefined : `${min ?? "…"}–${max ?? "…"}`;
  }

  if (isBetweenDatesRule(rule)) {
    return summarizeDatesRange(rule.value);
  }

  if (isDateRule(rule) || isTextRule(rule)) {
    return rule.value === "" ? undefined : rule.value;
  }

  if (isNumberRule(rule)) {
    return rule.value === null ? undefined : String(rule.value);
  }

  return undefined;
};
