import type { Metadata } from "next";

import { dropdownItemConfig } from "@patternmode/ui/components/dropdown-item/config";
import { Separator } from "@patternmode/separator";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/features/preview";

export const metadata: Metadata = {
  title: `${dropdownItemConfig.name} | Patternmode`,
  description: dropdownItemConfig.description,
  openGraph: {
    title: `${dropdownItemConfig.name} | Patternmode`,
    description: dropdownItemConfig.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${dropdownItemConfig.name} | Patternmode`,
    description: dropdownItemConfig.description,
  },
};

export default function DropdownItemPage() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        title={dropdownItemConfig.name}
        description={dropdownItemConfig.description}
        badge={dropdownItemConfig.badge}
      />

      {/* Main Content - Use Preview */}
      <Preview
        componentId="dropdown-item"
        componentName={dropdownItemConfig.name}
        category={dropdownItemConfig.category}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dropdown-item" />
    </div>
  );
}
