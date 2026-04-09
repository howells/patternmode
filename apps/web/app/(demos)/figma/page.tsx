"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { ButtonGroup } from "@patternmode/ui/components/button-group";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { Input } from "@patternmode/ui/components/input";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import { Separator } from "@patternmode/ui/components/separator";
import { HStack, VStack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowUpRight,
  ChevronDown,
  Circle,
  Component,
  Copy,
  Diamond,
  Eye,
  EyeOff,
  Frame,
  Grid3X3,
  Hand,
  Image,
  Layers,
  Lock,
  Minus,
  MousePointer2,
  Move,
  Pen,
  Play,
  Plus,
  Redo,
  Square,
  Type,
  Undo,
  Unlock,
  ZoomIn,
} from "lucide-react";

/* -- Layer data --------------------------------------------------- */

interface LayerNode {
  name: string;
  type:
    | "frame"
    | "text"
    | "rectangle"
    | "ellipse"
    | "component"
    | "image"
    | "group";
  visible: boolean;
  locked: boolean;
  selected?: boolean;
  children?: LayerNode[];
  depth: number;
}

const LAYER_TYPE_ICONS: Record<LayerNode["type"], typeof Frame> = {
  frame: Frame,
  text: Type,
  rectangle: Square,
  ellipse: Circle,
  component: Component,
  image: Image,
  group: Layers,
};

const LAYERS: LayerNode[] = [
  {
    name: "Hero Section",
    type: "frame",
    visible: true,
    locked: false,
    depth: 0,
    selected: true,
    children: [
      {
        name: "Background Gradient",
        type: "rectangle",
        visible: true,
        locked: true,
        depth: 1,
      },
      { name: "Heading", type: "text", visible: true, locked: false, depth: 1 },
      {
        name: "Subheading",
        type: "text",
        visible: true,
        locked: false,
        depth: 1,
      },
      {
        name: "CTA Group",
        type: "frame",
        visible: true,
        locked: false,
        depth: 1,
        children: [
          {
            name: "Primary Button",
            type: "component",
            visible: true,
            locked: false,
            depth: 2,
          },
          {
            name: "Secondary Button",
            type: "component",
            visible: true,
            locked: false,
            depth: 2,
          },
        ],
      },
    ],
  },
  {
    name: "Features",
    type: "frame",
    visible: true,
    locked: false,
    depth: 0,
    children: [
      {
        name: "Section Title",
        type: "text",
        visible: true,
        locked: false,
        depth: 1,
      },
      {
        name: "Card 1",
        type: "component",
        visible: true,
        locked: false,
        depth: 1,
      },
      {
        name: "Card 2",
        type: "component",
        visible: true,
        locked: false,
        depth: 1,
      },
      {
        name: "Card 3",
        type: "component",
        visible: true,
        locked: false,
        depth: 1,
      },
    ],
  },
  {
    name: "Footer",
    type: "frame",
    visible: false,
    locked: false,
    depth: 0,
    children: [
      { name: "Logo", type: "image", visible: true, locked: false, depth: 1 },
      {
        name: "Nav Links",
        type: "frame",
        visible: true,
        locked: false,
        depth: 1,
      },
    ],
  },
];

function flattenLayers(layers: LayerNode[]): LayerNode[] {
  const result: LayerNode[] = [];
  for (const layer of layers) {
    result.push(layer);
    if (layer.children) result.push(...flattenLayers(layer.children));
  }
  return result;
}

const ALL_LAYERS = flattenLayers(LAYERS);

/* -- Sub-components ----------------------------------------------- */

