"use client";

import { Label } from "./component";

export const BasicExample = () => (
  <div>
    <Label htmlFor="email">Email Address</Label>
    <input id="email" className="mt-2 w-full rounded border p-2" />
  </div>
);

export const RequiredExample = () => (
  <div>
    <Label htmlFor="name">
      Full Name <span className="text-red-500">*</span>
    </Label>
    <input id="name" className="mt-2 w-full rounded border p-2" />
  </div>
);

export const DisabledExample = () => (
  <div>
    <Label htmlFor="disabled" disabled>
      Disabled Field
    </Label>
    <input id="disabled" disabled className="mt-2 w-full rounded border p-2" />
  </div>
);

export const CustomStyledExample = () => (
  <div>
    <Label className="text-lg font-semibold text-blue-600">Important Field</Label>
    <input className="mt-2 w-full rounded border p-2" />
  </div>
);

