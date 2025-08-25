"use client";

import React from "react";
import { Checkbox } from "./component";

export const DefaultExample = () => <Checkbox />;
export const CheckedExample = () => <Checkbox checked />;
export const IndeterminateExample = () => <Checkbox checked="indeterminate" />;
export const DisabledExample = () => (
  <div className="flex gap-4">
    <Checkbox disabled />
    <Checkbox checked disabled />
  </div>
);
export const WithLabelExample = () => (
  <label className="flex items-center gap-2">
    <Checkbox /> <span className="text-sm">Accept terms</span>
  </label>
);
export const ControlledExample = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <label className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={(v: any) => setChecked(Boolean(v))} />
      <span className="text-sm">Controlled: {checked ? "Yes" : "No"}</span>
    </label>
  );
};
export const GroupExample = () => {
  const [values, setValues] = React.useState<string[]>([]);
  const toggle = (v: string) => setValues((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));
  return (
    <div className="space-y-2">
      {[
        { id: "js", label: "JavaScript" },
        { id: "ts", label: "TypeScript" },
        { id: "py", label: "Python" },
      ].map((opt) => (
        <label key={opt.id} className="flex items-center gap-2">
          <Checkbox checked={values.includes(opt.id)} onCheckedChange={() => toggle(opt.id)} />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};
export const IndeterminateParentExample = () => {
  const [childrenVals, setChildrenVals] = React.useState<Record<string, boolean>>({ a: false, b: false, c: false });
  const all = Object.values(childrenVals);
  const allChecked = all.every(Boolean);
  const someChecked = all.some(Boolean);
  const parentState = allChecked ? true : someChecked ? "indeterminate" : false;
  const toggleAll = () => {
    const next = !allChecked;
    setChildrenVals({ a: next, b: next, c: next });
  };
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <Checkbox checked={parentState} onCheckedChange={toggleAll} />
        <span className="text-sm">Select all</span>
      </label>
      {Object.keys(childrenVals).map((k) => (
        <label key={k} className="flex items-center gap-2">
          <Checkbox checked={childrenVals[k]} onCheckedChange={() => setChildrenVals((p) => ({ ...p, [k]: !p[k] }))} />
          <span className="text-sm">Item {k.toUpperCase()}</span>
        </label>
      ))}
    </div>
  );
};
export const SizesExample = () => (
  <div className="flex items-center gap-4">
    <Checkbox /> <Checkbox /> <Checkbox />
  </div>
);

