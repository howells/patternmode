"use client";

import type { InputProps } from "./component";
import React from "react";
import { Input } from "./component";

export function InputExample(props: InputProps) {
  return <Input placeholder="Enter text..." {...props} />;
}
