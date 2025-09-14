import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { Text } from "@patternmode/text";
import { cx } from "@patternmode/utils/cx";
import type { AccordionContentProps } from "../types";
import {
  accordionContentInnerVariants,
  accordionContentVariants,
} from "../variants";

/**
 * Accordion panel content that appears when the trigger is activated.
 */
export const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps) => (
  <BaseAccordion.Panel
    className={cx(accordionContentVariants(), className)}
    {...props}
  >
    <div className={accordionContentInnerVariants()}>
      {typeof children === "string" ? (
        <Text className="text-zinc-700 dark:text-zinc-300" size="sm">
          {children}
        </Text>
      ) : (
        children
      )}
    </div>
  </BaseAccordion.Panel>
);

AccordionContent.displayName = "AccordionContent";
