import { CollapsibleTrigger as CollapsiblePrimitiveTrigger } from "@radix-ui/react-collapsible";
/** collapsible trigger button */

export function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitiveTrigger>) {
  return (
    <CollapsiblePrimitiveTrigger
      data-component="collapsible-trigger"
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}
