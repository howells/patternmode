"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@patternmode/ui/components/breadcrumb";
import { Button } from "@patternmode/ui/components/button";
import { CodeBlock } from "@patternmode/ui/components/code-block";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@patternmode/ui/components/collapsible";
import { Dot } from "@patternmode/ui/components/dot";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { Kbd, KbdGroup } from "@patternmode/ui/components/kbd";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsPanel,
  TabsTrigger,
} from "@patternmode/ui/components/tabs";
import { Text } from "@patternmode/ui/components/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@patternmode/ui/components/tooltip";
import {
  AppShell,
  AppShellSidebar,
} from "@patternmode/ui/compositions/app-shell";
import {
  Activity,
  ArrowDownUp,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  Database,
  FileJson,
  Filter,
  FolderOpen,
  Globe,
  Hash,
  Key,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Tag,
  Trash2,
  Zap,
} from "lucide-react";
import { useState } from "react";

/* -- Data --------------------------------------------------------- */

type DocumentStatus = "active" | "inactive" | "pending" | "archived";

interface UserDocument {
  id: string;
  name: string;
  email: string;
  status: DocumentStatus;
  role: string;
  createdAt: string;
  lastLogin: string;
  region: string;
  plan: string;
  company: string;
  phone: string;
  mfa: boolean;
  apiCalls: number;
  storageUsedMb: number;
  lastIp: string;
  tags: string[];
  preferences: {
    theme: string;
    locale: string;
    timezone: string;
    notifications: boolean;
  };
}

