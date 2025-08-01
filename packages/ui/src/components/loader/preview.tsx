"use client";

import type { LoaderProps } from "./loader";
import { Loader } from "@patternmode/ui";

import React from "react";

type LoaderExampleProps = LoaderProps;

export function LoaderExample(props: LoaderProps) {
  return <Loader {...props} />;
}
