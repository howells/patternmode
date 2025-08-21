import { Accordion as BaseAccordion } from "@base-ui-components/react/accordion";
import { defaultConfig } from "@patternmode/config/default-config";
import { cx } from "@patternmode/utils/cx";
import { Plus } from "lucide-react";
import { Subheading } from "../subheading/component";
import { Text } from "../text/component";
import type {
	AccordionContentProps,
	AccordionItemProps,
	AccordionProps,
	AccordionTriggerProps,
} from "./types";
import {
	accordionContentInnerVariants,
	accordionContentVariants,
	accordionIconVariants,
	accordionItemVariants,
	accordionTriggerVariants,
	accordionVariants,
} from "./variants";

/**
 * Collapsible content sections with expand/collapse functionality for organizing information.
 */
const Accordion = ({
	className,
	orientation = "vertical",
	...props
}: AccordionProps) => (
	<BaseAccordion.Root
		className={cx(accordionVariants(), className)}
		orientation={orientation}
		data-testid="accordion"
		{...props}
	/>
);

Accordion.displayName = "Accordion";

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
			className={cx(accordionTriggerVariants(), className)}
			{...props}
		>
			{typeof children === "string" ? (
				<Subheading level={3}>{children}</Subheading>
			) : (
				children
			)}
			<Plus
				className={accordionIconVariants()}
				strokeWidth={defaultConfig.components.iconStrokeWidth}
				aria-hidden="true"
			/>
		</BaseAccordion.Trigger>
	</BaseAccordion.Header>
);

AccordionTrigger.displayName = "AccordionTrigger";

/**
 * Accordion panel content that appears when the trigger is activated.
 */
const AccordionContent = ({
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
				<Text size="sm" className="text-zinc-700 dark:text-zinc-300">
					{children}
				</Text>
			) : (
				children
			)}
		</div>
	</BaseAccordion.Panel>
);

AccordionContent.displayName = "AccordionContent";

/**
 * Accordion item container that wraps a trigger and content pair.
 */
const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
	<BaseAccordion.Item
		className={cx(accordionItemVariants(), className)}
		tremor-id="tremor-raw"
		{...props}
	/>
);

AccordionItem.displayName = "AccordionItem";

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
