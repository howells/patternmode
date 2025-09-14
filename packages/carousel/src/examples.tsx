"use client";

import { Card } from "@patternmode/card";

const ONE = 1 as const;
const TWO = 2 as const;
const THREE = 3 as const;
const FOUR = 4 as const;
const FIVE = 5 as const;
const SIX = 6 as const;
const SEVEN = 7 as const;
const EIGHT = 8 as const;
const FIVE_SLIDES = [ONE, TWO, THREE, FOUR, FIVE] as const;
const EIGHT_SLIDES = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT] as const;

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from ".";

// Default carousel
export const DefaultExample = () => (
  <Carousel className="w-full max-w-xs">
    <CarouselContent>
      <CarouselItem>
        <Card>
          <div className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl">1</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card>
          <div className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl">2</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card>
          <div className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl">3</span>
          </div>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

// Vertical carousel
export const VerticalExample = () => (
  <Carousel className="w-full max-w-xs" orientation="vertical">
    <CarouselContent className="-mt-1 h-[200px]">
      <CarouselItem className="pt-1 md:basis-1/2">
        <Card>
          <div className="flex items-center justify-center p-6">
            <span className="text-3xl">1</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem className="pt-1 md:basis-1/2">
        <Card>
          <div className="flex items-center justify-center p-6">
            <span className="text-3xl">2</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem className="pt-1 md:basis-1/2">
        <Card>
          <div className="flex items-center justify-center p-6">
            <span className="text-3xl">3</span>
          </div>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

// Multiple items carousel
export const MultipleItemsExample = () => (
  <Carousel className="w-full max-w-sm">
    <CarouselContent className="-ml-1">
      {FIVE_SLIDES.map((n) => (
        <CarouselItem
          className="pl-1 md:basis-1/2 lg:basis-1/3"
          key={`carousel-item-${n}`}
        >
          <Card>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-2xl">{n}</span>
            </div>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

// No navigation carousel
export const NoNavigationExample = () => (
  <Carousel className="w-full max-w-xs">
    <CarouselContent>
      <CarouselItem>
        <Card>
          <div className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl">1</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card>
          <div className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl">2</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card>
          <div className="flex aspect-square items-center justify-center p-6">
            <span className="text-4xl">3</span>
          </div>
        </Card>
      </CarouselItem>
    </CarouselContent>
  </Carousel>
);

// Image carousel
export const ImageCarouselExample = () => (
  <Carousel className="w-full max-w-md">
    <CarouselContent>
      <CarouselItem>
        <Card className="overflow-hidden">
          {/* biome-ignore lint/performance/noImgElement: preview example uses plain img */}
          <img
            alt="Mountains"
            className="h-full w-full object-cover"
            height={300}
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
            width={400}
          />
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card className="overflow-hidden">
          {/* biome-ignore lint/performance/noImgElement: preview example uses plain img */}
          <img
            alt="Nature"
            className="h-full w-full object-cover"
            height={300}
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
            width={400}
          />
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card className="overflow-hidden">
          {/* biome-ignore lint/performance/noImgElement: preview example uses plain img */}
          <img
            alt="Forest"
            className="h-full w-full object-cover"
            height={300}
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400&h=300&fit=crop"
            width={400}
          />
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

// Testimonial carousel
export const TestimonialCarouselExample = () => (
  <Carousel className="w-full max-w-lg">
    <CarouselContent>
      <CarouselItem>
        <Card className="p-6">
          <blockquote className="space-y-2">
            <p className="text-lg italic">
              "This component library has transformed how we build our
              applications. The quality and attention to detail is outstanding."
            </p>
            <footer className="text-sm text-zinc-600 dark:text-zinc-400">
              — Sarah Chen, Lead Developer
            </footer>
          </blockquote>
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card className="p-6">
          <blockquote className="space-y-2">
            <p className="text-lg italic">
              "The best React component library I've worked with. Clean,
              accessible, and beautifully designed."
            </p>
            <footer className="text-sm text-zinc-600 dark:text-zinc-400">
              — Michael Rodriguez, UI Engineer
            </footer>
          </blockquote>
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card className="p-6">
          <blockquote className="space-y-2">
            <p className="text-lg italic">
              "Incredible developer experience. The components are intuitive and
              the documentation is comprehensive."
            </p>
            <footer className="text-sm text-zinc-600 dark:text-zinc-400">
              — Emily Johnson, Frontend Architect
            </footer>
          </blockquote>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

// Auto-play carousel (simulated with state)
export const AutoPlayExample = () => {
  const [api, setApi] = React.useState<import(".").CarouselApi | null>(null);
  const AUTO_PLAY_INTERVAL_MS = 3000;

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, AUTO_PLAY_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel className="w-full max-w-xs" setApi={setApi}>
      <CarouselContent>
        {FIVE_SLIDES.map((n) => (
          <CarouselItem key={`auto-play-${n}`}>
            <Card>
              <div className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl">{n}</span>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

// Responsive carousel
export const ResponsiveExample = () => (
  <Carousel className="w-full">
    <CarouselContent>
      {EIGHT_SLIDES.map((n) => (
        <CarouselItem
          className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          key={`responsive-${n}`}
        >
          <Card>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-2xl">{n}</span>
            </div>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);
