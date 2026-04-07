"use client";

import { Input } from "@patternmode/ui/components/input";

export default function InputStatesExample() {
  return (
    <div className="flex flex-col gap-3">
      <Input placeholder="Default" />
      <Input disabled placeholder="Disabled" />
      <Input aria-invalid="true" placeholder="Error state" />
    </div>
  );
}
