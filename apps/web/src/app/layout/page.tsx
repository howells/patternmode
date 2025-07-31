import { GridBuilder } from "@/components/layout/grid-builder";
import { PageHeader } from "@/components/page-header";

export default function LayoutPage() {
  return (
    <div>
      <PageHeader
        title="Layout Builder"
        description="Build and test component layouts using the grid system. Place any component into grid cells and configure their props."
      />
      <div className="p-8">
        <GridBuilder />
      </div>
    </div>
  );
}
