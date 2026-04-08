"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { MenuItem } from "@patternmode/ui/components/menu-item";

import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
import {
  AppShell,
  AppShellContent,
  AppShellSidebar,
} from "@patternmode/ui/compositions/app-shell";
import {
  ArrowUpCircle,
  CheckCircle2,
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
  Users,
  XCircle,
} from "lucide-react";

/* -- Data --------------------------------------------------------- */

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

const STATUS_CONFIG: Record<
  Status,
  { icon: typeof Circle; color: string; label: string }
> = {
  "in-progress": {
    icon: ArrowUpCircle,
    color: "text-amber-500",
    label: "In Progress",
  },
  todo: { icon: Circle, color: "text-blue-500", label: "Todo" },
  backlog: { icon: Circle, color: "text-zinc-400", label: "Backlog" },
  done: { icon: CheckCircle2, color: "text-emerald-500", label: "Done" },
  cancelled: { icon: XCircle, color: "text-zinc-400", label: "Cancelled" },
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
  {
    id: "ENG-466",
    title: "Replace polling with SSE for real-time dashboard",
    status: "in-progress",
    priority: "high",
    assignee: "Sarah Chen",
    date: "Mar 23",
    label: "Feature",
  },
  {
    id: "ENG-465",
    title: "Fix Safari rendering bug in data table headers",
    status: "todo",
    priority: "medium",
    assignee: "Elena Rodriguez",
    date: "Mar 22",
    label: "Bug",
  },
  {
    id: "ENG-464",
    title: "Add request tracing with OpenTelemetry spans",
    status: "backlog",
    priority: "medium",
    assignee: "James Wright",
    date: "Mar 21",
    label: "Infra",
  },
  {
    id: "ENG-463",
    title: "Implement webhook retry logic with exponential backoff",
    status: "in-progress",
    priority: "high",
    assignee: "Marcus Johnson",
    date: "Mar 20",
  },
  {
    id: "ENG-462",
    title: "Migrate Redis cache layer to cluster mode",
    status: "done",
    priority: "high",
    assignee: "James Wright",
    date: "Mar 19",
    label: "Infra",
  },
  {
    id: "ENG-461",
    title: "Add input validation for file upload endpoints",
    status: "done",
    priority: "urgent",
    assignee: "Sarah Chen",
    date: "Mar 18",
    label: "Security",
  },
  {
    id: "ENG-460",
    title: "Create design token export script for Figma sync",
    status: "backlog",
    priority: "low",
    assignee: "Elena Rodriguez",
    date: "Mar 17",
  },
  {
    id: "ENG-459",
    title: "Fix timezone handling in scheduled report generation",
    status: "todo",
    priority: "medium",
    assignee: "Priya Patel",
    date: "Mar 16",
    label: "Bug",
  },
  {
    id: "ENG-458",
    title: "Implement row-level security for multi-tenant data",
    status: "in-progress",
    priority: "urgent",
    assignee: "James Wright",
    date: "Mar 15",
    label: "Security",
  },
];

/* -- Helpers ------------------------------------------------------ */

function IssueRow({ issue }: { issue: Issue }) {
  const config = STATUS_CONFIG[issue.status];
  return (
    <HStack
      align="center"
      gap="sm"
      className="group cursor-pointer rounded-md px-3 py-2 hover:bg-accent"
    >
      <Icon icon={config.icon} size="xs" className={config.color} />
      <Text
        size="2xs"
        variant="muted"
        font="mono"
        tabularNums
        className="w-16 shrink-0"
      >
        {issue.id}
      </Text>
      <Text size="sm" truncate className="flex-1">
        {issue.title}
      </Text>
      {issue.label && (
        <Badge variant="secondary" size="xs" appearance="outline">
          {issue.label}
        </Badge>
      )}
      <Text size="2xs" variant="muted" tabularNums className="shrink-0">
        {issue.date}
      </Text>
      <Avatar size="2xs">
        <AvatarFallback name={issue.assignee} size="2xs" />
      </Avatar>
    </HStack>
  );
}

