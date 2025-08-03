"use client";

import type { TooltipProps } from "./component";
import React from "react";
import { Tooltip } from "./component";

export function TooltipExample(props: TooltipProps) {
  return (
    <Tooltip content="This is a tooltip" {...props}>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Hover me
      </button>
    </Tooltip>
  );
}
