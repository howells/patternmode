"use client";

import type { SliderProps } from "./component";
import React from "react";
import { Slider } from "./component";

export function SliderExample(props: SliderProps) {
  return <Slider defaultValue={[50]} max={100} step={1} {...props} />;
}
