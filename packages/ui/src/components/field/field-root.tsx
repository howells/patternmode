"use client";

import { cn } from "@patternmode/ui/utils/cn";
import type { VariantProps } from "class-variance-authority";
import { FieldProvider } from "./field-context";
import { fieldVariants } from "./field-variants";

/**
 * Flexible field container that arranges label and content in various orientations.
 * Provides auto-generated IDs to child FieldError and FieldDescription components
 * for `aria-describedby` linking.
 *
 * @param props - The field props
 * @param props.orientation - Layout orientation. Options: "vertical" (default), "horizontal", "responsive" (vertical on mobile, horizontal on desktop).
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - FieldLabel, FieldContent, and other field components.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <Field orientation="vertical">
 *   <FieldLabel>Name</FieldLabel>
 *   <FieldContent><Input /></FieldContent>
 * </Field>
 * ```
 */
export function Field({
  className,
  orientation = "vertical",
  id,
  children,
  ...props
}: React.ComponentProps<"fieldset"> & VariantProps<typeof fieldVariants>) {
  return (
    <FieldProvider id={id}>
      <fieldset
        className={cn(fieldVariants({ orientation }), className)}
        data-component="field"
        data-orientation={orientation}
        data-slot="field"
        id={id}
        style={{ margin: 0, minWidth: 0, padding: 0 }}
        {...props}
      >
        {children}
      </fieldset>
    </FieldProvider>
  );
}
