"use client";

import { AccordionPreview } from "@patternmode/accordion/preview";
import { AlertDialogPreview } from "@patternmode/alert-dialog/preview";
import { AvatarPreview } from "@patternmode/avatar/preview";
import { BadgePreview } from "@patternmode/badge/preview";
import { BreadcrumbsPreview } from "@patternmode/breadcrumbs/preview";
import { ButtonPreview } from "@patternmode/button/preview";
import { Card, CardContent, CardHeader, CardHeading } from "@patternmode/card";
import { CheckboxPreview } from "@patternmode/checkbox/preview";
import { DialogPreview } from "@patternmode/dialog/preview";
import { Grid, GridCell } from "@patternmode/grid";
import { Heading } from "@patternmode/heading";
import { InputPreview } from "@patternmode/input/preview";
import { PaginationPreview } from "@patternmode/pagination/preview";
import { PopoverPreview } from "@patternmode/popover/preview";
import { ProgressPreview } from "@patternmode/progress/preview";
import { SelectPreview } from "@patternmode/select/preview";
import { SwitchPreview } from "@patternmode/switch/preview";
import { TabsPreview } from "@patternmode/tabs/preview";
import { TextareaPreview } from "@patternmode/textarea/preview";
import { TogglePreview } from "@patternmode/toggle/preview";
import { TooltipPreview } from "@patternmode/tooltip/preview";

const components = [
	{ name: "Button", component: ButtonPreview },
	{ name: "Input", component: InputPreview },
	{ name: "Avatar", component: AvatarPreview },
	{ name: "Badge", component: BadgePreview },
	{ name: "Checkbox", component: CheckboxPreview },
	{ name: "Select", component: SelectPreview },
	{ name: "Toggle", component: TogglePreview },
	{ name: "Progress", component: ProgressPreview },
	{ name: "Alert Dialog", component: AlertDialogPreview },
	{ name: "Dialog", component: DialogPreview },
	{ name: "Popover", component: PopoverPreview },
	{ name: "Tooltip", component: () => <TooltipPreview content="This is a tooltip"><button type="button" className="px-3 py-2 text-sm border rounded-md">Hover me</button></TooltipPreview> },
	{ name: "Accordion", component: AccordionPreview },
	{ name: "Tabs", component: TabsPreview },
	{ name: "Breadcrumbs", component: BreadcrumbsPreview },
	{ name: "Pagination", component: PaginationPreview },
	{ name: "Switch", component: SwitchPreview },
	{ name: "Textarea", component: TextareaPreview },
];

const Examples = () => {
	return (
		<Grid columns={{ sm: 2, md: 3, lg: 4 }} gap={6}>
			{components.map(({ name, component: Component }) => (
				<GridCell key={name}>
					<Card fillHeight>
						<CardHeader>
							<CardHeading>{name}</CardHeading>
						</CardHeader>
						<CardContent className="flex items-center justify-center">
							<Component />
						</CardContent>
					</Card>
				</GridCell>
			))}
		</Grid>
	);
};

export { Examples };
