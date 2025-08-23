import type { ComponentConfig } from "@patternmode/config/component-types";
import { DropdownItem } from "./component";
import {
  DropdownItemBasicExample,
  DropdownItemDestructiveExample,
  DropdownItemSizesExample,
  DropdownItemStatesExample,
  DropdownItemWithHintsExample,
  DropdownItemWithIconsExample,
  DropdownItemWithShortcutsExample,
} from "./examples";

export const dropdownItemConfig: ComponentConfig = {
  id: "dropdown-item",
  name: "Dropdown Item",
  description: "A consistent dropdown item extending Button for use in menus and selects.",
  category: "primitives",
  icon: undefined,
  importStatement: `import { DropdownItem } from "@patternmode/dropdown-item";`,
  examples: [
    { id: "basic", title: "Basic", description: "Simple items", component: DropdownItemBasicExample },
    { id: "icons", title: "With Icons", description: "Icons on items", component: DropdownItemWithIconsExample },
    { id: "states", title: "States", description: "Highlighted/selected/disabled", component: DropdownItemStatesExample },
    { id: "shortcuts", title: "With Shortcuts", description: "Keyboard hints", component: DropdownItemWithShortcutsExample },
    { id: "hints", title: "With Hints", description: "Right-side hints", component: DropdownItemWithHintsExample },
    { id: "sizes", title: "Sizes", description: "Small/Default/Large", component: DropdownItemSizesExample },
    { id: "destructive", title: "Destructive", description: "Danger actions", component: DropdownItemDestructiveExample },
  ],
  components: [
    { name: "Dropdown Item", description: "Menu option primitive", component: DropdownItem },
  ],
};

