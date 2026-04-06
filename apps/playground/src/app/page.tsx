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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@patternmode/ui/components/dialog";
import { Input } from "@patternmode/ui/components/input";
import { Label } from "@patternmode/ui/components/label";
import { Separator } from "@patternmode/ui/components/separator";
import { Switch } from "@patternmode/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui/components/tabs";
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
              <Label htmlFor="theme-name">Theme preset</Label>
              <Input defaultValue="Patternmode Default" id="theme-name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="theme-notes">Variation notes</Label>
              <Textarea
                defaultValue="Accent can shift slightly brighter, but radius, density, and the core neutral backbone stay recognizably Patternmode."
                id="theme-notes"
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4 rounded-[calc(var(--radius-lg)-4px)] bg-secondary/70 px-4 py-3">
              <div className="space-y-1">
                <Label className="text-foreground" htmlFor="accent-toggle">
                  Enable accent treatment
                </Label>
                <p className="text-body text-muted-foreground">
                  Token shifts should change tone without changing component
                  markup.
                </p>
              </div>
              <Switch defaultChecked id="accent-toggle" />
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
          <CardContent>
            <Tabs className="w-full" defaultValue="upstream">
              <TabsList>
                <TabsTrigger value="upstream">Shared upstream</TabsTrigger>
                <TabsTrigger value="local">App-local ownership</TabsTrigger>
                <TabsTrigger value="review">Review loop</TabsTrigger>
              </TabsList>
              <TabsContent
                className="grid gap-2 text-body text-foreground/85"
                value="upstream"
              >
                <p>
                  Buttons, fields, surfaces, overlays, and navigation
                  primitives.
                </p>
                <p>
                  Semantic tokens, motion defaults, and shared utility layers.
                </p>
                <p>
                  Storybook-backed review coverage from the UI package itself.
                </p>
              </TabsContent>
              <TabsContent
                className="grid gap-2 text-body text-foreground/85"
                value="local"
              >
                <p>Workflow-heavy compositions and product data bindings.</p>
                <p>Wrappers that encode domain ownership or business logic.</p>
                <p>Visual directions that no longer fit the house style.</p>
              </TabsContent>
              <TabsContent
                className="grid gap-4 text-body text-foreground/85"
                value="review"
              >
                <p>
                  Patternmode now follows the Materia direction more closely:
                  package-owned stories, broader primitive coverage, and
                  explicit support layers inside `packages/ui`.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="accent">Open review checkpoint</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Promote the next primitive?</DialogTitle>
                      <DialogDescription>
                        Only shared behaviors with a clean API and stable visual
                        language should move upstream.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Hold locally</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button>Promote upstream</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