function LayerRow({ layer }: { layer: LayerNode }) {
  const iconComponent = LAYER_TYPE_ICONS[layer.type];
  const paddingLeft = layer.depth * 16 + 8;

  return (
    <Flex
      align="center"
      gap="xs"
      className={`min-h-7 px-2 py-0.5 cursor-default group ${
        layer.selected ? "bg-blue-500/10 text-foreground" : "hover:bg-accent/50"
      }`}
      style={{ paddingLeft }}
    >
      {layer.children ? (
        <Icon icon={ChevronDown} size="2xs" />
      ) : (
        <div className="w-3" />
      )}
      <Icon
        icon={iconComponent}
        size="2xs"
        className={layer.selected ? "text-blue-500" : ""}
      />
      <Text
        size="xs"
        truncate
        className="flex-1 min-w-0"
        variant={layer.visible ? "default" : "muted"}
        weight={layer.selected ? "medium" : "normal"}
      >
        {layer.name}
      </Text>
      <HStack gap="2xs" className="opacity-0 group-hover:opacity-100 shrink-0">
        <Button
          variant="ghost"
          size="icon-2xs"
          icon={layer.locked ? Lock : Unlock}
          aria-label={layer.locked ? "Unlock" : "Lock"}
        />
        <Button
          variant="ghost"
          size="icon-2xs"
          icon={layer.visible ? Eye : EyeOff}
          aria-label={layer.visible ? "Hide" : "Show"}
        />
      </HStack>
    </Flex>
  );
}

function PropertyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Flex align="center" gap="sm" className="min-h-8">
      <Text size="xs" variant="muted" className="w-16 shrink-0">
        {label}
      </Text>
      <div className="flex-1">{children}</div>
    </Flex>
  );
}

/* -- Canvas artboard ---------------------------------------------- */

function CanvasArtboard() {
  return (
    <div className="w-100 bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* Selection outline */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-blue-500 ring-offset-1 pointer-events-none z-10" />

      {/* Hero section — gradient bg with real-looking content */}
      <div className="relative px-8 pt-10 pb-8 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <VStack gap="xs" align="center" className="text-center">
          <div className="h-3 w-32 rounded-full bg-white/20" />
          <div className="h-5 w-56 rounded bg-white/90 mt-1" />
          <div className="h-3 w-44 rounded bg-white/40 mt-0.5" />
          <HStack gap="xs" className="mt-2">
            <div className="h-6 w-16 rounded-md bg-white" />
            <div className="h-6 w-16 rounded-md bg-white/20 border border-white/30" />
          </HStack>
        </VStack>
      </div>

      {/* Features section */}
      <VStack gap="sm" className="px-6 py-6">
        <div className="h-3 w-24 rounded bg-zinc-200 mx-auto" />
        <div className="h-2 w-40 rounded bg-zinc-100 mx-auto" />
        <HStack gap="sm" className="mt-2">
          <VStack
            className="flex-1 rounded-lg border border-zinc-100 p-3"
            gap="xs"
          >
            <div className="size-6 rounded-md bg-zinc-100" />
            <div className="h-2 w-16 rounded bg-zinc-200" />
            <div className="h-1.5 w-full rounded bg-zinc-50" />
            <div className="h-1.5 w-3/4 rounded bg-zinc-50" />
          </VStack>
          <VStack
            className="flex-1 rounded-lg border border-zinc-100 p-3"
            gap="xs"
          >
            <div className="size-6 rounded-md bg-zinc-100" />
            <div className="h-2 w-14 rounded bg-zinc-200" />
            <div className="h-1.5 w-full rounded bg-zinc-50" />
            <div className="h-1.5 w-2/3 rounded bg-zinc-50" />
          </VStack>
          <VStack
            className="flex-1 rounded-lg border border-zinc-100 p-3"
            gap="xs"
          >
            <div className="size-6 rounded-md bg-zinc-100" />
            <div className="h-2 w-12 rounded bg-zinc-200" />
            <div className="h-1.5 w-full rounded bg-zinc-50" />
            <div className="h-1.5 w-4/5 rounded bg-zinc-50" />
          </VStack>
        </HStack>
      </VStack>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-zinc-50 flex items-center justify-between opacity-40">
        <div className="h-2 w-12 rounded bg-zinc-200" />
        <HStack gap="sm">
          <div className="h-1.5 w-8 rounded bg-zinc-100" />
          <div className="h-1.5 w-8 rounded bg-zinc-100" />
          <div className="h-1.5 w-8 rounded bg-zinc-100" />
        </HStack>
      </div>

      {/* Selection handles */}
      <div className="absolute -top-1 -left-1 size-2 bg-white border-2 border-blue-500 rounded-sm pointer-events-none z-10" />
      <div className="absolute -top-1 -right-1 size-2 bg-white border-2 border-blue-500 rounded-sm pointer-events-none z-10" />
      <div className="absolute -bottom-1 -left-1 size-2 bg-white border-2 border-blue-500 rounded-sm pointer-events-none z-10" />
      <div className="absolute -bottom-1 -right-1 size-2 bg-white border-2 border-blue-500 rounded-sm pointer-events-none z-10" />
    </div>
  );
}

