"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { Dot } from "@patternmode/ui/components/dot";
import { Flex } from "@patternmode/ui/components/flex";
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
  AlertTriangle,
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  Hash,
  Inbox,
  Layers,
  LayoutGrid,
  ListFilter,
  Minus,
  Plus,
  Search,
  Settings,
  SignalHigh,
  SignalLow,
  SignalMedium,
  Timer,
  Users,
  XCircle,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────────── */

const TEAMS = [
  { name: "Engineering", color: "#3b82f6" },
  { name: "Design", color: "#ec4899" },
  { name: "Product", color: "#22c55e" },
  { name: "Infrastructure", color: "#f59e0b" },
];

type Status = "backlog" | "todo" | "in-progress" | "done" | "cancelled";

interface Issue {
  id: string;
  title: string;
  status: Status;
  priority: "urgent" | "high" | "medium" | "low" | "none";
  assignee: string;
  date: string;
  label?: string;
}

const STATUS_ICON: Record<Status, typeof Circle> = {
  backlog: Circle,
  todo: Circle,
  "in-progress": ArrowUpCircle,
  done: CheckCircle2,
  cancelled: XCircle,
};

const STATUS_COLOR: Record<Status, string> = {
  backlog: "text-muted-foreground",
  todo: "text-muted-foreground",
  "in-progress": "text-amber-500",
  done: "text-emerald-500",
  cancelled: "text-destructive",
};

const PRIORITY_ICON: Record<Issue["priority"], typeof Circle> = {
  urgent: AlertTriangle,
  high: SignalHigh,
  medium: SignalMedium,
  low: SignalLow,
  none: Minus,
};

const ISSUES: Issue[] = [
  {
    id: "ENG-481",
    title: "Fix memory leak in WebSocket connection handler",
    status: "in-progress",
    priority: "urgent",
    assignee: "SC",
    date: "Apr 4",
    label: "Bug",
  },
  {
    id: "ENG-480",
    title: "Implement rate limiting for public API endpoints",
    status: "in-progress",
    priority: "high",
    assignee: "MJ",
    date: "Apr 3",
    label: "Security",
  },
  {
    id: "ENG-479",
    title: "Add dark mode support to dashboard components",
    status: "todo",
    priority: "medium",
    assignee: "ER",
    date: "Apr 3",
    label: "Feature",
  },
  {
    id: "ENG-478",
    title: "Optimize database queries for user search",
    status: "todo",
    priority: "high",
    assignee: "JW",
    date: "Apr 2",
  },
  {
    id: "ENG-477",
    title: "Migrate authentication flow to OAuth 2.1",
    status: "in-progress",
    priority: "high",
    assignee: "SC",
    date: "Apr 2",
    label: "Security",
  },
  {
    id: "ENG-476",
    title: "Add E2E tests for checkout flow",
    status: "backlog",
    priority: "medium",
    assignee: "PP",
    date: "Apr 1",
    label: "Testing",
  },
  {
    id: "ENG-475",
    title: "Refactor notification service to use event bus",
    status: "backlog",
    priority: "low",
    assignee: "MJ",
    date: "Apr 1",
  },
  {
    id: "ENG-474",
    title: "Set up monitoring alerts for payment failures",
    status: "done",
    priority: "urgent",
    assignee: "JW",
    date: "Mar 31",
    label: "Infra",
  },
  {
    id: "ENG-473",
    title: "Update TypeScript to v5.8 across all packages",
    status: "done",
    priority: "low",
    assignee: "ER",
    date: "Mar 30",
  },
  {
    id: "ENG-472",
    title: "Implement cursor-based pagination for feed API",
    status: "backlog",
    priority: "medium",
    assignee: "PP",
    date: "Mar 29",
    label: "Feature",
  },
  {
    id: "ENG-471",
    title: "Fix race condition in concurrent file uploads",
    status: "todo",
    priority: "high",
    assignee: "SC",
    date: "Mar 28",
    label: "Bug",
  },
  {
    id: "ENG-470",
    title: "Add support for bulk operations in admin panel",
    status: "backlog",
    priority: "medium",
    assignee: "MJ",
    date: "Mar 27",
    label: "Feature",
  },
  {
    id: "ENG-469",
    title: "Audit and rotate all third-party API keys",
    status: "done",
    priority: "urgent",
    assignee: "JW",
    date: "Mar 26",
    label: "Security",
  },
  {
    id: "ENG-468",
    title: "Create shared component library documentation",
    status: "todo",
    priority: "low",
    assignee: "ER",
    date: "Mar 25",
  },
  {
    id: "ENG-467",
    title: "Implement graceful degradation for offline mode",
    status: "backlog",
    priority: "medium",
    assignee: "PP",
    date: "Mar 24",
    label: "Feature",
  },
];

/* ── Issue Row ────────────────────────────────────────────────────── */

