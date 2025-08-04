"use client";

import type { NavbarProps } from "./component";
import React from "react";
import {
  Navbar,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
} from "./component";

export function NavbarExample(props: NavbarProps) {
  return (
    <Navbar {...props}>
      <NavbarSection>
        <NavbarItem href="#home" current>
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

// Preview props for prop explorer
export const NavbarPreviewProps = [
  // Note: Navbar is primarily a container component
  // Visual customization happens through NavbarItem, NavbarSection, etc.
];
