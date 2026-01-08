# UI Experiments Library Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an AI-generated UI experiments library with Claude Code CLI generation, showcasing portable motion components in a bento-style grid with theme customization.

**Architecture:** Next.js 16 app with filesystem-based component storage. Experiments generated via Claude Code CLI, stored as .tsx files with JSON manifest for metadata. Public grid randomly selects from approved pool. Dev admin panel for generation/review workflow.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, Shadcn UI, Base UI, Motion, Vaul, Shiki

---

## Phase 1: Project Setup

### Task 1: Bootstrap Next.js Project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`

**Step 1: Create Next.js app**

```bash
pnpm create next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
```

Expected: Creates base Next.js structure with TypeScript

**Step 2: Verify dev server starts**

```bash
pnpm dev
```

Expected: Server starts at localhost:3000

**Step 3: Commit base setup**

```bash
git add .
git commit -m "chore: bootstrap Next.js project"
```

---

### Task 2: Install Core Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install styling dependencies**

```bash
pnpm add tailwind-merge class-variance-authority clsx
pnpm add -D @tailwindcss/postcss@4
```

**Step 2: Install UI dependencies**

```bash
pnpm add @base-ui/react lucide-react vaul motion shiki
```

**Step 3: Install code quality tools**

```bash
pnpm add -D @biomejs/biome ultracite
```

**Step 4: Initialize Biome**

```bash
pnpm exec ultracite init
```

**Step 5: Commit dependencies**

```bash
git add package.json pnpm-lock.yaml biome.json
git commit -m "chore: install core dependencies"
```

---

### Task 3: Configure Tailwind v4

**Files:**
- Create: `postcss.config.mjs`
- Modify: `src/app/globals.css`

**Step 1: Create PostCSS config**

Create `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {}
  }
};
```

**Step 2: Update globals.css with Tailwind v4 syntax**

Replace contents of `src/app/globals.css`:

```css
@import "tailwindcss";

@source "../**/*.{ts,tsx}";

@layer base {
  :root {
    /* Backgrounds */
    --background: 245 246 248;
    --foreground: 24 24 24;

    /* Card/Surface */
    --card: 0 0% 100%;
    --card-foreground: 24 24 24;

    /* Muted */
    --muted: 244 245 247;
    --muted-foreground: 99 102 108;

    /* Accent (orange) */
    --accent: 11 84% 55%;
    --accent-foreground: 250 250 250;

    /* Card dark variant */
    --card-dark: 24 24 24;
    --card-dark-foreground: 250 250 250;

    /* Border */
    --border: 240 5.9% 90%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Step 3: Test Tailwind works**

Update `src/app/page.tsx` to use a Tailwind class:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-bold text-foreground">UI Experiments</h1>
    </main>
  );
}
```

**Step 4: Run dev server and verify styling**

```bash
pnpm dev
```

Expected: Page shows with custom background color

**Step 5: Commit Tailwind config**

```bash
git add postcss.config.mjs src/app/globals.css src/app/page.tsx
git commit -m "feat: configure Tailwind v4 with design tokens"
```

---

### Task 4: Setup Project Structure

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/.gitkeep`
- Create: `src/components/experiments/.gitkeep`
- Create: `data/experiments-manifest.json`
- Create: `prompts/.gitkeep`
- Create: `scripts/.gitkeep`

**Step 1: Create utility function**

Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2: Create directory structure**

```bash
mkdir -p src/components/experiments src/components/admin data prompts scripts
touch src/components/.gitkeep src/components/experiments/.gitkeep prompts/.gitkeep scripts/.gitkeep
```

**Step 3: Create initial manifest**

Create `data/experiments-manifest.json`:

```json
{
  "experiments": [],
  "stats": {
    "total": 0,
    "approved": 0,
    "byMechanic": {}
  }
}
```

**Step 4: Commit structure**

```bash
git add src/lib src/components data prompts scripts
git commit -m "chore: create project structure"
```

---

## Phase 2: Design System

### Task 5: Motion Utilities

**Files:**
- Create: `src/lib/motion.ts`

**Step 1: Create motion utilities with Apple easings**

Create `src/lib/motion.ts`:

```ts
import { type Transition } from "motion/react";