const DOCUMENTS: UserDocument[] = [
  {
    id: "usr_01HQ3A9V7X",
    name: "Ada Lovelace",
    email: "ada@example.dev",
    status: "active",
    role: "admin",
    createdAt: "2025-11-02T08:14:33Z",
    lastLogin: "2026-04-06T19:42:11Z",
    region: "us-east-1",
    plan: "enterprise",
    company: "Analytical Engines Ltd",
    phone: "+1 (415) 555-0142",
    mfa: true,
    apiCalls: 284_019,
    storageUsedMb: 2_847,
    lastIp: "203.0.113.42",
    tags: ["beta-tester", "early-adopter", "vip"],
    preferences: {
      theme: "dark",
      locale: "en-US",
      timezone: "America/New_York",
      notifications: true,
    },
  },
  {
    id: "usr_01HQ3B2K8Y",
    name: "Grace Hopper",
    email: "grace@example.dev",
    status: "active",
    role: "editor",
    createdAt: "2025-12-18T14:27:09Z",
    lastLogin: "2026-04-05T11:03:47Z",
    region: "eu-west-1",
    plan: "pro",
    company: "COBOL Systems Inc",
    phone: "+44 20 7946 0958",
    mfa: true,
    apiCalls: 147_832,
    storageUsedMb: 1_203,
    lastIp: "198.51.100.17",
    tags: ["contributor"],
    preferences: {
      theme: "light",
      locale: "en-GB",
      timezone: "Europe/London",
      notifications: true,
    },
  },
  {
    id: "usr_01HQ3C5M9Z",
    name: "Alan Turing",
    email: "alan@example.dev",
    status: "inactive",
    role: "viewer",
    createdAt: "2025-09-30T22:51:16Z",
    lastLogin: "2026-02-14T06:18:22Z",
    region: "us-east-1",
    plan: "free",
    company: "Enigma Research",
    phone: "+1 (650) 555-0198",
    mfa: false,
    apiCalls: 3_241,
    storageUsedMb: 47,
    lastIp: "192.0.2.88",
    tags: [],
    preferences: {
      theme: "system",
      locale: "en-US",
      timezone: "America/Los_Angeles",
      notifications: false,
    },
  },
  {
    id: "usr_01HQ3D8N0A",
    name: "Margaret Hamilton",
    email: "margaret@example.dev",
    status: "active",
    role: "admin",
    createdAt: "2025-10-15T03:09:44Z",
    lastLogin: "2026-04-07T01:55:38Z",
    region: "ap-southeast-1",
    plan: "enterprise",
    company: "Apollo Software",
    phone: "+65 6100 0042",
    mfa: true,
    apiCalls: 512_847,
    storageUsedMb: 4_102,
    lastIp: "203.0.113.91",
    tags: ["admin", "early-adopter"],
    preferences: {
      theme: "dark",
      locale: "en-US",
      timezone: "Asia/Singapore",
      notifications: true,
    },
  },
  {
    id: "usr_01HQ3E1P1B",
    name: "Dennis Ritchie",
    email: "dennis@example.dev",
    status: "archived",
    role: "editor",
    createdAt: "2025-08-22T17:33:01Z",
    lastLogin: "2025-12-01T09:27:55Z",
    region: "us-west-2",
    plan: "pro",
    company: "Bell Labs",
    phone: "+1 (908) 555-0167",
    mfa: false,
    apiCalls: 89_102,
    storageUsedMb: 892,
    lastIp: "198.51.100.44",
    tags: ["legacy"],
    preferences: {
      theme: "dark",
      locale: "en-US",
      timezone: "America/New_York",
      notifications: false,
    },
  },
  {
    id: "usr_01HQ3F4Q2C",
    name: "Barbara Liskov",
    email: "barbara@example.dev",
    status: "active",
    role: "editor",
    createdAt: "2026-01-04T10:44:29Z",
    lastLogin: "2026-04-06T16:08:12Z",
    region: "eu-west-1",
    plan: "pro",
    company: "MIT CSAIL",
    phone: "+1 (617) 555-0234",
    mfa: true,
    apiCalls: 203_445,
    storageUsedMb: 1_567,
    lastIp: "203.0.113.19",
    tags: ["contributor", "reviewer"],
    preferences: {
      theme: "light",
      locale: "en-US",
      timezone: "America/New_York",
      notifications: true,
    },
  },
  {
    id: "usr_01HQ3G7R3D",
    name: "Linus Torvalds",
    email: "linus@example.dev",
    status: "pending",
    role: "viewer",
    createdAt: "2026-03-28T21:16:53Z",
    lastLogin: "2026-03-28T21:16:53Z",
    region: "eu-central-1",
    plan: "free",
    company: "Linux Foundation",
    phone: "+358 9 123 4567",
    mfa: false,
    apiCalls: 0,
    storageUsedMb: 0,
    lastIp: "192.0.2.201",
    tags: ["new"],
    preferences: {
      theme: "dark",
      locale: "fi-FI",
      timezone: "Europe/Helsinki",
      notifications: true,
    },
  },
  {
    id: "usr_01HQ3H0S4E",
    name: "Vint Cerf",
    email: "vint@example.dev",
    status: "active",
    role: "admin",
    createdAt: "2025-07-11T05:02:18Z",
    lastLogin: "2026-04-04T13:29:06Z",
    region: "us-east-1",
    plan: "enterprise",
    company: "Internet Society",
    phone: "+1 (703) 555-0189",
    mfa: true,
    apiCalls: 1_042_887,
    storageUsedMb: 8_921,
    lastIp: "198.51.100.88",
    tags: ["vip", "founding-member"],
    preferences: {
      theme: "system",
      locale: "en-US",
      timezone: "America/New_York",
      notifications: true,
    },
  },
  {
    id: "usr_01HQ3J3T5F",
    name: "Radia Perlman",
    email: "radia@example.dev",
    status: "inactive",
    role: "viewer",
    createdAt: "2025-11-20T12:38:41Z",
    lastLogin: "2026-01-09T08:47:33Z",
    region: "us-west-2",
    plan: "free",
    company: "Dell EMC",
    phone: "+1 (408) 555-0321",
    mfa: false,
    apiCalls: 12_904,
    storageUsedMb: 156,
    lastIp: "192.0.2.55",
    tags: [],
    preferences: {
      theme: "light",
      locale: "en-US",
      timezone: "America/Los_Angeles",
      notifications: false,
    },
  },
  {
    id: "usr_01HQ3K6U6G",
    name: "Ken Thompson",
    email: "ken@example.dev",
    status: "active",
    role: "editor",
    createdAt: "2025-10-03T19:55:07Z",
    lastLogin: "2026-04-03T22:14:59Z",
    region: "ap-southeast-1",
    plan: "pro",
    company: "Google Research",
    phone: "+1 (650) 555-0456",
    mfa: true,
    apiCalls: 334_221,
    storageUsedMb: 2_103,
    lastIp: "203.0.113.77",
    tags: ["contributor", "beta-tester"],
    preferences: {
      theme: "dark",
      locale: "en-US",
      timezone: "America/Los_Angeles",
      notifications: true,
    },
  },
];

