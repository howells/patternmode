"use client";

import React from "react";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "./component";

export function DescriptionListExample() {
  return (
    <DescriptionList>
      <DescriptionTerm>Name</DescriptionTerm>
      <DescriptionDetails>John Doe</DescriptionDetails>
      <DescriptionTerm>Email</DescriptionTerm>
      <DescriptionDetails>john@example.com</DescriptionDetails>
      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetails>Software Engineer</DescriptionDetails>
    </DescriptionList>
  );
}