/**
 * Apple's standard easing curves
 */
export const easings = {
  standard: [0.4, 0.0, 0.2, 1.0],
  deceleration: [0.0, 0.0, 0.2, 1.0],
  acceleration: [0.4, 0.0, 1.0, 1.0],
  sharp: [0.4, 0.0, 0.6, 1.0],
} as const;

export type EasingName = keyof typeof easings;

/**
 * Get easing array by name
 */
export function getEasing(name: EasingName) {
  return easings[name];
}

/**
 * Create transition with named easing
 */
export function transition(
  easing: EasingName,
  duration: number = 0.3
): Transition {
  return {
    duration,
    ease: easings[easing],
  };
}

/**
 * Spring configuration for magnetic effects
 */
export const springs = {
  magnetic: {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  },
  bouncy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25,
  },
  smooth: {
    type: "spring" as const,
    stiffness: 200,
    damping: 40,
  },
} as const;

export type SpringName = keyof typeof springs;

/**
 * Hook to check for reduced motion preference
 */
export function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

**Step 2: Commit motion utilities**

```bash
git add src/lib/motion.ts
git commit -m "feat: add motion utilities with Apple easings"
```

---

### Task 6: Experiment Manifest Utilities

**Files:**
- Create: `src/lib/experiments.ts`

**Step 1: Create manifest loader**

Create `src/lib/experiments.ts`:

```ts
import fs from "node:fs/promises";
import path from "node:path";

export interface ExperimentMetadata {
  id: string;
  title: string;
  description: string;
  mechanics: string[];
  dependencies: string[];
  filePath: string;
  approved: boolean;
  featured: boolean;
  generatedAt: string;
}

export interface ExperimentManifest {
  experiments: ExperimentMetadata[];
  stats: {
    total: number;
    approved: number;
    byMechanic: Record<string, number>;
  };
}

const MANIFEST_PATH = path.join(process.cwd(), "data/experiments-manifest.json");

/**
 * Load manifest from filesystem
 */
export async function loadManifest(): Promise<ExperimentManifest> {
  const content = await fs.readFile(MANIFEST_PATH, "utf-8");
  return JSON.parse(content);
}

/**
 * Save manifest to filesystem
 */
export async function saveManifest(manifest: ExperimentManifest): Promise<void> {
  await fs.writeFile(
    MANIFEST_PATH,
    JSON.stringify(manifest, null, 2),
    "utf-8"
  );
}

/**
 * Get all approved experiments
 */
export async function getApprovedExperiments(): Promise<ExperimentMetadata[]> {
  const manifest = await loadManifest();
  return manifest.experiments.filter((exp) => exp.approved);
}

/**
 * Get random selection of experiments
 */
export function selectRandomExperiments(
  experiments: ExperimentMetadata[],
  count: number
): ExperimentMetadata[] {
  const shuffled = [...experiments].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Mark featured experiments (randomly select ~10%)
 */
export function markFeatured(
  experiments: ExperimentMetadata[]
): ExperimentMetadata[] {
  const featuredCount = Math.max(1, Math.floor(experiments.length * 0.1));
  const shuffled = [...experiments].sort(() => Math.random() - 0.5);

  return experiments.map((exp, idx) => ({
    ...exp,
    featured: idx < featuredCount,
  }));
}

/**
 * Update experiment in manifest
 */
export async function updateExperiment(
  id: string,
  updates: Partial<ExperimentMetadata>
): Promise<void> {
  const manifest = await loadManifest();
  const index = manifest.experiments.findIndex((exp) => exp.id === id);

  if (index === -1) {
    throw new Error(`Experiment ${id} not found`);
  }

  manifest.experiments[index] = {
    ...manifest.experiments[index],
    ...updates,
  };

  // Update stats
  manifest.stats.total = manifest.experiments.length;
  manifest.stats.approved = manifest.experiments.filter(
    (exp) => exp.approved
  ).length;

  await saveManifest(manifest);
}

/**
 * Add new experiment to manifest
 */
export async function addExperiment(
  experiment: ExperimentMetadata
): Promise<void> {
  const manifest = await loadManifest();
  manifest.experiments.push(experiment);

  // Update stats
  manifest.stats.total = manifest.experiments.length;
  manifest.stats.approved = manifest.experiments.filter(
    (exp) => exp.approved
  ).length;

  // Update mechanics count
  for (const mechanic of experiment.mechanics) {
    manifest.stats.byMechanic[mechanic] =
      (manifest.stats.byMechanic[mechanic] || 0) + 1;
  }

  await saveManifest(manifest);
}

/**
 * Delete experiment from manifest
 */
export async function deleteExperiment(id: string): Promise<void> {
  const manifest = await loadManifest();
  const index = manifest.experiments.findIndex((exp) => exp.id === id);

  if (index === -1) {
    throw new Error(`Experiment ${id} not found`);
  }

  const experiment = manifest.experiments[index];
  manifest.experiments.splice(index, 1);

  // Update stats
  manifest.stats.total = manifest.experiments.length;
  manifest.stats.approved = manifest.experiments.filter(
    (exp) => exp.approved
  ).length;

  // Update mechanics count
  for (const mechanic of experiment.mechanics) {
    manifest.stats.byMechanic[mechanic] =
      Math.max(0, (manifest.stats.byMechanic[mechanic] || 0) - 1);
  }

  await saveManifest(manifest);
}
```