const STATUS_VARIANT: Record<
  DocumentStatus,
  "affirmative" | "destructive" | "warning" | "default"
> = {
  active: "affirmative",
  inactive: "destructive",
  pending: "warning",
  archived: "default",
};

const COLLECTIONS = [
  { name: "users", count: 10, icon: FileJson },
  { name: "sessions", count: 847, icon: FileJson },
  { name: "events", count: 24_102, icon: FileJson },
  { name: "billing", count: 156, icon: FileJson },
  { name: "audit_logs", count: 108_441, icon: FileJson },
  { name: "api_keys", count: 34, icon: Key },
  { name: "webhooks", count: 12, icon: Zap },
  { name: "permissions", count: 89, icon: Shield },
];

const INDEXES = [
  { name: "email_unique", fields: "email", type: "unique" },
  { name: "status_region", fields: "status, region", type: "compound" },
  { name: "created_at_desc", fields: "createdAt", type: "single" },
];

const ACTIVITY_LOG = [
  {
    action: "field.update",
    field: "lastLogin",
    time: "3 days ago",
    actor: "system",
  },
  {
    action: "field.update",
    field: "apiCalls",
    time: "3 days ago",
    actor: "system",
  },
  {
    action: "field.update",
    field: "storageUsedMb",
    time: "5 days ago",
    actor: "system",
  },
  {
    action: "field.update",
    field: "preferences.theme",
    time: "2 weeks ago",
    actor: "ada@example.dev",
  },
  {
    action: "tag.add",
    field: "vip",
    time: "1 month ago",
    actor: "admin@example.dev",
  },
  {
    action: "field.update",
    field: "plan",
    time: "2 months ago",
    actor: "billing-service",
  },
  {
    action: "field.update",
    field: "role",
    time: "5 months ago",
    actor: "admin@example.dev",
  },
  {
    action: "document.create",
    field: null,
    time: "5 months ago",
    actor: "signup-flow",
  },
];

