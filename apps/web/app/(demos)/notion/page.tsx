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
import { Card } from "@patternmode/ui/components/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@patternmode/ui/components/collapsible";
import { Flex } from "@patternmode/ui/components/flex";
import { Heading } from "@patternmode/ui/components/heading";
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
  AlertCircle,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Hash,
  Lightbulb,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Star,
  Trash2,
  Users,
} from "lucide-react";

/* -- Data --------------------------------------------------------- */

interface PageNode {
  name: string;
  icon: typeof FileText;
  children?: PageNode[];
}

const WORKSPACE_PAGES: PageNode[] = [
  {
    name: "Getting Started",
    icon: BookOpen,
    children: [
      { name: "Quick Start Guide", icon: FileText },
      { name: "Architecture Overview", icon: FileText },
      { name: "Contributing", icon: FileText },
    ],
  },
  {
    name: "Engineering Wiki",
    icon: Hash,
    children: [
      { name: "API Reference", icon: FileText },
      { name: "Database Schema", icon: FileText },
      { name: "Deployment Guide", icon: FileText },
      { name: "Testing Strategy", icon: FileText },
    ],
  },
  {
    name: "Meeting Notes",
    icon: Calendar,
    children: [
      { name: "2026-04-07 Sprint Planning", icon: FileText },
      { name: "2026-04-04 Retrospective", icon: FileText },
      { name: "2026-04-01 Design Review", icon: FileText },
    ],
  },
  {
    name: "Product Roadmap",
    icon: Star,
    children: [
      { name: "Q2 2026 Goals", icon: FileText },
      { name: "Feature Requests", icon: FileText },
    ],
  },
];

const SERVICES = [
  { service: "Auth Service", status: "Stable", owner: "Platform Team" },
  { service: "User Service", status: "Stable", owner: "Platform Team" },
  { service: "Payment Service", status: "Beta", owner: "Commerce Team" },
  {
    service: "Notification Service",
    status: "Refactoring",
    owner: "Platform Team",
  },
  { service: "Analytics Service", status: "Stable", owner: "Data Team" },
];

/* -- Sub-components ----------------------------------------------- */

