// Tremor Accordion [v1.0.0] - Base UI

import { Subheading } from "@/components/ui/subheading/subheading";
import { Text } from "@/components/ui/text/text";
import { config } from "@/lib/config";
import { cx } from "@/lib/utils";
import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { Plus } from "lucide-react";
import React from "react";

/**
 * A set of collapsible panels with headings built on Base UI's Accordion primitive.
 *
 * Based on Base UI's Accordion (https://base-ui.com/react/components/accordion),
 * providing accessible collapsible content with keyboard navigation and focus management.
 * Features Tremor-inspired styling with proper contrast and spacing.
 *
 * @component
 * @example
 * ```tsx
 * <Accordion defaultValue={['item-1']} openMultiple>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Panel 1</AccordionTrigger>
 *     <AccordionContent>Content for panel 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Panel 2</AccordionTrigger>
 *     <AccordionContent>Content for panel 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * @see https://base-ui.com/react/components/accordion - Base UI documentation
 */
const Accordion = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Root>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>
>(({ className, orientation = "vertical", ...props }, forwardedRef) => (
  <BaseAccordion.Root
    className={cx("flex w-96 max-w-[calc(100vw-8rem)] flex-col", className)}
    orientation={orientation}
    ref={forwardedRef}
    {...props}
  />
));

Accordion.displayName = "Accordion";

/**
 * Accordion trigger button that toggles the panel open/closed state.
 *
 * Renders as a button element with the panel heading text and a rotating plus icon.
 * Supports keyboard navigation and provides visual feedback for hover, focus, and disabled states.
 * The icon rotates 45 degrees when the panel is open.
 *
 * @example
 * ```tsx
 * <AccordionTrigger>
 *   What are your shipping options?
 * </AccordionTrigger>
 * ```
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger>
>(({ className, children, ...props }, forwardedRef) => (
  <BaseAccordion.Header className="flex">
    <BaseAccordion.Trigger
      className={cx(
        // base
        "group flex flex-1 cursor-pointer items-center justify-between py-3 text-left font-medium",
        // text color
        "text-zinc-900 dark:text-zinc-50",
        // disabled
        "data-[disabled]:cursor-default data-[disabled]:text-zinc-400 dark:data-[disabled]:text-zinc-600",
        //focus
        "focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden focus-visible:ring-inset",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {typeof children === "string" ? (
        <Subheading level={3}>{children}</Subheading>
      ) : (
        children
      )}
      <Plus
        className={cx(
          // base
          "size-5 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[panel-open]:rotate-45",
          // text color
          "text-zinc-600 dark:text-zinc-400"
        )}
        strokeWidth={config.getIconStrokeWidth()}
        aria-hidden="true"
      />
    </BaseAccordion.Trigger>
  </BaseAccordion.Header>
));

AccordionTrigger.displayName = "AccordionTrigger";

/**
 * Accordion panel content that appears when the trigger is activated.
 *
 * Contains the collapsible content with appropriate padding and typography.
 * Handles overflow properly and provides smooth expand/collapse animations.
 * Content is hidden when the panel is closed and visible when open.
 *
 * @example
 * ```tsx
 * <AccordionContent>
 *   <p>We offer standard shipping (5-7 days) and express shipping (2-3 days).</p>
 * </AccordionContent>
 * ```
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Panel>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Panel>
>(({ className, children, ...props }, forwardedRef) => (
  <BaseAccordion.Panel
    className={cx("overflow-hidden", className)}
    ref={forwardedRef}
    {...props}
  >
    <div className="pb-3 pt-1">
      {typeof children === "string" ? (
        <Text size="sm" className="text-zinc-700 dark:text-zinc-300">
          {children}
        </Text>
      ) : (
        children
      )}
    </div>
  </BaseAccordion.Panel>
));

AccordionContent.displayName = "AccordionContent";

/**
 * Accordion item container that wraps a trigger and content pair.
 *
 * Provides the structure and styling for individual accordion panels.
 * Includes bottom border styling that creates visual separation between items.
 * Each item requires a unique `value` prop for identification.
 *
 * @example
 * ```tsx
 * <AccordionItem value="shipping">
 *   <AccordionTrigger>Shipping Information</AccordionTrigger>
 *   <AccordionContent>Shipping details here...</AccordionContent>
 * </AccordionItem>
 * ```
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof BaseAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Item>
>(({ className, ...props }, forwardedRef) => (
  <BaseAccordion.Item
    ref={forwardedRef}
    className={cx(
      // base
      "overflow-hidden border-b first:mt-0",
      // border color
      "border-zinc-200 dark:border-zinc-800",
      className
    )}
    tremor-id="tremor-raw"
    {...props}
  />
));

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
