"use client";

import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import { ButtonGroup } from "@patternmode/ui/components/button-group";
import { Flex } from "@patternmode/ui/components/flex";
import { Icon } from "@patternmode/ui/components/icon";
import { Input } from "@patternmode/ui/components/input";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@patternmode/ui/components/select";
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
  Star,
  Type,
  Undo,
  Unlock,
  ZoomIn,
} from "lucide-react";

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
    children: [
      {
        name: "Background",
        type: "rectangle",
        visible: true,
        locked: true,
        depth: 1,
      },
      {
        name: "Hero Heading",
        type: "text",
        visible: true,
        locked: false,
        depth: 1,
      },
      {
        name: "Hero Subheading",
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
      {
        name: "Hero Image",
        type: "image",
        visible: true,
        locked: false,
        depth: 1,
      },
    ],
  },
  {
    name: "Features Grid",
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
        children: [
          {
            name: "Icon",
            type: "ellipse",
            visible: true,
            locked: false,
            depth: 2,
          },
          {
            name: "Title",
            type: "text",
            visible: true,
            locked: false,
            depth: 2,
          },
          {
            name: "Description",
            type: "text",
            visible: true,
            locked: false,
            depth: 2,
          },
        ],
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
      {
        name: "Copyright",
        type: "text",
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
    if (layer.children) {
      result.push(...flattenLayers(layer.children));
    }
  }
  return result;
}

const ALL_LAYERS = flattenLayers(LAYERS);

