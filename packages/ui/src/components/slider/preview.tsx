"use client";

import type { SliderProps } from "./slider";
import { Slider } from "@patternmode/ui";

import React from "react";

type SliderExampleProps = SliderProps;

export function SliderExample(props: SliderProps) {
  return <Slider {...props} />;
}
