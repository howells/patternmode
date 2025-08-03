"use client";

import React from "react";
import { Label } from "./component";

export const BasicExample = () => {
  return <Label htmlFor="email">Email Address</Label>;
};

export const RequiredExample = () => {
  return (
    <Label htmlFor="name">
      Full Name
      {" "}
      <span className="text-red-500">*</span>
    </Label>
  );
};

export const DisabledExample = () => {
  return (
    <Label htmlFor="disabled-field" disabled>
      Disabled Field
    </Label>
  );
};

export const CustomStyledExample = () => {
  return (
    <Label className="text-lg font-semibold text-blue-600">
      Important Field
    </Label>
  );
};
