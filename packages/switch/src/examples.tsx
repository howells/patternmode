"use client";

import React from "react";
import { Switch } from "./components/switch";

export const SwitchExample = () => {
  const [on, setOn] = React.useState(false);
  return <Switch checked={on} onChange={setOn} />;
};

export const LabeledSwitchExample = () => <Switch label="Enable feature" />;

export const SizesExample = () => (
  <div className="space-y-2">
    <Switch />
  </div>
);
