"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@patternmode/ui/components/collapsible";
import { Dot } from "@patternmode/ui/components/dot";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
import {
  AppShell,
  AppShellSidebar,
} from "@patternmode/ui/compositions/app-shell";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  Database,
  FileJson,
  FolderOpen,
  Globe,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
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

const COLLECTIONS = ["users", "sessions", "events", "billing", "audit_logs"];

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
      className={`cursor-pointer rounded-md px-3 py-2 ${
        isSelected ? "bg-blue-500/10" : "hover:bg-accent/50"
      }`}
      onClick={onSelect}
    >
      <Avatar size="sm">
        <AvatarFallback name={doc.name} size="sm" />
      </Avatar>
      <VStack gap="2xs" className="flex-1 min-w-0">
        <Text size="sm" weight={isSelected ? "semibold" : "medium"} truncate>
          {doc.name}
        </Text>
        <Text size="2xs" variant="muted" truncate font="mono">
          {doc.id}
        </Text>
      </VStack>
      <Badge
        variant={STATUS_VARIANT[doc.status]}
        size="xs"
        appearance="outline"
      >
        {doc.status}
      </Badge>
    </HStack>
  );
}

function DetailField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <VStack gap="2xs">
      <Text
        size="2xs"
        variant="muted"
        weight="medium"
        className="uppercase tracking-wider"
      >
        {label}
      </Text>
      <Text
        size="sm"
        font={mono ? "mono" : undefined}
        className={mono ? "select-all" : ""}
      >
        {value}
      </Text>
    </VStack>
  );
}

function DocumentDetail({ doc }: { doc: UserDocument }) {
  return (
    <VStack gap="lg" className="p-6">
      {/* Profile header */}
      <VStack gap="sm" align="center" className="text-center pt-4">
        <Avatar size="xl">
          <AvatarFallback name={doc.name} size="xl" />
        </Avatar>
        <VStack gap="2xs" align="center">
          <Text size="lg" weight="semibold">
            {doc.name}
          </Text>
          <Text size="sm" variant="muted">
            {doc.email}
          </Text>
        </VStack>
        <HStack gap="xs">
          <Badge variant={STATUS_VARIANT[doc.status]} size="xs">
            {doc.status}
          </Badge>
          <Badge variant="secondary" size="xs" appearance="outline">
            {doc.role}
          </Badge>
          <Badge variant="secondary" size="xs" appearance="outline">
            {doc.plan}
          </Badge>
        </HStack>
      </VStack>

      <Separator />

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-4">
        <DetailField label="ID" value={doc.id} mono />
        <DetailField label="Region" value={doc.region} mono />
        <DetailField
          label="Created"
          value={doc.createdAt.replace("T", " ").replace("Z", "")}
        />
        <DetailField
          label="Last Login"
          value={doc.lastLogin.replace("T", " ").replace("Z", "")}
        />
      </div>

      <Separator />

      {/* Actions */}
      <HStack gap="xs">
        <Button variant="outline" size="xs" icon={Pencil} className="flex-1">
          Edit
        </Button>
        <Button variant="outline" size="xs" icon={Copy} className="flex-1">
          Duplicate
        </Button>
        <Button
          variant="destructive"
          size="xs"
          icon={Trash2}
          appearance="outline"
        >
          Delete
        </Button>
      </HStack>
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
      <AppShellSidebar width="w-52" edge="none">
        <HStack align="center" gap="sm" noShrink className="px-4 pt-4 pb-2">
          <div className="size-5 rounded-full bg-foreground" />
          <Text
            size="xs"
            variant="muted"
            weight="medium"
            className="tracking-wide uppercase"
          >
            Datastore
          </Text>
        </HStack>

        <VStack gap="none" className="px-3 pt-1 pb-2">
          <HStack
            align="center"
            gap="xs"
            className="rounded-md bg-accent/60 px-2.5 py-1.5 cursor-pointer"
          >
            <Icon icon={Search} size="xs" className="text-muted-foreground" />
            <Text size="xs" variant="muted">
              Search
            </Text>
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
                          5
                        </Text>
                      </HStack>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <VStack gap="none" className="pl-3">
                        {COLLECTIONS.map((col) => (
                          <HStack
                            key={col}
                            align="center"
                            gap="xs"
                            className={`cursor-pointer rounded-md px-2 py-1 ${
                              col === "users"
                                ? "bg-blue-500/10 text-foreground"
                                : "hover:bg-accent/50"
                            }`}
                          >
                            <Icon
                              icon={FileJson}
                              size="2xs"
                              className={
                                col === "users"
                                  ? "text-blue-500"
                                  : "text-muted-foreground"
                              }
                            />
                            <Text
                              size="xs"
                              weight={col === "users" ? "medium" : "normal"}
                            >
                              {col}
                            </Text>
                            {col === "users" && (
                              <Text
                                size="2xs"
                                variant="muted"
                                tabularNums
                                className="ml-auto"
                              >
                                {DOCUMENTS.length}
                              </Text>
                            )}
                          </HStack>
                        ))}
                      </VStack>
                    </CollapsibleContent>
                  </Collapsible>
                </VStack>
              </CollapsibleContent>
            </Collapsible>
          </VStack>
        </ScrollArea>

        <VStack noShrink className="px-3 pb-3">
          <Button variant="outline" size="xs" icon={Plus} className="w-full">
            New Collection
          </Button>
        </VStack>
      </AppShellSidebar>

      {/* Record list — center panel */}
      <VStack className="w-80 shrink-0 overflow-hidden border-r border-border bg-card">
        <Flex
          align="center"
          justify="space-between"
          noShrink
          className="px-4 py-3 border-b border-border"
        >
          <HStack gap="xs" align="center">
            <Text size="sm" weight="semibold" font="mono">
              users
            </Text>
            <Badge variant="secondary" size="xs">
              {DOCUMENTS.length}
            </Badge>
          </HStack>
          <HStack gap="xs">
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={RefreshCw}
              aria-label="Refresh"
            />
            <Button size="xs" icon={Plus}>
              New
            </Button>
          </HStack>
        </Flex>

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
        </Flex>
      </VStack>

      {/* Document detail — right panel */}
      <VStack grow className="min-w-0 overflow-hidden bg-background">
        <ScrollArea className="flex-1">
          <DocumentDetail doc={selectedDoc} />
        </ScrollArea>
      </VStack>
    </AppShell>
  );
}
