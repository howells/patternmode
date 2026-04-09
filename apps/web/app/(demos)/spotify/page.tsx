"use client";

import { Button } from "@patternmode/ui/components/button";
import Image from "next/image";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { MenuItem } from "@patternmode/ui/components/menu-item";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
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

/* -- Data --------------------------------------------------------- */

interface Track {
  title: string;
  artist: string;
  album: string;
  duration: string;
  color: string;
  image?: string;
}

const NOW_PLAYING: Track = {
  title: "Reckoner",
  artist: "Radiohead",
  album: "In Rainbows",
  duration: "4:50",
  color: "#461111",
  image: "/albums/in-rainbows.jpg",
};

const QUEUE: Track[] = [
  {
    title: "Nude",
    artist: "Radiohead",
    album: "In Rainbows",
    duration: "4:15",
    color: "#461111",
  },
  {
    title: "Weird Fishes/Arpeggi",
    artist: "Radiohead",
    album: "In Rainbows",
    duration: "5:18",
    color: "#461111",
  },
  {
    title: "All I Need",
    artist: "Radiohead",
    album: "In Rainbows",
    duration: "3:49",
    color: "#461111",
  },
  {
    title: "Jigsaw Falling Into Place",
    artist: "Radiohead",
    album: "In Rainbows",
    duration: "4:09",
    color: "#461111",
  },
  {
    title: "Videotape",
    artist: "Radiohead",
    album: "In Rainbows",
    duration: "4:40",
    color: "#461111",
  },
];

const RECENT_ALBUMS = [
  {
    title: "In Rainbows",
    artist: "Radiohead",
    color: "#461111",
    image: "/albums/in-rainbows.jpg",
  },
  {
    title: "Random Access Memories",
    artist: "Daft Punk",
    color: "#1a2744",
    image: "/albums/random-access.jpg",
  },
  {
    title: "OK Computer",
    artist: "Radiohead",
    color: "#3d4f5f",
    image: "/albums/ok-computer.jpg",
  },
  {
    title: "Discovery",
    artist: "Daft Punk",
    color: "#3a4a6b",
    image: "/albums/discovery.jpg",
  },
  {
    title: "Kid A",
    artist: "Radiohead",
    color: "#2d3a2d",
    image: "/albums/kid-a.jpg",
  },
  {
    title: "Currents",
    artist: "Tame Impala",
    color: "#5a3a7a",
    image: "/albums/currents.jpg",
  },
];

const PLAYLISTS = [
  "Liked Songs",
  "Discover Weekly",
  "Release Radar",
  "Daily Mix 1",
  "Daily Mix 2",
  "Chill Vibes",
  "Focus Flow",
  "Late Night Jazz",
];

/* -- Sub-components ----------------------------------------------- */

function AlbumArt({
  color,
  image,
  size = "large",
  alt = "",
}: {
  color: string;
  image?: string;
  size?: "small" | "large";
  alt?: string;
}) {
  const dim = size === "large" ? 224 : 40;
  const sizeClass =
    size === "large" ? "size-56 rounded-lg" : "size-10 rounded-md";

  if (image) {
    return (
      <div className={`${sizeClass} shrink-0 image-frame overflow-hidden`}>
        <Image
          src={image}
          alt={alt}
          width={dim}
          height={dim}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} shrink-0`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}88 50%, ${color}44 100%)`,
      }}
    />
  );
}

function QueueItem({ track, index }: { track: Track; index: number }) {
  return (
    <HStack
      align="center"
      gap="sm"
      className="group cursor-pointer rounded-md px-3 py-1.5 hover:bg-white/5"
    >
      <Text
        size="xs"
        variant="muted"
        tabularNums
        className="w-5 shrink-0 text-center"
      >
        {index + 1}
      </Text>
      <AlbumArt
        color={track.color}
        image={NOW_PLAYING.image}
        size="small"
        alt={track.album}
      />
      <VStack gap="none" className="flex-1 min-w-0">
        <Text size="sm" truncate className="text-white">
          {track.title}
        </Text>
        <Text size="xs" className="text-zinc-400">
          {track.artist}
        </Text>
      </VStack>
      <Text size="xs" tabularNums className="text-zinc-500 shrink-0">
        {track.duration}
      </Text>
    </HStack>
  );
}

/* -- Page --------------------------------------------------------- */

