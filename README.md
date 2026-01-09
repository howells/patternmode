# UI Experiments Library

AI-generated motion component library with Claude Code integration.

## Features

- 🎨 AI-generated UI experiments via Claude Code CLI
- 🎭 Constrained design system (timezones.digital palette + Apple easings)
- 📦 Copy-paste ready components
- 🎪 Bento-style grid layout
- 🎨 Live theme customization
- 🛠️ Dev admin panel for generation/review

## Tech Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind v4 + Shadcn UI
- Motion (Framer Motion)
- Vaul drawers
- Shiki syntax highlighting

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm
- Claude Code CLI (for generation)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Visit:
- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin

### Generate Experiments

1. Go to `/admin`
2. Select theme or use "Random"
3. Click "Generate Experiment"
4. Review in queue
5. Approve or regenerate

### Project Structure

```
src/
├── app/
│   ├── page.tsx              # Public grid
│   ├── admin/page.tsx        # Admin panel
│   ├── actions/              # Server actions
│   └── api/                  # API routes
├── components/
│   ├── experiments/          # Generated experiments
│   ├── experiment-card.tsx
│   ├── experiment-drawer.tsx
│   └── experiment-grid.tsx
└── lib/
    ├── motion.ts             # Apple easings
    ├── experiments.ts        # Manifest utilities
    └── utils.ts

data/
└── experiments-manifest.json # Metadata

prompts/
└── experiment-library.md     # Generation prompt
```

## Design System

### Colors

Based on timezones.digital palette, using Shadcn CSS variables:

- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`

### Easings

Apple's standard easings:

- `standard`: Default easing
- `deceleration`: Ease out
- `acceleration`: Ease in
- `sharp`: Pronounced

## Contributing

This is a personal experiment library. Feel free to fork and adapt!

## License

MIT
