import React from "react";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
} from "./navbar";

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