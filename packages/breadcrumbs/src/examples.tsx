"use client";

import { ChevronRight, Home } from "lucide-react";
import {
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Breadcrumbs,
} from "./component";

// Default breadcrumbs
export const DefaultExample = () => (
	<Breadcrumbs>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/components">Components</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumbs>
);

// Breadcrumbs with ellipsis
export const WithEllipsisExample = () => (
	<Breadcrumbs>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbEllipsis />
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/components">Components</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumbs>
);

// Custom separator
export const CustomSeparatorExample = () => (
	<Breadcrumbs>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator>/</BreadcrumbSeparator>
			<BreadcrumbItem>
				<BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator>/</BreadcrumbSeparator>
			<BreadcrumbItem>
				<BreadcrumbPage>Components</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumbs>
);

// Single level breadcrumbs
export const SingleLevelExample = () => (
	<Breadcrumbs>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbPage>Current Page</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumbs>
);

// Deep navigation breadcrumbs
export const DeepNavigationExample = () => (
	<Breadcrumbs>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/products">Products</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/products/electronics">
					Electronics
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbLink href="/products/electronics/phones">
					Phones
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>iPhone 15</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumbs>
);

// With icons
export const WithIconsExample = () => (
	<Breadcrumbs>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/" className="flex items-center gap-1">
					<Home className="h-4 w-4" />
					Home
				</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator>
				<ChevronRight className="h-4 w-4" />
			</BreadcrumbSeparator>
			<BreadcrumbItem>
				<BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator>
				<ChevronRight className="h-4 w-4" />
			</BreadcrumbSeparator>
			<BreadcrumbItem>
				<BreadcrumbPage>Settings</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumbs>
);

// Two levels only
export const TwoLevelsExample = () => (
	<Breadcrumbs>
		<BreadcrumbList>
			<BreadcrumbItem>
				<BreadcrumbLink href="/">Home</BreadcrumbLink>
			</BreadcrumbItem>
			<BreadcrumbSeparator />
			<BreadcrumbItem>
				<BreadcrumbPage>About</BreadcrumbPage>
			</BreadcrumbItem>
		</BreadcrumbList>
	</Breadcrumbs>
);
