"use client";

import type { ComponentExample } from "../../../lib/component-config-types";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
} from "@patternmode/ui";

import React from "react";

export function DefaultExample() {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="#home">
          <NavbarLabel>Home</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#about">
          <NavbarLabel>About</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#contact">
          <NavbarLabel>Contact</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}

export function WithDividerExample() {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="#home">
          <NavbarLabel>Home</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#about">
          <NavbarLabel>About</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      <NavbarDivider />
      <NavbarSection>
        <NavbarItem href="#login">
          <NavbarLabel>Login</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#signup">
          <NavbarLabel>Sign Up</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
export const NavbarExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "NavbarExample",
    title: "Navbar",
    description: "Navbar example",
    component: NavbarExample,
  },
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "WithDividerExample",
    title: "With Divider",
    description: "With Divider example",
    component: WithDividerExample,
  },
];
