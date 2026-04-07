"use client";

import { durations } from "@patternmode/motion/durations";
import { easings } from "@patternmode/motion/easings";
import { cn } from "@patternmode/ui/utils/cn";
import { motion } from "motion/react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import type { ComponentProps } from "react";
import { useAccordionContext, useAccordionItem } from "./accordion-context";
import { accordionContentVariants } from "./accordion-variants";

/** Collapsible content panel for accordion items with animated expand/collapse */
function AccordionContent(
  props: ComponentProps<typeof AccordionPrimitive.Content>,
) {
  const { className, children, ...rest } = props;
  const { variant } = useAccordionContext();
  const { isOpen, value } = useAccordionItem();

  return (
    <AccordionPrimitive.Content
      asChild
      className={cn(accordionContentVariants({ variant }), className)}
      data-slot="accordion-content"
      data-testid={`accordion-content-${value}`}
      forceMount
      {...rest}
    >
      <motion.div
        animate={isOpen ? "open" : "closed"}
        initial={false}
        transition={{
          height: { duration: durations.normal, ease: easings.customOut },
          opacity: { duration: durations.normal, ease: easings.customOut },
        }}
        variants={{
          open: {
            height: "auto",
            opacity: 1,
          },
          closed: {
            height: 0,
            opacity: 0,
          },
        }}
      >
        <div className="pt-0 pb-5">{children}</div>
      </motion.div>
    </AccordionPrimitive.Content>
  );
}

export { AccordionContent };
