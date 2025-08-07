import { themeToggleConfig } from "@patternmode/ui/components/theme-toggle/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
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
        title={themeToggleConfig.name}
        description={themeToggleConfig.description}
        badge={themeToggleConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="theme-toggle"
        componentName={themeToggleConfig.name}
        category={themeToggleConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="theme-toggle" />
    </div>
  );
}
