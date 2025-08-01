"use client";

import type { ComponentExample } from "../../lib/component-config-types";
import { IconContainer, iconRegistry } from "@patternmode/ui";

import React from "react";
// Pre-imported icons from registry
const { Box, CheckCircle, Database, MessageSquare, Palette, Star, Zap } = iconRegistry;

// Individual example components for config
export const BasicExample = () => <IconContainer icon={Box} />;

export const WithVariantExample = () => (
  <IconContainer icon={CheckCircle} variant="success" />
);

export const WithCustomColorExample = () => (
  <IconContainer icon={Star} color="purple" />
);

export const LargeSizeExample = () => (
  <IconContainer icon={Star} size="lg" variant="warning" />
);

export const ExtraLargeExample = () => (
  <IconContainer icon={Zap} size="xl" color="orange" iconSize="xl" />
);

export const SemanticVariantsExample = () => (
  <div className="flex gap-4">
    <IconContainer icon={Box} variant="default" />
    <IconContainer icon={CheckCircle} variant="success" />
    <IconContainer icon={Database} variant="info" />
    <IconContainer icon={MessageSquare} variant="warning" />
    <IconContainer icon={Palette} variant="error" />
    <IconContainer icon={Star} variant="critical" />
  </div>
);

export const CustomColorsExample = () => (
  <div className="flex gap-4">
    <IconContainer icon={Box} color="blue" />
    <IconContainer icon={CheckCircle} color="emerald" />
    <IconContainer icon={Database} color="purple" />
    <IconContainer icon={MessageSquare} color="orange" />
    <IconContainer icon={Palette} color="red" />
    <IconContainer icon={Star} color="indigo" />
  </div>
);

export const SizeVariantsExample = () => (
  <div className="flex items-center gap-4">
    <IconContainer icon={Box} size="sm" variant="info" />
    <IconContainer icon={Box} size="base" variant="info" />
    <IconContainer icon={Box} size="lg" variant="info" />
    <IconContainer icon={Box} size="xl" variant="info" />
  </div>
);

export const CenteredExample = () => (
  <div className="w-full">
    <IconContainer icon={Star} size="lg" variant="warning" centered />
  </div>
);

// Legacy exports for backward compatibility
export const iconContainerExamples = {
  basic: {
    title: "Basic Icon Container",
    description: "A simple icon container with default styling",
    component: <BasicExample />,
  },
  withVariant: {
    title: "With Variant",
    description: "Icon container with semantic variant",
    component: <WithVariantExample />,
  },
  withCustomColor: {
    title: "With Custom Color",
    description: "Icon container with custom Tailwind color",
    component: <WithCustomColorExample />,
  },
  largeSize: {
    title: "Large Size",
    description: "A larger icon container",
    component: <LargeSizeExample />,
  },
  extraLarge: {
    title: "Extra Large",
    description: "Extra large icon container with custom icon size",
    component: <ExtraLargeExample />,
  },
  semanticVariants: {
    title: "Semantic Variants",
    description: "Different semantic variant combinations",
    component: <SemanticVariantsExample />,
  },
  customColors: {
    title: "Custom Colors",
    description: "Different custom Tailwind color combinations",
    component: <CustomColorsExample />,
  },
  sizeVariants: {
    title: "Size Variants",
    description: "Different container sizes",
    component: <SizeVariantsExample />,
  },
  centered: {
    title: "Centered",
    description: "Centered icon container",
    component: <CenteredExample />,
  },
};

/**
 * Registry of all examples with their metadata.
 * Inline metadata approach - no separate .meta objects needed.
 */
export const EXAMPLES: ComponentExample[] = [
  {
    id: "BasicExample",
    title: "Basic",
    description: "Basic example",
    component: BasicExample,
  },
  {
    id: "WithVariantExample",
    title: "With Variant",
    description: "With Variant example",
    component: WithVariantExample,
  },
  {
    id: "WithCustomColorExample",
    title: "With Custom Color",
    description: "With Custom Color example",
    component: WithCustomColorExample,
  },
  {
    id: "LargeSizeExample",
    title: "Large Size",
    description: "Large Size example",
    component: LargeSizeExample,
  },
  {
    id: "ExtraLargeExample",
    title: "Extra Large",
    description: "Extra Large example",
    component: ExtraLargeExample,
  },
  {
    id: "SemanticVariantsExample",
    title: "Semantic Variants",
    description: "Semantic Variants example",
    component: SemanticVariantsExample,
  },
  {
    id: "CustomColorsExample",
    title: "Custom Colors",
    description: "Custom Colors example",
    component: CustomColorsExample,
  },
  {
    id: "SizeVariantsExample",
    title: "Size Variants",
    description: "Example showing different size options",
    component: SizeVariantsExample,
  },
  {
    id: "CenteredExample",
    title: "Centered",
    description: "Centered example",
    component: CenteredExample,
  },
];
