# CLAUDE.md

## Package Manager

**ALWAYS use pnpm for package management** - Never use npm or yarn.

## JIT TypeScript Execution (CRITICAL)

**MANDATORY: This project uses JIT (Just-In-Time) TypeScript execution ONLY**

- **NEVER create, import, or reference .js files anywhere in the turborepo**
- **ALL code must be TypeScript (.ts/.tsx) and executed directly without compilation**
- **NEVER build anything - no compilation step should exist**
- **All package.json exports must point to `src/` files, never `dist/` files**

### TypeScript Path Mappings vs Package Exports

**CRITICAL: Per Turborepo best practices, avoid TypeScript `paths` for JIT packages**

- **Turborepo warns: TypeScript `paths` "can cause failed compilation when using Just-in-Time Packages"**
- **Use Node.js package `exports` instead of TypeScript `paths` for module resolution**
- **Each package should handle its own TypeScript compilation independently**

**Package Structure:**
```json
// packages/ui/package.json - JIT Package
{
  "exports": {
    "./components/*": {
      "types": "./src/components/*/index.tsx",
      "import": "./src/components/*/index.tsx", 
      "default": "./src/components/*/index.tsx"
    }
  }
}

// apps/web/tsconfig.json - Consumer App
{
  "paths": {
    "@/*": ["./src/*"]
    // ❌ NO paths to UI package - use package exports instead
  }
}
```

**Import Pattern:**
```tsx
// ✅ CORRECT - Uses package exports
import { Button } from "@patternmode/ui/components/button";

// ❌ INCORRECT - Uses TypeScript paths (causes CI failures)
import { Button } from "../../packages/ui/src/components/button";
```

## Tailwind CSS 4 (CRITICAL)

**MANDATORY: This project uses Tailwind CSS 4 with new syntax**

- **Use `@import "tailwindcss";` NOT `@tailwind base/components/utilities;`**
- **Tailwind 4 uses `@theme` blocks for custom theme configuration**
- **PostCSS config uses `"@tailwindcss/postcss"` plugin**
- **NEVER revert to Tailwind 3 syntax (`@tailwind` directives)**

## Static-Only Import Architecture (CRITICAL)

**MANDATORY: This project uses static imports exclusively - NO dynamic imports**

- **NEVER use `await import()` or dynamic import syntax anywhere**
- **Dynamic imports cause parsing errors and break the server**
- **ALL component loading must be static and build-time analyzable**
- **Registry uses static import maps for predictable bundling**

## Development Server

**NEVER attempt to start the Next.js development server** - Always ask the user to run or restart it.

## Browser Testing

**ALWAYS use direct Playwright browser automation for testing web pages** - Never use other browser tools when Playwright is available.

## TypeScript Standards

- **NEVER use `any` type or type assertions (`as`, `as unknown as`, `!`, etc.)**
- Use `VariantProps<typeof variants>` for variant props
- Extend `useRender.ComponentProps<"element">` for Base UI integration
- Export component, variants, and prop types

### Children Prop Inheritance (CRITICAL)

**MANDATORY: Let children inherit as optional from HTML element props - NEVER declare explicitly**

```tsx
// ✅ CORRECT - Children inherit as optional from HTML element props
type CardProps = {
  variant?: "default" | "dashed";
  // NO explicit children declaration
} & useRender.ComponentProps<"div">;

// ❌ INCORRECT - Explicit children override inheritance as required
type CardProps = {
  children: React.ReactNode;  // ❌ Makes children required
} & useRender.ComponentProps<"div">;

// ❌ INCORRECT - Omit prevents proper inheritance
type ToggleGroupProps = {
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof BaseToggleGroup>, "children">; // ❌ Blocks inheritance
```

## Component Architecture (CRITICAL)

**MANDATORY: All components follow the config-first architecture**

### File Structure
```
src/components/[component-name]/
├── component.tsx        # Implementation with JSDoc-enhanced types
├── config.ts           # Component specification + examples with imports
├── examples.tsx        # Example components
└── preview.tsx         # Interactive preview component (mandatory)
```

**IMPORTANT: DO NOT create `index.tsx` files per component** - The package.json exports point directly to component.tsx files for consistency across all components.

### Component Implementation (component.tsx)

**Props must have JSDoc documentation on the TypeScript interface:**
```tsx
type TextareaProps = {
  /**
   * Whether to display error styling for form validation.
   */
  hasError?: boolean;
} & useRender.ComponentProps<"textarea">;

/**
 * Auto-resizing multi-line text input component.
 */
export const Textarea = ({
  hasError,
  autoResize = true,  // ← Defaults in component destructuring
  ...props
}: TextareaProps) => {
  // Implementation...
};
```

### Config File Pattern (config.ts)

```tsx
import type { ComponentConfig } from "../../lib/component-config-types";
import { MessageSquare } from "lucide-react";
import { Textarea } from "./component";
import { DefaultExample, WithErrorExample } from "./examples";

export const textareaConfig: ComponentConfig = {
  id: "textarea",
  name: "Textarea",
  description: "Auto-resizing multi-line text input component...",
  category: "inputs",
  icon: MessageSquare,
  importStatement: `import { Textarea } from "@patternmode/ui/textarea";`,
  examples: [
    {
      id: "default",
      title: "Default",
      description: "Basic textarea with default settings",
      component: DefaultExample,
    },
  ],
  components: [
    {
      name: "Textarea",
      description: "Multi-line text input component",
      component: Textarea,
    },
  ],
};
```

### Preview File (preview.tsx)

**Interactive component for prop exploration - accepts component props:**
```tsx
"use client";

import type { ButtonProps } from "./component";
import { Save } from "lucide-react";
import React from "react";
import { Button } from "./component";

export function ButtonPreview(props: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Button
      leftIcon={Save}
      isLoading={isLoading}
      loadingText="Saving..."
      onClick={handleClick}
      {...props}
    >
      {props.children || "Save Changes"}
    </Button>
  );
}
```

## Component Structure Requirements (CRITICAL)

### 1. Component Exports (REQUIRED)
All main components MUST use `export const` declarations (not `export function`).

### 2. Data TestID Attributes (MANDATORY)
**Every component MUST have a `data-testid` attribute that exactly matches the component directory name:**

```tsx
// Component directory: /src/components/button/
export const Button = (props: ButtonProps) => {
  return (
    <button
      data-testid="button"  // ← MUST match directory name exactly
      {...props}
    />
  );
};
```

### 3. Import Structure (CRITICAL)
**Individual component imports only - NO barrel imports:**

```tsx
// ✅ CORRECT - Individual component imports
import { Button } from "@patternmode/ui/components/button";
import { Card } from "@patternmode/ui/components/card";

// ❌ INCORRECT - Barrel imports not supported
import { Button, Card } from "@patternmode/ui";
```

### 4. Focus Styling
**ALWAYS use the standardized focus utilities:**

```tsx
import { focusInput, focusRing } from "@/lib/utils";

const variants = tv({
  base: [
    focusRing, // or focusInput for input elements
  ],
});
```

## Code Organization

- **Create separate files for focused, single-purpose functions**
- **Break down complex tasks into smaller, reusable functions**
- **Use imports to compose functionality from multiple focused modules**

## Component Registry Purpose

**`@packages/ui/src/components/registry.ts` serves as the central component system hub:**

- **Component Discovery**: Centralizes all component configs and preview components for the documentation site
- **Static Lookups**: Enables fast component/preview retrieval without filesystem scanning
- **Build Tool Integration**: Used by `generate-component-pages.js` to create doc pages

**Important**: Registry is **only for the documentation site** - user applications import components directly via individual paths.