/* -- Page --------------------------------------------------------- */

export default function FigmaDemo() {
  return (
    <Flex fullHeight direction="column" className="overflow-hidden">
      {/* Toolbar */}
      <Flex
        align="center"
        justify="space-between"
        className="h-11 shrink-0 border-b border-border bg-card px-3"
      >
        <HStack gap="sm" align="center">
          <ButtonGroup variant="joined" radius="rounded">
            <Button
              variant="ghost"
              size="icon-sm"
              icon={MousePointer2}
              aria-label="Select"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Move}
              aria-label="Move"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Hand}
              aria-label="Hand"
            />
          </ButtonGroup>
          <Separator orientation="vertical" className="h-5" />
          <ButtonGroup variant="joined" radius="rounded">
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Frame}
              aria-label="Frame"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Square}
              aria-label="Rectangle"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Circle}
              aria-label="Ellipse"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Diamond}
              aria-label="Polygon"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Pen}
              aria-label="Pen"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Type}
              aria-label="Text"
            />
          </ButtonGroup>
          <Separator orientation="vertical" className="h-5" />
          <ButtonGroup variant="joined" radius="rounded">
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Component}
              aria-label="Component"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Grid3X3}
              aria-label="Auto Layout"
            />
          </ButtonGroup>
        </HStack>

        <HStack gap="sm" align="center">
          <Text size="sm" weight="medium">
            Landing Page v2
          </Text>
          <Badge variant="secondary" size="xs" appearance="outline">
            Draft
          </Badge>
        </HStack>

        <HStack gap="sm" align="center">
          <ButtonGroup variant="joined" radius="rounded">
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Undo}
              aria-label="Undo"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              icon={Redo}
              aria-label="Redo"
            />
          </ButtonGroup>
          <Separator orientation="vertical" className="h-5" />
          <HStack gap="xs" align="center">
            <Button
              variant="ghost"
              size="icon-sm"
              icon={ZoomIn}
              aria-label="Zoom"
            />
            <Text size="xs" variant="muted">
              100%
            </Text>
          </HStack>
          <Separator orientation="vertical" className="h-5" />
          <Button variant="default" size="sm" icon={Play}>
            Present
          </Button>
          <Button variant="ghost" size="sm" icon={ArrowUpRight}>
            Share
          </Button>
        </HStack>
      </Flex>

      {/* Main area */}
      <Flex className="flex-1 min-h-0" direction="row">
        {/* Layers panel */}
        <VStack className="w-56 shrink-0 border-r border-border">
          <Flex
            align="center"
            justify="space-between"
            className="h-9 shrink-0 border-b border-border px-3"
          >
            <HStack gap="xs" align="center">
              <Icon icon={Layers} size="xs" />
              <Text size="xs" weight="medium">
                Layers
              </Text>
            </HStack>
            <HStack gap="xs">
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={Plus}
                aria-label="Add"
              />
              <Button
                variant="ghost"
                size="icon-2xs"
                icon={Copy}
                aria-label="Duplicate"
              />
            </HStack>
          </Flex>

          <ScrollArea className="flex-1">
            <VStack gap="none" className="py-1">
              {ALL_LAYERS.map((layer) => (
                <LayerRow key={layer.name} layer={layer} />
              ))}
            </VStack>
          </ScrollArea>
        </VStack>

        {/* Canvas — dot grid background */}
        <Flex
          align="center"
          justify="center"
          className="flex-1 min-w-0"
          style={{
            backgroundColor: "#f8f8f8",
            backgroundImage:
              "radial-gradient(circle, #ddd 0.5px, transparent 0.5px)",
            backgroundSize: "20px 20px",
          }}
        >
          <VStack align="center" gap="sm">
            <CanvasArtboard />
            <Text size="2xs" variant="muted" font="mono">
              Desktop — 1440 × 900
            </Text>
          </VStack>
        </Flex>

        {/* Properties panel */}
        <VStack className="w-64 shrink-0 border-l border-border">
          <Flex
            align="center"
            justify="space-between"
            className="h-9 shrink-0 border-b border-border px-3"
          >
            <Text size="xs" weight="medium">
              Design
            </Text>
            <Text size="xs" variant="muted">
              Inspect
            </Text>
          </Flex>

          <ScrollArea className="flex-1">
            <VStack gap="sm" className="p-3">
              {/* Selection info */}
              <VStack gap="2xs">
                <HStack gap="xs" align="center">
                  <Icon icon={Frame} size="2xs" className="text-blue-500" />
                  <Text size="xs" weight="semibold">
                    Hero Section
                  </Text>
                </HStack>
                <Text size="2xs" variant="muted">
                  Auto Layout · Vertical
                </Text>
              </VStack>

              <Separator />

              {/* Position & Size */}
              <VStack gap="xs">
                <Text size="2xs" variant="muted" weight="medium">
                  Position
                </Text>
                <HStack gap="xs">
                  <PropertyRow label="X">
                    <Input size="xs" defaultValue="0" />
                  </PropertyRow>
                  <PropertyRow label="Y">
                    <Input size="xs" defaultValue="0" />
                  </PropertyRow>
                </HStack>
                <HStack gap="xs">
                  <PropertyRow label="W">
                    <Input size="xs" defaultValue="1440" />
                  </PropertyRow>
                  <PropertyRow label="H">
                    <Input size="xs" defaultValue="400" />
                  </PropertyRow>
                </HStack>
              </VStack>

              <Separator />

              {/* Auto Layout */}
              <VStack gap="xs">
                <Flex align="center" justify="space-between">
                  <Text size="2xs" variant="muted" weight="medium">
                    Auto Layout
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Plus}
                    aria-label="Add"
                  />
                </Flex>
                <HStack gap="xs">
                  <PropertyRow label="Gap">
                    <Input size="xs" defaultValue="24" />
                  </PropertyRow>
                  <PropertyRow label="Pad">
                    <Input size="xs" defaultValue="40" />
                  </PropertyRow>
                </HStack>
                <HStack gap="xs">
                  <ButtonGroup variant="joined" radius="rounded">
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={AlignLeft}
                      aria-label="Left"
                    />
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={AlignCenter}
                      aria-label="Center"
                    />
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={AlignRight}
                      aria-label="Right"
                    />
                  </ButtonGroup>
                </HStack>
              </VStack>

              <Separator />

              {/* Fill */}
              <VStack gap="xs">
                <Flex align="center" justify="space-between">
                  <Text size="2xs" variant="muted" weight="medium">
                    Fill
                  </Text>
                  <HStack gap="2xs">
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={Minus}
                      aria-label="Remove"
                    />
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={Plus}
                      aria-label="Add"
                    />
                  </HStack>
                </Flex>
                <HStack gap="sm" align="center">
                  <div className="size-6 shrink-0 rounded border border-border bg-gradient-to-br from-zinc-900 to-zinc-800" />
                  <Input size="xs" defaultValue="1A1A1D" className="flex-1" />
                  <Text size="xs" variant="muted">
                    100%
                  </Text>
                </HStack>
              </VStack>

              <Separator />

              {/* Stroke */}
              <VStack gap="xs">
                <Flex align="center" justify="space-between">
                  <Text size="2xs" variant="muted" weight="medium">
                    Stroke
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Plus}
                    aria-label="Add"
                  />
                </Flex>
                <Text size="xs" variant="muted">
                  No stroke
                </Text>
              </VStack>

              <Separator />

              {/* Effects */}
              <VStack gap="xs">
                <Flex align="center" justify="space-between">
                  <Text size="2xs" variant="muted" weight="medium">
                    Effects
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Plus}
                    aria-label="Add"
                  />
                </Flex>
                <HStack gap="sm" align="center">
                  <Badge variant="secondary" size="xs">
                    Drop Shadow
                  </Badge>
                  <Text size="xs" variant="muted">
                    0, 4, 12
                  </Text>
                  <div className="flex-1" />
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Eye}
                    aria-label="Toggle"
                  />
                </HStack>
              </VStack>
            </VStack>
          </ScrollArea>
        </VStack>
      </Flex>
    </Flex>
  );
}