function StatusGroup({ status, issues }: { status: Status; issues: Issue[] }) {
  const config = STATUS_CONFIG[status];
  if (issues.length === 0) return null;

  return (
    <VStack gap="none">
      <HStack align="center" gap="sm" className="px-3 py-2">
        <Icon icon={config.icon} size="xs" className={config.color} />
        <Text size="xs" weight="semibold">
          {config.label}
        </Text>
        <Text size="xs" variant="muted" tabularNums>
          {issues.length}
        </Text>
      </HStack>
      <VStack gap="none">
        {issues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </VStack>
    </VStack>
  );
}

/* -- Page --------------------------------------------------------- */

const inProgress = ISSUES.filter((i) => i.status === "in-progress");
const todo = ISSUES.filter((i) => i.status === "todo");
const backlog = ISSUES.filter((i) => i.status === "backlog");
const doneIssues = ISSUES.filter((i) => i.status === "done");

const totalActive = inProgress.length + todo.length;
const progressPercent = Math.round((doneIssues.length / ISSUES.length) * 100);

export default function LinearDemo() {
  return (
    <AppShell variant="bordered">
      {/* Sidebar */}
      <AppShellSidebar width="w-56">
        <HStack align="center" gap="sm" noShrink className="px-4 pt-4 pb-2">
          <div className="size-5 rounded-full bg-foreground" />
          <Text
            size="xs"
            variant="muted"
            weight="medium"
            className="tracking-wide uppercase"
          >
            Patternmode
          </Text>
        </HStack>

        <VStack gap="none" className="px-2 pb-1">
          <MenuItem icon={Inbox} size="xs">
            Inbox
          </MenuItem>
          <MenuItem icon={Search} size="xs">
            Search
          </MenuItem>
          <MenuItem icon={LayoutGrid} size="xs" isActive>
            My Issues
          </MenuItem>
        </VStack>

        <ScrollArea className="flex-1">
          <Separator className="my-2" />

          <VStack gap="none" className="px-2 py-1">
            <Text
              size="2xs"
              variant="muted"
              weight="medium"
              className="px-2.5 pb-1.5"
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

          <Separator className="my-2" />

          <VStack gap="none" className="px-2 py-1">
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
        </ScrollArea>

        <VStack noShrink className="px-2 pb-3">
          <MenuItem icon={Settings} size="xs">
            Settings
          </MenuItem>
        </VStack>
      </AppShellSidebar>

      {/* Main */}
      <AppShellContent>
        {/* Header */}
        <Flex
          align="center"
          justify="space-between"
          noShrink
          className="px-6 pt-6 pb-4"
        >
          <VStack gap="2xs">
            <Text size="lg" weight="semibold">
              Engineering
            </Text>
            <Text size="xs" variant="muted">
              {totalActive} active &middot; {doneIssues.length} done &middot;{" "}
              {ISSUES.length} total
            </Text>
          </VStack>
          <HStack gap="xs">
            <Button variant="ghost" size="xs" icon={ListFilter}>
              Filter
            </Button>
            <Button variant="ghost" size="xs" icon={Hash}>
              Group
            </Button>
            <Button size="xs" icon={Plus}>
              New Issue
            </Button>
          </HStack>
        </Flex>

        <Separator />

        {/* Grouped issue list */}
        <ScrollArea className="min-h-0 flex-1">
          <VStack gap="lg" className="px-3 py-4">
            <StatusGroup status="in-progress" issues={inProgress} />
            <StatusGroup status="todo" issues={todo} />
            <StatusGroup status="backlog" issues={backlog} />
            <StatusGroup status="done" issues={doneIssues} />
          </VStack>
        </ScrollArea>
      </AppShellContent>
    </AppShell>
  );
}
