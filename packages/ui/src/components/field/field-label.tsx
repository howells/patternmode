import { Label } from "@patternmode/ui/components/label";
import { cn } from "@patternmode/ui/utils/cn";

/**
 * Label for a field. Can wrap interactive elements like checkboxes/radios for larger click targets.
 *
 * @param props - The field label props
 * @param props.className - Additional CSS classes to apply.
 * @param props.children - Label text or interactive elements.
 * @param props... - All other Label component props.
 *
 * @example
 * ```tsx
 * <FieldLabel>Email Address</FieldLabel>
 * <FieldLabel><Checkbox /> Accept terms</FieldLabel>
 * ```
 */
export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10",
        className,
      )}
      data-component="field-label"
      data-slot="field-label"
      {...props}
    />
  );
}
