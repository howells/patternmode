import { menuConfig } from "@patternmode/ui/components/menu/config";
import { Separator } from "@patternmode/ui/components/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${menuConfig.name} | Patternmode`,
  description: menuConfig.description,
  openGraph: {
    title: `${menuConfig.name} | Patternmode`,
    description: menuConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${menuConfig.name} | Patternmode`,
    description: menuConfig.description,
  },
};

export default function MenuPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={menuConfig.name}
        description={menuConfig.description}
        badge={menuConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="menu"
        componentName={menuConfig.name}
        category={menuConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="menu" />
    </div>
  );
}
