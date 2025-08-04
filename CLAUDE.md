# CLAUDE.md

## Package Manager

**ALWAYS use pnpm for package management** - Never use npm or yarn.

## JIT TypeScript Execution (CRITICAL)

**MANDATORY: This project uses JIT (Just-In-Time) TypeScript execution ONLY**

- **NEVER create, import, or reference .js files anywhere in the turborepo**
- **ALL code must be TypeScript (.ts/.tsx) and executed directly without compilation**
- **NEVER build anything - no compilation step should exist**
- **The `dist/` folder is reserved for a future processing pipeline that will contain processed components with JSDoc derived from TypeScript prop definitions (not yet built)**
- **All package.json exports must point to `src/` files, never `dist/` files**


## Tailwind CSS 4 (CRITICAL)

**MANDATORY: This project uses Tailwind CSS 4 with new syntax**

- **Use `@import "tailwindcss";` NOT `@tailwind base/components/utilities;`**
- **Tailwind 4 uses `@theme` blocks for custom theme configuration**
- **Use `@custom-variant` for custom variant definitions**
- **PostCSS config uses `"@tailwindcss/postcss"` plugin**
- **Content paths are defined in `tailwind.config.ts`**
- **NEVER revert to Tailwind 3 syntax (`@tailwind` directives)**
- **Global styles are in `src/app/globals.css` with Tailwind 4 syntax**

Example correct Tailwind 4 globals.css:

```css
@import "tailwindcss";

@theme {
  --color-brand: #3b82f6;
}
```

## Development Server

**NEVER attempt to start the Next.js development server** - Always ask the user to run or restart it.

## Dynamic Imports (CRITICAL)

**NEVER use direct dynamic imports like `await import("@patternmode/ui")`**

- **Dynamic imports cause parsing errors and break the server**
- **Use Next.js `dynamic()` function for component loading instead**
- **Example: `const Component = dynamic(() => import("@patternmode/ui"), { ssr: false })`**
- **Static imports are preferred whenever possible**

## Browser Testing

**ALWAYS use direct Playwright browser automation for testing web pages** - Never use other browser tools or MCPs like Browserbase when Playwright is available.

- Use `mcp_Playwright_browser_navigate` to visit URLs
- Use `mcp_Playwright_browser_snapshot` to capture page state
- Use `mcp_Playwright_browser_take_screenshot` for visual verification
- Playwright provides reliable, consistent browser automation for testing component pages

## Focus Styling

**ALWAYS use the standardized focus utilities for consistency:**

- **`@focusInput`** - For input elements (text fields, selects, etc.)
  - Provides ring-based focus styling with blue color scheme
  - Includes both ring and border color changes

- **`@focusRing`** - For interactive elements (buttons, links, etc.)
  - Provides outline-based focus styling with blue color scheme
  - Uses outline-offset for proper visual separation

Import from `src/lib/utils.ts` and use in tailwind-variants:

```tsx
import { focusInput, focusRing } from "@/lib/utils";

const variants = tv({
  base: [
    "...",
    focusRing, // or focusInput for input elements
    "...",
  ],
});
```

## Code Organization (CRITICAL)

**MANDATORY: Use single-purpose functions and files for maximum modularity and reusability**

- **Create separate files for focused, single-purpose functions**
- **Break down complex tasks into smaller, reusable functions**
- **Each function should have a clear, specific responsibility**
- **Functions should be easily testable and composable**
- **Avoid large monolithic functions that handle multiple concerns**
- **Use imports to compose functionality from multiple focused modules**


## TypeScript Standards

- **NEVER use `any` type or type assertions (`as`, `as unknown as`, `!`, etc.)**
- **Use proper TypeScript types and interfaces instead of forcing type assertions**
- Use `VariantProps<typeof variants>` for variant props
- Extend `useRender.ComponentProps<"element">` for Base UI integration
- Export component, variants, and prop types
- Create wrapper components or helper functions when complex typing is needed

## Component Architecture (CRITICAL)

**MANDATORY: All components follow the config-first architecture**

### File Structure
```
src/components/[component-name]/
├── component.tsx        # Implementation with JSDoc-enhanced types
├── component.config.ts  # Component specification + examples with imports
├── index.tsx           # Export barrel
├── examples.tsx        # Example components
└── preview.tsx         # Preview component (mandatory)
```

### Component Implementation (component.tsx)

**Props must have JSDoc documentation on the TypeScript interface:**
```tsx
type TextareaProps = {
  /**
   * Whether to display error styling for form validation.
   * Adds red border and error state styling to indicate validation errors.
   */
  hasError?: boolean;

  /**
   * Whether to enable auto-resizing behavior.
   * When true: Uses enhanced component with intelligent behavior.
   * When false: Uses basic native behavior.
   */
  autoResize?: boolean;
} & Omit<TextareaAutosizeProps, "style">;
```

**Component gets basic JSDoc for metadata only:**
```tsx
/**
 * Auto-resizing multi-line text input component built on react-textarea-autosize.
 */
export const Textarea = ({
  hasError,
  autoResize = true,  // ← Defaults extracted automatically
  ...props
}: TextareaProps) => {
  // Implementation...
};
```

### Config File Pattern (component.config.ts)

**Single-component example:**
```tsx
import type { ComponentConfig } from "../../lib/component-config-types";
import { MessageSquare } from "lucide-react";
import { Textarea } from "./component";
import { DefaultExample, WithContentExample, WithErrorExample } from "./examples";

export const componentConfig: ComponentConfig = {
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
    // ... more examples
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

**Multi-component family example (accordion):**
```tsx
import type { ComponentConfig } from "../../lib/component-config-types";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "./component";
import { BasicExample, MultipleExample } from "./examples";

