"use client";

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
  Music,
  PenTool,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DEMOS = [
  { href: "/linear", label: "Linear", icon: Kanban },
  { href: "/notion", label: "Notion", icon: FileText },
  { href: "/spotify", label: "Spotify", icon: Music },
  { href: "/slack", label: "Slack", icon: MessageSquare },
  { href: "/figma", label: "Figma", icon: PenTool },
  { href: "/cosmos", label: "Database", icon: Database },
  { href: "/inspiration", label: "Cosmos", icon: Sparkles },
];

export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {children}

      {/* Floating demo switcher — bottom center */}
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div className="rounded-xl border border-border/50 bg-card/95 px-1 py-1 shadow-lg backdrop-blur-md">
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
        </div>
      </div>
    </>
  );
}
