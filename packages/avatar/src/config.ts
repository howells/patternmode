import type { ComponentConfig } from "@patternmode/config/component-types";
import { User } from "lucide-react";
import { Avatar } from "./component";
import { DefaultExample, SizesExample } from "./examples";

export const avatarConfig: ComponentConfig = {
  id: "avatar",
  name: "Avatar",
  description: "User profile image with fallback initials and size options.",
  category: "media",
  icon: User,
  importStatement: `import { Avatar } from "@patternmode/ui/avatar";`,
  examples: [
    { id: "default", title: "Default", description: "Initials, dynamic background, and image", component: DefaultExample },
    { id: "sizes", title: "Sizes", description: "Different avatar sizes", component: SizesExample }
  ],
  components: [
    { name: "Avatar", description: "User avatar with image or initials fallback", component: Avatar, primary: true }
  ],
};
