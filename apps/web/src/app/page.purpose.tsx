"use client";

import { FeatureItem } from "@patternmode/feature-item";
import { Grid } from "@patternmode/grid";
import { Check, HelpCircle, Settings } from "lucide-react";

export const Purpose = () => {
	return (
		<Grid columns={3} gap={12}>
			<FeatureItem icon={HelpCircle} heading="What is it?" iconPosition="top">
				Patternmode is a very opinionated component library based on the best
				bits of Base UI, Shadcn UI, Tailwind, and more. You can use it as a
				starting point for your own components, or use it as a library of
				components to use in your projects.
			</FeatureItem>
			<FeatureItem icon={Check} heading="Why do I need it?" iconPosition="top">
				Shadcn, Tremor, and everything else that needs to be copied and pasted
				are wonderful, but once you've customised them and need to update, the
				process is painful.
			</FeatureItem>
			<FeatureItem
				icon={Settings}
				heading="How do I use it?"
				iconPosition="top"
			>
				It's early days so use at your peril.
			</FeatureItem>
		</Grid>
	);
};
