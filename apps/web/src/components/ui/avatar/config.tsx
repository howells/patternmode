import React from "react";
import type { ComponentConfig } from "@/lib/component-config-types";
import { jsxToString } from "@/lib/jsx-to-string";
import { AvatarExample, DefaultExample, SizeVariantsExample, InitialsExample, SquareVariantsExample, DynamicBackgroundExample, WithFallbackExample, UserListExample, AvatarGroupExample, ProfileHeaderExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "avatar",
  name: "Avatar",
  description:
    "User profile picture display component with size variants, initials fallback, and dynamic background colors.",
  category: "media" as const,
  icon: "User",

  installation: {
    npm: "@base-ui-components/react",
  },
  importStatement: `import { Avatar } from "@/components/ui/avatar";`,
  componentId: "AvatarExample",
  props: [
    {
      name: "src",
      type: "string",
      description: "Image source URL for the avatar",
      defaultValue: "",
    },
    {
      name: "size",
      type: "string",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl"],
      description: "Size variant of the avatar",
      defaultValue: "base",
    },
    {
      name: "square",
      type: "boolean",
      description: "Whether to render with square corners instead of circular",
      defaultValue: false,
    },
    {
      name: "initials",
      type: "string",
      description: "Initials to display when no image is provided",
      defaultValue: "",
    },
    {
      name: "alt",
      type: "string",
      description: "Alt text for accessibility",
      defaultValue: "",
    },
    {
      name: "dynamicBackground",
      type: "boolean",
      description:
        "Whether to use a dynamic background color based on initials/alt text",
      defaultValue: false,
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes",
      defaultValue: "",
    },
    {
      name: "showWithImage",
      type: "boolean",
      description: "Show avatar with image in preview",
      defaultValue: false,
    },
    {
      name: "showInitials",
      type: "boolean",
      description: "Show avatar with initials in preview",
      defaultValue: true,
    },
  ],
  examples: [
    {
      id: "default",
      title: "Basic Avatars",
      description: "Avatar with image, initials, and dynamic background",
      code: jsxToString(<DefaultExample />),
    },
    {
      id: "size-variants",
      title: "Size Variants",
      description: "All available avatar sizes from xs to 3xl",
      code: jsxToString(<SizeVariantsExample />),
    },
    {
      id: "initials",
      title: "Initials Only",
      description: "Avatars with initials in different sizes",
      code: jsxToString(<InitialsExample />),
    },
    {
      id: "square-variants",
      title: "Square Variants",
      description: "Square avatars with images and initials",
      code: jsxToString(<SquareVariantsExample />),
    },
    {
      id: "dynamic-background",
      title: "Dynamic Backgrounds",
      description: "Avatars with automatically generated background colors",
      code: jsxToString(<DynamicBackgroundExample />),
    },
    {
      id: "with-fallback",
      title: "With Base UI Fallback",
      description:
        "Using Base UI Avatar components for automatic fallback behavior",
      code: jsxToString(<WithFallbackExample />),
    },
    {
      id: "user-list",
      title: "User List",
      description: "Real-world example with user list and mixed avatar states",
      code: jsxToString(<UserListExample />),
    },
    {
      id: "avatar-group",
      title: "Avatar Groups",
      description: "Stacked avatars for team displays with overflow indicators",
      code: jsxToString(<AvatarGroupExample />),
    },
    {
      id: "profile-header",
      title: "Profile Header",
      description: "Large avatar used in a profile header layout",
      code: jsxToString(<ProfileHeaderExample />),
    },
  ],
};
