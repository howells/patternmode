"use client";

/**
 * DESIGN SYSTEM GAPS FOUND:
 * - No "sidebar" surface component — composed from VStack + bg-card + border-r (structural classes)
 * - Flex/Stack missing flex-1, min-w-0, h-screen, shrink-0 props — need className for these
 * - No NativeSelect or lightweight inline select for filter dropdowns (using Button instead)
 * - Dot component inside MenuItem children requires wrapping in HStack — no built-in "dot" color prop on MenuItem that accepts custom CSS colors
 * - ScrollArea requires className="flex-1" to fill remaining space — no "fill" prop
 */

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { Dot } from "@patternmode/ui/components/dot";
import { Flex } from "@patternmode/ui/components/flex";
import { Heading } from "@patternmode/ui/components/heading";
import { Icon } from "@patternmode/ui/components/icon";
import { MenuItem } from "@patternmode/ui/components/menu-item";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui/components/tabs";
import { Text } from "@patternmode/ui/components/text";
import {
  Circle,
  Hash,
  Inbox,
  Layers,
  LayoutGrid,
  ListFilter,
  Plus,
  Search,
  Settings,
  Timer,
  Triangle,
  Users,
} from "lucide-react";

const TEAMS = [
  { name: "Engineering", color: "hsl(220, 80%, 60%)" },
  { name: "Design", color: "hsl(340, 75%, 55%)" },
  { name: "Product", color: "hsl(160, 65%, 45%)" },
  { name: "Infrastructure", color: "hsl(30, 80%, 55%)" },
];

type IssueStatus = "backlog" | "todo" | "in-progress" | "done" | "cancelled";

interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: "urgent" | "high" | "medium" | "low" | "none";
  assignee: string;
  date: string;
  label?: string;
}

const STATUS_CONFIG: Record<
  IssueStatus,
  {
    variant: "default" | "info" | "warning" | "affirmative" | "destructive";
    label: string;
  }
> = {
  backlog: { variant: "default", label: "Backlog" },
  todo: { variant: "info", label: "Todo" },
  "in-progress": { variant: "warning", label: "In Progress" },
  done: { variant: "affirmative", label: "Done" },
  cancelled: { variant: "destructive", label: "Cancelled" },
};

const PRIORITY_ICONS: Record<Issue["priority"], typeof Triangle> = {
  urgent: Triangle,
  high: Triangle,
  medium: Triangle,
  low: Triangle,
  none: Circle,
};

const ISSUES: Issue[] = [
  {
    id: "ENG-481",
    title: "Fix memory leak in WebSocket connection handler",
    status: "in-progress",
    priority: "urgent",
    assignee: "Sarah Chen",
    date: "Apr 4",
    label: "Bug",
  },
  {
    id: "ENG-480",
    title: "Implement rate limiting for public API endpoints",
    status: "in-progress",
    priority: "high",
    assignee: "Marcus Johnson",
    date: "Apr 3",
    label: "Security",
  },
  {
    id: "ENG-479",
    title: "Add dark mode support to dashboard components",
    status: "todo",
    priority: "medium",
    assignee: "Elena Rodriguez",
    date: "Apr 3",
    label: "Feature",
  },
  {
    id: "ENG-478",
    title: "Optimize database queries for user search",
    status: "todo",
    priority: "high",
    assignee: "James Wright",
    date: "Apr 2",
  },
  {
    id: "ENG-477",
    title: "Migrate authentication flow to OAuth 2.1",
    status: "in-progress",
    priority: "high",
    assignee: "Sarah Chen",
    date: "Apr 2",
    label: "Security",
  },
  {
    id: "ENG-476",
    title: "Add E2E tests for checkout flow",
    status: "backlog",
    priority: "medium",
    assignee: "Priya Patel",
    date: "Apr 1",
    label: "Testing",
  },
  {
    id: "ENG-475",
    title: "Refactor notification service to use event bus",
    status: "backlog",
    priority: "low",
    assignee: "Marcus Johnson",
    date: "Apr 1",
  },
  {
    id: "ENG-474",
    title: "Set up monitoring alerts for payment failures",
    status: "done",
    priority: "urgent",
    assignee: "James Wright",
    date: "Mar 31",
    label: "Infra",
  },
  {
    id: "ENG-473",
    title: "Update TypeScript to v5.8 across all packages",
    status: "done",
    priority: "low",
    assignee: "Elena Rodriguez",
    date: "Mar 30",
  },
  {
    id: "ENG-472",
    title: "Implement cursor-based pagination for feed API",
    status: "backlog",
    priority: "medium",
    assignee: "Priya Patel",
    date: "Mar 29",
    label: "Feature",
  },
  {
    id: "ENG-471",
    title: "Fix race condition in concurrent file uploads",
    status: "todo",
    priority: "high",
    assignee: "Sarah Chen",
    date: "Mar 28",
    label: "Bug",
  },
  {
    id: "ENG-470",
    title: "Add support for bulk operations in admin panel",
    status: "backlog",
    priority: "medium",
    assignee: "Marcus Johnson",
    date: "Mar 27",
    label: "Feature",
  },
  {
    id: "ENG-469",
    title: "Audit and rotate all third-party API keys",
    status: "done",
    priority: "urgent",
    assignee: "James Wright",
    date: "Mar 26",
    label: "Security",
  },
  {
    id: "ENG-468",
    title: "Create shared component library documentation",
    status: "todo",
    priority: "low",
    assignee: "Elena Rodriguez",
    date: "Mar 25",
  },
  {
    id: "ENG-467",
    title: "Implement graceful degradation for offline mode",
    status: "backlog",
    priority: "medium",
    assignee: "Priya Patel",
    date: "Mar 24",
    label: "Feature",
  },
];

