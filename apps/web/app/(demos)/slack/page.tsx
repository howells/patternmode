"use client";

/**
 * DESIGN SYSTEM GAPS FOUND:
 * - No "workspace strip" component — narrow icon-only sidebar composed from VStack + fixed width
 * - MenuItem dot prop only accepts DotProps["variant"] (semantic tokens) — cannot pass custom CSS colors for channel indicators
 * - No "unread" visual weight modifier on MenuItem — need to compose with Dot + bold text manually
 * - No thread/reply composition — built from Avatar + VStack + Text
 * - Hover-reveal actions on message rows require group/group-hover className — no built-in MenuItem hover slot
 * - InputGroupButton variant="default" for send button looks correct but requires explicit variant prop
 */

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
  AtSign,
  Bell,
  Bold,
  BookmarkPlus,
  ChevronDown,
  Code,
  Hash,
  Italic,
  Link,
  List,
  ListOrdered,
  MessageSquare,
  MoreVertical,
  Paperclip,
  Plus,
  Search,
  Send,
  Smile,
  Users,
} from "lucide-react";

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
  { name: "standup", unread: false },
  { name: "social", unread: false },
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
}

const MESSAGES: Message[] = [
  {
    id: "1",
    author: "Sarah Chen",
    time: "9:02 AM",
    text: "Good morning team! Just pushed the fix for the WebSocket memory leak. Can someone review the PR when they get a chance?",
    reactions: [
      { emoji: "eyes", count: 3 },
      { emoji: "thumbsup", count: 2 },
    ],
    threadCount: 4,
  },
  {
    id: "2",
    author: "Marcus Johnson",
    time: "9:15 AM",
    text: "I will take a look at it after standup. Also, heads up that I will be working on the rate limiting implementation today. If anyone has thoughts on the algorithm (token bucket vs sliding window), I would love to hear them.",
  },
  {
    id: "3",
    author: "Elena Rodriguez",
    time: "9:22 AM",
    text: "Token bucket is probably the way to go for our use case. It handles burst traffic better and the implementation is simpler. I have some reference code from the auth service we can reuse.",
    reactions: [{ emoji: "thumbsup", count: 4 }],
  },
  {
    id: "4",
    author: "James Wright",
    time: "9:30 AM",
    text: "Agreed on token bucket. Quick note: the payment service monitoring alerts are live now. I set thresholds at 1% failure rate for warnings and 5% for critical. The PagerDuty integration is working.",
    reactions: [{ emoji: "tada", count: 5 }],
    threadCount: 2,
  },
  {
    id: "5",
    author: "Priya Patel",
    time: "9:45 AM",
    text: "Nice work on the monitoring, James. I started writing E2E tests for the checkout flow yesterday. Already found a race condition when applying discount codes concurrently. Created ENG-476 to track it.",
  },
  {
    id: "6",
    author: "Sarah Chen",
    time: "10:01 AM",
    text: "That race condition might be related to the optimistic locking issue I saw last week. Let me dig up the logs and we can compare.",
    threadCount: 6,
  },
  {
    id: "7",
    author: "Marcus Johnson",
    time: "10:15 AM",
    text: "Standup reminder: starting in 15 minutes. Today I want to also discuss the TypeScript 5.8 migration timeline since Elena finished the initial upgrade.",
  },
  {
    id: "8",
    author: "Elena Rodriguez",
    time: "10:20 AM",
    text: "The TS upgrade is ready for review. Main changes are the new decorator metadata support and stricter generic inference. Two packages needed minor type fixes but nothing breaking.",
    reactions: [{ emoji: "rocket", count: 3 }],
  },
];

