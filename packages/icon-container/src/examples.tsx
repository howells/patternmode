"use client";

import { IconContainer } from "./component";
import { Package } from "lucide-react";

export const DefaultExample = () => <IconContainer icon={Package} />;

export const WithVariantExample = () => (
  <IconContainer icon={Package} variant="success" />
);

export const WithCustomColorExample = () => (
  <IconContainer icon={Package} color="purple" />
);

export const LargeSizeExample = () => (
  <IconContainer icon={Package} size="lg" variant="warning" />
);

export const ExtraLargeExample = () => (
  <IconContainer icon={Package} size="xl" iconSize={32} />
);

export const SemanticVariantsExample = () => (
  <div className="flex gap-3 items-center">
    <IconContainer icon={Package} variant="neutral" />
    <IconContainer icon={Package} variant="success" />
    <IconContainer icon={Package} variant="info" />
    <IconContainer icon={Package} variant="warning" />
    <IconContainer icon={Package} variant="error" />
  </div>
);

export const CustomColorsExample = () => (
  <div className="flex gap-3 items-center">
    <IconContainer icon={Package} color="purple" />
    <IconContainer icon={Package} color="amber" />
    <IconContainer icon={Package} color="emerald" />
  </div>
);

export const SizeVariantsExample = () => (
  <div className="flex gap-3 items-center">
    <IconContainer icon={Package} size="sm" />
    <IconContainer icon={Package} size="base" />
    <IconContainer icon={Package} size="lg" />
    <IconContainer icon={Package} size="xl" />
  </div>
);

export const CenteredExample = () => (
  <IconContainer icon={Package} centered />
);

