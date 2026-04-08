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
  Plus,
  Search,
  Settings,
  Star,
  Trash2,
  Users,
} from "lucide-react";

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

export default function NotionDemo() {
  return (
    <AppShell variant="bordered">
      {/* Sidebar */}
      <AppShellSidebar width="w-60">
        {/* Workspace header */}
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

        <Separator />

        {/* Page tree */}
        <Flex align="center" justify="space-between" className="px-4 pt-1">
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

        {/* Bottom actions */}
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

      {/* Main content area */}
      <AppShellContent>
        <ScrollArea className="flex-1">
          <VStack className="max-w-2xl mx-auto px-12 pt-12 pb-24" gap="lg">
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
            <VStack gap="xs">
              <Heading size="xl" level="1">
                Architecture Overview
              </Heading>
              <Text size="xs" variant="muted">
                Last edited by Sarah Chen &middot; April 4, 2026
              </Text>
            </VStack>

            <Separator />

            {/* Document content */}
            <VStack gap="lg">
              <Text size="base">
                This document provides a high-level overview of our system
                architecture, including the major services, data flows, and
                deployment topology. It serves as the canonical reference for
                engineering onboarding and architectural decisions.
              </Text>

              {/* Callout block */}
              <Card variant="muted" border="solid" className="px-6">
                <HStack gap="sm" align="flex-start">
                  <Icon icon={Lightbulb} size="sm" />
                  <VStack gap="xs">
                    <Text size="sm" weight="semibold">
                      Key Principle
                    </Text>
                    <Text size="sm">
                      All services communicate through the event bus. Direct
                      service-to-service calls are prohibited except for
                      synchronous read operations via the API gateway.
                    </Text>
                  </VStack>
                </HStack>
              </Card>

              <Heading size="base" level="2">
                System Components
              </Heading>
              <Text size="base">
                The platform consists of five core services, each responsible
                for a bounded context within the domain model. Services are
                independently deployable and maintain their own data stores.
              </Text>

              {/* Inline table-like content */}
              <VStack gap="xs">
                {[
                  {
                    service: "Auth Service",
                    status: "Stable",
                    owner: "Platform Team",
                  },
                  {
                    service: "User Service",
                    status: "Stable",
                    owner: "Platform Team",
                  },
                  {
                    service: "Payment Service",
                    status: "Beta",
                    owner: "Commerce Team",
                  },
                  {
                    service: "Notification Service",
                    status: "Refactoring",
                    owner: "Platform Team",
                  },
                  {
                    service: "Analytics Service",
                    status: "Stable",
                    owner: "Data Team",
                  },
                ].map((row) => (
                  <Flex
                    key={row.service}
                    align="center"
                    gap="sm"
                    className="px-4 py-2 rounded-lg bg-muted/50"
                  >
                    <Text size="sm" weight="medium" className="w-44">
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

              <Heading size="base" level="2">
                Data Flow
              </Heading>
              <Text size="base">
                All writes go through the command pipeline, which validates
                input, applies business rules, persists changes, and publishes
                domain events. Reads are served from materialized views
                optimized for each query pattern.
              </Text>

              {/* Warning callout */}
              <Card variant="muted" border="dashed" className="px-6">
                <HStack gap="sm" align="flex-start">
                  <Icon icon={AlertCircle} size="sm" />
                  <VStack gap="xs">
                    <Text size="sm" weight="semibold">
                      Migration in Progress
                    </Text>
                    <Text size="sm">
                      The Notification Service is being migrated from polling to
                      event-driven. See ENG-475 for the tracking issue. Expected
                      completion: April 15, 2026.
                    </Text>
                  </VStack>
                </HStack>
              </Card>

              <Heading size="base" level="2">
                Deployment
              </Heading>
              <Text size="base">
                Services are containerized and deployed to a Kubernetes cluster
                with auto-scaling policies based on CPU and request latency
                metrics. Blue-green deployments are used for all production
                releases.
              </Text>

              <Separator />

              {/* Comments section */}
              <VStack gap="sm">
                <HStack gap="xs" align="center">
                  <Icon icon={MessageSquare} size="xs" />
                  <Text size="sm" weight="medium">
                    2 comments
                  </Text>
                </HStack>

                <VStack gap="base">
                  <HStack gap="sm" align="flex-start">
                    <Avatar size="sm">
                      <AvatarFallback name="Marcus Johnson" size="sm" />
                    </Avatar>
                    <VStack gap="2xs">
                      <HStack gap="xs" align="center">
                        <Text size="sm" weight="medium">
                          Marcus Johnson
                        </Text>
                        <Text size="xs" variant="muted">
                          Apr 3
                        </Text>
                      </HStack>
                      <Text size="sm">
                        Should we add a section about the caching layer? The
                        Redis cluster setup is non-obvious for new engineers.
                      </Text>
                    </VStack>
                  </HStack>

                  <HStack gap="sm" align="flex-start">
                    <Avatar size="sm">
                      <AvatarFallback name="Sarah Chen" size="sm" />
                    </Avatar>
                    <VStack gap="2xs">
                      <HStack gap="xs" align="center">
                        <Text size="sm" weight="medium">
                          Sarah Chen
                        </Text>
                        <Text size="xs" variant="muted">
                          Apr 4
                        </Text>
                      </HStack>
                      <Text size="sm">
                        Good call. I will add that in the next revision along
                        with the CDN configuration details.
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </ScrollArea>
      </AppShellContent>
    </AppShell>
  );
}