**Step 2: Commit manifest utilities**

```bash
git add src/lib/experiments.ts
git commit -m "feat: add experiment manifest utilities"
```

---

## Phase 3: Core Components

### Task 7: Experiment Card Component

**Files:**
- Create: `src/components/experiment-card.tsx`

**Step 1: Create experiment card**

Create `src/components/experiment-card.tsx`:

```tsx
"use client";

import { type ExperimentMetadata } from "@/lib/experiments";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  experiment: ExperimentMetadata;
  size?: "normal" | "large";
  onClick?: () => void;
}

export function ExperimentCard({
  experiment,
  size = "normal",
  onClick,
}: ExperimentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card cursor-pointer transition-all hover:border-foreground/20",
        size === "large" ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
      )}
    >
      {/* Experiment preview */}
      <div className="relative flex h-full min-h-[240px] items-center justify-center p-8">
        <div className="w-full">
          {/* Dynamic import will go here */}
          <div className="text-muted-foreground text-sm">
            {experiment.title}
          </div>
        </div>
      </div>

      {/* Metadata overlay on hover */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-card-dark/90 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <h3 className="text-card-dark-foreground font-semibold">
          {experiment.title}
        </h3>
        <p className="text-card-dark-foreground/70 text-sm line-clamp-2">
          {experiment.description}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {experiment.mechanics.map((mechanic) => (
            <span
              key={mechanic}
              className="rounded-full bg-accent/20 px-2 py-0.5 text-xs text-accent-foreground"
            >
              {mechanic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit experiment card**

```bash
git add src/components/experiment-card.tsx
git commit -m "feat: add experiment card component"
```

---

### Task 8: Experiment Grid Component

**Files:**
- Create: `src/components/experiment-grid.tsx`

**Step 1: Create grid layout**

Create `src/components/experiment-grid.tsx`:

```tsx
"use client";

import { type ExperimentMetadata } from "@/lib/experiments";
import { ExperimentCard } from "./experiment-card";

interface ExperimentGridProps {
  experiments: ExperimentMetadata[];
  onExperimentClick?: (experiment: ExperimentMetadata) => void;
}