function MessageBubble({ message }: { message: Message }) {
  return (
    <HStack
      gap="sm"
      align="flex-start"
      className="px-5 py-1.5 hover:bg-accent/30 transition-colors group"
    >
      <Avatar size="sm" className="shrink-0 mt-0.5">
        <AvatarFallback name={message.author} size="sm" />
      </Avatar>
      <VStack gap="2xs" className="flex-1 min-w-0">
        <HStack gap="xs" align="baseline">
          <Text size="sm" weight="semibold">
            {message.author}
          </Text>
          <Text size="xs" variant="muted">
            {message.time}
          </Text>
        </HStack>
        <Text size="sm">{message.text}</Text>
        {message.reactions ? (
          <HStack gap="xs">
            {message.reactions.map((r) => (
              <Badge
                key={r.emoji}
                variant="secondary"
                size="xs"
                appearance="outline"
              >
                {r.emoji === "eyes"
                  ? "👀"
                  : r.emoji === "thumbsup"
                    ? "👍"
                    : r.emoji === "tada"
                      ? "🎉"
                      : "🚀"}{" "}
                {r.count}
              </Badge>
            ))}
          </HStack>
        ) : null}
        {message.threadCount ? (
          <Button variant="ghost" size="xs" icon={MessageSquare}>
            {message.threadCount} replies
          </Button>
        ) : null}
      </VStack>
      {/* Hover actions */}
      <HStack
        gap="2xs"
        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
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
          aria-label="Reply in thread"
        />
        <Button
          variant="ghost"
          size="icon-2xs"
          icon={BookmarkPlus}
          aria-label="Bookmark"
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

export default function SlackDemo() {
  return (
    <Flex className="h-screen" direction="row">
      {/* Server list (narrow strip) */}
      <VStack
        align="center"
        gap="sm"
        className="w-[68px] shrink-0 bg-card border-r border-border py-3"
      >
        <Flex
          align="center"
          justify="center"
          className="size-9 rounded-lg bg-primary"
        >
          <Text size="sm" className="text-primary-foreground font-bold">
            PM
          </Text>
        </Flex>
        <Separator className="w-8" />
        <Flex
          align="center"
          justify="center"
          className="size-9 rounded-lg bg-muted"
        >
          <Text size="xs" weight="medium">
            DS
          </Text>
        </Flex>
        <Flex
          align="center"
          justify="center"
          className="size-9 rounded-lg bg-muted"
        >
          <Text size="xs" weight="medium">
            OC
          </Text>
        </Flex>
        <div className="flex-1" />
        <Button
          variant="ghost"
          size="icon-sm"
          icon={Plus}
          aria-label="Add workspace"
        />
      </VStack>

      {/* Channel sidebar */}
      <VStack className="w-[220px] shrink-0 bg-card border-r border-border">
        <Flex align="center" justify="space-between" className="px-3 pt-3 pb-1">
          <Text size="sm" weight="semibold">
            PatternMode
          </Text>
          <Button
            variant="ghost"
            size="icon-2xs"
            icon={Bell}
            aria-label="Notifications"
          />
        </Flex>

        <VStack gap="2xs" className="px-2">
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

        <Separator />

        <Flex align="center" justify="space-between" className="px-4 pt-1">
          <HStack gap="2xs" align="center">
            <Icon icon={ChevronDown} size="2xs" />
            <Text size="xs" variant="muted" weight="medium">
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

        <ScrollArea className="flex-1">
          <VStack gap="none" className="px-2">
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
                  ) : null
                }
              >
                <HStack gap="xs" align="center">
                  {channel.unread ? <Dot variant="info" size="xs" /> : null}
                  <span>{channel.name}</span>
                </HStack>
              </MenuItem>
            ))}
          </VStack>

          <Separator className="my-2" />

          <Flex
            align="center"
            justify="space-between"
            className="px-4 pt-1 pb-1"
          >
            <HStack gap="2xs" align="center">
              <Icon icon={ChevronDown} size="2xs" />
              <Text size="xs" variant="muted" weight="medium">
                Direct Messages
              </Text>
            </HStack>
          </Flex>

          <VStack gap="none" className="px-2 pb-2">
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
      </VStack>

      {/* Main chat area */}
      <VStack className="flex-1 min-w-0">
        {/* Channel header */}
        <Flex
          align="center"
          justify="space-between"
          className="h-12 shrink-0 border-b border-border px-5"
        >
          <HStack gap="sm" align="center">
            <HStack gap="xs" align="center">
              <Icon icon={Hash} size="xs" />
              <Text size="sm" weight="semibold">
                engineering
              </Text>
            </HStack>
            <Separator orientation="vertical" className="h-5" />
            <Text size="xs" variant="muted">
              Engineering team discussions, PRs, and technical decisions
            </Text>
          </HStack>
          <HStack gap="xs">
            <Button
              variant="ghost"
              size="icon-xs"
              icon={Users}
              aria-label="Members"
            />
            <Button
              variant="ghost"
              size="icon-xs"
              icon={Search}
              aria-label="Search"
            />
          </HStack>
        </Flex>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <VStack gap="none" className="py-2">
            {/* Date divider */}
            <Flex align="center" gap="sm" className="px-5 py-2">
              <Separator className="flex-1" />
              <Badge variant="secondary" size="xs" appearance="outline">
                Monday, April 7
              </Badge>
              <Separator className="flex-1" />
            </Flex>

            {MESSAGES.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
          </VStack>
        </ScrollArea>

        {/* Message input */}
        <VStack gap="xs" className="px-5 pb-4 pt-2">
          <InputGroup size="lg">
            <InputGroupInput placeholder="Message #engineering" />
            <InputGroupButton icon={Paperclip} aria-label="Attach file" />
            <InputGroupButton icon={Smile} aria-label="Add emoji" />
            <InputGroupButton
              icon={Send}
              aria-label="Send message"
              variant="default"
            />
          </InputGroup>
          <HStack gap="xs">
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={Bold}
              aria-label="Bold"
            />
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={Italic}
              aria-label="Italic"
            />
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={Code}
              aria-label="Code"
            />
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={Link}
              aria-label="Link"
            />
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={List}
              aria-label="Bullet list"
            />
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={ListOrdered}
              aria-label="Numbered list"
            />
          </HStack>
        </VStack>
      </VStack>

      {/* Thread panel (right side) */}
      <VStack className="w-[340px] shrink-0 border-l border-border">
        <Flex
          align="center"
          justify="space-between"
          className="h-12 shrink-0 border-b border-border px-4"
        >
          <Text size="sm" weight="semibold">
            Thread
          </Text>
          <HStack gap="xs" align="center">
            <Text size="xs" variant="muted">
              #engineering
            </Text>
          </HStack>
        </Flex>

        <ScrollArea className="flex-1">
          <VStack gap="none" className="py-2">
            {/* Original message */}
            <HStack gap="sm" align="flex-start" className="px-4 py-2">
              <Avatar size="sm" className="shrink-0">
                <AvatarFallback name="Sarah Chen" size="sm" />
              </Avatar>
              <VStack gap="2xs" className="min-w-0">
                <HStack gap="xs" align="baseline">
                  <Text size="sm" weight="semibold">
                    Sarah Chen
                  </Text>
                  <Text size="xs" variant="muted">
                    9:02 AM
                  </Text>
                </HStack>
                <Text size="sm">
                  Good morning team! Just pushed the fix for the WebSocket
                  memory leak. Can someone review the PR when they get a chance?
                </Text>
              </VStack>
            </HStack>

            <Flex align="center" gap="sm" className="px-4 py-2">
              <Separator className="flex-1" />
              <Text size="xs" variant="muted">
                4 replies
              </Text>
              <Separator className="flex-1" />
            </Flex>

            {/* Thread replies */}
            {[
              {
                author: "Marcus Johnson",
                time: "9:18 AM",
                text: "I will review after standup. Is this the one affecting the dashboard real-time updates?",
              },
              {
                author: "Sarah Chen",
                time: "9:20 AM",
                text: "Yes, exactly. The connection pool was growing unbounded because we were not cleaning up stale connections on disconnect events.",
              },
              {
                author: "James Wright",
                time: "9:35 AM",
                text: "I noticed the same pattern in the notification service. We should probably add a shared connection manager utility.",
              },
              {
                author: "Sarah Chen",
                time: "9:40 AM",
                text: "Good idea. I will create a follow-up issue for that. The current fix is scoped to the dashboard service only.",
              },
            ].map((reply, _i) => (
              <HStack
                key={reply.time}
                gap="sm"
                align="flex-start"
                className="px-4 py-1.5"
              >
                <Avatar size="2xs" className="shrink-0 mt-0.5">
                  <AvatarFallback name={reply.author} size="2xs" />
                </Avatar>
                <VStack gap="2xs" className="min-w-0">
                  <HStack gap="xs" align="baseline">
                    <Text size="xs" weight="semibold">
                      {reply.author}
                    </Text>
                    <Text size="xs" variant="muted">
                      {reply.time}
                    </Text>
                  </HStack>
                  <Text size="sm">{reply.text}</Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </ScrollArea>

        {/* Thread reply input */}
        <VStack className="px-4 pb-3 pt-2">
          <InputGroup size="base">
            <InputGroupInput placeholder="Reply..." />
            <InputGroupButton
              icon={Send}
              aria-label="Send reply"
              variant="default"
            />
          </InputGroup>
        </VStack>
      </VStack>
    </Flex>
  );
}
