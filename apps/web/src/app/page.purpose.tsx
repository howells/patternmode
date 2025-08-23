"use client";

import { TextList, TextListItem } from "@patternmode/ui/components/text-list";
import { Check, CircleHelp } from "lucide-react";

export const Purpose = () => {
	return (
		<>
			<TextList icon={Check} iconSize="sm">
				<TextListItem heading="Why?">
					Patternmode is a very opinionated component library based on the best
					bits of Base UI, Shadcn UI, Tailwind, and more.
				</TextListItem>
			</TextList>
			<TextList>
				<TextListItem heading="Why?">
					Patternmode is a very opinionated component library based on the best
					bits of Base UI, Shadcn UI, Tailwind, and more.
				</TextListItem>
			</TextList>
		</>
	);
};
