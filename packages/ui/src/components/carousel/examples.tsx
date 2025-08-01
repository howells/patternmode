"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { Card, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@patternmode/ui";

import React from "react";

// Default carousel
export const DefaultExample = () => (
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

// Vertical carousel
export const VerticalExample = () => (
  <Carousel orientation="vertical" className="w-full max-w-xs">
    <CarouselContent className="-mt-1 h-[200px]">
      <CarouselItem className="pt-1 md:basis-1/2">
        <Card>
          <div className="flex items-center justify-center p-6">
            <span className="text-3xl font-semibold">1</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem className="pt-1 md:basis-1/2">
        <Card>
          <div className="flex items-center justify-center p-6">
            <span className="text-3xl font-semibold">2</span>
          </div>
        </Card>
      </CarouselItem>
      <CarouselItem className="pt-1 md:basis-1/2">
        <Card>
          <div className="flex items-center justify-center p-6">
            <span className="text-3xl font-semibold">3</span>
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
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
          <Card>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-2xl font-semibold">{index + 1}</span>
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
  </Carousel>
);

// Image carousel
export const ImageCarouselExample = () => (
  <Carousel className="w-full max-w-md">
    <CarouselContent>
      <CarouselItem>
        <Card className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
            alt="Mountains"
            className="w-full h-full object-cover"
          />
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
            alt="Nature"
            className="w-full h-full object-cover"
          />
        </Card>
      </CarouselItem>
      <CarouselItem>
        <Card className="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400&h=300&fit=crop"
            alt="Forest"
            className="w-full h-full object-cover"
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
              "This component library has transformed how we build our applications.
              The quality and attention to detail is outstanding."
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
              "The best React component library I've worked with.
              Clean, accessible, and beautifully designed."
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
              "Incredible developer experience. The components are intuitive
              and the documentation is comprehensive."
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
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel setApi={setApi} className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <div className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
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
      {Array.from({ length: 8 }).map((_, index) => (
        <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
          <Card>
            <div className="flex aspect-square items-center justify-center p-6">
              <span className="text-2xl font-semibold">{index + 1}</span>
            </div>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
); export const CarouselExample = DefaultExample;

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "DefaultExample",
    title: "Default",
    description: "Basic usage example",
    component: DefaultExample,
  },
  {
    id: "VerticalExample",
    title: "Vertical",
    description: "Vertical example",
    component: VerticalExample,
  },
  {
    id: "MultipleItemsExample",
    title: "Multiple Items",
    description: "Multiple Items example",
    component: MultipleItemsExample,
  },
  {
    id: "NoNavigationExample",
    title: "No Navigation",
    description: "No Navigation example",
    component: NoNavigationExample,
  },
  {
    id: "ImageCarouselExample",
    title: "Image Carousel",
    description: "Image Carousel example",
    component: ImageCarouselExample,
  },
  {
    id: "TestimonialCarouselExample",
    title: "Testimonial Carousel",
    description: "Testimonial Carousel example",
    component: TestimonialCarouselExample,
  },
  {
    id: "AutoPlayExample",
    title: "Auto Play",
    description: "Auto Play example",
    component: AutoPlayExample,
  },
  {
    id: "ResponsiveExample",
    title: "Responsive",
    description: "Responsive example",
    component: ResponsiveExample,
  },
  {
    id: "CarouselExample",
    title: "Carousel",
    description: "Carousel example",
    component: CarouselExample,
  },
];
