"use client";

import { Package } from "lucide-react";
import { IconContainer } from "./component";

export const DefaultExample = () => <IconContainer icon={Package} />;

export const WithVariantExample = () => (
  <IconContainer icon={Package} variant="success" />
);

export const WithCustomColorExample = () => (
  <IconContainer color="purple" icon={Package} />
);

export const LargeSizeExample = () => (
  <IconContainer icon={Package} size="lg" variant="warning" />
);

export const ExtraLargeExample = () => (
  <IconContainer icon={Package} iconSize="2xl" size="xl" />
);

export const SemanticVariantsExample = () => (
  <div className="flex items-center gap-3">
    <IconContainer icon={Package} variant="neutral" />
    <IconContainer icon={Package} variant="success" />
    <IconContainer icon={Package} variant="info" />
    <IconContainer icon={Package} variant="warning" />
    <IconContainer icon={Package} variant="error" />
  </div>
);

export const CustomColorsExample = () => (
  <div className="flex items-center gap-3">
    <IconContainer color="purple" icon={Package} />
    <IconContainer color="amber" icon={Package} />
    <IconContainer color="emerald" icon={Package} />
  </div>
);

export const SizeVariantsExample = () => (
  <div className="flex items-center gap-3">
    <IconContainer icon={Package} size="sm" />
    <IconContainer icon={Package} size="base" />
    <IconContainer icon={Package} size="lg" />
    <IconContainer icon={Package} size="xl" />
  </div>
);

export const CenteredExample = () => <IconContainer centered icon={Package} />;
