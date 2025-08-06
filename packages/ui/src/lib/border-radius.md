# Centralized Border Radius System

## Overview

This document describes the centralized border-radius system implemented to ensure consistent border-radius values across all components based on size.

## Problem

Previously, border-radius values were hardcoded in each component's variant definitions, leading to:
- Inconsistency between components
- Duplication of border-radius logic
- Difficulty maintaining visual consistency
- Hard to update border-radius values globally

## Solution

Created a centralized border-radius system in `packages/ui/src/lib/border-radius.ts` that provides:

### Core Functions
- `getBorderRadius(size: Size)`: Get border radius class for a given size
- `getExtendedBorderRadius(size: Size | "full")`: Get border radius including full rounded option

### Constants
- `borderRadiusBySize`: Standard border radius values for different sizes
- `borderRadiusVariants`: Border radius variants for use in tailwind-variants
- `extendedBorderRadiusVariants`: Extended options including full rounded

### Size Mapping
```typescript
{
  xs: "rounded-sm",    // 2px
  sm: "rounded",       // 4px
  base: "rounded-md",  // 6px
  lg: "rounded-lg",    // 8px
}
```

## Updated Components

The following components have been updated to use the centralized border-radius system:

### ✅ Button (`packages/ui/src/components/button/variants.ts`)
- All size variants now use centralized border-radius
- Icon button variants updated
- Rounded prop uses extended border-radius system

### ✅ Toggle Group (`packages/ui/src/components/toggle-group/variants.ts` & `component.tsx`)
- Root and item border-radius now consistent with button
- All size variants updated
- **Button size adjustment**: Toggle group items now use smaller button sizes to fit within the container
  - `xs` toggle group → `xs` buttons
  - `sm` toggle group → `xs` buttons
  - `base` toggle group → `sm` buttons
  - `lg` toggle group → `base` buttons

### ✅ Tabs (`packages/ui/src/components/tabs/variants.ts`)
- Solid variant compound variants updated
- Consistent with toggle-group styling
- Uses centralized container button adjustments

### ✅ Form Controls (`packages/ui/src/lib/form-control-variants.ts`)
- Container and element variants updated
- Standalone form controls use centralized border-radius

### ✅ Input (`packages/ui/src/components/input/variants.ts`)
- Container and input styles updated
- All size variants now consistent

### ✅ Theme Toggle (`packages/ui/src/components/theme-toggle/variants.ts`)
- Base and rounded variants updated
- Consistent with button component

### ✅ Toggle (`packages/ui/src/components/toggle/variants.ts`)
- All size variants updated
- Consistent border-radius across sizes

### ✅ Badge (`packages/ui/src/components/badge/variants.ts`)
- Base and rounded variants updated
- Extended border-radius support for full rounded

### ✅ Toolbar (`packages/ui/src/components/toolbar/variants.ts`)
- Root, button, link, and input variants updated
- All size variants now consistent

### ✅ Radio (`packages/ui/src/components/radio/variants.ts`)
- Circle and card variants updated
- Consistent border-radius across all radio components

## Benefits

1. **Consistency**: All components now use the same border-radius values for the same sizes
2. **Maintainability**: Single source of truth for border-radius values
3. **Flexibility**: Easy to update border-radius globally by changing the centralized values
4. **Type Safety**: TypeScript ensures only valid border-radius values are used
5. **Performance**: No runtime overhead, all values are compile-time constants

## Special Cases

### Container Button Adjustments
For components that contain buttons (like toggle groups and tabs), we have a centralized system in `packages/ui/src/lib/container-button-adjustments.ts` that handles:

#### Height Adjustments
Buttons inside containers need their height reduced to fit properly:

```typescript
// Height adjustments for buttons inside containers
const heightAdjustments = {
  xs: "0.375rem", // 6px - accounts for p-0.5 (2px top + 2px bottom) + extra 2px
  sm: "0.375rem", // 6px - accounts for p-0.5 (2px top + 2px bottom) + extra 2px
  base: "0.375rem", // 6px - accounts for p-0.5 (2px top + 2px bottom) + extra 2px
  lg: "0.625rem", // 10px - accounts for p-1 (4px top + 4px bottom) + extra 2px
};
```

#### Border Radius Adjustments
Buttons inside containers need their border radius reduced to account for container padding:

```typescript
// Border radius adjustments for buttons inside containers
const borderRadiusAdjustments = {
  xs: "0.125rem", // 2px - accounts for p-0.5 (2px top + 2px bottom)
  sm: "0.125rem", // 2px - accounts for p-0.5 (2px top + 2px bottom)
  base: "0.125rem", // 2px - accounts for p-0.5 (2px top + 2px bottom)
  lg: "0.25rem", // 4px - accounts for p-1 (4px top + 4px bottom)
};
```

#### Usage
```typescript
import { containerButtonAdjustments } from "../../lib/container-button-adjustments";

// In component variants
size: {
  base: {
    root: [
      `gap-px p-0.5 ${borderRadiusVariants.base}`,
      // Use centralized button adjustments
      ...containerButtonAdjustments.base,
    ],
  },
}
```

This ensures that when a container has `size="base"`, the constituent buttons have:
- **Height**: `40px - 6px = 34px`
- **Border radius**: `6px - 2px = 4px`

## Usage

### In Component Variants
```typescript
import { borderRadiusVariants } from "../../lib/border-radius";

export const myComponentVariants = tv({
  variants: {
    size: {
      xs: `h-8 px-2 ${borderRadiusVariants.xs}`,
      sm: `h-9 px-3 ${borderRadiusVariants.sm}`,
      base: `h-10 px-4 ${borderRadiusVariants.base}`,
      lg: `h-12 px-6 ${borderRadiusVariants.lg}`,
    },
  },
});
```

### For Extended Options (including full rounded)
```typescript
import { extendedBorderRadiusVariants } from "../../lib/border-radius";

export const myComponentVariants = tv({
  variants: {
    rounded: {
      true: extendedBorderRadiusVariants.full,
      false: extendedBorderRadiusVariants.base,
    },
  },
});
```

### Using Functions
```typescript
import { getBorderRadius } from "../../lib/border-radius";

const borderRadius = getBorderRadius("base"); // Returns "rounded-md"
```

### For Container Components
```typescript
import { containerButtonAdjustments } from "../../lib/container-button-adjustments";

export const myContainerVariants = tv({
  variants: {
    size: {
      base: {
        root: [
          `gap-px p-0.5 ${borderRadiusVariants.base}`,
          ...containerButtonAdjustments.base,
        ],
      },
    },
  },
});
```

## Future Considerations

- Consider adding more border-radius options if needed (e.g., `xl`, `2xl`)
- Monitor for any components that might have been missed
- Consider creating similar centralized systems for other design tokens (spacing, shadows, etc.)