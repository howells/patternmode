import type { ComponentConfig } from "@patternmode/config/component-types";
import { Tags } from "lucide-react";
import { TagGroup } from "./component";
import { AlignmentExample, CustomGapExample, DefaultExample, DirectionExample, DismissibleExample, LabeledTagsExample, MixedOverrideExample, TagsWithCountExample } from "./examples";

export const tagGroupConfig: ComponentConfig = {
  id: "tag-group",
  name: "Tag Group",
  description: "Container for grouping tags with shared styling and consistent spacing. Child tags inherit props from the parent group.",
  category: "ui",
  icon: Tags,
  importStatement: `import { TagGroup } from "@patternmode/ui/tag-group";`,
  examples: [
    { id: "default", title: "Default", description: "Basic tag group with default styling", component: DefaultExample },
    { id: "dismissible", title: "Dismissible Tags", description: "Tags that can be removed from the group", component: DismissibleExample },
    { id: "alignment", title: "Alignment Options", description: "Different horizontal alignment options", component: AlignmentExample },
    { id: "direction", title: "Layout Direction", description: "Row vs column layout direction", component: DirectionExample },
    { id: "custom-gap", title: "Custom Spacing", description: "Custom gap between tags", component: CustomGapExample },
    { id: "labeled-tags", title: "Labeled Tags", description: "Tags with label and value pairs", component: LabeledTagsExample },
    { id: "tags-with-count", title: "Tags with Counts", description: "Tags displaying count or quantity", component: TagsWithCountExample },
    { id: "mixed-override", title: "Mixed Overrides", description: "Individual tags can override group properties", component: MixedOverrideExample }
  ],
  components: [
    { name: "Tag Group", description: "Container for grouping tags with shared props and consistent spacing", component: TagGroup, primary: true },
  ],
};

