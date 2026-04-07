import { forwardRef, type HTMLAttributes } from "react";

import { cn } from "../../utils/cn";

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  dividers?: boolean;
}

const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  ({ className, dividers = false, ...props }, ref) => {
    return (
      <dl
        className={cn(
          "grid gap-3",
          dividers &&
            "[&>*:not(:last-child)]:border-border/80 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:pb-3",
          className
        )}
        data-slot="description-list"
        ref={ref}
        {...props}
      />
    );
  }
);

DescriptionList.displayName = "DescriptionList";

const DescriptionItem = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "grid gap-1.5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-4",
        className
      )}
      data-slot="description-item"
      ref={ref}
      {...props}
    />
  );
});

DescriptionItem.displayName = "DescriptionItem";

const DescriptionTerm = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <dt
        className={cn("text-body text-muted-foreground", className)}
        data-slot="description-term"
        ref={ref}
        {...props}
      />
    );
  }
);

DescriptionTerm.displayName = "DescriptionTerm";

export interface DescriptionDetailsProps extends HTMLAttributes<HTMLElement> {
  align?: "left" | "right";
}

const DescriptionDetails = forwardRef<HTMLElement, DescriptionDetailsProps>(
  ({ align = "left", className, ...props }, ref) => {
    return (
      <dd
        className={cn(
          "text-body text-foreground",
          align === "right" ? "md:text-right" : undefined,
          className
        )}
        data-slot="description-details"
        ref={ref}
        {...props}
      />
    );
  }
);

DescriptionDetails.displayName = "DescriptionDetails";

export {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
};
