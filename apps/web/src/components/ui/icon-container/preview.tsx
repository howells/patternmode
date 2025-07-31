"use client";

import { IconContainer } from "@patternmode/ui";
import { Box, CheckCircle, Database, MessageSquare, Palette, Star, Zap } from "lucide-react";

export function IconContainerExample() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Basic Icon Container</h3>
        <IconContainer icon={Box} />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Semantic Variants</h3>
        <div className="flex gap-4">
          <IconContainer icon={Box} variant="default" />
          <IconContainer icon={CheckCircle} variant="success" />
          <IconContainer icon={Database} variant="info" />
          <IconContainer icon={MessageSquare} variant="warning" />
          <IconContainer icon={Palette} variant="error" />
          <IconContainer icon={Star} variant="critical" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Size Variants</h3>
        <div className="flex items-center gap-4">
          <IconContainer icon={Box} size="sm" variant="info" />
          <IconContainer icon={Box} size="base" variant="info" />
          <IconContainer icon={Box} size="lg" variant="info" />
          <IconContainer icon={Box} size="xl" variant="info" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Custom Colors</h3>
        <div className="flex gap-4">
          <IconContainer icon={Box} color="blue" />
          <IconContainer icon={CheckCircle} color="emerald" />
          <IconContainer icon={Database} color="purple" />
          <IconContainer icon={MessageSquare} color="orange" />
          <IconContainer icon={Palette} color="red" />
          <IconContainer icon={Star} color="indigo" />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Extra Large with Custom Icon Size</h3>
        <IconContainer icon={Zap} size="xl" color="orange" iconSize="xl" />
      </div>
    </div>
  );
}