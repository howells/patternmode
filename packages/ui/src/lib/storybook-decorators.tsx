import type { Decorator } from "@storybook/react";
import { Container } from "../components/container";
import { Flex } from "../components/flex";
import { Grid } from "../components/grid";
import type { ComponentSize } from "./size";

/**
 * Container-based width decorators using the size prop.
 * Maps to Tailwind max-width classes:
 *   "2xs" → max-w-xs,  "xs" → max-w-sm,  "sm" → max-w-md
 *   "base" → max-w-lg, "lg" → max-w-xl,  "xl" → max-w-2xl
 *   "2xl" → max-w-4xl, "3xl" → max-w-6xl
 */
export const withContainer =
  (size: ComponentSize): Decorator =>
  (Story: React.ComponentType) => (
    <Container size={size}>
      <Story />
    </Container>
  );

// Pre-configured container decorators (named by Tailwind equivalent)
/**
 * maxWidthXs utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const maxWidthXs: Decorator = withContainer("2xs"); // max-w-xs (~320px)
/**
 * maxWidthSm utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const maxWidthSm: Decorator = withContainer("xs"); // max-w-sm (~384px)
/**
 * maxWidthMd utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const maxWidthMd: Decorator = withContainer("sm"); // max-w-md (~448px)
/**
 * maxWidthLg utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const maxWidthLg: Decorator = withContainer("base"); // max-w-lg (~512px)
/**
 * maxWidthXl utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const maxWidthXl: Decorator = withContainer("lg"); // max-w-xl (~576px)
/**
 * maxWidth2xl utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const maxWidth2xl: Decorator = withContainer("xl"); // max-w-2xl (~672px)
/**
 * maxWidth4xl utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const maxWidth4xl: Decorator = withContainer("2xl"); // max-w-4xl (~896px)

/** Responsive width decorator (w-full lg:w-3/4) */
export const responsiveWidth: Decorator = (Story: React.ComponentType) => (
  <Flex className="w-full lg:w-3/4">
    <Story />
  </Flex>
);

// Grid layout decorators for multi-column layouts
/**
 * gridCols2 utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const gridCols2: Decorator = (Story: React.ComponentType) => (
  <Grid columns={{ base: 1, sm: 2 }} gap="base">
    <Story />
  </Grid>
);

/**
 * gridCols3 utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const gridCols3: Decorator = (Story: React.ComponentType) => (
  <Grid columns={{ base: 1, sm: 2, lg: 3 }} gap="base">
    <Story />
  </Grid>
);

/**
 * gridCols4 utility.
 * Import from "@patternmode/ui/lib/storybook-decorators".
 */
export const gridCols4: Decorator = (Story: React.ComponentType) => (
  <Grid columns={{ base: 1, sm: 2, lg: 4 }} gap="base">
    <Story />
  </Grid>
);

/**
 * Menu/popover container decorator.
 * Wraps story in a container styled like DropdownMenuContent (no shadow).
 */
export const menuContainer: Decorator = (Story: React.ComponentType) => (
  <div className="w-64 rounded-md border bg-popover p-1 text-popover-foreground">
    <Story />
  </div>
);

/**
 * Wide menu/popover container decorator.
 * Same as menuContainer but wider (320px).
 */
export const menuContainerWide: Decorator = (Story: React.ComponentType) => (
  <div className="w-80 rounded-md border bg-popover p-1 text-popover-foreground">
    <Story />
  </div>
);
