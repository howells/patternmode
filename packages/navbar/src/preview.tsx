"use client";

import type { NavbarProps } from "./component";
import { Navbar, NavbarItem, NavbarLabel, NavbarSection } from "./component";

export function NavbarPreview(props: NavbarProps) {
  return (
    <Navbar {...props}>
      <NavbarSection>
        <NavbarItem current href="#home">
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
export const navbarPreviewProps: readonly unknown[] = [
  // Note: Navbar is primarily a container component
  // Visual customization happens through NavbarItem, NavbarSection, etc.
];
