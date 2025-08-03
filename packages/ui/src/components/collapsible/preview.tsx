"use client";

import React from "react";
import { TextList, TextListItem } from "../text-list";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./component";

export const CollapsibleExample = () => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger>Component Features</CollapsibleTrigger>
    <CollapsibleContent>
      <TextList>
        <TextListItem>Smooth height-based animations</TextListItem>
        <TextListItem>Accessible keyboard navigation</TextListItem>
        <TextListItem>Customizable icons and styling</TextListItem>
        <TextListItem>Support for nested content</TextListItem>
      </TextList>
    </CollapsibleContent>
  </Collapsible>
);

export default CollapsibleExample;