/* -- Helpers ------------------------------------------------------ */

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function relativeTime(iso: string): string {
  const now = new Date("2026-04-09T12:00:00Z");
  const then = new Date(iso);
  const days = Math.floor((now.getTime() - then.getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/* -- Type color system --------------------------------------------- */

/** Dots carry the color, text stays muted — avoids garish rainbow labels. */

const TYPE_DOT_COLORS: Record<string, string> = {
  string: "bg-emerald-500",
  number: "bg-blue-500",
  date: "bg-amber-500",
  bool: "bg-violet-500",
  enum: "bg-cyan-500",
  id: "bg-indigo-500",
  ip: "bg-slate-400",
};

/* -- Sub-components ----------------------------------------------- */

function RecordRow({
  doc,
  isSelected,
  onSelect,
}: {
  doc: UserDocument;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <HStack
      align="center"
      gap="sm"
      className={`cursor-pointer rounded-md px-3 py-2 transition-colors ${
        isSelected
          ? "bg-blue-500/10 ring-1 ring-blue-500/20"
          : "hover:bg-accent/50"
      }`}
      onClick={onSelect}
    >
      <Avatar size="sm">
        <AvatarFallback name={doc.name} size="sm" />
      </Avatar>
      <VStack gap="2xs" className="flex-1 min-w-0">
        <HStack gap="xs" align="center">
          <Text size="sm" weight={isSelected ? "semibold" : "medium"} truncate>
            {doc.name}
          </Text>
          {doc.mfa && (
            <Icon icon={Shield} size="2xs" className="text-blue-500 shrink-0" />
          )}
        </HStack>
        <HStack gap="xs" align="center" className="min-w-0">
          <Text size="2xs" variant="muted" truncate font="mono">
            {doc.id}
          </Text>
          <Text size="2xs" variant="muted" className="shrink-0">
            ·
          </Text>
          <Text size="2xs" variant="muted" className="shrink-0">
            {relativeTime(doc.lastLogin)}
          </Text>
        </HStack>
      </VStack>
      <VStack gap="2xs" align="flex-end" className="shrink-0">
        <Badge
          variant={STATUS_VARIANT[doc.status]}
          size="xs"
          appearance="outline"
        >
          {doc.status}
        </Badge>
        <Text size="2xs" variant="muted" font="mono">
          {doc.role}
        </Text>
      </VStack>
    </HStack>
  );
}

function InspectorRow({
  field,
  value,
  type = "string",
  badge,
}: {
  field: string;
  value: string;
  type?: string;
  badge?: {
    label: string;
    variant:
      | "affirmative"
      | "destructive"
      | "warning"
      | "default"
      | "secondary";
  };
}) {
  const dotColor = TYPE_DOT_COLORS[type] ?? "bg-zinc-400";

  return (
    <Flex
      align="center"
      className="h-7 px-3 group hover:bg-accent/40 transition-colors"
    >
      <HStack gap="xs" align="center" className="w-44 shrink-0 min-w-0">
        <span
          className={`size-1.5 rounded-full ${dotColor} shrink-0 opacity-50`}
        />
        <Text size="2xs" font="mono" className="text-foreground/55" truncate>
          {field}
        </Text>
      </HStack>
      <Flex align="center" className="flex-1 min-w-0">
        {badge ? (
          <Badge variant={badge.variant} size="xs" appearance="outline">
            {badge.label}
          </Badge>
        ) : (
          <Text
            size="xs"
            font={type !== "string" ? "mono" : undefined}
            truncate
            className="select-all"
          >
            {value}
          </Text>
        )}
      </Flex>
      <Button
        variant="ghost"
        size="icon-2xs"
        icon={Copy}
        aria-label="Copy"
        className="opacity-0 group-hover:opacity-100 shrink-0"
      />
    </Flex>
  );
}

function DocumentDetail({ doc }: { doc: UserDocument }) {
  const jsonString = JSON.stringify(doc, null, 2);

  return (
    <VStack gap="none" className="h-full">
      {/* Header */}
      <Flex
        align="center"
        justify="space-between"
        noShrink
        className="px-3 h-10 border-b border-border"
      >
        <Breadcrumb>
          <BreadcrumbList className="text-xs gap-1">
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">
                datastore-prod
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="cursor-pointer">users</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono font-medium">
                {doc.id}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <HStack gap="2xs">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-xs"
                icon={Pencil}
                aria-label="Edit"
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={4}>
              Edit document{" "}
              <Kbd size="2xs" variant="ghost">
                E
              </Kbd>
            </TooltipContent>
          </Tooltip>
          <Button
            variant="ghost"
            size="icon-xs"
            icon={Trash2}
            aria-label="Delete"
            className="text-destructive"
          />
        </HStack>
      </Flex>

      {/* Tabbed content */}
      <Tabs
        defaultValue="fields"
        variant="line"
        size="sm"
        className="flex-1 min-h-0 flex flex-col"
      >
        <TabsList className="px-4 shrink-0">
          <TabsTrigger value="fields" count={Object.keys(doc).length}>
            Fields
          </TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="activity" count={ACTIVITY_LOG.length}>
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsPanel className="flex-1 min-h-0 overflow-hidden">
          {/* Fields tab */}
          <TabsContent value="fields" className="h-full">
            <ScrollArea className="h-full">
              <VStack gap="none">
                <InspectorRow field="id" value={doc.id} type="id" />
                <InspectorRow field="name" value={doc.name} type="string" />
                <InspectorRow field="email" value={doc.email} type="string" />
                <InspectorRow field="phone" value={doc.phone} type="string" />
                <InspectorRow
                  field="company"
                  value={doc.company}
                  type="string"
                />
                <InspectorRow
                  field="status"
                  value={doc.status}
                  type="enum"
                  badge={{
                    label: doc.status,
                    variant: STATUS_VARIANT[doc.status],
                  }}
                />
                <InspectorRow field="role" value={doc.role} type="enum" />
                <InspectorRow field="plan" value={doc.plan} type="enum" />
                <InspectorRow
                  field="mfa"
                  value={doc.mfa ? "true" : "false"}
                  type="bool"
                />
                <InspectorRow field="lastIp" value={doc.lastIp} type="ip" />
                <InspectorRow
                  field="apiCalls"
                  value={formatNumber(doc.apiCalls)}
                  type="number"
                />
                <InspectorRow
                  field="storageUsedMb"
                  value={`${formatNumber(doc.storageUsedMb)} MB`}
                  type="number"
                />
                <InspectorRow field="region" value={doc.region} type="string" />
                <InspectorRow
                  field="tags"
                  value={doc.tags.length > 0 ? doc.tags.join(", ") : "—"}
                  type="string"
                />
                <InspectorRow
                  field="preferences.theme"
                  value={doc.preferences.theme}
                  type="enum"
                />
                <InspectorRow
                  field="preferences.locale"
                  value={doc.preferences.locale}
                  type="string"
                />
                <InspectorRow
                  field="preferences.timezone"
                  value={doc.preferences.timezone}
                  type="string"
                />
                <InspectorRow
                  field="preferences.notifications"
                  value={doc.preferences.notifications ? "true" : "false"}
                  type="bool"
                />
                <InspectorRow
                  field="createdAt"
                  value={doc.createdAt.replace("T", " ").replace("Z", "")}
                  type="date"
                />
                <InspectorRow
                  field="lastLogin"
                  value={doc.lastLogin.replace("T", " ").replace("Z", "")}
                  type="date"
                />
              </VStack>
            </ScrollArea>
          </TabsContent>

          {/* JSON tab */}
          <TabsContent value="json" className="h-full">
            <ScrollArea className="h-full">
              <div className="p-4">
                <CodeBlock
                  code={jsonString}
                  filename={`${doc.id}.json`}
                  language="json"
                  lineNumbers
                />
              </div>
            </ScrollArea>
          </TabsContent>

          {/* Activity tab */}
          <TabsContent value="activity" className="h-full">
            <ScrollArea className="h-full">
              <VStack gap="none">
                {ACTIVITY_LOG.map((entry) => (
                  <Flex
                    key={`${entry.action}-${entry.field}`}
                    align="flex-start"
                    gap="sm"
                    className="px-4 py-2.5 border-b border-border/40 hover:bg-accent/30 transition-colors"
                  >
                    <Icon
                      icon={
                        entry.action === "document.create"
                          ? Plus
                          : entry.action === "tag.add"
                            ? Tag
                            : Activity
                      }
                      size="2xs"
                      className="text-muted-foreground mt-1 shrink-0"
                    />
                    <VStack gap="2xs" className="flex-1 min-w-0">
                      <HStack gap="xs" align="center" className="flex-wrap">
                        <Text
                          size="xs"
                          font="mono"
                          className="text-foreground/80"
                        >
                          {entry.action}
                        </Text>
                        {entry.field && (
                          <Text size="2xs" font="mono" variant="muted">
                            {entry.field}
                          </Text>
                        )}
                      </HStack>
                      <HStack gap="xs" align="center">
                        <Text size="2xs" variant="muted" font="mono">
                          {entry.actor}
                        </Text>
                        <Text size="2xs" variant="muted">
                          ·
                        </Text>
                        <Text size="2xs" variant="muted">
                          {entry.time}
                        </Text>
                      </HStack>
                    </VStack>
                  </Flex>
                ))}
              </VStack>
            </ScrollArea>
          </TabsContent>
        </TabsPanel>
      </Tabs>
    </VStack>
  );
}

/* -- Page --------------------------------------------------------- */

export default function DatastoreDemo() {
  const [selectedDoc, setSelectedDoc] = useState<UserDocument>(
    DOCUMENTS[0] as UserDocument,
  );

  return (
    <AppShell variant="framed">
      {/* Collection sidebar */}
      <AppShellSidebar width="w-56" edge="none">
        <HStack align="center" gap="sm" noShrink className="px-4 pt-3.5 pb-2">
          <div className="size-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
            <Icon icon={Database} size="2xs" className="text-white" />
          </div>
          <VStack gap="none">
            <Text size="sm" weight="semibold">
              Datastore
            </Text>
            <Text size="2xs" variant="muted" className="-mt-0.5">
              Production
            </Text>
          </VStack>
        </HStack>

        <VStack gap="none" className="px-3 pt-1 pb-2">
          <HStack
            align="center"
            gap="xs"
            className="rounded-md bg-accent/60 px-2.5 py-1.5 cursor-pointer"
          >
            <Icon icon={Search} size="xs" className="text-muted-foreground" />
            <Text size="xs" variant="muted" className="flex-1">
              Search
            </Text>
            <KbdGroup size="2xs">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </HStack>
        </VStack>

        <Separator />

        <ScrollArea className="flex-1">
          <VStack gap="none" className="px-2 py-2">
            <Text
              size="2xs"
              variant="muted"
              weight="medium"
              className="px-2 pb-1 uppercase tracking-wider"
            >
              Collections
            </Text>
            <Collapsible defaultOpen>
              <CollapsibleTrigger asChild>
                <HStack
                  align="center"
                  gap="xs"
                  className="cursor-pointer rounded-md px-2 py-1.5 hover:bg-accent/50"
                >
                  <Icon
                    icon={Database}
                    size="2xs"
                    className="text-muted-foreground"
                  />
                  <Text size="xs" weight="medium" className="flex-1">
                    datastore-prod
                  </Text>
                  <Icon
                    icon={ChevronDown}
                    size="2xs"
                    className="text-muted-foreground"
                  />
                </HStack>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <VStack gap="none" className="pl-3">
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger asChild>
                      <HStack
                        align="center"
                        gap="xs"
                        className="cursor-pointer rounded-md px-2 py-1 hover:bg-accent/50"
                      >
                        <Icon
                          icon={FolderOpen}
                          size="2xs"
                          className="text-muted-foreground"
                        />
                        <Text size="xs" className="flex-1">
                          Collections
                        </Text>
                        <Text size="2xs" variant="muted" tabularNums>
                          {COLLECTIONS.length}
                        </Text>
                      </HStack>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <VStack gap="none" className="pl-3">
                        {COLLECTIONS.map((col) => (
                          <HStack
                            key={col.name}
                            align="center"
                            gap="xs"
                            className={`cursor-pointer rounded-md px-2 py-1 ${
                              col.name === "users"
                                ? "bg-blue-500/10 text-foreground"
                                : "hover:bg-accent/50"
                            }`}
                          >
                            <Icon
                              icon={col.icon}
                              size="2xs"
                              className={
                                col.name === "users"
                                  ? "text-blue-500"
                                  : "text-muted-foreground"
                              }
                            />
                            <Text
                              size="xs"
                              weight={
                                col.name === "users" ? "medium" : "normal"
                              }
                              className="flex-1"
                            >
                              {col.name}
                            </Text>
                            <Text
                              size="2xs"
                              variant="muted"
                              tabularNums
                              font="mono"
                            >
                              {formatNumber(col.count)}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Indexes section */}
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <HStack
                        align="center"
                        gap="xs"
                        className="cursor-pointer rounded-md px-2 py-1 hover:bg-accent/50"
                      >
                        <Icon
                          icon={Hash}
                          size="2xs"
                          className="text-muted-foreground"
                        />
                        <Text size="xs" className="flex-1">
                          Indexes
                        </Text>
                        <Text size="2xs" variant="muted" tabularNums>
                          {INDEXES.length}
                        </Text>
                      </HStack>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <VStack gap="none" className="pl-3">
                        {INDEXES.map((idx) => (
                          <HStack
                            key={idx.name}
                            align="center"
                            gap="xs"
                            className="cursor-pointer rounded-md px-2 py-1 hover:bg-accent/50"
                          >
                            <Icon
                              icon={ChevronRight}
                              size="2xs"
                              className="text-muted-foreground"
                            />
                            <Text size="xs" truncate className="flex-1">
                              {idx.name}
                            </Text>
                            <Badge
                              variant="secondary"
                              size="xs"
                              className="text-[10px]"
                            >
                              {idx.type}
                            </Badge>
                          </HStack>
                        ))}
                      </VStack>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Settings */}
                  <HStack
                    align="center"
                    gap="xs"
                    className="cursor-pointer rounded-md px-2 py-1 hover:bg-accent/50"
                  >
                    <Icon
                      icon={Settings}
                      size="2xs"
                      className="text-muted-foreground"
                    />
                    <Text size="xs">Settings</Text>
                  </HStack>
                </VStack>
              </CollapsibleContent>
            </Collapsible>
          </VStack>
        </ScrollArea>

        <VStack noShrink gap="xs" className="px-3 pb-3">
          <Separator />
          <HStack align="center" justify="space-between" className="px-1">
            <HStack gap="xs" align="center">
              <Dot variant="affirmative" size="xs" />
              <Text size="2xs" variant="muted">
                Connected
              </Text>
            </HStack>
            <Text size="2xs" variant="muted" font="mono">
              v4.2.1
            </Text>
          </HStack>
        </VStack>
      </AppShellSidebar>

      {/* Record list — center panel */}
      <VStack className="w-80 shrink-0 overflow-hidden border-r border-border bg-card">
        {/* Toolbar */}
        <VStack gap="none" noShrink className="border-b border-border">
          <Flex align="center" justify="space-between" className="px-4 py-2.5">
            <HStack gap="xs" align="center">
              <Text size="sm" weight="semibold" font="mono">
                users
              </Text>
              <Badge variant="secondary" size="xs">
                {DOCUMENTS.length}
              </Badge>
            </HStack>
            <HStack gap="xs">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Filter}
                    aria-label="Filter"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={4}>
                  Filter records
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={ArrowDownUp}
                    aria-label="Sort"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={4}>
                  Sort records
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={RefreshCw}
                    aria-label="Refresh"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={4}>
                  Refresh{" "}
                  <Kbd size="2xs" variant="ghost">
                    R
                  </Kbd>
                </TooltipContent>
              </Tooltip>
              <Button size="xs" icon={Plus}>
                New
              </Button>
            </HStack>
          </Flex>
          {/* Active filters */}
          <Flex align="center" gap="xs" className="px-4 pb-2 flex-wrap">
            <Badge variant="secondary" size="xs" className="gap-1">
              status: active
              <span className="text-muted-foreground cursor-pointer hover:text-foreground">
                ×
              </span>
            </Badge>
            <Badge variant="secondary" size="xs" className="gap-1">
              plan: enterprise, pro
              <span className="text-muted-foreground cursor-pointer hover:text-foreground">
                ×
              </span>
            </Badge>
          </Flex>
        </VStack>

        <ScrollArea className="flex-1">
          <VStack gap="xs" className="p-2">
            {DOCUMENTS.map((doc) => (
              <RecordRow
                key={doc.id}
                doc={doc}
                isSelected={selectedDoc.id === doc.id}
                onSelect={() => setSelectedDoc(doc)}
              />
            ))}
          </VStack>
        </ScrollArea>

        <Flex
          noShrink
          align="center"
          justify="space-between"
          className="px-4 py-2 border-t border-border"
        >
          <HStack gap="xs" align="center">
            <Icon icon={Clock} size="2xs" className="text-emerald-500" />
            <Text
              size="2xs"
              font="mono"
              className="text-emerald-600 dark:text-emerald-400"
            >
              12ms
            </Text>
          </HStack>
          <HStack gap="sm" align="center">
            <HStack gap="xs" align="center">
              <Dot variant="affirmative" size="xs" />
              <Text size="2xs" variant="muted">
                Connected
              </Text>
            </HStack>
            <HStack gap="xs" align="center">
              <Icon icon={Globe} size="2xs" className="text-muted-foreground" />
              <Text size="2xs" variant="muted" font="mono">
                us-east-1
              </Text>
            </HStack>
          </HStack>
        </Flex>
      </VStack>

      {/* Document detail — right panel */}
      <VStack grow className="min-w-0 overflow-hidden bg-background">
        <DocumentDetail doc={selectedDoc} />
      </VStack>
    </AppShell>
  );
}
