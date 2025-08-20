import { ChevronLeft } from "lucide-react";
import type { ComponentConfig } from "../../types/component-types";
import {
	Pagination,
	PaginationGap,
	PaginationList,
	PaginationNext,
	PaginationPage,
	PaginationPrevious,
} from "./component";
import {
	DefaultExample,
	TablePaginationExample,
	WithGapsExample,
} from "./examples";

export const paginationConfig: ComponentConfig = {
	id: "pagination",
	name: "Pagination",
	description:
		"A comprehensive pagination system for navigating through large datasets. Built with Next.js Link integration for client-side routing and proper accessibility support for screen readers.",
	category: "navigation",
	icon: ChevronLeft,
	importStatement: `import { Pagination, PaginationPrevious, PaginationNext, PaginationList, PaginationPage, PaginationGap } from "@patternmode/ui/pagination";`,
	examples: [
		{
			id: "default",
			title: "Default",
			description: "Basic pagination with previous/next and page numbers",
			component: DefaultExample,
		},
		{
			id: "with-gaps",
			title: "With Gaps",
			description: "Pagination with gap indicators for truncated ranges",
			component: WithGapsExample,
		},
		{
			id: "table-pagination",
			title: "Table Pagination",
			description: "Pagination designed for data tables with context",
			component: TablePaginationExample,
		},
	],
	components: [
		{
			name: "Pagination",
			description: "Root container for pagination navigation controls.",
			component: Pagination,
			primary: true,
		},
		{
			name: "Pagination Previous",
			description: "Previous page navigation button with disabled state.",
			component: PaginationPrevious,
		},
		{
			name: "Pagination Next",
			description: "Next page navigation button with disabled state.",
			component: PaginationNext,
		},
		{
			name: "Pagination List",
			description: "Semantic list container for page number buttons.",
			component: PaginationList,
		},
		{
			name: "Pagination Page",
			description: "Individual page button with current state support.",
			component: PaginationPage,
		},
		{
			name: "Pagination Gap",
			description: "Gap indicator for truncated page ranges.",
			component: PaginationGap,
		},
	],
};