function LayerRow({ layer }: { layer: LayerNode }) {
  const iconComponent = LAYER_TYPE_ICONS[layer.type];
  const paddingLeft = layer.depth * 16 + 8;

  return (
    <Flex
      align="center"
      gap="xs"
      className="min-h-7 px-2 py-0.5 hover:bg-accent/50 cursor-default transition-colors group"
      style={{ paddingLeft }}
    >
      {layer.children ? (
        <Icon icon={ChevronDown} size="2xs" />
      ) : (
        <div className="w-3" />
      )}
      <Icon icon={iconComponent} size="2xs" />
      <Text
        size="xs"
        truncate
        className="flex-1 min-w-0"
        variant={layer.visible ? "default" : "muted"}
      >
        {layer.name}
      </Text>
      <HStack
        gap="2xs"
        className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
      >
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

export default function FigmaDemo() {
  return (
    <Flex fullHeight direction="column" className="overflow-hidden">
      {/* Top toolbar */}
      <Flex
        align="center"
        justify="space-between"
        className="h-12 shrink-0 border-b border-border bg-card px-3"
      >
        {/* Left tools */}
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

          <Separator orientation="vertical" className="h-6" />

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
              icon={Star}
              aria-label="Star"
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

          <Separator orientation="vertical" className="h-6" />

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

        {/* Center: page name */}
        <HStack gap="sm" align="center">
          <Text size="sm" weight="medium">
            Landing Page v2
          </Text>
          <Badge variant="secondary" size="xs">
            Draft
          </Badge>
        </HStack>

        {/* Right actions */}
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

          <Separator orientation="vertical" className="h-6" />

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

          <Separator orientation="vertical" className="h-6" />

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
        {/* Left panel — Layers */}
        <VStack className="w-60 shrink-0 border-r border-border">
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
                aria-label="Add layer"
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
              {ALL_LAYERS.map((layer, _idx) => (
                <LayerRow key={layer.name} layer={layer} />
              ))}
            </VStack>
          </ScrollArea>
        </VStack>

        {/* Canvas area */}
        <Flex
          align="center"
          justify="center"
          className="flex-1 min-w-0 bg-muted/30"
        >
          {/* Canvas placeholder with artboard */}
          <VStack align="center" gap="sm">
            <div className="w-100 h-130 bg-card rounded-lg border border-border shadow-sm">
              <VStack gap="base" className="p-8">
                {/* Mini hero section representation */}
                <div className="w-full h-32 rounded-md bg-muted" />
                <div className="w-3/4 h-6 rounded bg-muted" />
                <div className="w-1/2 h-4 rounded bg-muted/70" />
                <HStack gap="sm">
                  <div className="w-24 h-8 rounded-md bg-primary" />
                  <div className="w-24 h-8 rounded-md bg-muted border border-border" />
                </HStack>
                <Separator />
                {/* Feature cards */}
                <HStack gap="sm">
                  <div className="flex-1 h-24 rounded-md bg-muted/50 border border-border" />
                  <div className="flex-1 h-24 rounded-md bg-muted/50 border border-border" />
                  <div className="flex-1 h-24 rounded-md bg-muted/50 border border-border" />
                </HStack>
              </VStack>
            </div>
            <Text size="xs" variant="muted">
              Desktop — 1440 x 900
            </Text>
          </VStack>
        </Flex>

        {/* Right panel — Properties */}
        <VStack className="w-65 shrink-0 border-l border-border">
          <Flex
            align="center"
            className="h-9 shrink-0 border-b border-border px-3"
          >
            <Text size="xs" weight="medium">
              Design
            </Text>
          </Flex>

          <ScrollArea className="flex-1">
            <VStack gap="sm" className="p-3">
              {/* Frame info */}
              <VStack gap="xs">
                <Text size="xs" weight="semibold">
                  Hero Section
                </Text>
                <Badge variant="secondary" size="xs" appearance="outline">
                  Frame
                </Badge>
              </VStack>

              <Separator />

              {/* Position & Size */}
              <VStack gap="xs">
                <Text size="xs" weight="medium">
                  Position
                </Text>
                <HStack gap="xs">
                  <PropertyRow label="X">
                    <Input size="sm" defaultValue="0" />
                  </PropertyRow>
                  <PropertyRow label="Y">
                    <Input size="sm" defaultValue="0" />
                  </PropertyRow>
                </HStack>
                <HStack gap="xs">
                  <PropertyRow label="W">
                    <Input size="sm" defaultValue="1440" />
                  </PropertyRow>
                  <PropertyRow label="H">
                    <Input size="sm" defaultValue="640" />
                  </PropertyRow>
                </HStack>
              </VStack>

              <Separator />

              {/* Rotation & Corner Radius */}
              <VStack gap="xs">
                <HStack gap="xs">
                  <PropertyRow label="Rotation">
                    <Input size="sm" defaultValue="0°" />
                  </PropertyRow>
                  <PropertyRow label="Radius">
                    <Input size="sm" defaultValue="0" />
                  </PropertyRow>
                </HStack>
              </VStack>

              <Separator />

              {/* Auto Layout */}
              <VStack gap="xs">
                <Flex align="center" justify="space-between">
                  <Text size="xs" weight="medium">
                    Auto Layout
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Plus}
                    aria-label="Add auto layout"
                  />
                </Flex>
                <HStack gap="xs">
                  <Select defaultValue="vertical">
                    <SelectTrigger size="sm" className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="horizontal">Horizontal</SelectItem>
                      <SelectItem value="vertical">Vertical</SelectItem>
                      <SelectItem value="wrap">Wrap</SelectItem>
                    </SelectContent>
                  </Select>
                </HStack>
                <HStack gap="xs">
                  <PropertyRow label="Gap">
                    <Input size="sm" defaultValue="16" />
                  </PropertyRow>
                  <PropertyRow label="Pad">
                    <Input size="sm" defaultValue="32" />
                  </PropertyRow>
                </HStack>
                <HStack gap="xs">
                  <ButtonGroup variant="joined" radius="rounded">
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={AlignLeft}
                      aria-label="Align left"
                    />
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={AlignCenter}
                      aria-label="Align center"
                    />
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={AlignRight}
                      aria-label="Align right"
                    />
                  </ButtonGroup>
                </HStack>
              </VStack>

              <Separator />

              {/* Fill */}
              <VStack gap="xs">
                <Flex align="center" justify="space-between">
                  <Text size="xs" weight="medium">
                    Fill
                  </Text>
                  <HStack gap="2xs">
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={Minus}
                      aria-label="Remove fill"
                    />
                    <Button
                      variant="ghost"
                      size="icon-2xs"
                      icon={Plus}
                      aria-label="Add fill"
                    />
                  </HStack>
                </Flex>
                <HStack gap="sm" align="center">
                  <div
                    className="size-6 rounded border border-border shrink-0"
                    style={{ backgroundColor: "#FFFFFF" }}
                  />
                  <Input size="sm" defaultValue="FFFFFF" className="flex-1" />
                  <Text size="xs" variant="muted">
                    100%
                  </Text>
                </HStack>
              </VStack>

              <Separator />

              {/* Stroke */}
              <VStack gap="xs">
                <Flex align="center" justify="space-between">
                  <Text size="xs" weight="medium">
                    Stroke
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Plus}
                    aria-label="Add stroke"
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
                  <Text size="xs" weight="medium">
                    Effects
                  </Text>
                  <Button
                    variant="ghost"
                    size="icon-2xs"
                    icon={Plus}
                    aria-label="Add effect"
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
                    aria-label="Toggle visibility"
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
