// Sidebar Layout Component for Documentation

"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, useSidebar } from "@patternmode/sidebar";
import { Button } from "@patternmode/ui/components/button";
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


function MainContent({ children }: { children: React.ReactNode }) {
	const isMobile = useSidebar((s) => s.isMobile);
	const shouldOffsetContent = useSidebar((s) => s.shouldOffsetContent);

	function getMainContentMargin() {
		if (isMobile) {
			return "ml-0";
		}

		if (shouldOffsetContent) {
			return "ml-[var(--sidebar-open-width)]";
		}

		return "ml-[var(--sidebar-collapsed-width)]";
	}

	return (
		<div
			className={cx(
				"flex-1 flex flex-col transition-[margin-left] duration-200 ease-out",
				getMainContentMargin(),
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
				<SidebarHeader>
					<Button render={<Link href="/" />} variant="ghost" size="icon">
						<Logo />
					</Button>
				</SidebarHeader>
        <SidebarContent>
          Content
        </SidebarContent>
        <SidebarFooter>
          Footer
        </SidebarFooter>
			</Sidebar>
			<MainContent>{children}</MainContent>
		</div>
	);
}
