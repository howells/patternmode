# UI Experiments Library - Design Document

**Date:** 2026-01-08
**Status:** Approved

## Overview

An AI-generated UI experiments library inspired by [uilabs.dev](https://www.uilabs.dev/), showcasing portable, copy-paste-ready motion components. Features intentionally plain aesthetics with constrained design system (timezones.digital palette + Apple easings) to focus on interaction mechanics and motion quality.

## Core Concept

- **Grid of experiments** (12 visible: 10 normal + 2 large bento-style)
- **Random selection** from approved pool on each page load
- **Click to explore** - Vaul drawer opens with live preview + copyable code
- **User customization** - Live theme/easing editor using shadcn CSS variables
- **Dev mode admin** - Generate via Claude Code CLI, review queue, approve/reject workflow

## Architecture

### Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Next.js 16 | App Router, Server Components |
| React | React 19 | ref-as-prop pattern |
| Styling | Tailwind v4 | CSS-based config |
| Components | Shadcn + Base UI | Shadcn for scaffolding, Base UI primitives |
| Animation | Motion | Lighter Framer Motion alternative |
| Drawer | Vaul | Horizontal half-page drawer |
| Code Highlighting | Shiki | Syntax highlighting for code viewer |

### Data Flow

```
Dev Admin UI → Server Action → Claude Code CLI
                    ↓
         Component .tsx file created
                    ↓
         Manifest JSON updated
                    ↓
         Auto-preview for review
                    ↓
    Approve/Regenerate/Delete
                    ↓
         Public grid random selection
```

### File Structure

```
project-root/
├── app/
│   ├── page.tsx                      # Public grid
│   ├── admin/page.tsx                # Dev mode (NODE_ENV check)
│   ├── actions/experiments.ts        # Server actions
│   └── globals.css                   # Shadcn vars + palette
├── components/
│   ├── experiments/                  # Generated experiments
│   │   ├── magnetic-button-001.tsx
│   │   └── ...
│   ├── experiment-card.tsx
│   ├── experiment-drawer.tsx         # Vaul drawer
│   ├── experiment-grid.tsx           # Bento layout
│   ├── theme-customizer.tsx          # Settings panel
│   └── admin/
│       ├── generate-form.tsx
│       ├── review-queue.tsx
│       └── approved-library.tsx
├── lib/
│   ├── motion.ts                     # Apple easings + utilities
│   ├── experiments.ts                # Manifest loader
│   └── utils.ts
├── data/
│   └── experiments-manifest.json     # Metadata DB
├── prompts/
│   └── experiment-library.md         # Generation prompt
└── scripts/
    └── generate-experiment.ts        # CLI caller
```

## Design System

### Color Palette (timezones.digital inspired)

```css
:root {
  --background: 245 246 248;         /* Light warm gray */
  --foreground: 24 24 24;            /* Near black */
  --card: 0 0% 100%;                 /* Pure white */
  --card-foreground: 24 24 24;
  --muted: 244 245 247;              /* Darker warm gray */
  --muted-foreground: 99 102 108;    /* Medium gray */
  --accent: 11 84% 55%;              /* Orange ~rgb(236, 79, 44) */
  --accent-foreground: 250 250 250;  /* Near white */
  --card-dark: 24 24 24;             /* Dark cards */
}
```

### Easings (Apple's standard set)

```ts
export const easings = {
  standard: [0.4, 0.0, 0.2, 1.0],     // Default
  deceleration: [0.0, 0.0, 0.2, 1.0], // Ease out
  acceleration: [0.4, 0.0, 1.0, 1.0], // Ease in
  sharp: [0.4, 0.0, 0.6, 1.0],        // Pronounced
} as const;
```

### Design Constraints

All generated experiments must:
- Use only shadcn CSS variables (no hardcoded colors)
- Import easings from `@/lib/motion`
- Use `motion` library (not `framer-motion`)
- Be self-contained (no required props)
- Support `prefers-reduced-motion`
- Keep animations < 600ms (unless physics-based)

## Component Structure

### Generated Experiment Format

```tsx
/**
 * @title Magnetic Button
 * @description Button that follows cursor within magnetic field radius
 * @mechanics magnetic, spring
 * @dependencies motion, @/lib/motion
 * @approved true
 * @generated 2026-01-08
 */

'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { easings } from '@/lib/motion';

export default function MagneticButton() {
  // Implementation
}

export const metadata = {
  title: "Magnetic Button",
  description: "Button that follows cursor...",
  dependencies: ["motion", "@/lib/motion"],
  installInstructions: `pnpm add motion`,
};
```

### Manifest Structure

```json
{
  "experiments": [
    {
      "id": "magnetic-button-001",
      "title": "Magnetic Button",
      "description": "...",
      "mechanics": ["magnetic", "spring"],
      "dependencies": ["motion", "@/lib/motion"],
      "filePath": "components/experiments/magnetic-button-001.tsx",
      "approved": true,
      "featured": false,
      "generatedAt": "2026-01-08T10:30:00Z"
    }
  ],
  "stats": {
    "total": 45,
    "approved": 32,
    "byMechanic": { "magnetic": 8 }
  }
}
```

## User Experience

### Public Site

1. **Homepage Grid**
   - Bento-style layout (4 columns desktop, 2 tablet, 1 mobile)
   - 12 experiments visible (10 normal 1x1, 2 large 2x2)
   - Random selection from approved pool
   - Refresh button to get new random set
   - Theme customizer icon in header

2. **Experiment Interaction**
   - Click experiment → Vaul drawer opens from right (50% width)
   - Drawer contains:
     - **Large preview** (top 60% - interactive)
     - **Tabs** (bottom 40%):
       - Code (syntax highlighted, copy button)
       - Install (dependencies + setup checklist)
   - Metadata visible: title, description, mechanics tags

3. **Theme Customization**
   - Settings drawer with:
     - Color pickers for each CSS variable
     - Easing curve editor (visual bezier + presets)
     - Export/import settings as JSON
   - Changes apply instantly to all experiments
   - Stored in localStorage

### Dev Admin Panel

Accessible at `/admin` (dev mode only)

1. **Generate Section**
   - Dropdown: Random / By Theme / Custom Prompt
   - Generate button → shows loading state
   - Auto-refreshes when complete

2. **Review Queue**
   - List of unapproved experiments
   - Live preview for each
   - Actions: Approve / Regenerate / Delete

3. **Approved Library**
   - Grid of all approved experiments
   - Toggle featured status (2x size on public grid)
   - Delete if needed

## Generation System

### Hybrid Prompt Library

Structure in `prompts/experiment-library.md`:

1. **Constraints** - Design system rules
2. **Mechanics Taxonomy**:
   - Motion types (magnetic, spring, morphing, particle, liquid, kinetic, elastic)
   - Interaction patterns (hover, click, drag, proximity, scroll, time)
   - Visual effects (blur, distortion, scale, rotate, color-shift, opacity, glow)
3. **Curated Examples** - Specific ideas you want to see
4. **Generation Rules** - Technical requirements

### Generation Workflow

```bash
# Triggered from dev admin UI
Server Action → scripts/generate-experiment.ts
              → Calls Claude Code CLI with prompt
              → Parses output component
              → Saves to components/experiments/[id].tsx
              → Updates manifest (approved: false)
              → Returns new experiment ID
              → Admin UI auto-navigates to preview
```

### Server Actions

```ts
// app/actions/experiments.ts
'use server'

export async function generateExperiment(theme: string) {
  // Calls Claude Code via child_process
  // Returns { id, success, error? }
}

export async function approveExperiment(id: string) {
  // Updates manifest approved: true
}

export async function deleteExperiment(id: string) {
  // Removes file + manifest entry
}
```

## Copy-Paste Experience

When user copies an experiment:

1. **Copy Code** button → Full component to clipboard
2. **Copy Install** button → `pnpm add motion` command
3. **Setup Checklist** shown:
   ```
   □ pnpm add motion
   □ Copy lib/motion.ts to your project
   □ Ensure shadcn CSS variables in globals.css
   ```
4. **Toast notification**: "✓ Copied! Don't forget to install motion"

## Error Handling

### Generation Failures
- Show alert: "Generation failed. Check Claude Code is running."
- Retry button available

### Runtime Component Errors
- Wrap each experiment in `<ErrorBoundary>`
- Fallback shows: "This experiment encountered an error"

### Reduced Motion
- All experiments check `prefers-reduced-motion`
- Disable animations when reduced motion preferred

### Empty States
- No approved experiments → "Generate your first experiment" CTA
- Review queue empty → "All caught up!"

## Implementation Notes

### Key Files to Create

1. **lib/motion.ts** - Apple easings + motion utilities
2. **lib/experiments.ts** - Manifest loader/parser
3. **components/experiment-drawer.tsx** - Vaul drawer implementation
4. **components/theme-customizer.tsx** - Color/easing editor
5. **app/actions/experiments.ts** - Server actions
6. **scripts/generate-experiment.ts** - Claude Code CLI caller
7. **prompts/experiment-library.md** - Master generation prompt

### Dependencies to Install

```bash
pnpm add motion vaul shiki @base-ui/react
pnpm add -D @tailwindcss/postcss@4
```

### Environment Variables

None required for core functionality. Experiments generated via local Claude Code CLI.

## Success Criteria

- [ ] Public grid shows random 12 experiments on each load
- [ ] Clicking experiment opens Vaul drawer with code
- [ ] Copy buttons work with proper setup instructions
- [ ] Theme customizer changes colors/easings live
- [ ] Dev admin can generate experiments via Claude Code
- [ ] Review queue allows approve/regenerate/delete
- [ ] All experiments respect `prefers-reduced-motion`
- [ ] Components are truly portable (copy-paste-ready)

## Future Enhancements

- Export experiment collection as npm package
- Search/filter by mechanics tags
- Share customized theme presets
- Community submissions (with review)
- Animated thumbnails in grid (subtle preview of motion)
