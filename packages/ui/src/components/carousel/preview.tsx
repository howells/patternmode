"use client";

import { Card, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@patternmode/ui";
import React from "react";

// Example component for preview system
export const /**
              *
              */
  CarouselExample = ({
    orientation = "horizontal",
    showNavigation = true,
    itemCount = 5,
    ...props
  }: {
    orientation?: "horizontal" | "vertical";
    showNavigation?: boolean;
    itemCount?: number;
    [key: string]: unknown;
  }) => {
    const items = Array.from({ length: itemCount }, (_, i) => i + 1);

    return (
      <Carousel
        orientation={orientation}
        className={
          orientation === "vertical" ? "w-full max-w-xs" : "w-full max-w-sm"
        }
        {...props}
      >
        <CarouselContent
          className={
            orientation === "vertical"
              ? "-mt-1 h-[200px]"
              : itemCount > 3
                ? "-ml-1"
                : undefined
          }
        >
          {items.map(item => (
            <CarouselItem
              key={item}
              className={
                orientation === "vertical"
                  ? "pt-1 md:basis-1/2"
                  : itemCount > 3
                    ? "pl-1 md:basis-1/2 lg:basis-1/3"
                    : undefined
              }
            >
              <Card>
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{item}</span>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showNavigation && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    );
  };
