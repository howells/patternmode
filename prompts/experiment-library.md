# UI Experiment Generation Guide

Generate a React component following these strict constraints.

## Component Requirements

### File Structure

```tsx
/**
 * @title [Short descriptive title]
 * @description [One sentence description of interaction]
 * @mechanics [comma-separated mechanics used]
 * @dependencies motion, @/lib/motion
 * @approved false
 * @generated [ISO date]
 */

'use client';

import { motion } from 'motion/react';
import { easings, springs, transition, useReducedMotion } from '@/lib/motion';

export default function ExperimentName() {
  // Implementation
}

export const metadata = {
  title: "[Title]",
  description: "[Description]",
  dependencies: ["motion", "@/lib/motion"],
  installInstructions: "pnpm add motion",
};
```

## Design Constraints

### Colors (Shadcn CSS Variables Only)
- `bg-background` / `text-foreground`
- `bg-card` / `text-card-foreground`
- `bg-muted` / `text-muted-foreground`
- `bg-accent` / `text-accent-foreground`
- `border-border`

NEVER use hardcoded colors or Tailwind color classes.

### Motion (Apple Easings Only)
- Import from `@/lib/motion`
- Use `easings.standard`, `easings.deceleration`, `easings.acceleration`, `easings.sharp`
- Use `springs.magnetic`, `springs.bouncy`, `springs.smooth`
- Use `transition()` helper for consistent animation configs
- All animations < 600ms (unless physics-based)

### Accessibility
- Import and use `useReducedMotion` hook from `@/lib/motion`
- Disable animations when `useReducedMotion()` returns true
- Return static version of component when reduced motion preferred

### Code Quality
- Self-contained component (no required props)
- Maximum 50 lines of implementation
- Use motion library (not framer-motion)
- TypeScript with proper types

## Mechanics Taxonomy

### Motion Types
- **magnetic**: Cursor-influenced positioning
- **spring**: Physics-based bounce
- **morphing**: Shape transformation
- **particle**: Element decomposition
- **liquid**: Fluid, organic motion
- **kinetic**: Velocity-based
- **elastic**: Overshooting

### Interaction Patterns
- **hover-reactive**: Responds to mouse hover
- **click-reactive**: Responds to clicks
- **drag-based**: Responds to dragging
- **proximity-based**: Responds to cursor distance
- **scroll-linked**: Tied to scroll position
- **time-based**: Automatic animation

### Visual Effects
- **blur**: Blur effects
- **distortion**: Shape distortion
- **scaling**: Size changes
- **rotation**: Rotation transforms
- **color-shift**: Color transitions
- **opacity-fade**: Opacity changes
- **glow**: Glow/shadow effects

## Generation Rules

1. Combine 1-2 mechanics per experiment
2. Keep markup minimal (< 50 lines)
3. Always respect prefers-reduced-motion
4. Use semantic variable names
5. Include clear description of interaction
6. Self-contained (no external state/props needed)

## Example Experiments

1. "Button with magnetic hover that follows cursor within 50px radius, snapping back with spring on mouse leave"
2. "Toggle that fills like liquid mercury using morphing path animation with smooth easing"
3. "Card that splits into particles on click, particles fade out using deceleration easing"
4. "Progress bar that breathes using elastic scaling on time-based loop"
5. "Checkbox with spring bounce on check, using bouncy spring config"

## Your Task

Generate ONE experiment based on the theme: {{THEME}}

Return ONLY the component code with proper frontmatter. No explanations.
