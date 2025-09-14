import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { DEFAULT_ICON_STROKE_WIDTH } from "@patternmode/constants/defaults";
import { Subheading } from "@patternmode/subheading";
import { cx } from "@patternmode/utils/cx";
import { Plus } from "lucide-react";
import type { AccordionTriggerProps } from "../types";
import { accordionIconVariants, accordionTriggerVariants } from "../variants";

/**
 * Accordion trigger button that toggles the panel open/closed state.
 */
export const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => (
  <BaseAccordion.Header className="flex">
    <BaseAccordion.Trigger
      className={cx(accordionTriggerVariants(), className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Subheading level={3}>{children}</Subheading>
      ) : (
        children
      )}
      <Plus
        aria-hidden="true"
        className={accordionIconVariants()}
        strokeWidth={DEFAULT_ICON_STROKE_WIDTH}
      />
    </BaseAccordion.Trigger>
  </BaseAccordion.Header>
);

AccordionTrigger.displayName = "AccordionTrigger";
