"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Button } from "@patternmode/ui/components/button";
import { Flex } from "@patternmode/ui/components/flex";
import { Grid } from "@patternmode/ui/components/grid";
import { Heading } from "@patternmode/ui/components/heading";
import { Icon } from "@patternmode/ui/components/icon";
import { MenuItem } from "@patternmode/ui/components/menu-item";
import { Progress } from "@patternmode/ui/components/progress";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { Slider } from "@patternmode/ui/components/slider";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
import {
  AppShell,
  AppShellContent,
  AppShellSidebar,
} from "@patternmode/ui/compositions/app-shell";
import {
  Heart,
  Home,
  Library,
  ListMusic,
  Maximize2,
  Mic2,
  MonitorSpeaker,
  Pause,
  Plus,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

const PLAYLISTS = [
  "Liked Songs",
  "Discover Weekly",
  "Release Radar",
  "Daily Mix 1",
  "Daily Mix 2",
  "Chill Vibes",
  "Focus Flow",
  "Workout Energy",
  "Late Night Jazz",
  "Coding Beats",
];

interface Album {
  title: string;
  artist: string;
  color: string;
}

const RECENT_ALBUMS: Album[] = [
  { title: "In Rainbows", artist: "Radiohead", color: "#461111" },
  { title: "Random Access Memories", artist: "Daft Punk", color: "#1b2430" },
  { title: "OK Computer", artist: "Radiohead", color: "#2d4059" },
  { title: "Discovery", artist: "Daft Punk", color: "#1a1a2e" },
  { title: "Kid A", artist: "Radiohead", color: "#2c3333" },
  { title: "Currents", artist: "Tame Impala", color: "#533483" },
  { title: "The Slow Rush", artist: "Tame Impala", color: "#0f3460" },
  { title: "Is This It", artist: "The Strokes", color: "#16213e" },
];

const MADE_FOR_YOU: Album[] = [
  {
    title: "Daily Mix 1",
    artist: "Radiohead, Tame Impala, The Strokes",
    color: "#16213e",
  },
  {
    title: "Daily Mix 2",
    artist: "Daft Punk, Justice, Kavinsky",
    color: "#533483",
  },
  {
    title: "Discover Weekly",
    artist: "Your personalized playlist",
    color: "#2c3333",
  },
  {
    title: "Release Radar",
    artist: "New music from artists you follow",
    color: "#461111",
  },
];

function AlbumCard({ album }: { album: Album }) {
  return (
    <div className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-card">
      <VStack gap="sm">
        <div
          className="aspect-square w-full rounded-md"
          style={{ backgroundColor: album.color }}
        />
        <VStack gap="2xs" className="min-w-0">
          <Text size="sm" weight="medium" truncate>
            {album.title}
          </Text>
          <Text size="xs" variant="muted" truncate>
            {album.artist}
          </Text>
        </VStack>
      </VStack>
    </div>
  );
}

export default function SpotifyDemo() {
  return (
    <div className="dark h-screen bg-background text-foreground pb-14 overflow-hidden">
      <Flex direction="column" className="h-full">
        {/* Main area: sidebar + content */}
        <AppShell variant="bordered" className="h-auto flex-1 min-h-0">
          {/* Sidebar */}
          <AppShellSidebar width="w-55">
            <VStack gap="2xs" className="px-2 pt-3">
              <MenuItem icon={Home} size="sm" isActive>
                Home
              </MenuItem>
              <MenuItem icon={Search} size="sm">
                Search
              </MenuItem>
            </VStack>

            <Separator />

            <Flex align="center" justify="space-between" className="px-4 pt-1">
              <HStack gap="xs" align="center">
                <Icon icon={Library} size="xs" />
                <Text size="xs" weight="medium">
                  Your Library
                </Text>
              </HStack>
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={Plus}
                aria-label="Create playlist"
              />
            </Flex>

            <ScrollArea className="flex-1 px-2">
              <VStack gap="none">
                {PLAYLISTS.map((playlist) => (
                  <MenuItem key={playlist} icon={ListMusic} size="xs">
                    {playlist}
                  </MenuItem>
                ))}
              </VStack>
            </ScrollArea>
          </AppShellSidebar>

          {/* Main content */}
          <AppShellContent>
            <ScrollArea className="flex-1 min-w-0">
              <VStack gap="xl" className="p-6 pb-16">
                {/* Recently Played */}
                <VStack gap="sm">
                  <Heading size="sm" level="2">
                    Recently Played
                  </Heading>
                  <Grid columns={4} gap="base">
                    {RECENT_ALBUMS.map((album) => (
                      <AlbumCard key={album.title} album={album} />
                    ))}
                  </Grid>
                </VStack>

                {/* Made For You */}
                <VStack gap="sm">
                  <Flex align="center" justify="space-between">
                    <Heading size="sm" level="2">
                      Made For You
                    </Heading>
                    <Button variant="ghost" size="sm">
                      Show all
                    </Button>
                  </Flex>
                  <Grid columns={4} gap="base">
                    {MADE_FOR_YOU.map((album) => (
                      <AlbumCard key={album.title} album={album} />
                    ))}
                  </Grid>
                </VStack>
              </VStack>
            </ScrollArea>
          </AppShellContent>
        </AppShell>

        {/* Player bar — fixed at bottom, z-40 to sit above demo switcher */}
        <Flex
          noShrink
          align="center"
          className="h-20 border-t border-border bg-card px-4 z-40 relative"
        >
          {/* Now playing info */}
          <HStack gap="sm" align="center" className="w-70 shrink-0">
            <Avatar size="lg" radius="rounded">
              <AvatarFallback
                size="lg"
                name="In Rainbows"
                style={{ backgroundColor: "#461111" }}
              >
                IR
              </AvatarFallback>
            </Avatar>
            <VStack gap="2xs" className="min-w-0">
              <Text size="sm" weight="medium" truncate>
                Reckoner
              </Text>
              <Text size="xs" variant="muted" truncate>
                Radiohead
              </Text>
            </VStack>
            <Button
              variant="ghost"
              size="icon-xs"
              icon={Heart}
              aria-label="Like"
            />
          </HStack>

          {/* Center controls */}
          <VStack gap="xs" align="center" grow>
            <HStack gap="sm" align="center">
              <Button
                variant="ghost"
                size="icon-xs"
                icon={Shuffle}
                aria-label="Shuffle"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                icon={SkipBack}
                aria-label="Previous"
              />
              <Button
                variant="default"
                size="icon-base"
                icon={Pause}
                aria-label="Pause"
                radius="full"
              />
              <Button
                variant="ghost"
                size="icon-sm"
                icon={SkipForward}
                aria-label="Next"
              />
              <Button
                variant="ghost"
                size="icon-xs"
                icon={Repeat}
                aria-label="Repeat"
              />
            </HStack>
            <HStack gap="sm" align="center" className="w-full max-w-md">
              <Text size="xs" variant="muted">
                2:14
              </Text>
              <Progress value={45} size="xs" className="flex-1" />
              <Text size="xs" variant="muted">
                4:50
              </Text>
            </HStack>
          </VStack>

          {/* Right controls */}
          <HStack gap="xs" align="center" className="w-45 shrink-0 justify-end">
            <Button
              variant="ghost"
              size="icon-xs"
              icon={Mic2}
              aria-label="Lyrics"
            />
            <Button
              variant="ghost"
              size="icon-xs"
              icon={MonitorSpeaker}
              aria-label="Devices"
            />
            <HStack gap="xs" align="center" className="w-24">
              <Icon icon={Volume2} size="xs" />
              <Slider defaultValue={[70]} max={100} className="flex-1" />
            </HStack>
            <Button
              variant="ghost"
              size="icon-xs"
              icon={Maximize2}
              aria-label="Fullscreen"
            />
          </HStack>
        </Flex>
      </Flex>
    </div>
  );
}