function PageTreeGroup({ node }: { node: PageNode }) {
  if (!node.children) {
    return (
      <MenuItem icon={node.icon} size="xs">
        {node.name}
      </MenuItem>
    );
  }

  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <MenuItem icon={node.icon} size="xs" suffixIcon={ChevronRight}>
          {node.name}
        </MenuItem>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <VStack gap="none" className="pl-4">
          {node.children.map((child) => (
            <PageTreeGroup key={child.name} node={child} />
          ))}
        </VStack>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Comment({
  name,
  date,
  text,
}: {
  name: string;
  date: string;
  text: string;
}) {
  return (
    <HStack gap="sm" align="flex-start" className="group">
      <Avatar size="sm">
        <AvatarFallback name={name} size="sm" />
      </Avatar>
      <VStack gap="2xs" className="flex-1">
        <HStack gap="xs" align="baseline">
          <Text size="sm" weight="medium">
            {name}
          </Text>
          <Text size="xs" variant="muted">
            {date}
          </Text>
        </HStack>
        <Text size="sm">{text}</Text>
      </VStack>
      <Button
        variant="ghost"
        size="icon-2xs"
        icon={MoreHorizontal}
        aria-label="More"
        className="opacity-0 group-hover:opacity-100"
      />
    </HStack>
  );
}

/* -- Page --------------------------------------------------------- */

export default function NotionDemo() {
  return (
    <AppShell variant="bordered">
      {/* Sidebar */}
      <AppShellSidebar width="w-60">
        <HStack align="center" gap="sm" noShrink className="px-4 pt-4 pb-2">
          <div className="size-5 rounded-full bg-foreground" />
          <Text
            size="xs"
            variant="muted"
            weight="medium"
            className="tracking-wide uppercase"
          >
            Workspace
          </Text>
        </HStack>

        <VStack gap="2xs" className="px-2">
          <MenuItem icon={Search} size="xs" kbd={["Cmd", "K"]}>
            Quick Find
          </MenuItem>
          <MenuItem icon={Clock} size="xs">
            Recent
          </MenuItem>
          <MenuItem icon={Star} size="xs">
            Favorites
          </MenuItem>
        </VStack>

        <Separator className="my-2" />

        <Flex align="center" justify="space-between" className="px-4">
          <Text size="xs" variant="muted" weight="medium">
            Pages
          </Text>
          <Button
            variant="ghost"
            size="icon-2xs"
            icon={Plus}
            aria-label="New page"
          />
        </Flex>

        <ScrollArea className="flex-1 px-2">
          <VStack gap="none">
            {WORKSPACE_PAGES.map((node) => (
              <PageTreeGroup key={node.name} node={node} />
            ))}
          </VStack>
        </ScrollArea>

        <Separator />
        <VStack gap="2xs" className="px-2 py-2">
          <MenuItem icon={Users} size="xs">
            Members
          </MenuItem>
          <MenuItem icon={Trash2} size="xs">
            Trash
          </MenuItem>
        </VStack>
      </AppShellSidebar>

      {/* Main */}
      <AppShellContent>
        <ScrollArea className="flex-1">
          {/* Cover area — subtle gradient */}
          <div className="h-32 bg-gradient-to-b from-zinc-100 to-background" />

          <VStack className="max-w-2xl mx-auto px-12 -mt-12 pb-24" gap="lg">
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Engineering Wiki</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Architecture Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Page header */}
            <VStack gap="sm">
              <Heading size="2xl" level="1">
                Architecture Overview
              </Heading>

              {/* Page properties — inline tags */}
              <HStack gap="sm" align="center">
                <HStack gap="xs" align="center">
                  <Avatar size="2xs">
                    <AvatarFallback name="Sarah Chen" size="2xs" />
                  </Avatar>
                  <Text size="xs" variant="muted">
                    Sarah Chen
                  </Text>
                </HStack>
                <Text size="xs" variant="muted">
                  &middot;
                </Text>
                <Text size="xs" variant="muted">
                  April 4, 2026
                </Text>
                <Text size="xs" variant="muted">
                  &middot;
                </Text>
                <Badge variant="affirmative" size="xs" appearance="outline">
                  Published
                </Badge>
              </HStack>

              {/* Actions */}
              <HStack gap="xs">
                <Button variant="ghost" size="xs" icon={Share2}>
                  Share
                </Button>
                <Button variant="ghost" size="xs" icon={Star}>
                  Favorite
                </Button>
                <Button variant="ghost" size="xs" icon={MoreHorizontal}>
                  More
                </Button>
              </HStack>
            </VStack>

            <Separator />

            {/* Document body */}
            <VStack gap="xl">
              <Text size="base" className="leading-relaxed">
                This document provides a high-level overview of our system
                architecture, including the major services, data flows, and
                deployment topology. It serves as the canonical reference for
                engineering onboarding and architectural decisions.
              </Text>

              {/* Key Principle callout */}
              <Card
                variant="muted"
                className="px-6 border-l-2 border-l-foreground"
              >
                <HStack gap="sm" align="flex-start">
                  <Icon
                    icon={Lightbulb}
                    size="sm"
                    className="mt-0.5 text-amber-500"
                  />
                  <VStack gap="xs">
                    <Text size="sm" weight="semibold">
                      Key Principle
                    </Text>
                    <Text size="sm" className="leading-relaxed">
                      All services communicate through the event bus. Direct
                      service-to-service calls are prohibited except for
                      synchronous read operations via the API gateway.
                    </Text>
                  </VStack>
                </HStack>
              </Card>

              <VStack gap="sm">
                <Heading size="lg" level="2">
                  System Components
                </Heading>
                <Text size="base" className="leading-relaxed">
                  The platform consists of five core services, each responsible
                  for a bounded context within the domain model. Services are
                  independently deployable and maintain their own data stores.
                </Text>
              </VStack>

              {/* Service table */}
              <VStack gap="none" className="rounded-lg overflow-hidden">
                {SERVICES.map((row, i) => (
                  <Flex
                    key={row.service}
                    align="center"
                    gap="sm"
                    className={`px-4 py-3 ${i % 2 === 0 ? "bg-muted/30" : ""}`}
                  >
                    <Text size="sm" weight="medium" className="w-48">
                      {row.service}
                    </Text>
                    <Badge
                      variant={
                        row.status === "Stable"
                          ? "affirmative"
                          : row.status === "Beta"
                            ? "warning"
                            : "info"
                      }
                      size="xs"
                    >
                      {row.status}
                    </Badge>
                    <Text
                      size="sm"
                      variant="muted"
                      align="right"
                      className="flex-1"
                    >
                      {row.owner}
                    </Text>
                  </Flex>
                ))}
              </VStack>

              <VStack gap="sm">
                <Heading size="lg" level="2">
                  Data Flow
                </Heading>
                <Text size="base" className="leading-relaxed">
                  All writes go through the command pipeline, which validates
                  input, applies business rules, persists changes, and publishes
                  domain events. Reads are served from materialized views
                  optimized for each query pattern.
                </Text>
              </VStack>

              {/* Warning callout */}
              <Card
                variant="muted"
                className="px-6 border-l-2 border-l-amber-500"
              >
                <HStack gap="sm" align="flex-start">
                  <Icon
                    icon={AlertCircle}
                    size="sm"
                    className="mt-0.5 text-amber-500"
                  />
                  <VStack gap="xs">
                    <Text size="sm" weight="semibold">
                      Migration in Progress
                    </Text>
                    <Text size="sm" className="leading-relaxed">
                      The Notification Service is being migrated from polling to
                      event-driven. See ENG-475 for the tracking issue. Expected
                      completion: April 15, 2026.
                    </Text>
                  </VStack>
                </HStack>
              </Card>

              <VStack gap="sm">
                <Heading size="lg" level="2">
                  Deployment
                </Heading>
                <Text size="base" className="leading-relaxed">
                  Services are containerized and deployed to a Kubernetes
                  cluster with auto-scaling policies based on CPU and request
                  latency metrics. Blue-green deployments are used for all
                  production releases.
                </Text>
              </VStack>

              <Separator />

              {/* Comments */}
              <VStack gap="base">
                <HStack gap="xs" align="center">
                  <Icon icon={MessageSquare} size="xs" />
                  <Text size="sm" weight="medium">
                    2 comments
                  </Text>
                </HStack>

                <VStack gap="lg">
                  <Comment
                    name="Marcus Johnson"
                    date="Apr 3"
                    text="Should we add a section about the caching layer? The Redis cluster setup is non-obvious for new engineers."
                  />
                  <Comment
                    name="Sarah Chen"
                    date="Apr 4"
                    text="Good call. I will add that in the next revision along with the CDN configuration details."
                  />
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </ScrollArea>
      </AppShellContent>
    </AppShell>
  );
}
