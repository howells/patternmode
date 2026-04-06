import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";
import { Input } from "@patternmode/ui/components/input";
import { Textarea } from "@patternmode/ui/components/textarea";

const operatingPrinciples = [
  "Single upstream for active projects",
  "Strong defaults, small theme adjustments",
  "Primitives first, no compositions at launch",
  "Eject locally only when the boundary is genuinely product-owned",
];

const primitives = [
  {
    name: "Button",
    summary:
      "Primary, secondary, ghost, and accent actions with one motion language.",
  },
  {
    name: "Badge",
    summary: "Compact semantic metadata with restrained emphasis.",
  },
  {
    name: "Input + Textarea",
    summary: "Shared field density, focus behavior, and placeholder treatment.",
  },
  {
    name: "Card",
    summary: "Neutral surfaces for dashboards, docs, and review states.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-10 md:px-10 lg:py-14">
      <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="overflow-hidden">
          <CardHeader className="gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent">Patternmode canonical upstream</Badge>
              <Badge variant="outline">First credible release slice</Badge>
            </div>
            <div className="space-y-5">
              <p className="text-label text-muted-foreground uppercase">
                House style
              </p>
              <h1 className="max-w-4xl text-balance font-display text-title-lg">
                Gorgeous UI infrastructure with one family resemblance and clear
                local escape hatches.
              </h1>
              <p className="max-w-3xl text-body-lg text-muted-foreground">
                `patternmode` is the upstream source of truth for shared
                primitives, tokens, and review surfaces across active projects.
                The system stays neutral, product-oriented, and tightly typed,
                while downstream apps make only small tonal adjustments through
                tokens, variants, and wrappers.
              </p>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Open Storybook</Button>
            <Button variant="secondary">Review tokens</Button>
            <Button variant="accent">Start a new primitive</Button>
            <Button variant="ghost">Document local wrappers</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-label text-muted-foreground uppercase">
              Operating rules
            </p>
            <CardTitle>Upstream first, forks last</CardTitle>
            <CardDescription>
              The library stays cohesive by making customization explicit.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {operatingPrinciples.map((principle) => (
              <div
                className="rounded-[calc(var(--radius-lg)-4px)] bg-secondary px-4 py-3 text-body text-secondary-foreground"
                key={principle}
              >
                {principle}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {primitives.map((primitive, index) => (
          <Card key={primitive.name}>
            <CardHeader>
              <Badge variant={index % 2 === 0 ? "neutral" : "accent"}>
                Primitive
              </Badge>
              <CardTitle>{primitive.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-body text-muted-foreground">
                {primitive.summary}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <Badge variant="success">Theme control</Badge>
            <CardTitle>Minor variation, same family</CardTitle>
            <CardDescription>
              Projects should alter tone through tokens and wrappers, not by
              cloning primitives.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label
                className="text-label text-muted-foreground uppercase"
                htmlFor="theme-name"
              >
                Theme preset
              </label>
              <Input defaultValue="Patternmode Default" id="theme-name" />
            </div>
            <div className="grid gap-2">
              <label
                className="text-label text-muted-foreground uppercase"
                htmlFor="theme-notes"
              >
                Variation notes
              </label>
              <Textarea
                defaultValue="Accent can shift slightly brighter, but radius, density, and the core neutral backbone stay recognizably Patternmode."
                id="theme-notes"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save preset</Button>
            <Button variant="secondary">Preview in Storybook</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-label text-muted-foreground uppercase">
              System posture
            </p>
            <CardTitle>Deliberate defaults, explicit boundaries</CardTitle>
            <CardDescription>
              Shared components should feel ready to ship on day one, while
              still pushing product-specific concerns back into the app.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[calc(var(--radius-lg)-4px)] border border-border/70 bg-panel-muted px-4 py-4">
              <p className="text-label text-muted-foreground uppercase">
                Shared upstream
              </p>
              <ul className="mt-3 grid gap-2 text-body text-foreground/85">
                <li>Buttons, fields, and surfaces</li>
                <li>Semantic tokens and motion defaults</li>
                <li>Storybook-backed review coverage</li>
              </ul>
            </div>
            <div className="rounded-[calc(var(--radius-lg)-4px)] border border-border/70 bg-panel-muted px-4 py-4">
              <p className="text-label text-muted-foreground uppercase">
                App-local ownership
              </p>
              <ul className="mt-3 grid gap-2 text-body text-foreground/85">
                <li>Workflow-heavy compositions</li>
                <li>Product data and domain behavior</li>
                <li>Visual directions that break house style</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
