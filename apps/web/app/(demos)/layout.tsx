"use client";

import { Button } from "@patternmode/ui/components/button";
import {
  TabNavigation,
  TabNavigationLink,
  TabNavigationList,
} from "@patternmode/ui/components/tab-navigation";
import {
  Database,
  FileText,
  Kanban,
  MessageSquare,
  Moon,
  Music,
  PenTool,
  Sparkles,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DEMOS = [
  { href: "/linear", label: "Linear", icon: Kanban },
  { href: "/notion", label: "Notion", icon: FileText },
  { href: "/spotify", label: "Spotify", icon: Music },
  { href: "/slack", label: "Slack", icon: MessageSquare },
  { href: "/figma", label: "Figma", icon: PenTool },
  { href: "/datastore", label: "Datastore", icon: Database },
  { href: "/intelligence", label: "Intelligence", icon: Sparkles },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="size-7" />;

  return (
    <Button
      size="icon-2xs"
      variant="ghost"
      icon={theme === "dark" ? Sun : Moon}
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="shrink-0"
    />
  );
}

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-w-6xl h-screen overflow-hidden">
      {children}

      {/* Floating demo switcher — bottom center */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-xl border-0 bg-card/95 px-1 py-1 shadow-lg backdrop-blur-md">
          <TabNavigation variant="pill" size="xs">
            <TabNavigationList>
              {DEMOS.map((demo) => (
                <TabNavigationLink
                  active={pathname === demo.href}
                  asChild
                  href={demo.href}
                  icon={demo.icon}
                  key={demo.href}
                >
                  <Link href={demo.href}>{demo.label}</Link>
                </TabNavigationLink>
              ))}
            </TabNavigationList>
          </TabNavigation>
          <div className="mx-0.5 h-4 w-px bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
