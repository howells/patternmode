"use client";

import React from "react";
import { Combobox } from "./component";

export const ComboboxExample = () => {
  const [value, setValue] = React.useState<string>();

  const frameworks = [
    { id: "1", label: "React", value: "react" },
    { id: "2", label: "Vue", value: "vue" },
    { id: "3", label: "Angular", value: "angular" },
    { id: "4", label: "Svelte", value: "svelte" },
    { id: "5", label: "Next.js", value: "nextjs" },
  ];

  return (
    <div className="w-64">
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        searchPlaceholder="Search frameworks..."
      />
    </div>
  );
};

export default ComboboxExample;
