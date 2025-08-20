import { ChevronLeft } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./component";
import {
	AutoPlayExample,
	DefaultExample,
	ImageCarouselExample,
	MultipleItemsExample,
	NoNavigationExample,
	ResponsiveExample,
	TestimonialCarouselExample,
	VerticalExample,
} from "./examples";

export const carouselConfig: ComponentConfig = {
	id: "carousel",
	name: "Carousel",
	description:
		"Image and content carousel component with navigation controls and indicators built on Embla Carousel.",
	category: "media",
	icon: ChevronLeft,
	importStatement: `import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@patternmode/ui/carousel";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic horizontal carousel with navigation controls",
			component: DefaultExample,
		},
		{
			id: "vertical",
			title: "Vertical",
			description: "Vertical scrolling carousel orientation",
			component: VerticalExample,
		},
		{
			id: "multiple-items",
			title: "Multiple Items",
			description: "Carousel showing multiple items per view",
			component: MultipleItemsExample,
		},
		{
			id: "no-navigation",
			title: "No Navigation",
			description: "Carousel without navigation controls",
			component: NoNavigationExample,
		},
		{
			id: "image-carousel",
			title: "Image Carousel",
			description: "Image gallery carousel with photos",
			component: ImageCarouselExample,
		},
		{
			id: "testimonial-carousel",
			title: "Testimonial Carousel",
			description: "Testimonial content carousel with quotes",
			component: TestimonialCarouselExample,
		},
		{
			id: "auto-play",
			title: "Auto Play",
			description: "Carousel with automatic slide progression",
			component: AutoPlayExample,
		},
		{
			id: "responsive",
			title: "Responsive",
			description: "Responsive carousel adapting to screen sizes",
			component: ResponsiveExample,
		},
	],
	components: [
		{
			component: Carousel,
			name: "Carousel",
			primary: true,
			description:
				"Root container for carousel functionality with keyboard navigation.",
		},
		{
			component: CarouselContent,
			name: "Carousel Content",
			description:
				"Scrollable container for carousel items with overflow handling.",
		},
		{
			component: CarouselItem,
			name: "Carousel Item",
			description:
				"Individual slide container with proper spacing and accessibility.",
		},
		{
			component: CarouselPrevious,
			name: "Carousel Previous",
			description: "Previous slide navigation button with auto-positioning.",
		},
		{
			component: CarouselNext,
			name: "Carousel Next",
			description: "Next slide navigation button with auto-positioning.",
		},
	],
};
