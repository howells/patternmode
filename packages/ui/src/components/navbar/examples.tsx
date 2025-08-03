"use client";

import React from "react";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "./component";

export const DefaultExample = () => {
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
};

export const WithDividerExample = () => {
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
};

export const WithCurrentStateExample = () => {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="#dashboard" current>
          <NavbarLabel>Dashboard</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#projects">
          <NavbarLabel>Projects</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="#team">
          <NavbarLabel>Team</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      <NavbarSpacer />
      <NavbarSection>
        <NavbarItem href="#profile">
          <NavbarLabel>Profile</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
};
