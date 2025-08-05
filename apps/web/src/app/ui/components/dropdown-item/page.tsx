import { Separator } from "@patternmode/ui/components/separator";
import { dropdownItemConfig } from "@patternmode/ui/components/dropdown-item/config";

import { ComponentExamples } from "@/components/component-examples";
import { PageHeader } from "@/components/page-header";
import { Preview } from "@/preview";

export const metadata = {
  title: `${dropdownItemConfig.name} | Patternmode`,
  description: dropdownItemConfig.description,
  openGraph: {
    title: `${dropdownItemConfig.name} | Patternmode`,
    description: dropdownItemConfig.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
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
