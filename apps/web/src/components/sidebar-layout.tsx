"use client";

import { Button } from "@patternmode/button";
import { Separator } from "@patternmode/separator";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarItem,
	useSidebar,
} from "@patternmode/sidebar";
import { Stack, VStack } from "@patternmode/stack";
import { cx } from "@patternmode/utils/cx";
import Link from "next/link";
import type React from "react";
import { GitHubLink } from "@/components/github-link";
import Logo from "@/components/logo";
import { ThemeToggleWrapper } from "@/components/theme-toggle-wrapper";
import { COMPONENT_CATEGORIES } from "@patternmode/constants/component-categories";
import { ComponentSearch } from "./component-search";

// SidebarGroupTitle helper removed (unused)

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
				<header className="h-16 w-full px-6 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
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
		<div className="flex h-screen bg-zinc-50 dark:bg-zinc-900">
			<Sidebar className="hidden lg:block bg-zinc-50">
				<SidebarHeader>
					<Button render={<Link href="/" />} variant="ghost" size="icon">
						<Logo />
					</Button>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						{COMPONENT_CATEGORIES.map((cat) => (
							<SidebarItem key={cat.key} icon={cat.icon}>
								{cat.label}
							</SidebarItem>
						))}
					</SidebarGroup>
				</SidebarContent>
			</Sidebar>
			<MainContent>{children}</MainContent>
		</div>
	);
}
