import { Button } from "@patternmode/ui/components/button";

const principles = [
  "Single upstream for active projects",
  "Strong defaults, small theme adjustments",
  "Primitives first, no compositions at launch",
  "Eject locally only when the boundary is genuinely product-owned",
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-12 md:px-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-label text-muted-foreground uppercase">
            Patternmode upstream
          </p>
          <h1 className="max-w-3xl text-balance font-display text-title">
            Canonical UI with one house style and clear escape hatches.
          </h1>
          <p className="max-w-2xl text-body-lg text-muted-foreground">
            This playground proves the first slice of the monorepo shape. Shared
            primitives live in <code>@patternmode/ui</code>, tokens live in{" "}
            <code>@patternmode/tailwind-config</code>, and Storybook becomes the
            visual contract instead of another app-local copy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button>Open Storybook next</Button>
            <Button variant="secondary">Stress test the theme</Button>
            <Button variant="ghost">Document the next primitive</Button>
          </div>
        </div>
        <div className="rounded-[var(--radius-xl)] border border-border/80 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-label text-muted-foreground uppercase">
            Launch rules
          </p>
          <ul className="mt-4 grid gap-3 text-body text-foreground/85">
            {principles.map((principle) => (
              <li
                className="rounded-[var(--radius-sm)] bg-secondary px-3 py-3"
                key={principle}
              >
                {principle}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-[var(--radius-lg)] border border-border bg-white/90 p-6 shadow-xs">
          <p className="text-label text-muted-foreground uppercase">Tokens</p>
          <h2 className="mt-3 font-display text-title-sm">Own the look once</h2>
          <p className="mt-3 text-body text-muted-foreground">
            Radius, shadow, spacing, typography, and accent all come from the
            shared Tailwind package.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-border bg-white/90 p-6 shadow-xs">
          <p className="text-label text-muted-foreground uppercase">
            Primitives
          </p>
          <h2 className="mt-3 font-display text-title-sm">
            Shared pieces, typed narrowly
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            Start with buttons, inputs, surfaces, navigation, and feedback. No
            compositions until real cross-project pressure appears.
          </p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-border bg-white/90 p-6 shadow-xs">
          <p className="text-label text-muted-foreground uppercase">Eject</p>
          <h2 className="mt-3 font-display text-title-sm">
            Take over locally when necessary
          </h2>
          <p className="mt-3 text-body text-muted-foreground">
            If wrappers become a hidden fork or the product direction breaks the
            house style, local ownership is the explicit next step.
          </p>
        </div>
      </section>
    </main>
  );
}
