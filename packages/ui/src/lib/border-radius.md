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

### ✅ Tabs (`packages/ui/src/components/tabs/variants.ts`)
- Solid variant compound variants updated
- Consistent with toggle-group styling

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

### Toggle Group Button Sizing
Toggle groups have a special size adjustment system to ensure buttons fit properly within the container:

```typescript
// When inside a toggle group, use a smaller size to fit within the container
const getAdjustedButtonSize = (toggleGroupSize: string) => {
  switch (toggleGroupSize) {
    case "xs": return "xs";
    case "sm": return "xs";
    case "base": return "sm";  // This is the key fix for base size
    case "lg": return "base";
    default: return "sm";
  }
};
```

This ensures that when a toggle group has `size="base"`, the constituent buttons use `size="sm"` to fit properly within the container without making it too large.

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

## Future Considerations

- Consider adding more border-radius options if needed (e.g., `xl`, `2xl`)
- Monitor for any components that might have been missed
- Consider creating similar centralized systems for other design tokens (spacing, shadows, etc.)