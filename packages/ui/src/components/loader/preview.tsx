"use client";

import type { LoaderProps } from "./component";

import React from "react";
import { Loader } from "./component";

export function LoaderExample(props: LoaderProps) {
  return <Loader {...props} />;
}
