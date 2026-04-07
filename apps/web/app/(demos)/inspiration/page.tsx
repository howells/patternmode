"use client";

import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Button } from "@patternmode/ui/components/button";
import { Card } from "@patternmode/ui/components/card";
import { Flex } from "@patternmode/ui/components/flex";
import { Heading } from "@patternmode/ui/components/heading";
import {
  InputGroup,
  InputGroupIcon,
  InputGroupInput,
} from "@patternmode/ui/components/input-group";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Tabs, TabsList, TabsTrigger } from "@patternmode/ui/components/tabs";
import { Text } from "@patternmode/ui/components/text";
import { Bookmark, Plus, Search } from "lucide-react";
import { useState } from "react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const CATEGORIES = [
  "Featured",
  "Graphic Design",
  "Art",
  "Fashion",
  "Branding",
  "Interiors",
  "Typography",
  "Architecture",
  "Interfaces",
  "Nature",
  "Cinema",
  "Motion",
  "Technology",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Collection {
  title: string;
  author: string;
  elementCount: number;
  thumbnails: [string, string, string];
}

const COLLECTIONS: Collection[] = [
  {
    title: "Spatial Narratives",
    author: "Elise Moreau",
    elementCount: 42,
    thumbnails: ["#8b7355", "#a39178", "#c4b5a0"],
  },
  {
    title: "Chromatic Tensions",
    author: "Tomas Lindgren",
    elementCount: 67,
    thumbnails: ["#6b7c6e", "#8a9b8d", "#b5c4b8"],
  },
  {
    title: "Quiet Structures",
    author: "Yuki Tanaka",
    elementCount: 31,
    thumbnails: ["#7a6f8a", "#9b8faa", "#beb5cb"],
  },
  {
    title: "Analog Textures",
    author: "Maren Voss",
    elementCount: 55,
    thumbnails: ["#8c7b6a", "#a69585", "#c9bfb3"],
  },
];

// Muted, earthy, interesting palette for masonry items
const MASONRY_COLORS = [
  "#8b7355",
  "#6b7c6e",
  "#7a6f8a",
  "#8c7b6a",
  "#5e6b5c",
  "#7d6c5a",
  "#6a7080",
  "#8a7e6d",
  "#5c6a70",
  "#7b6b7a",
  "#6d7a65",
  "#847a6a",
  "#6e6478",
  "#7c8575",
  "#8a7067",
  "#5f7068",
  "#786a5e",
  "#6a7578",
  "#7e6d6d",
  "#6b7466",
] as const;

interface MasonryItem {
  id: string;
  color: string;
  height: number;
  title: string;
  author: string;
}

const MASONRY_ITEMS: MasonryItem[] = [
  {
    id: "m1",
    color: MASONRY_COLORS[0],
    height: 280,
    title: "Weathered Stone",
    author: "Elise Moreau",
  },
  {
    id: "m2",
    color: MASONRY_COLORS[1],
    height: 200,
    title: "Moss Garden",
    author: "Yuki Tanaka",
  },
  {
    id: "m3",
    color: MASONRY_COLORS[2],
    height: 320,
    title: "Dusk Curtain",
    author: "Maren Voss",
  },
  {
    id: "m4",
    color: MASONRY_COLORS[3],
    height: 240,
    title: "Sienna Drift",
    author: "Tomas Lindgren",
  },
  {
    id: "m5",
    color: MASONRY_COLORS[4],
    height: 300,
    title: "Deep Canopy",
    author: "Noa Svensson",
  },
  {
    id: "m6",
    color: MASONRY_COLORS[5],
    height: 180,
    title: "Raw Umber",
    author: "Elise Moreau",
  },
  {
    id: "m7",
    color: MASONRY_COLORS[6],
    height: 260,
    title: "Overcast Steel",
    author: "Kai Richter",
  },
  {
    id: "m8",
    color: MASONRY_COLORS[7],
    height: 220,
    title: "Warm Dust",
    author: "Maren Voss",
  },
  {
    id: "m9",
    color: MASONRY_COLORS[8],
    height: 340,
    title: "Tidal Slate",
    author: "Yuki Tanaka",
  },
  {
    id: "m10",
    color: MASONRY_COLORS[9],
    height: 190,
    title: "Thistle Fog",
    author: "Noa Svensson",
  },
  {
    id: "m11",
    color: MASONRY_COLORS[10],
    height: 270,
    title: "Fern Shadow",
    author: "Tomas Lindgren",
  },
  {
    id: "m12",
    color: MASONRY_COLORS[11],
    height: 230,
    title: "Clay Basin",
    author: "Kai Richter",
  },
  {
    id: "m13",
    color: MASONRY_COLORS[12],
    height: 310,
    title: "Lavender Haze",
    author: "Elise Moreau",
  },
  {
    id: "m14",
    color: MASONRY_COLORS[13],
    height: 200,
    title: "Sage Meadow",
    author: "Maren Voss",
  },
  {
    id: "m15",
    color: MASONRY_COLORS[14],
    height: 260,
    title: "Terracotta",
    author: "Yuki Tanaka",
  },
  {
    id: "m16",
    color: MASONRY_COLORS[15],
    height: 290,
    title: "Spruce Hollow",
    author: "Noa Svensson",
  },
  {
    id: "m17",
    color: MASONRY_COLORS[16],
    height: 210,
    title: "Sandstone",
    author: "Tomas Lindgren",
  },
  {
    id: "m18",
    color: MASONRY_COLORS[17],
    height: 250,
    title: "Granite Wash",
    author: "Kai Richter",
  },
  {
    id: "m19",
    color: MASONRY_COLORS[18],
    height: 300,
    title: "Rosewood",
    author: "Elise Moreau",
  },
  {
    id: "m20",
    color: MASONRY_COLORS[19],
    height: 220,
    title: "Cedar Line",
    author: "Maren Voss",
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function LogoIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-7 text-foreground"
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="14" cy="14" fill="currentColor" r="14" />
      <circle cx="14" cy="14" fill="white" r="5" />
    </svg>
  );
}

