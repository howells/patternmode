"use client";

import { TabNavigation, TabNavigationLink } from "./component";

export const DefaultExample = () => {
  return (
    <TabNavigation>
      <TabNavigationLink href="#home">Home</TabNavigationLink>
      <TabNavigationLink href="#about">About</TabNavigationLink>
      <TabNavigationLink href="#contact">Contact</TabNavigationLink>
    </TabNavigation>
  );
};

export const ActiveExample = () => {
  return (
    <TabNavigation>
      <TabNavigationLink href="#dashboard">Dashboard</TabNavigationLink>
      <TabNavigationLink data-active href="#analytics">
        Analytics
      </TabNavigationLink>
      <TabNavigationLink href="#settings">Settings</TabNavigationLink>
    </TabNavigation>
  );
};

export const DisabledExample = () => {
  return (
    <TabNavigation>
      <TabNavigationLink href="#overview">Overview</TabNavigationLink>
      <TabNavigationLink href="#details">Details</TabNavigationLink>
      <TabNavigationLink disabled>Coming Soon</TabNavigationLink>
    </TabNavigation>
  );
};

export const ProfileSectionExample = () => {
  return (
    <TabNavigation className="mb-6">
      <TabNavigationLink data-active href="#general">
        General
      </TabNavigationLink>
      <TabNavigationLink href="#security">Security</TabNavigationLink>
      <TabNavigationLink href="#notifications">Notifications</TabNavigationLink>
      <TabNavigationLink href="#billing">Billing</TabNavigationLink>
    </TabNavigation>
  );
};

export const ManyTabsExample = () => {
  return (
    <TabNavigation>
      <TabNavigationLink data-active href="#overview">
        Overview
      </TabNavigationLink>
      <TabNavigationLink href="#analytics">Analytics</TabNavigationLink>
      <TabNavigationLink href="#reports">Reports</TabNavigationLink>
      <TabNavigationLink href="#settings">Settings</TabNavigationLink>
      <TabNavigationLink href="#users">Users</TabNavigationLink>
      <TabNavigationLink href="#billing">Billing</TabNavigationLink>
      <TabNavigationLink href="#support">Support</TabNavigationLink>
      <TabNavigationLink href="#api">API</TabNavigationLink>
    </TabNavigation>
  );
};