export function ExperimentGrid({
  experiments,
  onExperimentClick,
}: ExperimentGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {experiments.map((experiment) => (
        <ExperimentCard
          key={experiment.id}
          experiment={experiment}
          size={experiment.featured ? "large" : "normal"}
          onClick={() => onExperimentClick?.(experiment)}
        />
      ))}
    </div>
  );
}
```

**Step 2: Commit grid component**

```bash
git add src/components/experiment-grid.tsx
git commit -m "feat: add experiment grid component"
```

---

### Task 9: Experiment Drawer with Vaul

**Files:**
- Create: `src/components/experiment-drawer.tsx`

**Step 1: Create drawer component**

Create `src/components/experiment-drawer.tsx`:

```tsx
"use client";

import { Drawer } from "vaul";
import { type ExperimentMetadata } from "@/lib/experiments";
import { X, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ExperimentDrawerProps {
  experiment: ExperimentMetadata | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExperimentDrawer({
  experiment,
  open,
  onOpenChange,
}: ExperimentDrawerProps) {
  const [activeTab, setActiveTab] = useState<"code" | "install">("code");
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!experiment) return null;

  return (
    <Drawer.Root
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
        <Drawer.Content className="fixed right-0 top-0 bottom-0 w-full sm:w-1/2 bg-card flex flex-col outline-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-6">
            <div>
              <Drawer.Title className="text-xl font-semibold text-foreground">
                {experiment.title}
              </Drawer.Title>
              <p className="text-sm text-muted-foreground mt-1">
                {experiment.description}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-lg p-2 hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center p-8 border-b border-border">
            <div className="w-full max-w-md">
              {/* Dynamic import will render here */}
              <div className="rounded-lg border border-border bg-background p-8 text-center text-muted-foreground">
                Preview of {experiment.title}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border px-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("code")}
                className={`pb-3 pt-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "code"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setActiveTab("install")}
                className={`pb-3 pt-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "install"
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                Install
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 overflow-auto">
            {activeTab === "code" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {experiment.id}.tsx
                  </span>
                  <button
                    onClick={() => handleCopy("// Code will be here")}
                    className="flex items-center gap-2 rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                <pre className="rounded-lg bg-card-dark p-4 text-sm text-card-dark-foreground overflow-x-auto">
                  <code>// Component code will be displayed here</code>
                </pre>
              </div>
            )}

            {activeTab === "install" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Dependencies
                  </h3>
                  <div className="space-y-2">
                    {experiment.dependencies.map((dep) => (
                      <div
                        key={dep}
                        className="flex items-center justify-between rounded-lg bg-muted p-3"
                      >
                        <code className="text-sm">{dep}</code>
                        <button
                          onClick={() =>
                            handleCopy(
                              dep.startsWith("@/")
                                ? `// Copy ${dep} to your project`
                                : `pnpm add ${dep}`
                            )
                          }
                          className="text-sm text-accent hover:text-accent/80"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Setup Checklist
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">□</span>
                      <span>Install dependencies with pnpm</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">□</span>
                      <span>Copy lib/motion.ts to your project</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5">□</span>
                      <span>
                        Ensure shadcn CSS variables in globals.css
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
```

**Step 2: Commit drawer component**

```bash
git add src/components/experiment-drawer.tsx
git commit -m "feat: add experiment drawer with Vaul"
```

---

### Task 10: Public Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/app/layout.tsx`

**Step 1: Update layout with proper metadata**

Update `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UI Experiments",
  description: "AI-generated motion component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

**Step 2: Create homepage with grid**

Update `src/app/page.tsx`:

```tsx
"use client";

import { ExperimentGrid } from "@/components/experiment-grid";
import { ExperimentDrawer } from "@/components/experiment-drawer";
import { type ExperimentMetadata } from "@/lib/experiments";
import { RefreshCcw, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [experiments, setExperiments] = useState<ExperimentMetadata[]>([]);
  const [selectedExperiment, setSelectedExperiment] =
    useState<ExperimentMetadata | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load experiments on mount
  useEffect(() => {
    async function loadExperiments() {
      const response = await fetch("/api/experiments");
      const data = await response.json();
      setExperiments(data.experiments);
    }
    loadExperiments();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleExperimentClick = (experiment: ExperimentMetadata) => {
    setSelectedExperiment(experiment);
    setDrawerOpen(true);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                UI Experiments
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                AI-generated motion components
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
                <Settings className="h-4 w-4" />
                Theme
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {experiments.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">
                No experiments yet. Generate your first one!
              </p>
              {process.env.NODE_ENV === "development" && (
                <a
                  href="/admin"
                  className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90"
                >
                  Go to Admin Panel
                </a>
              )}
            </div>
          </div>
        ) : (
          <ExperimentGrid
            experiments={experiments}
            onExperimentClick={handleExperimentClick}
          />
        )}
      </div>

      {/* Drawer */}
      <ExperimentDrawer
        experiment={selectedExperiment}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </main>
  );
}
```

**Step 3: Commit homepage**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: create public homepage with grid"
```

---

## Phase 4: API Layer

### Task 11: Experiments API Route

**Files:**
- Create: `src/app/api/experiments/route.ts`

**Step 1: Create API route to serve experiments**

Create `src/app/api/experiments/route.ts`:

```ts
import { NextResponse } from "next/server";
import {
  getApprovedExperiments,
  selectRandomExperiments,
  markFeatured,
} from "@/lib/experiments";

export async function GET() {
  try {
    const approved = await getApprovedExperiments();
    const random = selectRandomExperiments(approved, 12);
    const withFeatured = markFeatured(random);

    return NextResponse.json({
      experiments: withFeatured,
      count: withFeatured.length,
    });
  } catch (error) {
    console.error("Failed to load experiments:", error);
    return NextResponse.json(
      { experiments: [], count: 0 },
      { status: 500 }
    );
  }
}
```

**Step 2: Test API endpoint**

```bash
pnpm dev
# Visit http://localhost:3000/api/experiments
```

Expected: Returns JSON with empty experiments array

**Step 3: Commit API route**

```bash
git add src/app/api/experiments/route.ts
git commit -m "feat: add experiments API endpoint"
```

---

## Phase 5: Admin Panel

### Task 12: Admin Layout and Protection

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`

**Step 1: Create admin layout with dev mode check**

Create `src/app/admin/layout.tsx`:

```tsx
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">
              Admin Panel
            </h1>
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Public Site
            </a>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
```

**Step 2: Create basic admin page**

Create `src/app/admin/page.tsx`:

```tsx
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [generating, setGenerating] = useState(false);

  return (
    <div className="space-y-8">
      {/* Generate Section */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Generate Experiment
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Theme
            </label>
            <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm">
              <option>Random</option>
              <option>Magnetic Interactions</option>
              <option>Spring Physics</option>
              <option>Particle Effects</option>
            </select>
          </div>
          <button
            disabled={generating}
            className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors"
          >
            {generating ? "Generating..." : "Generate Experiment"}
          </button>
        </div>
      </section>

      {/* Review Queue */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Review Queue
        </h2>
        <p className="text-sm text-muted-foreground">
          No experiments pending review
        </p>
      </section>

      {/* Approved Library */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Approved Library
        </h2>
        <p className="text-sm text-muted-foreground">
          No approved experiments yet
        </p>
      </section>
    </div>
  );
}
```

**Step 3: Test admin panel access**

```bash
pnpm dev
# Visit http://localhost:3000/admin
```

Expected: Admin panel loads with three sections

**Step 4: Commit admin panel**

```bash
git add src/app/admin
git commit -m "feat: add admin panel with dev mode protection"
```

---

## Phase 6: Generation System

### Task 13: Generation Prompt Template

**Files:**
- Create: `prompts/experiment-library.md`

**Step 1: Create master prompt template**

Create `prompts/experiment-library.md`:

```markdown
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
import { easings, springs } from '@/lib/motion';

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
- All animations < 600ms (unless physics-based)

### Accessibility
- Always include `prefers-reduced-motion` check
- Disable animations when reduced motion preferred

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
```

**Step 2: Commit prompt template**

```bash
git add prompts/experiment-library.md
git commit -m "feat: add generation prompt template"
```

---

### Task 14: Server Action for Generation

**Files:**
- Create: `src/app/actions/experiments.ts`

**Step 1: Create server actions**

Create `src/app/actions/experiments.ts`:

```ts
"use server";

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import {
  addExperiment,
  updateExperiment,
  deleteExperiment as deleteExperimentFromManifest,
  loadManifest,
  type ExperimentMetadata,
} from "@/lib/experiments";

/**
 * Generate experiment via Claude Code CLI
 */
export async function generateExperiment(theme: string) {
  try {
    // Read prompt template
    const promptPath = path.join(process.cwd(), "prompts/experiment-library.md");
    const promptTemplate = await fs.readFile(promptPath, "utf-8");
    const prompt = promptTemplate.replace("{{THEME}}", theme);

    // Generate unique ID
    const id = `exp-${Date.now()}`;
    const componentPath = path.join(
      process.cwd(),
      "src/components/experiments",
      `${id}.tsx`
    );

    // Call Claude Code CLI
    return new Promise<{ success: boolean; id?: string; error?: string }>(
      (resolve) => {
        const claude = spawn("claude", ["code", "--prompt", prompt], {
          cwd: process.cwd(),
        });

        let output = "";
        let errorOutput = "";

        claude.stdout.on("data", (data) => {
          output += data.toString();
        });

        claude.stderr.on("data", (data) => {
          errorOutput += data.toString();
        });

        claude.on("close", async (code) => {
          if (code !== 0) {
            resolve({
              success: false,
              error: errorOutput || "Claude Code failed",
            });
            return;
          }

          try {
            // Parse frontmatter from generated code
            const metadata = parseFrontmatter(output);

            // Save component file
            await fs.writeFile(componentPath, output, "utf-8");

            // Add to manifest
            await addExperiment({
              id,
              ...metadata,
              filePath: `src/components/experiments/${id}.tsx`,
              approved: false,
              featured: false,
              generatedAt: new Date().toISOString(),
            });

            resolve({ success: true, id });
          } catch (error) {
            resolve({
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            });
          }
        });
      }
    );
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Approve experiment
 */
export async function approveExperiment(id: string) {
  try {
    await updateExperiment(id, { approved: true });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete experiment
 */
export async function deleteExperiment(id: string) {
  try {
    const manifest = await loadManifest();
    const experiment = manifest.experiments.find((exp) => exp.id === id);

    if (!experiment) {
      throw new Error("Experiment not found");
    }

    // Delete file
    const filePath = path.join(process.cwd(), experiment.filePath);
    await fs.unlink(filePath);

    // Remove from manifest
    await deleteExperimentFromManifest(id);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get all experiments (for admin)
 */
export async function getAllExperiments() {
  try {
    const manifest = await loadManifest();
    return { success: true, experiments: manifest.experiments };
  } catch (error) {
    return {
      success: false,
      experiments: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Parse frontmatter from generated component
 */
function parseFrontmatter(code: string): Partial<ExperimentMetadata> {
  const frontmatterRegex = /\/\*\*\s*\n([\s\S]*?)\n\s*\*\//;
  const match = code.match(frontmatterRegex);

  if (!match) {
    throw new Error("No frontmatter found in generated code");
  }

  const frontmatter = match[1];
  const lines = frontmatter.split("\n");

  const metadata: Partial<ExperimentMetadata> = {
    mechanics: [],
    dependencies: [],
  };

  for (const line of lines) {
    const titleMatch = line.match(/@title\s+(.+)/);
    const descMatch = line.match(/@description\s+(.+)/);
    const mechanicsMatch = line.match(/@mechanics\s+(.+)/);
    const depsMatch = line.match(/@dependencies\s+(.+)/);

    if (titleMatch) metadata.title = titleMatch[1].trim();
    if (descMatch) metadata.description = descMatch[1].trim();
    if (mechanicsMatch)
      metadata.mechanics = mechanicsMatch[1]
        .split(",")
        .map((m) => m.trim());
    if (depsMatch)
      metadata.dependencies = depsMatch[1]
        .split(",")
        .map((d) => d.trim());
  }

  if (!metadata.title || !metadata.description) {
    throw new Error("Missing required frontmatter fields");
  }

  return metadata;
}
```

**Step 2: Commit server actions**

```bash
git add src/app/actions/experiments.ts
git commit -m "feat: add server actions for experiment generation"
```

---

### Task 15: Connect Admin UI to Actions

**Files:**
- Modify: `src/app/admin/page.tsx`

**Step 1: Update admin page with generation logic**

Update `src/app/admin/page.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import {
  generateExperiment,
  approveExperiment,
  deleteExperiment,
  getAllExperiments,
} from "@/app/actions/experiments";
import { type ExperimentMetadata } from "@/lib/experiments";
import { Loader2, CheckCircle2, X, Trash2 } from "lucide-react";

export default function AdminPage() {
  const [generating, setGenerating] = useState(false);
  const [experiments, setExperiments] = useState<ExperimentMetadata[]>([]);
  const [theme, setTheme] = useState("Random");
  const [error, setError] = useState<string | null>(null);

  // Load experiments
  useEffect(() => {
    loadExperiments();
  }, []);

  async function loadExperiments() {
    const result = await getAllExperiments();
    if (result.success) {
      setExperiments(result.experiments);
    }
  }

  async function handleGenerate() {
    setGenerating(true);
    setError(null);

    const result = await generateExperiment(theme);

    if (result.success) {
      await loadExperiments();
    } else {
      setError(result.error || "Generation failed");
    }

    setGenerating(false);
  }

  async function handleApprove(id: string) {
    const result = await approveExperiment(id);
    if (result.success) {
      await loadExperiments();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this experiment?")) return;

    const result = await deleteExperiment(id);
    if (result.success) {
      await loadExperiments();
    }
  }

  const pendingExperiments = experiments.filter((exp) => !exp.approved);
  const approvedExperiments = experiments.filter((exp) => exp.approved);

  return (
    <div className="space-y-8">
      {/* Generate Section */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Generate Experiment
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <option>Random</option>
              <option>Magnetic Interactions</option>
              <option>Spring Physics</option>
              <option>Particle Effects</option>
              <option>Liquid Motion</option>
              <option>Elastic Animations</option>
            </select>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {generating && <Loader2 className="h-4 w-4 animate-spin" />}
            {generating ? "Generating..." : "Generate Experiment"}
          </button>
        </div>
      </section>

      {/* Review Queue */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Review Queue ({pendingExperiments.length})
        </h2>
        {pendingExperiments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No experiments pending review
          </p>
        ) : (
          <div className="space-y-4">
            {pendingExperiments.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.mechanics.map((mechanic) => (
                        <span
                          key={mechanic}
                          className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {mechanic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(exp.id)}
                      className="rounded-lg bg-accent p-2 text-accent-foreground hover:bg-accent/90"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Approved Library */}
      <section className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Approved Library ({approvedExperiments.length})
        </h2>
        {approvedExperiments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No approved experiments yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedExperiments.map((exp) => (
              <div
                key={exp.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{exp.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exp.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="rounded-lg bg-muted p-2 text-muted-foreground hover:bg-red-500 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
```

**Step 2: Test generation flow**

```bash
pnpm dev
# Visit http://localhost:3000/admin
# Click "Generate Experiment"
```

Expected: Button shows loading state (generation will fail without Claude Code CLI setup)

**Step 3: Commit admin UI updates**

```bash
git add src/app/admin/page.tsx
git commit -m "feat: connect admin UI to generation actions"
```

---

## Phase 7: Polish & Testing

### Task 16: Add Scripts to package.json

**Files:**
- Modify: `package.json`

**Step 1: Add helpful scripts**

Update scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev --turbopack --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "biome check src --write",
    "format": "biome format src --write",
    "typecheck": "tsc --noEmit"
  }
}
```

**Step 2: Test scripts**

```bash
pnpm typecheck
pnpm lint
```

Expected: No errors

**Step 3: Commit scripts**

```bash
git add package.json
git commit -m "chore: add development scripts"
```

---

### Task 17: Create README

**Files:**
- Create: `README.md`

**Step 1: Write project README**

Create `README.md`:

```markdown
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
```

**Step 2: Commit README**

```bash
git add README.md
git commit -m "docs: add project README"
```

---

### Task 18: Create Example Experiment

**Files:**
- Create: `src/components/experiments/example-button.tsx`
- Modify: `data/experiments-manifest.json`

**Step 1: Create example experiment**

Create `src/components/experiments/example-button.tsx`:

```tsx
/**
 * @title Magnetic Button
 * @description Button that follows cursor within magnetic field, snapping back on mouse leave
 * @mechanics magnetic, spring
 * @dependencies motion, @/lib/motion
 * @approved true
 * @generated 2026-01-08
 */

'use client';

import { motion, useMotionValue, useSpring } from 'motion/react';
import { springs } from '@/lib/motion';
import { useEffect, useRef } from 'react';

export default function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springs.magnetic);
  const springY = useSpring(y, springs.magnetic);

  useEffect(() => {
    const button = ref.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      const maxDistance = 80;

      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        x.set(distanceX * strength * 0.5);
        y.set(distanceY * strength * 0.5);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    button.addEventListener('mousemove', handleMouseMove as any);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove as any);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      className="relative rounded-lg bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
    >
      Hover Me
    </motion.button>
  );
}

export const metadata = {
  title: "Magnetic Button",
  description: "Button that follows cursor within magnetic field, snapping back on mouse leave",
  dependencies: ["motion", "@/lib/motion"],
  installInstructions: "pnpm add motion",
};
```

**Step 2: Add to manifest**

Update `data/experiments-manifest.json`:

```json
{
  "experiments": [
    {
      "id": "example-button",
      "title": "Magnetic Button",
      "description": "Button that follows cursor within magnetic field, snapping back on mouse leave",
      "mechanics": ["magnetic", "spring"],
      "dependencies": ["motion", "@/lib/motion"],
      "filePath": "src/components/experiments/example-button.tsx",
      "approved": true,
      "featured": false,
      "generatedAt": "2026-01-08T00:00:00Z"
    }
  ],
  "stats": {
    "total": 1,
    "approved": 1,
    "byMechanic": {
      "magnetic": 1,
      "spring": 1
    }
  }
}
```

**Step 3: Test example shows on homepage**

```bash
pnpm dev
# Visit http://localhost:3000
```

Expected: Grid shows example button experiment

**Step 4: Commit example**

```bash
git add src/components/experiments/example-button.tsx data/experiments-manifest.json
git commit -m "feat: add example magnetic button experiment"
```

---

## Implementation Complete!

The base implementation is now complete. Next steps:

### Optional Enhancements

1. **Dynamic Imports** - Load experiment components dynamically in cards/drawer
2. **Theme Customizer** - Build color/easing editor panel
3. **Code Viewer** - Integrate Shiki for syntax highlighting
4. **Error Boundaries** - Add proper error handling for component failures
5. **Reduced Motion** - Implement reduced motion detection
6. **More Examples** - Generate variety of experiments via Claude Code

### Testing Checklist

- [ ] Homepage loads with example experiment
- [ ] Clicking experiment opens drawer
- [ ] Admin panel accessible in dev mode
- [ ] Generate button shows loading state
- [ ] Approve/delete actions work
- [ ] API endpoint returns experiments
- [ ] Responsive on mobile/tablet
- [ ] TypeScript compiles without errors

### Deployment

```bash
pnpm build
pnpm start
```

Note: Admin panel won't be accessible in production (NODE_ENV check).
