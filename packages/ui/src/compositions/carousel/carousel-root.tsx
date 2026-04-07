"use client";

import { cn } from "@patternmode/ui/utils/cn";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselContextValue {
  api: CarouselApi;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollSnaps: number[];
  selectedIndex: number;
  slideCount?: number;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

/**
 * useCarousel React hook.
 * Import from "@patternmode/ui/compositions/carousel".
 */
function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel");
  }
  return context;
}

interface CarouselProps {
  children?: React.ReactNode;
  className?: string;
  /** Enable free-scroll mode without snap points (useful for mobile galleries) */
  freeScroll?: boolean;
  opts?: CarouselOptions;
  orientation?: "horizontal" | "vertical";
  plugins?: CarouselPlugin;
  /** Explicit slide count for dots - use when Embla miscounts due to custom slide sizing */
  slideCount?: number;
  slidesToShow?: number;
}

/**
 * Carousel UI component.
 * Import from "@patternmode/ui/compositions/carousel".
 */
function Carousel({
  opts,
  plugins,
  orientation = "horizontal",
  slidesToShow = 1,
  slideCount,
  freeScroll = false,
  className,
  children,
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
      dragFree: freeScroll,
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setScrollSnaps(api.scrollSnapList());
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  // CSS variable for slides to show (used for flex-basis calculation)
  const style = {
    "--carousel-slides-to-show": slidesToShow,
  } as React.CSSProperties;

  const contextValue = useMemo(
    () => ({
      carouselRef,
      api,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      selectedIndex,
      scrollSnaps,
      slideCount,
    }),
    [
      carouselRef,
      api,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
      selectedIndex,
      scrollSnaps,
      slideCount,
    ],
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <section
        aria-roledescription="carousel"
        className={cn("relative flex flex-col", className)}
        data-orientation={orientation}
        data-slot="carousel"
        role="region"
        style={style}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

type CarouselContentProps = React.ComponentProps<"div">;

/**
 * CarouselContent UI component.
 * Import from "@patternmode/ui/compositions/carousel".
 */
function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { carouselRef } = useCarousel();

  return (
    <div className="flex flex-1 flex-col overflow-hidden" ref={carouselRef}>
      <div
        className={cn("flex flex-1", className)}
        data-slot="carousel-content"
        {...props}
      />
    </div>
  );
}

type CarouselItemProps = React.ComponentProps<"div">;

/**
 * CarouselItem UI component.
 * Import from "@patternmode/ui/compositions/carousel".
 */
function CarouselItem({ className, ...props }: CarouselItemProps) {
  return (
    <div
      className={cn(
        "min-w-0 shrink-0 grow-0 self-stretch",
        // Use CSS calc with the variable for flex-basis
        "basis-[calc(100%/var(--carousel-slides-to-show))]",
        className,
      )}
      data-slot="carousel-item"
      {...props}
    />
  );
}

type CarouselPreviousProps = React.ComponentProps<"button">;

/**
 * CarouselPrevious UI component.
 * Import from "@patternmode/ui/compositions/carousel".
 */
function CarouselPrevious({ className, ...props }: CarouselPreviousProps) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      className={cn(
        "glass-surface absolute top-1/2 left-3 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition-opacity",
        "hover:bg-background disabled:pointer-events-none disabled:opacity-0",
        className,
      )}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      type="button"
      {...props}
    >
      <ChevronLeftIcon className="size-4" />
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

type CarouselNextProps = React.ComponentProps<"button">;

/**
 * CarouselNext UI component.
 * Import from "@patternmode/ui/compositions/carousel".
 */
function CarouselNext({ className, ...props }: CarouselNextProps) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      className={cn(
        "glass-surface absolute top-1/2 right-3 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full shadow-sm transition-opacity",
        "hover:bg-background disabled:pointer-events-none disabled:opacity-0",
        className,
      )}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      type="button"
      {...props}
    >
      <ChevronRightIcon className="size-4" />
      <span className="sr-only">Next slide</span>
    </button>
  );
}

type CarouselDotsProps = React.ComponentProps<"div">;

/**
 * CarouselDots UI component.
 * Import from "@patternmode/ui/compositions/carousel".
 */
function CarouselDots({ className, ...props }: CarouselDotsProps) {
  const { api, selectedIndex, scrollSnaps, slideCount } = useCarousel();

  // Use explicit slideCount if provided, otherwise fall back to scrollSnaps
  const dotCount = slideCount ?? scrollSnaps.length;

  if (dotCount <= 1) {
    return null;
  }

  return (
    <div
      className={cn("flex justify-center gap-1.5 py-2", className)}
      data-slot="carousel-dots"
      {...props}
    >
      {Array.from({ length: dotCount }, (_, i) => i).map((dotIndex) => (
        <button
          aria-label={`Go to slide ${String(dotIndex + 1)}`}
          className={cn(
            "size-2 rounded-full transition-colors",
            dotIndex === selectedIndex
              ? "bg-foreground"
              : "bg-foreground/20 hover:bg-foreground/40",
          )}
          key={dotIndex}
          onClick={() => api?.scrollTo(dotIndex)}
          type="button"
        />
      ))}
    </div>
  );
}

export type {
  CarouselApi,
  CarouselContentProps,
  CarouselDotsProps,
  CarouselItemProps,
  CarouselNextProps,
  CarouselPreviousProps,
  CarouselProps,
};
export {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
};
