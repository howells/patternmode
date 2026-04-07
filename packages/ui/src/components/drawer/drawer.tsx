"use client";

import { createContext, useContext } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "../../utils/cn";

interface DrawerContextValue {
  container?: HTMLElement | null;
}

const DrawerContext = createContext<DrawerContextValue>({});

/**
 * Drawer component built on Vaul.
 * Optimized for mobile with bottom slide-up behavior.
 */
const Drawer = ({
  shouldScaleBackground = false,
  container,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root> & {
  container?: HTMLElement | null;
}) => (
  <DrawerContext.Provider value={{ container }}>
    <DrawerPrimitive.Root
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  </DrawerContext.Provider>
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = ({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) => {
  const { container } = useContext(DrawerContext);
  return <DrawerPrimitive.Portal container={container} {...props} />;
};

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay
    className={cn("absolute inset-0 z-50 bg-black/80", className)}
    {...props}
  />
);
DrawerOverlay.displayName = "DrawerOverlay";

const DrawerContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      className={cn(
        "group/drawer absolute inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-4xl border bg-background",
        className,
      )}
      {...props}
    >
      {/* Handle only shows for bottom direction */}
      <div className="mx-auto mt-4 hidden h-1.5 w-12 shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer:block" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title
    className={cn(
      "font-semibold text-lg leading-none tracking-tight",
      className,
    )}
    {...props}
  />
);
DrawerTitle.displayName = "DrawerTitle";

const DrawerDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
);
DrawerDescription.displayName = "DrawerDescription";

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
