// Sidebar Layout Component for Documentation

"use client";

import { Sidebar, useSidebar } from "@patternmode/sidebar";
import {
	CATEGORY_CONFIG,
	getAllComponents,
	getComponentsByCategory,
} from "@patternmode/ui/components/registry";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, Stack } from "@patternmode/ui/components/stack";
import {
	ToggleGroup,
	ToggleGroupItem,
} from "@patternmode/ui/components/toggle-group";
import { cx } from "@patternmode/ui/utils/cx";
import { List, Rows3 } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import type React from "react";

import { GitHubLink } from "@/components/github-link";
import Logo from "@/components/logo";
import { ThemeToggleWrapper } from "@/components/theme-toggle-wrapper";

import { useSidebarView } from "../hooks/use-sidebar-view";
import { ComponentSearch } from "./component-search";

// Local component for sidebar group titles with badges
function SidebarGroupTitle({
	children,
	badge,
	level = 1,
}: {
	children: React.ReactNode;
	badge?: React.ReactNode;
	level?: 1 | 2;
}) {
	return (
		<HStack align="center" gap={2} className={level === 2 ? "opacity-70" : ""}>
			{children}
			{badge}
		</HStack>
	);
}

type SidebarLayoutProps = {
	children: React.ReactNode;
};

function SidebarContent() {
	const segments = useSelectedLayoutSegments();
	const state = useSidebar((s) => s.state);
	const isExpanded = useSidebar((s) => s.isExpanded);
	const { viewMode, isGrouped, setGroupedView, setAlphabeticalView } =
		useSidebarView();

	// Check if current path matches a component
	const isCurrentComponent = (componentId: string) => {
		return (
			segments.length >= 3 &&
			segments[0] === "ui" &&
			segments[1] === "components" &&
			segments[2] === componentId
		);
	};

	// Get data from shared registry
	const allComponents = getAllComponents();

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="h-16 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-3">
				<Link
					href="/"
					className={cx("transition-opacity duration-200", {
						"opacity-100": isExpanded,
						"opacity-0": !isExpanded,
					})}
				>
					<Logo />
				</Link>
			</div>

			{/* Body */}
			<div className="flex-1 overflow-y-auto p-3">
				{/* Components section with view toggle */}
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2
							className={cx(
								"text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-opacity duration-200",
								isExpanded ? "opacity-100" : "opacity-0",
							)}
						>
							Components
						</h2>
						<ToggleGroup
							value={[viewMode]}
							onValueChange={(value) => {
								if (value.length > 0) {
									const newMode = value[0] as "grouped" | "alphabetical";
									if (newMode === "grouped") {
										setGroupedView();
									} else {
										setAlphabeticalView();
									}
								}
							}}
							size="xs"
							className={cx(
								"transition-opacity duration-200",
								isExpanded ? "opacity-100" : "opacity-0",
							)}
						>
							<ToggleGroupItem value="grouped" leftIcon={Rows3}>
								<span className="sr-only">Grouped view</span>
							</ToggleGroupItem>
							<ToggleGroupItem value="alphabetical" leftIcon={List}>
								<span className="sr-only">Alphabetical view</span>
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
					<div className="space-y-2">
						{isGrouped
							? // Grouped view by category
								CATEGORY_CONFIG.map((category) => {
									const components = getComponentsByCategory(category.key).sort(
										(a, b) => a.name.localeCompare(b.name),
									);

									if (components.length === 0) return null;

									return (
										<div key={category.key} className="space-y-1">
											<h3
												className={cx(
													"text-xs font-medium text-zinc-500 dark:text-zinc-400 px-2 py-1 transition-opacity duration-200",
													isExpanded ? "opacity-100" : "opacity-0",
												)}
											>
												{category.name}
											</h3>
											<div className="space-y-0.5">
												{components.map((component) => (
													<Link
														key={component.id}
														href={`/ui/components/${component.id}`}
														className={cx(
															"flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all duration-200",
															"hover:bg-zinc-100 dark:hover:bg-zinc-800",
															isCurrentComponent(component.id)
																? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
																: "text-zinc-600 dark:text-zinc-400",
															!isExpanded && "justify-center",
														)}
													>
														{component.icon && (
															<component.icon className="w-4 h-4 shrink-0" />
														)}
														<span
															className={cx(
																"transition-opacity duration-200",
																isExpanded ? "opacity-100" : "opacity-0",
															)}
														>
															{component.name}
														</span>
													</Link>
												))}
											</div>
										</div>
									);
								})
							: // Alphabetical view
								allComponents.map((component) => (
									<Link
										key={component.id}
										href={`/ui/components/${component.id}`}
										className={cx(
											"flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all duration-200",
											"hover:bg-zinc-100 dark:hover:bg-zinc-800",
											isCurrentComponent(component.id)
												? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
												: "text-zinc-600 dark:text-zinc-400",
											!isExpanded && "justify-center",
										)}
									>
										{component.icon && (
											<component.icon className="w-4 h-4 shrink-0" />
										)}
										<span
											className={cx(
												"transition-opacity duration-200",
												isExpanded ? "opacity-100" : "opacity-0",
											)}
										>
											{component.name}
										</span>
									</Link>
								))}
					</div>
				</div>
			</div>
		</div>
	);
}

function MainContent({ children }: { children: React.ReactNode }) {
	const isExpanded = useSidebar((s) => s.isExpanded);
	const isMobile = useSidebar((s) => s.isMobile);

	return (
		<div
			className={cx(
				"flex-1 flex flex-col transition-[margin-left] duration-200 ease-out",
				isMobile
					? "ml-0"
					: isExpanded
						? "ml-[var(--sidebar-open-width)]"
						: "ml-[var(--sidebar-collapsed-width)]",
			)}
		>
			<Stack direction="vertical" gap={0} className="min-h-0 flex-1">
				<header className="h-16 w-full px-6 bg-white dark:bg-zinc-900 border-b  dark:border-zinc-800 flex items-center justify-between">
					<Link href="/" className="lg:hidden">
						<Logo />
					</Link>
					<div className="ml-auto flex items-center gap-2">
						<ComponentSearch />
						<ThemeToggleWrapper size="sm" variant="ghost" />
						<Separator orientation="vertical" className="h-6" />
						<GitHubLink />
					</div>
				</header>
				<main className="flex-1 overflow-y-auto">{children}</main>
			</Stack>
		</div>
	);
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
	return (
		<div className="flex h-screen bg-white dark:bg-zinc-900">
			<Sidebar className="hidden lg:block">
        <Logo/>
			</Sidebar>
			<MainContent>{children}</MainContent>
		</div>
	);
}
