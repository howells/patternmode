"use client";

import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./component";

export const CollapsibleExample = () => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger>Component Features</CollapsibleTrigger>
    <CollapsibleContent>
      <div className="space-y-2">
        <div>• Smooth height-based animations</div>
        <div>• Accessible keyboard navigation</div>
        <div>• Customizable icons and styling</div>
        <div>• Support for nested content</div>
      </div>
    </CollapsibleContent>
  </Collapsible>
);

export default CollapsibleExample;
