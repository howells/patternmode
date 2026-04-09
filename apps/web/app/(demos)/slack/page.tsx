"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { Dot } from "@patternmode/ui/components/dot";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@patternmode/ui/components/input-group";
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
  AtSign,
  Bell,
  BookmarkPlus,
  ChevronDown,
  Hash,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  Smile,
} from "lucide-react";

/* -- Data --------------------------------------------------------- */

interface Channel {
  name: string;
  unread: boolean;
  mentions?: number;
}

const CHANNELS: Channel[] = [
  { name: "general", unread: true, mentions: 3 },
  { name: "engineering", unread: true },
  { name: "design", unread: false },
  { name: "product", unread: false },
  { name: "random", unread: true, mentions: 1 },
  { name: "incidents", unread: false },
  { name: "deployments", unread: true },
  { name: "code-review", unread: false },
];

const DMS = [
  { name: "Sarah Chen", online: true },
  { name: "Marcus Johnson", online: true },
  { name: "Elena Rodriguez", online: false },
  { name: "James Wright", online: true },
  { name: "Priya Patel", online: false },
];

interface Message {
  id: string;
  author: string;
  time: string;
  text: string;
  reactions?: { emoji: string; count: number }[];
  threadCount?: number;
  threadAuthors?: string[];
}

const MESSAGES: Message[] = [
  {
    id: "1",
    author: "Sarah Chen",
    time: "9:02 AM",
    text: "Good morning team! Just pushed the fix for the WebSocket memory leak. Can someone review the PR when they get a chance?",
    reactions: [
      { emoji: "👀", count: 3 },
      { emoji: "👍", count: 2 },
    ],
    threadCount: 4,
    threadAuthors: ["Marcus Johnson", "Sarah Chen", "James Wright"],
  },
  {
    id: "2",
    author: "Marcus Johnson",
    time: "9:15 AM",
    text: "I will take a look at it after standup. Also, heads up that I will be working on the rate limiting implementation today.",
  },
  {
    id: "3",
    author: "Marcus Johnson",
    time: "9:16 AM",
    text: "If anyone has thoughts on the algorithm (token bucket vs sliding window), I would love to hear them.",
  },
  {
    id: "4",
    author: "Elena Rodriguez",
    time: "9:22 AM",
    text: "Token bucket is probably the way to go for our use case. It handles burst traffic better and the implementation is simpler.",
    reactions: [{ emoji: "👍", count: 4 }],
  },
  {
    id: "5",
    author: "James Wright",
    time: "9:30 AM",
    text: "Agreed on token bucket. Quick note: the payment service monitoring alerts are live now. I set thresholds at 1% failure rate for warnings and 5% for critical. The PagerDuty integration is working.",
    reactions: [{ emoji: "🎉", count: 5 }],
    threadCount: 2,
    threadAuthors: ["Priya Patel", "James Wright"],
  },
  {
    id: "6",
    author: "Priya Patel",
    time: "9:45 AM",
    text: "Nice work on the monitoring, James. I started writing E2E tests for the checkout flow yesterday. Already found a race condition when applying discount codes concurrently. Created ENG-476 to track it.",
  },
  {
    id: "7",
    author: "Sarah Chen",
    time: "10:01 AM",
    text: "That race condition might be related to the optimistic locking issue I saw last week. Let me dig up the logs and we can compare.",
    threadCount: 6,
    threadAuthors: ["Sarah Chen", "Marcus Johnson", "Priya Patel"],
  },
  {
    id: "8",
    author: "Elena Rodriguez",
    time: "10:20 AM",
    text: "The TS upgrade is ready for review. Main changes are the new decorator metadata support and stricter generic inference. Two packages needed minor type fixes but nothing breaking.",
    reactions: [{ emoji: "🚀", count: 3 }],
  },
];

/* -- Sub-components ----------------------------------------------- */

