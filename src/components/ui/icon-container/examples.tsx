import {
  Box,
  CheckCircle,
  Database,
  MessageSquare,
  Palette,
  Star,
  Zap,
} from "lucide-react";
import { IconContainer } from "./icon-container";

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
