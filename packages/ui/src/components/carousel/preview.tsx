"use client";

import type { CarouselProps } from "./carousel";
import { Carousel } from "@patternmode/ui";

import React from "react";

type CarouselExampleProps = CarouselProps;

export function CarouselExample(props: CarouselProps) {
  return <Carousel {...props} />;
}
