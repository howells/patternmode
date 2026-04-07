"use client";

/**
 * DESIGN SYSTEM GAPS FOUND:
 * - Grid columns prop doesn't support auto-fill/auto-fit for fluid card grids — using responsive breakpoints instead
 * - Slider requires defaultValue={[70]} array syntax — no single-value shorthand like defaultValue={70}
 * - No CardImage sub-component — using raw div with inline backgroundColor for album art placeholders
 * - Card variant="ghost" removes all visual treatment — need a "subtle" or "interactive" variant for hover cards
 * - No fixed/sticky bottom bar component — using Flex with h-20 shrink-0 className
 * - Progress bar has no built-in "slim" size variant — always h-2
 */

import { Button } from "@patternmode/ui/components/button";
import { Card } from "@patternmode/ui/components/card";
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
  { title: "In Rainbows", artist: "Radiohead", color: "hsl(10, 70%, 45%)" },
  {
    title: "Random Access Memories",
    artist: "Daft Punk",
    color: "hsl(210, 25%, 20%)",
  },
  { title: "OK Computer", artist: "Radiohead", color: "hsl(200, 15%, 50%)" },
  { title: "Discovery", artist: "Daft Punk", color: "hsl(35, 80%, 50%)" },
  { title: "Kid A", artist: "Radiohead", color: "hsl(0, 0%, 15%)" },
  { title: "Currents", artist: "Tame Impala", color: "hsl(340, 60%, 40%)" },
  { title: "The Slow Rush", artist: "Tame Impala", color: "hsl(30, 75%, 55%)" },
  { title: "Is This It", artist: "The Strokes", color: "hsl(50, 70%, 55%)" },
];

const NEW_RELEASES: Album[] = [
  { title: "Chromatic", artist: "Luna Wave", color: "hsl(260, 65%, 50%)" },
  {
    title: "Night Drive",
    artist: "Midnight Circuit",
    color: "hsl(220, 70%, 30%)",
  },
  { title: "Bloom", artist: "Garden State", color: "hsl(140, 55%, 45%)" },
  { title: "Echoes", artist: "Sound Theory", color: "hsl(180, 50%, 40%)" },
  { title: "Daylight", artist: "Morning Tide", color: "hsl(45, 85%, 60%)" },
  { title: "Static", artist: "Frequency Null", color: "hsl(0, 0%, 30%)" },
  { title: "Prism", artist: "Refraction", color: "hsl(300, 60%, 50%)" },
  { title: "Orbit", artist: "Deep Space", color: "hsl(230, 40%, 25%)" },
];

function AlbumCard({ album }: { album: Album }) {
  return (
    <Card variant="interactive">
      <VStack gap="sm">
        <div
          className="aspect-square w-full rounded-lg"
          style={{ backgroundColor: album.color }}
        />
        <VStack gap="2xs">
          <Text size="sm" weight="medium" className="truncate">
            {album.title}
          </Text>
          <Text size="xs" variant="muted" className="truncate">
            {album.artist}
          </Text>
        </VStack>
      </VStack>
    </Card>
  );
}

export default function SpotifyDemo() {
  return (
    <Flex className="h-screen dark" direction="column">
      {/* Main area (sidebar + content) */}
      <Flex className="flex-1 min-h-0" direction="row">
        {/* Sidebar */}
        <VStack className="w-[220px] shrink-0 bg-card border-r border-border">
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
        </VStack>

        {/* Main content */}
        <ScrollArea className="flex-1 min-w-0">
          <VStack gap="xl" className="p-6">
            {/* Recently played */}
            <VStack gap="sm">
              <Heading size="sm" level="2">
                Recently Played
              </Heading>
              <Grid columns={{ base: 2, md: 4 }} gap="base">
                {RECENT_ALBUMS.map((album) => (
                  <AlbumCard key={album.title} album={album} />
                ))}
              </Grid>
            </VStack>

            {/* New releases */}
            <VStack gap="sm">
              <Flex align="center" justify="space-between">
                <Heading size="sm" level="2">
                  New Releases
                </Heading>
                <Button variant="ghost" size="sm">
                  Show all
                </Button>
              </Flex>
              <Grid columns={{ base: 2, md: 4 }} gap="base">
                {NEW_RELEASES.map((album) => (
                  <AlbumCard key={album.title} album={album} />
                ))}
              </Grid>
            </VStack>

            {/* Made for you */}
            <VStack gap="sm">
              <Heading size="sm" level="2">
                Made For You
              </Heading>
              <Grid columns={{ base: 2, md: 4 }} gap="base">
                {[
                  {
                    title: "Daily Mix 1",
                    artist: "Radiohead, Tame Impala, The Strokes",
                    color: "hsl(200, 50%, 40%)",
                  },
                  {
                    title: "Daily Mix 2",
                    artist: "Daft Punk, Justice, Kavinsky",
                    color: "hsl(280, 50%, 35%)",
                  },
                  {
                    title: "Discover Weekly",
                    artist: "Your personalized playlist",
                    color: "hsl(140, 60%, 35%)",
                  },
                  {
                    title: "Release Radar",
                    artist: "New music from artists you follow",
                    color: "hsl(20, 70%, 45%)",
                  },
                ].map((album) => (
                  <AlbumCard key={album.title} album={album} />
                ))}
              </Grid>
            </VStack>
          </VStack>
        </ScrollArea>
      </Flex>

      {/* Bottom player bar */}
      <Flex
        align="center"
        className="h-20 shrink-0 border-t border-border bg-card px-4"
      >
        {/* Now playing info */}
        <HStack gap="sm" align="center" className="w-[280px] shrink-0">
          <div
            className="size-12 rounded-md shrink-0"
            style={{ backgroundColor: "hsl(10, 70%, 45%)" }}
          />
          <VStack gap="2xs" className="min-w-0">
            <Text size="sm" weight="medium" className="truncate">
              Reckoner
            </Text>
            <Text size="xs" variant="muted" className="truncate">
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
        <VStack gap="xs" align="center" className="flex-1">
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
        <HStack
          gap="xs"
          align="center"
          className="w-[180px] shrink-0 justify-end"
        >
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
  );
}
