"use client";

import React from "react";

import { Card } from "../card/component";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./component";

export function CarouselExample() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        <CarouselItem>
          <Card>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">1</span>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">2</span>
            </div>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">3</span>
            </div>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
