import type { AccordionPreviewProps } from "./preview";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { Plus } from "lucide-react";

import React from "react";
import { config } from "../../lib/config";
import { cx } from "../../lib/utils";
import { Subheading } from "../subheading";
import { Text } from "../text";

type AccordionProps = AccordionPreviewProps & React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>;

/**
 * Collapsible content sections with expand/collapse functionality for organizing information.
 */
const Accordion = ({
  className,
  orientation = "vertical",
  ...props
}: AccordionProps) => (
  <BaseAccordion.Root
    className={cx("flex w-full flex-col", className)}
    orientation={orientation}
    data-testid="accordion"
    {...props}
  />
);

Accordion.displayName = "Accordion";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>;

/**
 * Accordion trigger button that toggles the panel open/closed state.
 */
const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionTriggerProps) => (
  <BaseAccordion.Header className="flex">
    <BaseAccordion.Trigger
      className={cx(
        // base
        "group flex flex-1 cursor-pointer items-center justify-between py-3 text-left font-medium",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // disabled
        "data-[disabled]:cursor-default data-[disabled]:text-zinc-400 dark:data-[disabled]:text-zinc-600",
        // focus
        "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden focus-visible:ring-inset",
        className,
      )}
      {...props}
    >
      {typeof children === "string"
        ? (
            <Subheading level={3}>{children}</Subheading>
          )
        : (
            children
          )}
      <Plus
        className={cx(
          // base
          "size-5 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[panel-open]:rotate-45",
          // text color
          "text-zinc-600 dark:text-zinc-400",
        )}
        strokeWidth={config.getIconStrokeWidth()}
        aria-hidden="true"
      />
    </BaseAccordion.Trigger>
  </BaseAccordion.Header>
);

AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>;

/**
 * Accordion panel content that appears when the trigger is activated.
 */
const AccordionContent = ({
  className,
  children,
  ...props
}: AccordionContentProps) => (
  <BaseAccordion.Panel className={cx("overflow-hidden", className)} {...props}>
    <div className="pb-3 pt-1">
      {typeof children === "string"
        ? (
            <Text size="sm" className="text-zinc-700 dark:text-zinc-300">
              {children}
            </Text>
          )
        : (
            children
          )}
    </div>
  </BaseAccordion.Panel>
);

AccordionContent.displayName = "AccordionContent";

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>;

/**
 * Accordion item container that wraps a trigger and content pair.
 */
const AccordionItem = ({
  className,
  ...props
}: AccordionItemProps) => (
  <BaseAccordion.Item
    className={cx(
      // base
      "overflow-hidden border-b first:mt-0",
      // border color
      "border-zinc-200 dark:border-zinc-800",
      className,
    )}
    tremor-id="tremor-raw"
    {...props}
  />
);

AccordionItem.displayName = "AccordionItem";

export {
  Accordion,
  AccordionContent,
  type AccordionContentProps,
  AccordionItem,
  type AccordionItemProps,
  type AccordionProps,
  AccordionTrigger,
  type AccordionTriggerProps,
};