function MessageRow({
  message,
  showAvatar,
}: {
  message: Message;
  showAvatar: boolean;
}) {
  return (
    <HStack
      gap="sm"
      align="flex-start"
      className="group relative px-8 py-1 hover:bg-accent/40"
    >
      {/* Avatar or time on hover */}
      <div className="w-9 shrink-0 flex items-start justify-center pt-0.5">
        {showAvatar ? (
          <Avatar size="sm">
            <AvatarFallback name={message.author} size="sm" />
          </Avatar>
        ) : (
          <Text
            size="2xs"
            variant="muted"
            className="opacity-0 group-hover:opacity-100 pt-1"
          >
            {message.time}
          </Text>
        )}
      </div>

      <VStack gap="xs" className="flex-1 min-w-0 max-w-2xl">
        {showAvatar && (
          <HStack gap="xs" align="baseline">
            <Text size="sm" weight="semibold">
              {message.author}
            </Text>
            <Text size="2xs" variant="muted">
              {message.time}
            </Text>
          </HStack>
        )}
        <Text size="sm" className="leading-relaxed">
          {message.text}
        </Text>

        {/* Reactions */}
        {message.reactions && (
          <HStack gap="xs">
            {message.reactions.map((r) => (
              <HStack
                key={r.emoji}
                gap="2xs"
                align="center"
                className="rounded-full bg-accent/80 px-2 py-0.5 cursor-pointer hover:bg-accent text-xs"
              >
                <span>{r.emoji}</span>
                <Text size="2xs" weight="medium">
                  {r.count}
                </Text>
              </HStack>
            ))}
          </HStack>
        )}

        {/* Thread preview */}
        {message.threadCount && message.threadAuthors && (
          <HStack
            gap="sm"
            align="center"
            className="cursor-pointer rounded-md border border-border/50 bg-accent/30 px-3 py-1.5 hover:bg-accent/50 -ml-1 mt-0.5"
          >
            <div className="flex -space-x-1">
              {message.threadAuthors.slice(0, 3).map((name) => (
                <Avatar
                  key={name}
                  size="2xs"
                  className="ring-2 ring-background"
                >
                  <AvatarFallback name={name} size="2xs" />
                </Avatar>
              ))}
            </div>
            <Text size="xs" className="text-interactive" weight="medium">
              {message.threadCount} replies
            </Text>
            <Text size="2xs" variant="muted">
              Last reply 12m ago
            </Text>
          </HStack>
        )}
      </VStack>

      {/* Hover actions — floating */}
      <HStack
        gap="2xs"
        className="absolute -top-3 right-6 opacity-0 group-hover:opacity-100 rounded-md shadow-borders-base bg-card px-1 py-0.5"
      >
        <Button
          variant="ghost"
          size="icon-2xs"
          icon={Smile}
          aria-label="React"
        />
        <Button
          variant="ghost"
          size="icon-2xs"
          icon={MessageSquare}
          aria-label="Thread"
        />
        <Button
          variant="ghost"
          size="icon-2xs"
          icon={BookmarkPlus}
          aria-label="Save"
        />
        <Button
          variant="ghost"
          size="icon-2xs"
          icon={MoreVertical}
          aria-label="More"
        />
      </HStack>
    </HStack>
  );
}

/* -- Page --------------------------------------------------------- */

