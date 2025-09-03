import { dropdownItemConfig } from "@patternmode/dropdown-item/config";
import { Separator } from "@patternmode/separator";
import type { Metadata } from "next";

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
        badge={dropdownItemConfig.badge}
        description={dropdownItemConfig.description}
        title={dropdownItemConfig.name}
      />

      {/* Main Content - Use Preview */}
      <Preview
        category={dropdownItemConfig.category}
        componentId="dropdown-item"
        componentName={dropdownItemConfig.name}
      />

      <Separator />

      {/* Examples */}
      <ComponentExamples componentId="dropdown-item" />
    </div>
  );
}
