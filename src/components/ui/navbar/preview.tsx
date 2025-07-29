"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@patternmode/ui";

export function NavbarExample() {
  const [currentItem, setCurrentItem] = useState("Dashboard");

  const handleItemClick = (itemName: string) => {
    setCurrentItem(itemName);
    console.log(`Navigated to: ${itemName}`);
  };

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      <Navbar className="px-4 py-2 bg-white dark:bg-zinc-900">
        <NavbarSection>
          <NavbarItem
            onClick={() => handleItemClick("Dashboard")}
            current={currentItem === "Dashboard"}
          >
            <NavbarLabel>Dashboard</NavbarLabel>
          </NavbarItem>
          <NavbarItem
            onClick={() => handleItemClick("Projects")}
            current={currentItem === "Projects"}
          >
            <NavbarLabel>Projects</NavbarLabel>
          </NavbarItem>
          <NavbarItem
            onClick={() => handleItemClick("Team")}
            current={currentItem === "Team"}
          >
            <NavbarLabel>Team</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
        <NavbarDivider />
        <NavbarSection>
          <NavbarItem
            onClick={() => handleItemClick("Analytics")}
            current={currentItem === "Analytics"}
          >
            <NavbarLabel>Analytics</NavbarLabel>
          </NavbarItem>
          <NavbarItem
            onClick={() => handleItemClick("Reports")}
            current={currentItem === "Reports"}
          >
            <NavbarLabel>Reports</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
        <NavbarSpacer />
        <NavbarSection>
          <NavbarItem
            onClick={() => handleItemClick("Settings")}
            current={currentItem === "Settings"}
          >
            <NavbarLabel>Settings</NavbarLabel>
          </NavbarItem>
          <NavbarItem
            onClick={() => handleItemClick("Profile")}
            current={currentItem === "Profile"}
          >
            <NavbarLabel>Profile</NavbarLabel>
          </NavbarItem>
        </NavbarSection>
      </Navbar>
    </div>
  );
}