function IssueRow({ issue }: { issue: Issue }) {
  const statusConfig = STATUS_CONFIG[issue.status];

  return (
    <Flex
      align="center"
      gap="sm"
      className="min-h-10 px-6 py-1 hover:bg-accent/50 cursor-default transition-colors"
    >
      <Text size="xs" variant="muted" className="w-16 shrink-0">
        {issue.id}
      </Text>
      <Icon icon={PRIORITY_ICONS[issue.priority]} size="2xs" />
      <Badge variant={statusConfig.variant} size="xs" appearance="outline">
        {statusConfig.label}
      </Badge>
      <Text size="sm" weight="medium" className="flex-1 min-w-0 truncate">
        {issue.title}
      </Text>
      {issue.label ? (
        <Badge variant="secondary" size="xs" appearance="outline">
          {issue.label}
        </Badge>
      ) : null}
      <Text size="xs" variant="muted" className="shrink-0 w-12 text-right">
        {issue.date}
      </Text>
      <Avatar size="2xs">
        <AvatarFallback name={issue.assignee} size="2xs" />
      </Avatar>
    </Flex>
  );
}

export default function LinearDemo() {
  return (
    <Flex className="h-screen" direction="row">
      {/* Sidebar */}
      <VStack
        gap="xs"
        className="w-[220px] shrink-0 bg-card border-r border-border"
      >
        {/* Workspace header */}
        <Flex align="center" justify="space-between" className="px-3 pt-3 pb-1">
          <HStack gap="xs" align="center">
            <Flex
              align="center"
              justify="center"
              className="size-6 rounded-md bg-primary"
            >
              <Text size="xs" className="text-primary-foreground font-bold">
                P
              </Text>
            </Flex>
            <Text size="sm" weight="semibold">
              PatternMode
            </Text>
          </HStack>
        </Flex>

        <VStack gap="2xs" className="px-2">
          <MenuItem icon={Inbox} size="sm">
            Inbox
          </MenuItem>
          <MenuItem icon={Search} size="sm">
            Search
          </MenuItem>
          <MenuItem icon={LayoutGrid} size="sm">
            My Issues
          </MenuItem>
        </VStack>

        <Separator />

        <VStack gap="2xs" className="px-2">
          <Text size="xs" variant="muted" weight="medium" className="px-2">
            Your Teams
          </Text>
          {TEAMS.map((team) => (
            <MenuItem key={team.name} size="sm" dot="default">
              <HStack gap="xs" align="center">
                <Dot color={team.color} size="sm" />
                <span>{team.name}</span>
              </HStack>
            </MenuItem>
          ))}
        </VStack>

        <Separator />

        <VStack gap="2xs" className="px-2">
          <MenuItem icon={Layers} size="sm">
            Views
          </MenuItem>
          <MenuItem icon={Timer} size="sm">
            Cycles
          </MenuItem>
          <MenuItem icon={Users} size="sm">
            Members
          </MenuItem>
        </VStack>

        {/* Bottom spacer */}
        <div className="flex-1" />

        <VStack gap="2xs" className="px-2 pb-3">
          <MenuItem icon={Settings} size="sm">
            Settings
          </MenuItem>
        </VStack>
      </VStack>

      {/* Main content */}
      <VStack className="flex-1 min-w-0">
        {/* Header */}
        <VStack gap="sm" className="px-6 pt-4 pb-0">
          <Flex align="center" justify="space-between">
            <HStack gap="sm" align="center">
              <Heading size="xs" level="1">
                Engineering
              </Heading>
              <Badge variant="secondary" size="xs">
                {ISSUES.length}
              </Badge>
            </HStack>
            <HStack gap="xs">
              <Button variant="ghost" size="sm" icon={ListFilter}>
                Filter
              </Button>
              <Button variant="ghost" size="sm" icon={Hash}>
                Group
              </Button>
              <Button variant="default" size="sm" icon={Plus}>
                New Issue
              </Button>
            </HStack>
          </Flex>

          <Tabs defaultValue="all" variant="line" size="sm">
            <TabsList>
              <TabsTrigger value="all" count={ISSUES.length}>
                All Issues
              </TabsTrigger>
              <TabsTrigger
                value="active"
                count={
                  ISSUES.filter(
                    (i) => i.status === "in-progress" || i.status === "todo",
                  ).length
                }
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="backlog"
                count={ISSUES.filter((i) => i.status === "backlog").length}
              >
                Backlog
              </TabsTrigger>
              <TabsTrigger
                value="done"
                count={ISSUES.filter((i) => i.status === "done").length}
              >
                Done
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ScrollArea className="flex-1">
                <VStack gap="none">
                  {ISSUES.map((issue) => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))}
                </VStack>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="active">
              <ScrollArea className="flex-1">
                <VStack gap="none">
                  {ISSUES.filter(
                    (i) => i.status === "in-progress" || i.status === "todo",
                  ).map((issue) => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))}
                </VStack>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="backlog">
              <ScrollArea className="flex-1">
                <VStack gap="none">
                  {ISSUES.filter((i) => i.status === "backlog").map((issue) => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))}
                </VStack>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="done">
              <ScrollArea className="flex-1">
                <VStack gap="none">
                  {ISSUES.filter((i) => i.status === "done").map((issue) => (
                    <IssueRow key={issue.id} issue={issue} />
                  ))}
                </VStack>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </VStack>
      </VStack>
    </Flex>
  );
}
