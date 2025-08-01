# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**ALWAYS use pnpm for package management** - Never use npm or yarn.

## JIT TypeScript Execution (CRITICAL)

**MANDATORY: This project uses JIT (Just-In-Time) TypeScript execution ONLY**

- **NEVER create, import, or reference .js files anywhere in the turborepo**
- **ALL code must be TypeScript (.ts/.tsx) and executed directly without compilation**


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

- **NEVER run `pnpm dev`, `npm dev`, or any server start commands**
- **The dev server never works reliably when started by Claude**
- **Always ask the user to start/restart the server when needed**
- **If server needs to be restarted, explicitly ask the user to do it**

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

## JSDoc Documentation (CRITICAL)

**MANDATORY: All components MUST have proper JSDoc comments for registry generation**

- **ALL component functions must have JSDoc comments with descriptions**
- **Component props MUST have JSDoc descriptions to be included in prop explorer**
- **Use `@category` tag to specify component category (ui, inputs, forms, charts)**
- **Use `@icon` tag to specify the component's icon (from Lucide React)**
- **Use `@id` tag
- **The component registry generation script depends on JSDoc parsing**
- **Missing JSDoc comments will cause components to be excluded from the registry**

Example proper JSDoc documentation:
```tsx
/**
 * A flexible button component with multiple variants and states.
 * Supports different sizes, colors, and loading states.
 *
 * @id component
 * @component
 * @category ui
 * @icon Square
 */
export function Button({
  /**
   * The visual style variant of the button.
   */
  variant = "primary",
  /**
   * The size of the button.
   */
  size = "md",
  /**
   * Whether the button is in a loading state.
   */
  loading = false,
  children,
  ...props
}: ButtonProps) {
  // Component implementation
}
```
