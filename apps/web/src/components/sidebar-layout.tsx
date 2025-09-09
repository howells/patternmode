"use client";

import { Button } from "@patternmode/button";
import { COMPONENT_CATEGORIES } from "@patternmode/constants/component-categories";
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
        "flex flex-1 flex-col transition-[margin-left] duration-200 ease-out",
        getMainContentMargin()
      )}
    >
      <Stack className="min-h-0 flex-1" direction="vertical" gap={0}>
        <header className="flex h-16 w-full items-center justify-between bg-zinc-50 px-6 dark:bg-zinc-900">
          <Link className="lg:hidden" href="/">
            <Logo />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <ComponentSearch />
            <ThemeToggleWrapper size="sm" variant="ghost" />
            <Separator className="h-6" orientation="vertical" />
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
      <Sidebar className="hidden bg-zinc-50 lg:block">
        <SidebarHeader>
          <Button render={<Link href="/" />} size="icon" variant="ghost">
            <Logo />
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            {COMPONENT_CATEGORIES.map((cat) => (
              <SidebarItem icon={cat.icon} id={cat.key} key={cat.key}>
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