export default function SpotifyDemo() {
  return (
    <div className="dark h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Flex className="h-full">
        {/* Sidebar */}
        <VStack
          noShrink
          gap="none"
          className="w-56 border-r border-white/5 bg-zinc-950"
        >
          <VStack gap="none" className="px-3 pt-4 pb-2">
            <MenuItem icon={Home} size="xs" isActive>
              Home
            </MenuItem>
            <MenuItem icon={Search} size="xs">
              Search
            </MenuItem>
          </VStack>

          <Separator className="border-white/5" />

          <HStack
            align="center"
            justify="space-between"
            className="px-4 pt-3 pb-1"
          >
            <HStack gap="xs" align="center">
              <Icon icon={Library} size="xs" className="text-zinc-400" />
              <Text size="xs" weight="medium" className="text-zinc-400">
                Your Library
              </Text>
            </HStack>
            <Button
              variant="ghost"
              size="icon-2xs"
              icon={Plus}
              aria-label="Create playlist"
              className="text-zinc-400 hover:text-white"
            />
          </HStack>

          <ScrollArea className="flex-1">
            <VStack gap="none" className="px-2 py-1">
              {PLAYLISTS.map((name) => (
                <MenuItem key={name} icon={ListMusic} size="xs">
                  {name}
                </MenuItem>
              ))}
            </VStack>
          </ScrollArea>
        </VStack>

        {/* Main content */}
        <VStack grow gap="none" className="min-w-0 overflow-hidden">
          <ScrollArea className="flex-1">
            {/* Hero: Now Playing — large, atmospheric */}
            <div
              className="relative px-8 pt-12 pb-8"
              style={{
                background: `radial-gradient(ellipse at 20% 40%, ${NOW_PLAYING.color} 0%, ${NOW_PLAYING.color}60 30%, transparent 70%)`,
              }}
            >
              <HStack gap="lg" align="flex-end">
                <AlbumArt
                  color={NOW_PLAYING.color}
                  image={NOW_PLAYING.image}
                  size="large"
                  alt={NOW_PLAYING.album}
                />
                <VStack gap="xs" className="pb-2">
                  <Text
                    size="xs"
                    weight="medium"
                    className="text-white/60 uppercase tracking-wider"
                  >
                    Now Playing
                  </Text>
                  <Text
                    size="3xl"
                    weight="semibold"
                    className="text-white leading-none"
                  >
                    {NOW_PLAYING.title}
                  </Text>
                  <HStack gap="xs" align="center">
                    <Text size="sm" className="text-white/80">
                      {NOW_PLAYING.artist}
                    </Text>
                    <Text size="sm" className="text-white/40">
                      &middot;
                    </Text>
                    <Text size="sm" className="text-white/60">
                      {NOW_PLAYING.album}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </div>

            {/* Queue */}
            <VStack gap="sm" className="px-6 py-6">
              <Text
                size="xs"
                weight="medium"
                className="text-zinc-400 uppercase tracking-wider px-3"
              >
                Up Next
              </Text>
              <VStack gap="none">
                {QUEUE.map((track, i) => (
                  <QueueItem key={track.title} track={track} index={i} />
                ))}
              </VStack>
            </VStack>

            <Separator className="border-white/5 mx-6" />

            {/* Recent albums */}
            <VStack gap="sm" className="px-6 py-6 pb-24">
              <Text
                size="xs"
                weight="medium"
                className="text-zinc-400 uppercase tracking-wider px-3"
              >
                Recently Played
              </Text>
              <div className="grid grid-cols-3 gap-4 px-3">
                {RECENT_ALBUMS.map((album) => (
                  <VStack
                    key={album.title}
                    gap="sm"
                    className="group cursor-pointer"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-md image-frame transition-transform duration-200 group-hover:scale-[1.02]">
                      <Image
                        src={album.image}
                        alt={album.title}
                        width={400}
                        height={400}
                        className="size-full object-cover"
                      />
                    </div>
                    <VStack gap="none">
                      <Text
                        size="sm"
                        weight="medium"
                        truncate
                        className="text-white"
                      >
                        {album.title}
                      </Text>
                      <Text size="xs" truncate className="text-zinc-400">
                        {album.artist}
                      </Text>
                    </VStack>
                  </VStack>
                ))}
              </div>
            </VStack>
          </ScrollArea>

          {/* Player bar */}
          <Flex
            noShrink
            align="center"
            className="h-20 border-t border-white/5 bg-zinc-900/80 backdrop-blur-sm px-4"
          >
            {/* Now playing info */}
            <HStack gap="sm" align="center" className="w-64 shrink-0">
              <AlbumArt
                color={NOW_PLAYING.color}
                image={NOW_PLAYING.image}
                size="small"
                alt={NOW_PLAYING.album}
              />
              <VStack gap="none" className="min-w-0">
                <Text size="sm" weight="medium" truncate className="text-white">
                  {NOW_PLAYING.title}
                </Text>
                <Text size="xs" truncate className="text-zinc-400">
                  {NOW_PLAYING.artist}
                </Text>
              </VStack>
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={Heart}
                aria-label="Like"
                className="text-zinc-400 hover:text-white shrink-0"
              />
            </HStack>

            {/* Controls */}
            <VStack gap="xs" align="center" className="flex-1">
              <HStack gap="base" align="center">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  icon={Shuffle}
                  aria-label="Shuffle"
                  className="text-zinc-400 hover:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon-xs"
                  icon={SkipBack}
                  aria-label="Previous"
                  className="text-zinc-400 hover:text-white"
                />
                <Flex
                  align="center"
                  justify="center"
                  className="size-9 rounded-full bg-white cursor-pointer hover:scale-105 transition-transform"
                >
                  <Icon icon={Pause} size="sm" className="text-black" />
                </Flex>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  icon={SkipForward}
                  aria-label="Next"
                  className="text-zinc-400 hover:text-white"
                />
                <Button
                  variant="ghost"
                  size="icon-xs"
                  icon={Repeat}
                  aria-label="Repeat"
                  className="text-zinc-400 hover:text-white"
                />
              </HStack>
              <HStack gap="xs" align="center" className="w-full max-w-md">
                <Text size="2xs" tabularNums className="text-zinc-500">
                  2:14
                </Text>
                <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full w-[47%] bg-white rounded-full" />
                </div>
                <Text size="2xs" tabularNums className="text-zinc-500">
                  4:50
                </Text>
              </HStack>
            </VStack>

            {/* Right controls */}
            <HStack
              gap="xs"
              align="center"
              className="w-40 shrink-0 justify-end"
            >
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={Mic2}
                aria-label="Lyrics"
                className="text-zinc-400 hover:text-white"
              />
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={MonitorSpeaker}
                aria-label="Devices"
                className="text-zinc-400 hover:text-white"
              />
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={Volume2}
                aria-label="Volume"
                className="text-zinc-400 hover:text-white"
              />
              <div className="w-20 h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full w-[70%] bg-white rounded-full" />
              </div>
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={Maximize2}
                aria-label="Fullscreen"
                className="text-zinc-400 hover:text-white"
              />
            </HStack>
          </Flex>
        </VStack>
      </Flex>
    </div>
  );
}
