
import type {
	GlobalSemanticVariant,
	TailwindColor,
} from "@patternmode/constants/variants";
import { HStack,  VStack } from "@patternmode/stack";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardHeading,
} from "@patternmode/ui/components/card";

import { IconContainer } from "@patternmode/ui/components/icon-container";
import {
	TextList,

	TextListItem,
} from "@patternmode/ui/components/text-list";
import { cx } from "@patternmode/utils/cx";
import type { LucideIcon } from "lucide-react";
import { CircleHelp } from "lucide-react";


type CategoryCardProps = {
	icon: LucideIcon;
	title: string;
	description: string;
	items: string[];
	variant?: GlobalSemanticVariant;
	color?: GlobalSemanticVariant | TailwindColor;
	headerBorder?: boolean;
	useHorizontalLayout?: boolean;
};




export default function Home() {
	return (
		<div className={cx("p-16")}>
			<h1 className="font-serif text-4xl max-w-3xl">
				Patternmode is a very opinionated component library based on the best
				bits of Base UI, Shadcn UI, Tailwind, and more.
			</h1>

			<TextList icon={CircleHelp} iconSize="sm">
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
		</div>
	);
}