export const componentConfig: ComponentConfig = {
  id: "accordion",
  name: "Accordion",
  description: "Vertically stacked set of interactive headings...",
  category: "ui",
  icon: ChevronDown,
  importStatement: `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@patternmode/ui/accordion";`,
  examples: [/* imported example components */],
  components: [
    {
      component: Accordion,
      name: "Accordion",
      primary: true,
      description: "Root container for collapsible content sections."
    },
    {
      component: AccordionItem,
      name: "AccordionItem",
      description: "Individual collapsible section within accordion."
    },
    {
      component: AccordionTrigger,
      name: "AccordionTrigger",
      description: "Clickable header that toggles accordion item."
    },
    {
      component: AccordionContent,
      name: "AccordionContent",
      description: "Collapsible content area of accordion item."
    }
  ],
};
```

### Examples File (examples.tsx)

**Export individual example components:**
```tsx
export const DefaultExample = () => {
  const [value, setValue] = React.useState("");
  return (
    <Textarea
      placeholder="Start typing..."
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export const WithErrorExample = () => {
  // Implementation...
};
```

### Key Principles

- **Props documented in TypeScript interface** with comprehensive JSDoc
- **Defaults only in component destructuring** (single source of truth)
- **Config file imports actual components and examples** (not string references)
- **Examples loaded from config object** (no dynamic imports needed)
- **Multi-component families supported** via `components` array with `primary` flag
- **Export barrel** (`index.tsx`) for clean imports
- **No build dependencies** - configs can be imported directly

### Direct Config Usage (No Build Required)

**Import and use configs directly in development:**
```tsx
// Import config directly - no build step needed!
import { componentConfig as textareaConfig } from "@patternmode/ui/src/components/textarea/component.config";
import { componentConfig as accordionConfig } from "@patternmode/ui/src/components/accordion/component.config";

// Use in prop explorer, documentation, or tooling
<Preview config={textareaConfig} />
<ComponentExamples componentId="textarea" /> // Gets examples from config.examples
```

### Config-First Examples Loading

**Examples are now loaded from config objects, not dynamic imports:**
```tsx
// ComponentExamples component loads from config.examples
const config = getComponentConfig(componentId);
const examples = config.examples; // Direct access, no import() needed
```

## Component Structure Requirements (CRITICAL)

**MANDATORY: All components must follow these structural requirements for automated testing and consistency:**

### 1. TypeScript Prop Types (REQUIRED)

Every component MUST have proper TypeScript prop definitions using one of these patterns:

```tsx
// Pattern 1: Custom prop type extending React props
type ComponentNameProps = {
  // your custom props
} & React.ComponentPropsWithoutRef<"div">; // or appropriate element

// Pattern 2: Interface extending React props
interface ComponentNameProps extends React.ComponentPropsWithoutRef<"div"> {
  // your custom props
}

// Pattern 3: Direct React component props
const Component = (props: React.ComponentPropsWithoutRef<"div">) => {
  // implementation
};
```

### 2. Component Exports (REQUIRED)

All main components MUST use `export const` declarations (not `export function`):

```tsx
// ✅ CORRECT - Test will pass
export const ComponentName = (props: ComponentNameProps) => {
  // implementation
};

// ❌ INCORRECT - Test will fail
export function ComponentName(props: ComponentNameProps) {
  // implementation
}
```

### 3. Data TestID Attributes (MANDATORY)

**Every component MUST have a `data-testid` attribute that exactly matches the component directory name:**

```tsx
// Component directory: /src/components/button/
export const Button = (props: ButtonProps) => {
  return (
    <button
      data-testid="button"  // ← MUST match directory name exactly
      className={...}
      {...props}
    />
  );
};

// Component directory: /src/components/card/
export const Card = (props: CardProps) => {
  const defaultProps: useRender.ElementProps<"div"> = {
    "data-testid": "card",  // ← MUST match directory name exactly
    "className": cx(cardVariants(), className),
  };

  return useRender({ render, props: defaultProps });
};
```

**TestID enables predictable Playwright testing:**
```typescript
// All components can be tested consistently:
await page.getByTestId('button').click();
await page.getByTestId('card').isVisible();
await page.getByTestId('slider').fill('5');
```

### 4. JSDoc Documentation (RECOMMENDED)

Component JSDoc descriptions should be ≤140 characters and provide clear, concise descriptions:

```tsx
/**
 * Search input with dropdown results, keyboard navigation, and filtering. Supports controlled usage.
 */
export const SearchField = (props: SearchFieldProps) => {
  // implementation
};
```

### 5. Import Structure (CRITICAL)

**Individual component imports only - NO barrel imports:**

```tsx
// ✅ CORRECT - Individual component imports
import { Button } from "@patternmode/ui/components/button";
import { Card } from "@patternmode/ui/components/card";
import { Text } from "@patternmode/ui/components/text";

// ❌ INCORRECT - Barrel imports not supported
import { Button, Card, Text } from "@patternmode/ui";
```

**Package.json export pattern:**
```json
{
  "exports": {
    "./components/*": {
      "types": "./src/components/*/index.tsx",
      "import": "./src/components/*/index.tsx",
      "default": "./src/components/*/index.tsx"
    }
  }
}
```

### Component Structure Validation

The project includes automated testing via `tests/component-structure.test.ts` that validates:

- ✅ **TypeScript prop types** (100% required)
- ✅ **Export patterns** (100% required)
- ✅ **TestID attributes** (100% required)
- ✅ **Component registry** (100% required)
- ✅ **JSDoc descriptions** (86% coverage, recommended)

**All tests must pass before commits.** Run: `pnpm test component-structure.test.ts`