export default function SlackDemo() {
  return (
    <AppShell variant="bordered">
      {/* Sidebar */}
      <AppShellSidebar width="w-60" edge="shadow">
        <HStack
          align="center"
          justify="space-between"
          noShrink
          className="px-4 pt-4 pb-2"
        >
          <HStack align="center" gap="sm">
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
          <Button
            variant="ghost"
            size="icon-2xs"
            icon={Bell}
            aria-label="Notifications"
          />
        </HStack>

        <VStack gap="none" className="px-2 pb-1">
          <MenuItem icon={MessageSquare} size="xs">
            Threads
          </MenuItem>
          <MenuItem icon={AtSign} size="xs">
            Mentions
          </MenuItem>
          <MenuItem icon={Search} size="xs">
            Search
          </MenuItem>
        </VStack>

        <Separator className="my-1" />

        <ScrollArea className="flex-1">
          <Flex align="center" justify="space-between" className="px-4 pt-1">
            <HStack gap="2xs" align="center">
              <Icon
                icon={ChevronDown}
                size="2xs"
                className="text-muted-foreground"
              />
              <Text
                size="2xs"
                variant="muted"
                weight="medium"
                className="uppercase tracking-wider"
              >
                Channels
              </Text>
            </HStack>
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={Plus}
              aria-label="Add channel"
            />
          </Flex>

          <VStack gap="none" className="px-2 py-1">
            {CHANNELS.map((channel) => (
              <MenuItem
                key={channel.name}
                icon={Hash}
                size="xs"
                isActive={channel.name === "engineering"}
                suffix={
                  channel.mentions ? (
                    <Badge variant="destructive" size="xs">
                      {channel.mentions}
                    </Badge>
                  ) : channel.unread ? (
                    <Dot variant="info" size="xs" />
                  ) : null
                }
              >
                {channel.name}
              </MenuItem>
            ))}
          </VStack>

          <Separator className="my-1" />

          <Flex align="center" justify="space-between" className="px-4 pt-1">
            <HStack gap="2xs" align="center">
              <Icon
                icon={ChevronDown}
                size="2xs"
                className="text-muted-foreground"
              />
              <Text
                size="2xs"
                variant="muted"
                weight="medium"
                className="uppercase tracking-wider"
              >
                Direct Messages
              </Text>
            </HStack>
          </Flex>

          <VStack gap="none" className="px-2 py-1 pb-4">
            {DMS.map((dm) => (
              <MenuItem key={dm.name} size="xs">
                <HStack gap="xs" align="center">
                  <Dot
                    variant={dm.online ? "affirmative" : "default"}
                    size="xs"
                  />
                  <span>{dm.name}</span>
                </HStack>
              </MenuItem>
            ))}
          </VStack>
        </ScrollArea>

        <VStack noShrink className="px-2 pb-2">
          <MenuItem icon={Settings} size="xs">
            Settings
          </MenuItem>
        </VStack>
      </AppShellSidebar>

      {/* Main chat */}
      <AppShellContent>
        {/* Channel header */}
        <Flex
          align="center"
          justify="space-between"
          noShrink
          className="h-13 border-b border-border px-6"
        >
          <HStack gap="sm" align="center">
            <HStack gap="xs" align="center">
              <Icon icon={Hash} size="xs" className="text-muted-foreground" />
              <Text size="sm" weight="semibold">
                engineering
              </Text>
            </HStack>
            <Separator orientation="vertical" className="h-4" />
            <Text size="xs" variant="muted">
              Engineering team discussions
            </Text>
          </HStack>
          <HStack gap="sm" align="center">
            <Button
              variant="ghost"
              size="icon-xs"
              icon={Search}
              aria-label="Search"
            />
            <div className="flex -space-x-1.5">
              {["Sarah Chen", "Marcus Johnson", "Elena Rodriguez"].map(
                (name) => (
                  <Avatar
                    key={name}
                    size="2xs"
                    className="ring-2 ring-background"
                  >
                    <AvatarFallback name={name} size="2xs" />
                  </Avatar>
                ),
              )}
            </div>
            <Text size="2xs" variant="muted">
              5
            </Text>
          </HStack>
        </Flex>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <VStack gap="none" className="py-6">
            {/* Date divider */}
            <Flex align="center" gap="sm" className="px-8 py-4">
              <Separator className="flex-1" />
              <Text size="2xs" variant="muted" weight="medium">
                Monday, April 7
              </Text>
              <Separator className="flex-1" />
            </Flex>

            {MESSAGES.map((msg, i) => {
              const prev = i > 0 ? MESSAGES[i - 1] : null;
              const showAvatar = !prev || prev.author !== msg.author;
              return (
                <div key={msg.id} className={showAvatar && i > 0 ? "mt-4" : ""}>
                  <MessageRow message={msg} showAvatar={showAvatar} />
                </div>
              );
            })}

            {/* Typing indicator */}
            <HStack gap="sm" align="center" className="px-8 pt-4">
              <Avatar size="2xs">
                <AvatarFallback name="Elena Rodriguez" size="2xs" />
              </Avatar>
              <HStack gap="xs" align="center">
                <div className="flex gap-0.5">
                  <div className="size-1.5 rounded-full bg-muted-foreground/50 animate-pulse" />
                  <div className="size-1.5 rounded-full bg-muted-foreground/50 animate-pulse [animation-delay:150ms]" />
                  <div className="size-1.5 rounded-full bg-muted-foreground/50 animate-pulse [animation-delay:300ms]" />
                </div>
                <Text size="2xs" variant="muted">
                  Elena is typing...
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </ScrollArea>

        {/* Composer */}
        <VStack gap="none" noShrink className="px-6 pb-5 pt-2">
          <div className="rounded-lg shadow-borders-base bg-card">
            <InputGroup
              size="lg"
              radius="rounded"
              className="border-0 shadow-none"
            >
              <InputGroupButton icon={Plus} aria-label="Attach" />
              <InputGroupInput placeholder="Message #engineering" />
              <InputGroupButton icon={Paperclip} aria-label="File" />
              <InputGroupButton icon={Smile} aria-label="Emoji" />
              <InputGroupButton
                icon={Send}
                aria-label="Send"
                variant="default"
              />
            </InputGroup>
          </div>
        </VStack>
      </AppShellContent>
    </AppShell>
  );
}