function IssueRow({ issue }: { issue: Issue }) {
  return (
    <HStack
      align="center"
      gap="sm"
      className="group h-9 cursor-default px-4 transition-colors hover:bg-muted/50"
    >
      {/* ID */}
      <Text size="2xs" variant="muted" className="w-16 shrink-0 tabular-nums">
        {issue.id}
      </Text>

      {/* Priority icon */}
      <Icon
        icon={PRIORITY_ICON[issue.priority]}
        size="2xs"
        className="shrink-0 text-muted-foreground"
      />

      {/* Status icon — colored */}
      <Icon
        icon={STATUS_ICON[issue.status]}
        size="2xs"
        className={`shrink-0 ${STATUS_COLOR[issue.status]}`}
      />

      {/* Title */}
      <Text size="sm" className="min-w-0 flex-1 truncate">
        {issue.title}
      </Text>

      {/* Label */}
      {issue.label && (
        <Badge variant="secondary" size="2xs" appearance="outline">
          {issue.label}
        </Badge>
      )}

      {/* Date */}
      <Text
        size="2xs"
        variant="muted"
        className="w-14 shrink-0 text-right tabular-nums"
      >
        {issue.date}
      </Text>

      {/* Assignee */}
      <Avatar size="2xs">
        <AvatarFallback name={issue.assignee} size="2xs" />
      </Avatar>
    </HStack>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function LinearDemo() {
  const active = ISSUES.filter(
    (i) => i.status === "in-progress" || i.status === "todo",
  );
  const backlog = ISSUES.filter((i) => i.status === "backlog");
  const done = ISSUES.filter((i) => i.status === "done");

  return (
    <Flex fullHeight>
      {/* ── Sidebar ────────────────────────────────────────────── */}
      <VStack
        noShrink
        gap="none"
        className="w-52 border-r border-border bg-card"
      >
        {/* Workspace */}
        <HStack align="center" gap="xs" className="px-3 py-2.5">
          <Flex
            align="center"
            justify="center"
            className="size-5 rounded bg-primary"
          >
            <Text size="2xs" className="font-bold text-primary-foreground">
              P
            </Text>
          </Flex>
          <Text size="sm" weight="medium">
            PatternMode
          </Text>
        </HStack>

        {/* Nav */}
        <VStack gap="none" className="px-1.5 py-1">
          <MenuItem icon={Inbox} size="xs">
            Inbox
          </MenuItem>
          <MenuItem icon={Search} size="xs">
            Search
          </MenuItem>
          <MenuItem icon={LayoutGrid} size="xs">
            My Issues
          </MenuItem>
        </VStack>

        <Separator className="my-1" />

        {/* Teams */}
        <VStack gap="none" className="px-1.5 py-1">
          <Text
            size="2xs"
            variant="muted"
            weight="medium"
            className="px-2 pb-1 uppercase tracking-wider"
          >
            Your Teams
          </Text>
          {TEAMS.map((team) => (
            <MenuItem
              key={team.name}
              size="xs"
              dotColor={team.color}
              dot="default"
            >
              {team.name}
            </MenuItem>
          ))}
        </VStack>

        <Separator className="my-1" />

        <VStack gap="none" className="px-1.5 py-1">
          <MenuItem icon={Layers} size="xs">
            Views
          </MenuItem>
          <MenuItem icon={Timer} size="xs">
            Cycles
          </MenuItem>
          <MenuItem icon={Users} size="xs">
            Members
          </MenuItem>
        </VStack>

        {/* Bottom */}
        <VStack grow justify="flex-end" className="px-1.5 pb-2">
          <MenuItem icon={Settings} size="xs">
            Settings
          </MenuItem>
        </VStack>
      </VStack>

      {/* ── Main ───────────────────────────────────────────────── */}
      <VStack grow truncate gap="none">
        {/* Header */}
        <VStack gap="xs" className="px-4 pt-3 pb-0">
          <Flex align="center" justify="space-between">
            <HStack gap="xs" align="center">
              <Text size="base" weight="semibold">
                Engineering
              </Text>
              <Badge variant="secondary" size="2xs">
                {ISSUES.length}
              </Badge>
            </HStack>
            <HStack gap="2xs">
              <Button variant="ghost" size="sm" icon={ListFilter}>
                Filter
              </Button>
              <Button variant="ghost" size="sm" icon={Hash}>
                Group
              </Button>
              <Button size="sm" icon={Plus}>
                New Issue
              </Button>
            </HStack>
          </Flex>
        </VStack>

        {/* Tabs + content */}
        <Tabs
          defaultValue="all"
          variant="line"
          size="xs"
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="px-4">
            <TabsTrigger value="all" count={ISSUES.length}>
              All Issues
            </TabsTrigger>
            <TabsTrigger value="active" count={active.length}>
              Active
            </TabsTrigger>
            <TabsTrigger value="backlog" count={backlog.length}>
              Backlog
            </TabsTrigger>
            <TabsTrigger value="done" count={done.length}>
              Done
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1 overflow-y-auto">
            <VStack gap="none">
              {ISSUES.map((issue) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </VStack>
          </TabsContent>

          <TabsContent value="active" className="flex-1 overflow-y-auto">
            <VStack gap="none">
              {active.map((issue) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </VStack>
          </TabsContent>

          <TabsContent value="backlog" className="flex-1 overflow-y-auto">
            <VStack gap="none">
              {backlog.map((issue) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </VStack>
          </TabsContent>

          <TabsContent value="done" className="flex-1 overflow-y-auto">
            <VStack gap="none">
              {done.map((issue) => (
                <IssueRow key={issue.id} issue={issue} />
              ))}
            </VStack>
          </TabsContent>
        </Tabs>
      </VStack>
    </Flex>
  );
}
