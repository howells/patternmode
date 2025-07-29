# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**ALWAYS use pnpm for package management** - Never use npm or yarn.

## JIT TypeScript Execution (CRITICAL)

**MANDATORY: This project uses JIT (Just-In-Time) TypeScript execution ONLY**

- **NEVER create, import, or reference .js files anywhere in the turborepo**
- **ALL code must be TypeScript (.ts/.tsx) and executed directly without compilation**
- **Use tsx, ts-node, or similar tools for direct TypeScript execution**
- **Package builds use tsup for distribution, but development is pure TypeScript**
- **No .js files should exist in src/, components/, lib/, or any development directories**
- **All imports must be TypeScript-to-TypeScript without .js extensions**
- **Build tools (tsup, turbo) handle compilation for distribution only**
- **NEVER import from dist/ or any .js/.cjs files anywhere in the codebase**
- **All workspace packages must export TypeScript source files directly**
- **Package.json main/module/exports must point to .ts files, not .js files**

This ensures zero JavaScript pollution in the development environment.

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

## Component Architecture - Three-File Structure

Every component in `src/components/ui/` follows a strict three-file architecture:

### File Structure

```
src/components/ui/[component]/
├── [component].tsx    # Pure component implementation
├── config.tsx         # Component configuration
└── example.tsx        # Preview component
```

### 1. `[component].tsx` - Pure Component

- Contains only component logic and styling
- Uses tailwind-variants for type-safe variants
- Exports component, variants, and TypeScript types
- Uses Base UI primitives with `useRender` hook
- **ALWAYS use Base UI's `render` prop approach instead of `asChild`**
- Example: `<Button render={<a href="/link" />}>Link Button</Button>`
- **NEVER use `asChild` prop - use `render` prop for component composition**

### 2. `config.tsx` - Configuration

- Contains `ComponentConfig` object with metadata
- Defines props for the prop explorer system
- Includes code examples and documentation
- Pure TypeScript - no React imports

### 3. `example.tsx` - Preview Component

- Handles prop transformations (e.g., string to icon components)
- Provides interactive preview functionality
- Bridges prop explorer system with pure component
- Handle icon props here, not in pure components

## Component Registration

All components must be registered in `src/lib/component-registry.ts`:

- Import the `config.tsx` file
- Add to `componentRegistry` object
- Categories: "ui", "inputs", "forms", "charts"

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

## TypeScript Standards

- **NEVER use `any` type or type assertions (`as`, `as unknown as`, `!`, etc.)**
- **Use proper TypeScript types and interfaces instead of forcing type assertions**
- **Prefer `React.createElement()` for dynamic component rendering with proper typing**
- Use `VariantProps<typeof variants>` for variant props
- Extend `useRender.ComponentProps<"element">` for Base UI integration
- Export component, variants, and prop types
- Create wrapper components or helper functions when complex typing is needed

## Icon Handling

- Icons are transformed in example components from string names to actual components
- Use Lucide React icons when possible
- Handle icon props in example.tsx, not in pure components
