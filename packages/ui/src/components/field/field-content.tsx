import { cn } from "@patternmode/ui/utils/cn";

/**
 * Container for field input/control and associated description/error messages.
 *
 * @param props - The field content props
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Form control and FieldDescription/FieldError components.
 * @param props... - All other standard HTML div element props.
 *
 * @example
 * ```tsx
 * <FieldContent>
 *   <Input />
 *   <FieldDescription>Helper text</FieldDescription>
 *   <FieldError />
 * </FieldContent>
 * ```
 */
export function FieldContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className,
      )}
      data-component="field-content"
      data-slot="field-content"
      {...props}
    />
  );
}
