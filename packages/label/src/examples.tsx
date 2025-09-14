"use client";

import { useId } from "react";
import { Label } from "./components/label";

export const BasicExample = () => {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id}>Email Address</Label>
      <input className="mt-2 w-full rounded border p-2" id={id} />
    </div>
  );
};

export const RequiredExample = () => {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id}>
        Full Name <span className="text-red-500">*</span>
      </Label>
      <input className="mt-2 w-full rounded border p-2" id={id} />
    </div>
  );
};

export const DisabledExample = () => {
  const id = useId();
  return (
    <div>
      <Label disabled htmlFor={id}>
        Disabled Field
      </Label>
      <input className="mt-2 w-full rounded border p-2" disabled id={id} />
    </div>
  );
};

export const CustomStyledExample = () => {
  const id = useId();
  return (
    <div>
      <Label className="text-blue-600 text-lg" htmlFor={id}>
        Important Field
      </Label>
      <input className="mt-2 w-full rounded border p-2" id={id} />
    </div>
  );
};
