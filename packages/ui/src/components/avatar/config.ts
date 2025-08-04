import type { ComponentConfig } from "../../lib/component-config-types";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, AvatarWithFallback } from "./component";
import {
  AvatarGroupExample,
  DefaultExample,
  DynamicBackgroundExample,
  InitialsExample,
  SizeVariantsExample,
  SquareVariantsExample,
  UserListExample,
  WithFallbackExample,
} from "./examples";

export const avatarConfig: ComponentConfig = {
  id: "avatar",
  name: "Avatar",
  description: "User profile image component with fallback initials and various size options.",
  category: "visual",
  featured: true,
  icon: User,
  importStatement: `import { Avatar, AvatarWithFallback, AvatarImage, AvatarFallback } from "@patternmode/ui/avatar";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic avatar with image and initials fallback",
      component: DefaultExample,
    },
    {
      id: "size-variants",
      title: "Size Variants",
      description: "Different avatar sizes from 2xs to 3xl",
      component: SizeVariantsExample,
    },
    {
      id: "initials",
      title: "Initials",
      description: "Avatars using initials for different sizes",
      component: InitialsExample,
    },
    {
      id: "square-variants",
      title: "Square Variants",
      description: "Square-shaped avatars for logos and brands",
      component: SquareVariantsExample,
    },
    {
      id: "dynamic-background",
      title: "Dynamic Background",
      description: "Avatars with generated background colors",
      component: DynamicBackgroundExample,
    },
    {
      id: "with-fallback",
      title: "With Fallback",
      description: "Base UI avatar with built-in fallback handling",
      component: WithFallbackExample,
    },
    {
      id: "user-list",
      title: "User List",
      description: "Avatars in a user list interface",
      component: UserListExample,
    },
    {
      id: "avatar-group",
      title: "Avatar Group",
      description: "Overlapping avatars for team displays",
      component: AvatarGroupExample,
    },
  ],
  components: [
    {
      name: "Avatar",
      description: "Main avatar component with flexible sizing and fallbacks",
      component: Avatar,
      primary: true,
    },
    {
      name: "AvatarWithFallback",
      description: "Base UI avatar root with automatic fallback handling",
      component: AvatarWithFallback,
    },
    {
      name: "AvatarImage",
      description: "Image component for use within AvatarWithFallback",
      component: AvatarImage,
    },
    {
      name: "AvatarFallback",
      description: "Fallback content when avatar image fails to load",
      component: AvatarFallback,
    },
  ],
};