function CategoryPills({
  active,
  onSelect,
}: {
  active: Category;
  onSelect: (category: Category) => void;
}) {
  return (
    <ScrollArea hideScrollbar orientation="horizontal">
      <HStack className="px-6 py-3" gap="xs">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat}
            className={
              cat === active
                ? "bg-foreground text-background hover:bg-foreground/90"
                : ""
            }
            onClick={() => onSelect(cat)}
            radius="rounded"
            size="sm"
            variant={cat === active ? "default" : "ghost"}
          >
            {cat}
          </Button>
        ))}
      </HStack>
    </ScrollArea>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <VStack className="min-w-[260px] max-w-[300px] cursor-pointer" gap="sm">
      {/* Thumbnail row */}
      <Flex className="h-40 overflow-hidden rounded-lg" gap="xs">
        {collection.thumbnails.map((color, i) => (
          <div
            key={color}
            className="flex-1 rounded-sm transition-transform duration-200 hover:scale-[1.02]"
            style={{ backgroundColor: color }}
          />
        ))}
      </Flex>
      {/* Meta */}
      <VStack gap="2xs">
        <Text size="sm" weight="semibold">
          {collection.title}
        </Text>
        <Text size="xs" variant="muted">
          {collection.author} &middot; {collection.elementCount} elements
        </Text>
      </VStack>
    </VStack>
  );
}

function MasonryCard({ item }: { item: MasonryItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      border="none"
      className="group relative mb-4 overflow-hidden break-inside-avoid p-0"
      variant="interactive"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color placeholder */}
      <div
        className="w-full rounded-lg"
        style={{
          backgroundColor: item.color,
          height: `${item.height}px`,
        }}
      />
      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-between rounded-lg p-3 transition-opacity duration-200"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.45) 100%)",
          opacity: hovered ? 1 : 0,
        }}
      >
        {/* Top-right bookmark */}
        <Flex justify="flex-end">
          <Button
            aria-label="Save to collection"
            className="bg-white/90 text-gray-900 shadow-sm hover:bg-white"
            icon={Bookmark}
            size="icon-xs"
            variant="ghost"
          />
        </Flex>
        {/* Bottom info */}
        <VStack gap="2xs">
          <Text
            className="text-white drop-shadow-sm"
            size="sm"
            weight="semibold"
          >
            {item.title}
          </Text>
          <Text className="text-white/80 drop-shadow-sm" size="xs">
            {item.author}
          </Text>
        </VStack>
      </div>
    </Card>
  );
}

function MasonryGrid({ items }: { items: MasonryItem[] }) {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
      {items.map((item) => (
        <MasonryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function InspirationDemo() {
  const [activeCategory, setActiveCategory] = useState<Category>("Featured");

  return (
    <VStack className="min-h-screen bg-background" gap="none">
      {/* ----------------------------------------------------------------- */}
      {/* Top nav bar                                                       */}
      {/* ----------------------------------------------------------------- */}
      <Flex
        align="center"
        className="sticky top-0 z-50 border-b border-border bg-background/95 px-6 py-2.5 backdrop-blur-sm"
        justify="space-between"
        noShrink
      >
        {/* Left: Logo + Navigation Tabs */}
        <HStack align="center" gap="base">
          <LogoIcon />
          <Tabs defaultValue="for-you" variant="pill" size="sm">
            <TabsList>
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
            </TabsList>
          </Tabs>
        </HStack>

        {/* Center: Search */}
        <div className="hidden w-full max-w-md md:block">
          <InputGroup radius="rounded" size="sm">
            <InputGroupIcon icon={Search} />
            <InputGroupInput placeholder="Search inspiration..." />
          </InputGroup>
        </div>

        {/* Right: Create + Avatar */}
        <HStack align="center" gap="sm">
          <Button icon={Plus} size="sm">
            Create
          </Button>
          <Avatar size="sm">
            <AvatarFallback name="Daniel Howells" size="sm" />
          </Avatar>
        </HStack>
      </Flex>

      {/* ----------------------------------------------------------------- */}
      {/* Category filter row                                               */}
      {/* ----------------------------------------------------------------- */}
      <div className="border-b border-border">
        <CategoryPills active={activeCategory} onSelect={setActiveCategory} />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Main content                                                      */}
      {/* ----------------------------------------------------------------- */}
      <VStack className="mx-auto w-full max-w-7xl px-6 py-8" gap="xl">
        {/* Featured collections */}
        <VStack gap="base">
          <HStack align="center" justify="space-between">
            <Heading level="2" size="xs">
              Selected by Cosmos
            </Heading>
            <Button size="sm" variant="ghost">
              View all
            </Button>
          </HStack>

          <ScrollArea hideScrollbar orientation="horizontal">
            <HStack gap="base" className="pb-2">
              {COLLECTIONS.map((collection) => (
                <CollectionCard
                  key={collection.title}
                  collection={collection}
                />
              ))}
            </HStack>
          </ScrollArea>
        </VStack>

        <Separator variant="muted" />

        {/* Masonry explore grid */}
        <VStack gap="base">
          <Heading level="2" size="xs">
            Explore elements
          </Heading>

          <MasonryGrid items={MASONRY_ITEMS} />
        </VStack>
      </VStack>
    </VStack>
  );
}
