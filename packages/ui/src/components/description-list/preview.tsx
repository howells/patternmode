"use client";

import React from "react";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "./component";

type DescriptionListProps = React.ComponentPropsWithoutRef<"dl"> & {
  className?: string;
};

export function DescriptionListPreview(props: DescriptionListProps) {
  return (
    <DescriptionList {...props} className="w-full max-w-lg">
      <DescriptionTerm>Name</DescriptionTerm>
      <DescriptionDetails>John Doe</DescriptionDetails>
      <DescriptionTerm>Email</DescriptionTerm>
      <DescriptionDetails>john@example.com</DescriptionDetails>
      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetails>Software Engineer</DescriptionDetails>
    </DescriptionList>
  );
}

// Preview props for prop explorer
export const descriptionListPreviewProps = [
  // Note: DescriptionList component uses standard HTML dl attributes
  // Expose library-specific helpers below
  {
    name: "truncateTerms",
    type: "boolean",
    description: "Truncate long term labels when space is limited.",
    defaultValue: false,
  },
];
