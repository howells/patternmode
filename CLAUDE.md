# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**ALWAYS use pnpm for package management** - Never use npm or yarn.

## Browser Testing

**ALWAYS use direct Playwright browser automation for testing web pages** - Never use other browser tools or MCPs like Browserbase when Playwright is available.

- Use `mcp_Playwright_browser_navigate` to visit URLs
- Use `mcp_Playwright_browser_snapshot` to capture page state
- Use `mcp_Playwright_browser_take_screenshot` for visual verification
- Playwright provides reliable, consistent browser automation for testing component pages

## Component Architecture - Four-File Structure

Every component in `src/components/ui/` follows a strict four-file architecture:

### File Structure

```
src/components/ui/[component]/
├── [component].tsx    # Pure component implementation
├── config.tsx         # Component configuration
├── examples.tsx       # Multiple example components
└── preview.tsx        # Preview component for prop explorer
```

### 1. `[component].tsx` - Pure Component

- Contains only component logic and styling
- Uses tailwind-variants for type-safe variants
- Exports component, variants, and TypeScript types
- Uses Base UI primitives with `useRender` hook
- Example: `<Button render={<a href="/link" />}>Link Button</Button>`

### 2. `config.tsx` - Configuration

- Contains `ComponentConfig` object with metadata
- Defines props for the prop explorer system
- Includes code examples and documentation
- Pure TypeScript - no React imports

### 3. `examples.tsx` - Example Components

- Contains multiple named example components
- Shows different use cases and variations
- Used in documentation and example galleries
- Export individual example functions

### 4. `preview.tsx` - Preview Component

- Handles prop transformations (e.g., string to icon components)
- Provides interactive preview functionality for prop explorer
- Bridges prop explorer system with pure component
- Handle icon props here, not in pure components
- Single component that accepts all props from config

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
