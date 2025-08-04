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
    <DescriptionList {...props}>
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
  // No specific configurable props beyond standard HTML attributes
];
