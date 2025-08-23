"use client";

import { FeatureItem } from "@patternmode/feature-item";
import { Grid } from "@patternmode/ui/components/grid";
import { Check } from "lucide-react";

export const Purpose = () => {
	return (
		<Grid columns={2} className="mt-6">
			<FeatureItem icon={Check} heading="Why?">
				Patternmode is a very opinionated component library based on the best
				bits of Base UI, Shadcn UI, Tailwind, and more.
			</FeatureItem>
			<FeatureItem heading="Why?">
				Patternmode is a very opinionated component library based on the best
				bits of Base UI, Shadcn UI, Tailwind, and more.
			</FeatureItem>
		</Grid>
	);
};
