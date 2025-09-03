import type { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import type React from "react";
import type { AccordionPreviewProps } from "./preview";

export type AccordionProps = AccordionPreviewProps &
  React.ComponentPropsWithoutRef<typeof BaseAccordion.Root>;

export type AccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Trigger
>;

export type AccordionContentProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Panel
>;

export type AccordionItemProps = React.ComponentPropsWithoutRef<
  typeof BaseAccordion.Item
>;
