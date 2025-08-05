# @patternmode/ui

A comprehensive React component library built with TypeScript, Tailwind CSS, Base UI, and a handful of other libraries I reach for for practically every project. It was born from the frustration of copy-pasting shadcn/ui components, and having to customise every component in the same way for each project.

## Why This Library Exists

- **Single Source of Truth**: Unlike shadcn/ui's copy-paste approach, this library provides components as a proper package, eliminating the need to manually sync updates across projects.
- **Future-Proof Foundation**: Patternmode is based on [Base UI](https://github.com/mui/base-ui) instead of Radix, betting on the team that originally created Radix to deliver the next generation of headless components, since Radix is starting to see cracks and is essentially no longer maintained.
- **Consistent Design System**: Components depends on other components within the library when needed (e.g., button-like components use the Button component), ensuring a hopefully high degree of internal design and functional consistency, which cascades automatically.
- **Prescriptive Layout System**: Inspired by React Native's approach, components like Stack and Grid abstract away repetitive Tailwind patterns, promoting consistent spacing and layout across applications.
- **Comprehensive Testing**: The goal is to have a substantial test suit for every component, using Plawright and Vitest.
- **React-Only Focus**: Exclusively supports React with TypeScript. You won't find any support for frameworks other than React or vanilla Javascript here any time soon. Sorry.

## Inspiration

Patternmode is a Frankenstein monster of lots of inspiration, including Shad/cn itself, Tremor, Geist, and Tailwind UI, which are all wonderful resources in themselves.

## Installation

```bash
pnpm add @patternmode/ui
```

## Usage

```tsx
import { Button } from "@patternmode/ui/components/button";
import { Card } from "@patternmode/ui/components/card";

export default function App() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

## Requirements

This package publishes raw TypeScript source files (.tsx/.ts) and requires:

- **TypeScript compilation** - No pre-built JavaScript provided
- **React 19+** - Uses the latest React features
- **Tailwind CSS 4** - Components are built specifically for Tailwind v4
- **ESM modules** - Package uses ES modules only

### Recommended Setup

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

```css
/* globals.css - Import Tailwind CSS 4 */
@import "tailwindcss";
@import "@patternmode/ui/styles/globals.css";
```

## Design Philosophy

### Layout Components
Inspired by React Native's prescriptive approach to layout, this library provides dedicated layout components (Stack, Grid) that abstract away common Tailwind patterns. Instead of repeatedly writing `flex flex-col gap-4` or `grid grid-cols-3 gap-6`, you use semantic layout components that ensure consistency and reduce boilerplate.

### Current Design System
- **Color Palette**: Currently uses Zinc as the primary color system, but I will gradually move to the shadcn/ui inspired semantic CSS variable approach...
- **Theming**: ...as such there is no custom theming support yet, but it will come.
- **Dark Mode**: While the majority of components do have Tailwind dark: modifiers, they're largely untested. Proper support will come soon.
- **Tailwind 4 Only**: Components are built exclusively for Tailwind CSS v4 and won't work with earlier versions

### CSS Requirements
- **Stacking Context**: Some components may require `isolation: isolate` [as required by Base UI)(https://base-ui.com/react/overview/quick-start) to create proper stacking contexts for overlays and layered elements. Use Tailwind's `isolate` utility class when needed for components like modals, dropdowns, and popovers.

## Core Dependencies

This library is built on well-maintained packages that I use repeated in many of my projects:

### Foundation
- **[Base UI](https://github.com/mui/base-ui)** - Headless React components by the original Radix team
- **[Tailwind CSS 4](https://github.com/tailwindlabs/tailwindcss)** - Utility-first CSS framework
- **[Tailwind Variants](https://github.com/nextui-org/tailwind-variants)** - Component variant system
- **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Utility for merging Tailwind classes

### UI & Interaction
- **[Lucide React](https://github.com/lucide-icons/lucide)** - Reliable, complete set of nice SVG icons
- **[Motion](https://github.com/framer/motion)** - buttery smooth animations
- **[Sonner](https://github.com/emilkowalski/sonner)** - The best toast library you can get right now.
- **[Vaul](https://github.com/emilkowalski/vaul)** - The best drawer library you can get right now (Emil is a genius)

### Form & Data Handling
- **[React Hook Form](https://github.com/react-hook-form/react-hook-form)** - Form validation (peer dependency)
- **[Zod](https://github.com/colinhacks/zod)** - Schema validation (peer dependency)
- **[Downshift](https://github.com/downshift-js/downshift)** - Combobox/autocomplete primitives
- **[React Day Picker](https://github.com/gpbl/react-day-picker)** - Date picker component

### Charts & Visualization
- **[Recharts](https://github.com/recharts/recharts)** - Chart library (peer dependency)

### Utilities
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[date-fns](https://github.com/date-fns/date-fns)** - Date utility library
- **[@uidotdev/usehooks](https://github.com/uidotdev/usehooks)** - Collection of React hooks

## Available Components

- **Layout**: Card, Grid, Stack, Divider, Separator
- **Forms**: Button, Input, Select, Checkbox, Radio, Switch, Textarea, Field
- **Navigation**: Navbar, Sidebar, Breadcrumbs, Tabs, Menu, Pagination
- **Feedback**: Toast, Dialog, Alert, Progress, Loader, Skeleton
- **Data Display**: Table, Badge, Avatar, Description List, Callout
- **Charts**: Area Chart, Bar Chart, Line Chart, Donut Chart, Combo Chart
- **Interactive**: Accordion, Collapsible, Carousel, Drawer, Popover
- **Specialized**: Calendar, Date Picker, Search Field, Tag Input, Code Block
- And many more...

## Component Variants

Components support variants for different styles and consistent theming. This is very opinionated, and can't be extended right now:

```tsx
import { Button } from "@patternmode/ui/components/button";

// Use built-in variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button size="lg">Large Button</Button>

// Access variant functions directly if needed
import { buttonVariants } from "@patternmode/ui/components/button/variants";
```

## Utilities

Access utility functions and design tokens:

```tsx
import { cx } from "@patternmode/ui/lib/utils";
```

## Planned Features

### High Priority Components
- **TimeField Component** - Time input with proper formatting and validation
- **ColorPicker System** - Complete color selection with ColorArea, ColorSlider, ColorField, ColorSwatch components
- **GridList Component** - 2D selectable grid with keyboard navigation
- **Tree Component** - Hierarchical data display with expand/collapse and drag/drop
- **DropZone Component** - File drop area with drag/drop states

### Enhanced Features
- **AutoAnimate Integration** - Smooth transitions for dynamic components (TagGroup, FieldArray, Accordion) just to add a bit of lightweight transitions when motion might be too much.
- **Scrollspy Component** - Automatic section highlighting with URL hash sync
- **Stepper Component** - Multi-step form navigation with progress tracking
- **File Upload Component** - Drag and drop with progress tracking and previews

### Testing & Quality

The goal is to have 100% test coverage but who knows when that will be achieved. Currently the more complex components are tested throughly such as button (just because of the multitude of props) and Tag Input.

## Documentation

Visit [patternmode.com](https://www.patternmode.com) for:
- Complete component showcase
- Interactive preview
- Multiple examples
- Complete props documentation is limited at the moment, but each component has JSDoc and typescript types enough for you to use.

## License

MIT © Daniel Howells

## Development Setup

### Linking to Another Project for Local Development

To work on this UI library while using it in another project on the same machine with **live updates** use pnpm's file system linking:

#### Step 1: Link the UI Package

From the patternmode repository root:

```bash
cd packages/ui
pnpm link --global
```

#### Step 2: Link from Your Other Project

In your separate project that wants to consume `@patternmode/ui`:

```bash
pnpm link --global @patternmode/ui
```

#### That's it!

Now when you make changes to any TypeScript files in `packages/ui/src/`, they will be immediately reflected in your consuming project. No build step required - your bundler (Next.js, Vite, etc.) will compile the TypeScript source files directly.

#### Unlinking

When you're done with development:

```bash
# From your consuming project
pnpm unlink @patternmode/ui
pnpm install @patternmode/ui
```

### Notes

- This works because the package publishes raw TypeScript source files
- Your consuming project's bundler handles the TypeScript compilation
- Make sure both projects use compatible TypeScript configurations
- If you encounter module resolution issues, restart your development server
