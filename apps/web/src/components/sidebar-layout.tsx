"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarItem,
	useSidebar,
} from "@patternmode/sidebar";
import { Button } from "@patternmode/button";
import { getAllComponents } from "@patternmode/ui/components/registry";
import { Separator } from "@patternmode/separator";
import { Stack, VStack } from "@patternmode/stack";
import { cx } from "@patternmode/ui/utils/cx";
import { Layers } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { GitHubLink } from "@/components/github-link";
import Logo from "@/components/logo";
import { ThemeToggleWrapper } from "@/components/theme-toggle-wrapper";
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
				<header className="h-16 w-full px-6 bg-white dark:bg-zinc-900 flex items-center justify-between">
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
			<Sidebar className="hidden lg:block bg-zinc-50">
				<SidebarHeader>
					<Button render={<Link href="/" />} variant="ghost" size="icon">
						<Logo />
					</Button>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						{getAllComponents().map((config) => (
							<SidebarItem
								key={config.id}
								icon={config.icon}
								render={<Link href={`/ui/components/${config.id}`} />}
							>
								{config.name}
							</SidebarItem>
						))}
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>Footer</SidebarFooter>
			</Sidebar>
			<MainContent>{children}</MainContent>
		</div>
	);
}
