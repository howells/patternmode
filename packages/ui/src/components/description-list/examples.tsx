"use client";

import React from "react";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "./component";

export const DefaultExample = () => (
  <DescriptionList>
    <DescriptionTerm>Name</DescriptionTerm>
    <DescriptionDetails>John Doe</DescriptionDetails>
    <DescriptionTerm>Email</DescriptionTerm>
    <DescriptionDetails>john@example.com</DescriptionDetails>
    <DescriptionTerm>Role</DescriptionTerm>
    <DescriptionDetails>Software Engineer</DescriptionDetails>
  </DescriptionList>
);

export const UserProfileExample = () => (
  <DescriptionList>
    <DescriptionTerm>Full Name</DescriptionTerm>
    <DescriptionDetails>Sarah Johnson</DescriptionDetails>
    <DescriptionTerm>Username</DescriptionTerm>
    <DescriptionDetails>@sarahj</DescriptionDetails>
    <DescriptionTerm>Email Address</DescriptionTerm>
    <DescriptionDetails>sarah.johnson@company.com</DescriptionDetails>
    <DescriptionTerm>Department</DescriptionTerm>
    <DescriptionDetails>Product Design</DescriptionDetails>
    <DescriptionTerm>Location</DescriptionTerm>
    <DescriptionDetails>San Francisco, CA</DescriptionDetails>
    <DescriptionTerm>Start Date</DescriptionTerm>
    <DescriptionDetails>March 15, 2023</DescriptionDetails>
  </DescriptionList>
);

export const ProjectDetailsExample = () => (
  <DescriptionList>
    <DescriptionTerm>Project Name</DescriptionTerm>
    <DescriptionDetails>Patternmode Component Library</DescriptionDetails>
    <DescriptionTerm>Status</DescriptionTerm>
    <DescriptionDetails>
      <span className="inline-flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Active Development
      </span>
    </DescriptionDetails>
    <DescriptionTerm>Technologies</DescriptionTerm>
    <DescriptionDetails>
      React, TypeScript, Tailwind CSS, Base UI
    </DescriptionDetails>
    <DescriptionTerm>Team Size</DescriptionTerm>
    <DescriptionDetails>5 developers</DescriptionDetails>
  </DescriptionList>
);

export const SystemInfoExample = () => (
  <DescriptionList>
    <DescriptionTerm>Operating System</DescriptionTerm>
    <DescriptionDetails>macOS Sonoma 14.5</DescriptionDetails>
    <DescriptionTerm>Node.js Version</DescriptionTerm>
    <DescriptionDetails>v20.11.0</DescriptionDetails>
    <DescriptionTerm>Package Manager</DescriptionTerm>
    <DescriptionDetails>pnpm 8.15.4</DescriptionDetails>
    <DescriptionTerm>Memory Usage</DescriptionTerm>
    <DescriptionDetails>
      <span className="font-mono text-sm">2.4 GB / 16 GB</span>
    </DescriptionDetails>
  </DescriptionList>
);
