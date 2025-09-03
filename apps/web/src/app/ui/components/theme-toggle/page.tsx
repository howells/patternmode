import { Separator } from "@patternmode/separator";
import { themeToggleConfig } from "@patternmode/theme-toggle/config";
import type { Metadata } from "next";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${themeToggleConfig.name} | Patternmode`,
  description: themeToggleConfig.description,
  openGraph: {
    title: `${themeToggleConfig.name} | Patternmode`,
    description: themeToggleConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${themeToggleConfig.name} | Patternmode`,
    description: themeToggleConfig.description,
  },
};

export default function ThemeTogglePage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        badge={themeToggleConfig.badge}
        description={themeToggleConfig.description}
        title={themeToggleConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={themeToggleConfig.category}
        componentId="theme-toggle"
        componentName={themeToggleConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="theme-toggle" />
    </div>
  );
}
