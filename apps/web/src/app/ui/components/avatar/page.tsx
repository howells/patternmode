import type { Metadata } from "next";

import { avatarConfig } from "@patternmode/avatar/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${avatarConfig.name} | Patternmode`,
  description: avatarConfig.description,
  openGraph: {
    title: `${avatarConfig.name} | Patternmode`,
    description: avatarConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${avatarConfig.name} | Patternmode`,
    description: avatarConfig.description,
  },
};

export default function AvatarPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={avatarConfig.name}
        description={avatarConfig.description}
        badge={avatarConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="avatar"
        componentName={avatarConfig.name}
        category={avatarConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="avatar" />
    </div>
  );
}
