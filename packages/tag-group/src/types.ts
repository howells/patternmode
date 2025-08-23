import type { ResponsiveSpacing, SpacingValue } from "@patternmode/utils/spacing";
import type * as React from "react";
import type { VariantProps } from "tailwind-variants";
import type { tagGroupVariants } from "./variants";

export type TagGroupProps = {
  dismissible?: boolean;
  onDismiss?: (index: number) => void;
  gap?: ResponsiveSpacing<SpacingValue>;
  className?: string;
  children?: React.ReactNode;
} & VariantProps<typeof tagGroupVariants> & React.ComponentPropsWithoutRef<"div">;

