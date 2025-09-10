# @patternmode/grid

A powerful, flexible CSS Grid component system for React with responsive breakpoints, template areas, and auto-flow control.

## Features

- ✅ **Responsive Grid**: Support for responsive columns and rows
- ✅ **Template Areas**: Named grid areas for semantic layouts
- ✅ **Auto Flow**: Control grid item placement with row/column/dense options
- ✅ **Precise Positioning**: Start/end coordinates for exact positioning
- ✅ **Debug Mode**: Visual debugging with background colors and borders
- ✅ **TypeScript**: Full TypeScript support with comprehensive types
- ✅ **Tailwind CSS 4**: Automatic safelist inclusion for dynamic classes

## Installation

```bash
npm install @patternmode/grid
# or
pnpm add @patternmode/grid
# or
yarn add @patternmode/grid
```

## Usage

### Basic Grid

```tsx
import { Grid, GridCell } from '@patternmode/grid';

function MyComponent() {
  return (
    <Grid columns={3} gap={4}>
      <GridCell>Item 1</GridCell>
      <GridCell>Item 2</GridCell>
      <GridCell>Item 3</GridCell>
    </Grid>
  );
}
```

### Responsive Grid

```tsx
<Grid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
  <GridCell>Responsive Item</GridCell>
</Grid>
```

### Template Areas

```tsx
<Grid
  templateAreas={`
    "header header header"
    "sidebar main main"
    "footer footer footer"
  `}
  gap={4}
>
  <GridCell area="header">Header</GridCell>
  <GridCell area="sidebar">Sidebar</GridCell>
  <GridCell area="main">Main Content</GridCell>
  <GridCell area="footer">Footer</GridCell>
</Grid>
```

### Debug Mode

```tsx
<Grid debug columns={3} gap={4}>
  <GridCell>Debug Item</GridCell>
</Grid>
```

## CSS Classes

This package automatically includes all necessary Tailwind CSS classes for dynamic grid positioning. The grid classes are referenced as string literals in `tailwind-classes.ts`, ensuring they're available when the package is used.

### Supported Dynamic Classes

- `col-span-1` through `col-span-12`
- `row-span-1` through `row-span-12`
- `col-start-1` through `col-start-13`
- `col-end-1` through `col-end-14`
- `row-start-1` through `row-start-13`
- `row-end-1` through `row-end-14`

### Tailwind Integration

Since your application uses `@source` directives pointing to this package, Tailwind CSS will automatically scan the `tailwind-classes.ts` file and include all the referenced grid classes in your build. No additional configuration is needed!

The TypeScript file contains string literals that Tailwind's scanner will find and preserve in the build output.

## Props

### Grid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ResponsiveValue<number>` | `6` | Number of columns |
| `rows` | `ResponsiveValue<number>` | - | Number of rows |
| `gap` | `ResponsiveSpacing<SpacingValue>` | `4` | Gap between grid items |
| `templateAreas` | `ResponsiveValue<string>` | - | Named grid areas |
| `autoFlow` | `ResponsiveValue<"row" \| "column" \| "dense">` | - | Grid auto-flow direction |
| `debug` | `boolean` | `false` | Enable debug mode |

### GridCell Props

| Prop | Type | Description |
|------|------|-------------|
| `colSpan` | `number` | Number of columns to span |
| `rowSpan` | `number` | Number of rows to span |
| `colStart` | `number` | Starting column position |
| `rowStart` | `number` | Starting row position |
| `colEnd` | `number` | Ending column position |
| `rowEnd` | `number` | Ending row position |
| `area` | `string` | Named grid area |

## License

MIT
