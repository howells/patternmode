"use client";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  DescriptionListExample = ({
    showUserProfile = false,
    showProjectDetails = false,
    showSystemInfo = false,
    showCompanyInfo = false,
    showProductSpecs = false,
    ...props
  }: {
    showUserProfile?: boolean;
    showProjectDetails?: boolean;
    showSystemInfo?: boolean;
    showCompanyInfo?: boolean;
    showProductSpecs?: boolean;
    [key: string]: unknown;
  }) => {
  // Default example
    if (
      !showUserProfile
      && !showProjectDetails
      && !showSystemInfo
      && !showCompanyInfo
      && !showProductSpecs
    ) {
      return (
        <DescriptionList {...props}>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>John Doe</DescriptionDetails>
          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>john@example.com</DescriptionDetails>
          <DescriptionTerm>Role</DescriptionTerm>
          <DescriptionDetails>Software Engineer</DescriptionDetails>
          <DescriptionTerm>Department</DescriptionTerm>
          <DescriptionDetails>Engineering</DescriptionDetails>
        </DescriptionList>
      );
    }

    // User Profile example
    if (showUserProfile) {
      return (
        <DescriptionList {...props}>
          <DescriptionTerm>Full Name</DescriptionTerm>
          <DescriptionDetails>Sarah Johnson</DescriptionDetails>
          <DescriptionTerm>Username</DescriptionTerm>
          <DescriptionDetails>@sarahj</DescriptionDetails>
          <DescriptionTerm>Email Address</DescriptionTerm>
          <DescriptionDetails>sarah.johnson@company.com</DescriptionDetails>
          <DescriptionTerm>Phone Number</DescriptionTerm>
          <DescriptionDetails>+1 (555) 123-4567</DescriptionDetails>
          <DescriptionTerm>Department</DescriptionTerm>
          <DescriptionDetails>Product Design</DescriptionDetails>
          <DescriptionTerm>Location</DescriptionTerm>
          <DescriptionDetails>San Francisco, CA</DescriptionDetails>
          <DescriptionTerm>Start Date</DescriptionTerm>
          <DescriptionDetails>March 15, 2023</DescriptionDetails>
          <DescriptionTerm>Employee ID</DescriptionTerm>
          <DescriptionDetails>EMP-2023-0142</DescriptionDetails>
        </DescriptionList>
      );
    }

    // Project Details example
    if (showProjectDetails) {
      return (
        <DescriptionList {...props}>
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
          <DescriptionTerm>Start Date</DescriptionTerm>
          <DescriptionDetails>January 8, 2024</DescriptionDetails>
          <DescriptionTerm>Expected Completion</DescriptionTerm>
          <DescriptionDetails>Q2 2024</DescriptionDetails>
          <DescriptionTerm>Budget</DescriptionTerm>
          <DescriptionDetails>$150,000</DescriptionDetails>
        </DescriptionList>
      );
    }

    // System Info example
    if (showSystemInfo) {
      return (
        <DescriptionList {...props}>
          <DescriptionTerm>Operating System</DescriptionTerm>
          <DescriptionDetails>macOS Sonoma 14.5</DescriptionDetails>
          <DescriptionTerm>Node.js Version</DescriptionTerm>
          <DescriptionDetails>v20.11.0</DescriptionDetails>
          <DescriptionTerm>Package Manager</DescriptionTerm>
          <DescriptionDetails>pnpm 8.15.4</DescriptionDetails>
          <DescriptionTerm>Browser</DescriptionTerm>
          <DescriptionDetails>Chrome 120.0.6099.109</DescriptionDetails>
          <DescriptionTerm>Memory Usage</DescriptionTerm>
          <DescriptionDetails>
            <span className="font-mono text-sm">2.4 GB / 16 GB</span>
          </DescriptionDetails>
          <DescriptionTerm>CPU Usage</DescriptionTerm>
          <DescriptionDetails>
            <span className="font-mono text-sm">12%</span>
          </DescriptionDetails>
        </DescriptionList>
      );
    }

    // Company Info example
    if (showCompanyInfo) {
      return (
        <DescriptionList {...props}>
          <DescriptionTerm>Company Name</DescriptionTerm>
          <DescriptionDetails>Acme Corporation</DescriptionDetails>
          <DescriptionTerm>Industry</DescriptionTerm>
          <DescriptionDetails>Technology & Software</DescriptionDetails>
          <DescriptionTerm>Founded</DescriptionTerm>
          <DescriptionDetails>2010</DescriptionDetails>
          <DescriptionTerm>Headquarters</DescriptionTerm>
          <DescriptionDetails>San Francisco, California</DescriptionDetails>
          <DescriptionTerm>Employees</DescriptionTerm>
          <DescriptionDetails>250-500</DescriptionDetails>
          <DescriptionTerm>Website</DescriptionTerm>
          <DescriptionDetails>
            <a href="https://acme.com" className="text-blue-600 hover:underline">
              www.acme.com
            </a>
          </DescriptionDetails>
          <DescriptionTerm>Stock Symbol</DescriptionTerm>
          <DescriptionDetails>ACME</DescriptionDetails>
        </DescriptionList>
      );
    }

    // Product Specs example
    if (showProductSpecs) {
      return (
        <DescriptionList {...props}>
          <DescriptionTerm>Model</DescriptionTerm>
          <DescriptionDetails>MacBook Pro 16-inch</DescriptionDetails>
          <DescriptionTerm>Processor</DescriptionTerm>
          <DescriptionDetails>Apple M3 Pro chip</DescriptionDetails>
          <DescriptionTerm>Memory</DescriptionTerm>
          <DescriptionDetails>18GB unified memory</DescriptionDetails>
          <DescriptionTerm>Storage</DescriptionTerm>
          <DescriptionDetails>512GB SSD</DescriptionDetails>
          <DescriptionTerm>Display</DescriptionTerm>
          <DescriptionDetails>
            16.2-inch Liquid Retina XDR display
          </DescriptionDetails>
          <DescriptionTerm>Graphics</DescriptionTerm>
          <DescriptionDetails>14-core GPU</DescriptionDetails>
          <DescriptionTerm>Battery Life</DescriptionTerm>
          <DescriptionDetails>Up to 22 hours</DescriptionDetails>
          <DescriptionTerm>Weight</DescriptionTerm>
          <DescriptionDetails>4.7 pounds (2.1 kg)</DescriptionDetails>
          <DescriptionTerm>Price</DescriptionTerm>
          <DescriptionDetails className="font-semibold text-green-600">
            $2,499
          </DescriptionDetails>
        </DescriptionList>
      );
    }

    return null;
  };

// Default export for the preview system
export function Example() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">User Profile</h3>
        <DescriptionList>
          <DescriptionTerm>Name</DescriptionTerm>
          <DescriptionDetails>John Doe</DescriptionDetails>
          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>john@example.com</DescriptionDetails>
          <DescriptionTerm>Role</DescriptionTerm>
          <DescriptionDetails>Administrator</DescriptionDetails>
          <DescriptionTerm>Department</DescriptionTerm>
          <DescriptionDetails>Engineering</DescriptionDetails>
          <DescriptionTerm>Location</DescriptionTerm>
          <DescriptionDetails>San Francisco, CA</DescriptionDetails>
        </DescriptionList>
      </div>
    </div>
  );
}
