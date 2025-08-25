import type { PreviewProps } from "@patternmode/config/preview-props-type";

import React from "react";

import { AVATAR_IMAGES, AvatarSelect } from "./controls/avatar-select";

export type PropOverride = {
  componentId: string;
  propName: string;
  render: (props: {
    prop: PreviewProps;
    currentValue: unknown;
    onValueChange: (value: unknown) => void;
  }) => React.ReactNode;
};

/**
 * Registry of component-specific prop overrides
 */
export const PROP_OVERRIDES: PropOverride[] = [
  // Avatar component overrides
  {
    componentId: "Avatar",
    propName: "src",
    render: ({ currentValue, onValueChange }) => (
      <AvatarSelect
        value={currentValue != null ? String(currentValue) : ""}
        onValueChange={onValueChange}
        options={AVATAR_IMAGES}
      />
    ),
  },

  // Example: Button variant override (commented out)
  // {
  //   componentId: "button",
  //   propName: "variant",
  //   render: ({ currentValue, onValueChange }) => (
  //     <CustomButtonVariantSelect
  //       value={currentValue}
  //       onValueChange={onValueChange}
  //     />
  //   ),
  // },

  // Example: Input placeholder with common examples (commented out)
  // {
  //   componentId: "input",
  //   propName: "placeholder",
  //   render: ({ currentValue, onValueChange }) => (
  //     <PlaceholderSelect
  //       value={currentValue}
  //       onValueChange={onValueChange}
  //       options={COMMON_PLACEHOLDERS}
  //     />
  //   ),
  // },
];

/**
 * Get prop override for a specific component and prop
 */
export function getPropOverride(componentId: string, propName: string): PropOverride | undefined {
  return PROP_OVERRIDES.find(
    override => override.componentId === componentId && override.propName === propName,
  );
}

// Re-export components for external use
export { AVATAR_IMAGES, AvatarSelect } from "./controls/avatar-select";
export type { AvatarOption } from "./controls/avatar-select";
