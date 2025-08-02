"use client";

import { Navbar } from "@patternmode/ui";

import React from "react";

type NavbarExampleProps = React.ComponentProps<typeof Navbar>;

export function NavbarExample(props: React.ComponentProps<typeof Navbar>) {
  return <Navbar {...props} />;
}
