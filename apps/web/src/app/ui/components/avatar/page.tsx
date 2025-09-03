import { avatarConfig } from "@patternmode/avatar/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={avatarConfig.badge}
        description={avatarConfig.description}
        title={avatarConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={avatarConfig.category}
        componentId="avatar"
        componentName={avatarConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="avatar" />
    </div>
  );
}
