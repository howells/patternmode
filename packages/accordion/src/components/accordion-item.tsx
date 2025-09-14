import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { cx } from "@patternmode/utils/cx";
import type { AccordionItemProps } from "../types";
import { accordionItemVariants } from "../variants";

/**
 * Accordion item container that wraps a trigger and content pair.
 */
export const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <BaseAccordion.Item
    className={cx(accordionItemVariants(), className)}
    {...props}
  />
);

AccordionItem.displayName = "AccordionItem";
