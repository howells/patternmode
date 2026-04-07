import { cn } from "@patternmode/ui/utils/cn";

/**
 * Container for grouping multiple fields together with consistent spacing.
 *
 * @param props - The field group props
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Field components to group.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <FieldGroup>
 *   <Field>...</Field>
 *   <Field>...</Field>
 * </FieldGroup>
 * ```
 */
export function FieldGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className,
      )}
      data-component="field-group"
      data-slot="field-group"
      {...props}
    />
  );
}
