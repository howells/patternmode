import { describe, expect, it } from "vitest";

import {
  compileRule,
  initialRule,
  isRuleComplete,
  matchesRule,
  readCellValue,
  ruleSummary,
  withOperator,
} from "./filter-rules";

const text = (value: string) => ({ kind: "text", value }) as const;
const number = (value: number) => ({ kind: "number", value }) as const;

describe("filter rules", () => {
  it("matches text rules case-insensitively", () => {
    expect(matchesRule(text("Oak veneer"), { operator: "contains", value: "oak" })).toBe(true);
    expect(matchesRule(text("Oak"), { operator: "is_not", value: "oak" })).toBe(false);
    expect(matchesRule(text("Walnut"), { operator: "not_contains", value: "oak" })).toBe(true);
    expect(matchesRule({ kind: "blank" }, { operator: "not_contains", value: "oak" })).toBe(true);
  });

  it("matches number and range rules", () => {
    expect(matchesRule(number(12), { operator: "between", value: [2, 12] })).toBe(true);
    expect(matchesRule(number(13), { operator: "between", value: [2, 12] })).toBe(false);
    expect(matchesRule(number(5), { operator: "gt", value: 10 })).toBe(false);
    expect(matchesRule(number(10), { operator: "gte", value: 10 })).toBe(true);
  });

  it("treats blank cells consistently for number neq", () => {
    expect(matchesRule({ kind: "blank" }, { operator: "neq", value: 10 })).toBe(true);
    expect(matchesRule(number(10), { operator: "neq", value: 10 })).toBe(false);
    expect(matchesRule(number(8), { operator: "neq", value: 10 })).toBe(true);
  });

  it("matches date rules for Date instances and ISO strings", () => {
    const april15 = readCellValue(new Date("2026-04-15T14:30:00Z"));
    const isoText = readCellValue("2026-04-15");

    expect(matchesRule(april15, { operator: "on", value: "2026-04-15" })).toBe(true);
    expect(matchesRule(isoText, { operator: "on", value: "2026-04-15" })).toBe(true);
    expect(matchesRule(april15, { operator: "after", value: "2026-04-14" })).toBe(true);
    expect(matchesRule(april15, { operator: "before", value: "2026-04-16" })).toBe(true);
    expect(
      matchesRule(april15, { operator: "between_dates", value: ["2026-04-01", "2026-04-30"] }),
    ).toBe(true);
  });

  it("matches boolean rules", () => {
    expect(matchesRule(readCellValue(true), { operator: "is_true", value: null })).toBe(true);
    expect(matchesRule(readCellValue(false), { operator: "is_true", value: null })).toBe(false);
    expect(matchesRule(readCellValue(false), { operator: "is_false", value: null })).toBe(true);
  });

  it("matches option and presence rules", () => {
    expect(matchesRule(text("draft"), { operator: "any_of", value: ["draft"] })).toBe(true);
    expect(
      matchesRule({ kind: "list", values: ["a", "b"] }, { operator: "none_of", value: ["b"] }),
    ).toBe(false);
    expect(matchesRule({ kind: "blank" }, { operator: "empty", value: null })).toBe(true);
    expect(matchesRule({ kind: "blank" }, { operator: "set", value: null })).toBe(false);
  });

  it("lets every row through while a rule waits for its value", () => {
    expect(isRuleComplete({ operator: "any_of", value: [] })).toBe(false);
    expect(isRuleComplete({ operator: "contains", value: "   " })).toBe(false);
    expect(isRuleComplete({ operator: "is_true", value: null })).toBe(true);
    expect(matchesRule(text("x"), { operator: "any_of", value: [] })).toBe(true);
    expect(matchesRule(number(1), { operator: "eq", value: null })).toBe(true);
  });

  it("returns fresh objects from initialRule and caches compiled predicates", () => {
    const first = initialRule("option");
    const second = initialRule("option");
    expect(first).not.toBe(second);

    const rule = { operator: "any_of", value: ["ready"] } as const;
    expect(compileRule(rule)).toBe(compileRule(rule));
  });

  it("keeps compatible values when switching operators", () => {
    expect(withOperator({ operator: "eq", value: 4 }, "between")).toStrictEqual({
      operator: "between",
      value: [4, null],
    });
    expect(withOperator({ operator: "on", value: "2026-04-15" }, "between_dates")).toStrictEqual({
      operator: "between_dates",
      value: ["2026-04-15", null],
    });
    expect(withOperator({ operator: "any_of", value: ["a"] }, "none_of")).toStrictEqual({
      operator: "none_of",
      value: ["a"],
    });
    expect(withOperator({ operator: "contains", value: "oak" }, "set")).toStrictEqual({
      operator: "set",
      value: null,
    });
  });

  it("normalizes raw cell values and summarizes rules", () => {
    expect(readCellValue("")).toStrictEqual({ kind: "blank" });
    expect(readCellValue([1, 2])).toStrictEqual({ kind: "list", values: ["1", "2"] });
    expect(readCellValue(true)).toStrictEqual({ kind: "boolean", value: true });
    expect(
      ruleSummary(
        { operator: "any_of", value: ["ready"] },
        { kind: "option", options: [{ label: "Spec ready", value: "ready" }] },
      ),
    ).toBe("Spec ready");
    expect(
      ruleSummary(
        { operator: "between_dates", value: ["2026-04-01", "2026-04-30"] },
        { kind: "date", options: [] },
      ),
    ).toBe("2026-04-01–2026-04-30");
  });
});
