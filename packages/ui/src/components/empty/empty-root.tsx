import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

const SIZE_CLASSES = {
  sm: {
    media: "size-12 rounded-[var(--radius-md)]",
    title: "text-[1.1rem]",
  },
  base: {
    media: "size-14 rounded-[var(--radius-lg)]",
    title: "text-title-sm",
  },
  lg: {
    media: "size-16 rounded-[var(--radius-lg)]",
    title: "text-title",
  },
} as const;

type EmptySize = keyof typeof SIZE_CLASSES;

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  layout?: "card" | "centered";
  size?: EmptySize;
}

const Empty = forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, layout = "centered", size = "base", ...props }, ref) => {
    return (
      <div
        className={cn(
          "grid justify-items-center gap-5 text-center",
          layout === "card"
            ? "rounded-[var(--radius-xl)] border border-border-strong/70 border-dashed bg-panel/94 px-6 py-10 shadow-2xs"
            : "min-h-[22rem] w-full place-content-center px-6 py-10",
          className
        )}
        data-layout={layout}
        data-size={size}
        data-slot="empty"
        ref={ref}
        {...props}
      />
    );
  }
);

Empty.displayName = "Empty";

const EmptyHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn("grid justify-items-center gap-3", className)}
        data-slot="empty-header"
        ref={ref}
        {...props}
      />
    );
  }
);

EmptyHeader.displayName = "EmptyHeader";

const EmptyMedia = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-accent-soft text-accent shadow-2xs",
          SIZE_CLASSES.base.media,
          className
        )}
        data-slot="empty-media"
        ref={ref}
        {...props}
      />
    );
  }
);

EmptyMedia.displayName = "EmptyMedia";

const EmptyTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn(
        "max-w-[28rem] font-display text-foreground",
        SIZE_CLASSES.base.title,
        className
      )}
      data-slot="empty-title"
      ref={ref}
      {...props}
    />
  );
});

EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn("max-w-[34rem] text-body text-muted-foreground", className)}
      data-slot="empty-description"
      ref={ref}
      {...props}
    />
  );
});

EmptyDescription.displayName = "EmptyDescription";

const EmptyActions = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-3",
          className
        )}
        data-slot="empty-actions"
        ref={ref}
        {...props}
      />
    );
  }
);

EmptyActions.displayName = "EmptyActions";

export {
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};
