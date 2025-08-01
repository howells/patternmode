"use client";

import type { FormProps } from "./form";
import { Form } from "@patternmode/ui";

import React from "react";

type FormExampleProps = FormProps;

export function FormExample(props: FormProps) {
  return <Form {...props} />;
}
