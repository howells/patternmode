import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { cx } from "@patternmode/utils/cx";
import type { AccordionProps } from "../types";
import { accordionVariants } from "../variants";

/**
 * Collapsible content sections with expand/collapse functionality for organizing information.
 */
export const Accordion = ({
  className,
  orientation = "vertical",
  ...props
}: AccordionProps) => (
  <BaseAccordion.Root
    className={cx(accordionVariants(), className)}
    data-testid="accordion"
    orientation={orientation}
    {...props}
  />
);

Accordion.displayName = "Accordion";
