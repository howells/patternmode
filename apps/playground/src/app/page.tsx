"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@patternmode/ui/components/accordion";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@patternmode/ui/components/alert";
import { Avatar, AvatarFallback } from "@patternmode/ui/components/avatar";
import { Badge } from "@patternmode/ui/components/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@patternmode/ui/components/breadcrumb";
import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";
import { Checkbox } from "@patternmode/ui/components/checkbox";
import { CheckboxField } from "@patternmode/ui/components/checkbox-field";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@patternmode/ui/components/command";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@patternmode/ui/components/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@patternmode/ui/components/hover-card";
import { Input } from "@patternmode/ui/components/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@patternmode/ui/components/input-group";
import { Label } from "@patternmode/ui/components/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@patternmode/ui/components/native-select";
import { Pagination } from "@patternmode/ui/components/pagination";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@patternmode/ui/components/popover";
import { Progress, ProgressCircle } from "@patternmode/ui/components/progress";
import {
  RadioGroup,
  RadioGroupItem,
} from "@patternmode/ui/components/radio-group";
import { ScrollArea } from "@patternmode/ui/components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@patternmode/ui/components/select";
import { Separator } from "@patternmode/ui/components/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@patternmode/ui/components/sheet";
import { Skeleton } from "@patternmode/ui/components/skeleton";
import { Switch } from "@patternmode/ui/components/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@patternmode/ui/components/tabs";
import { Textarea } from "@patternmode/ui/components/textarea";
import { Toggle } from "@patternmode/ui/components/toggle";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@patternmode/ui/components/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@patternmode/ui/components/tooltip";

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
  {
    name: "Avatar + Selection",
    summary:
      "Identity, choice, and option primitives with the same density rules.",
  },
  {
    name: "Select + Menus",
    summary:
      "Compound navigation controls built with package-owned review surfaces.",
  },
  {
    name: "Disclosure + Overlays",
    summary:
      "Accordions, alerts, popovers, and toggles with the same neutral backbone.",
  },
  {
    name: "Utility + Forms",
    summary:
      "Scroll, loading, progress, native selects, and grouped field composition.",
  },
  {
    name: "Navigation + Workspace",
    summary:
      "Breadcrumbs, pagination, command search, and sheets for broader product shells.",
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

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <Badge variant="accent">Core breadth</Badge>
            <CardTitle>Identity and choice primitives</CardTitle>
            <CardDescription>
              Materia’s structure only matters if the library also carries a
              credible baseline surface.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <AvatarFallback>PM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarFallback>DX</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="font-medium text-body text-foreground">
                  Shared identity stays quiet
                </p>
                <p className="text-body text-muted-foreground">
                  Fallbacks, radii, and density follow the same house style.
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-[calc(var(--radius-lg)-4px)] bg-secondary/55 p-4">
              <label
                className="flex items-start gap-3"
                htmlFor="playground-checkbox"
              >
                <Checkbox defaultChecked id="playground-checkbox" />
                <div className="grid gap-1">
                  <Label
                    className="text-foreground"
                    htmlFor="playground-checkbox"
                  >
                    Package-owned stories are required
                  </Label>
                  <p className="text-body text-muted-foreground">
                    Review surfaces belong with the component source, not only
                    in the app shell.
                  </p>
                </div>
              </label>

              <RadioGroup defaultValue="upstream">
                <RadioGroupItem
                  description="Stable controls with broad reuse potential."
                  value="upstream"
                >
                  Promote upstream
                </RadioGroupItem>
                <RadioGroupItem
                  description="Workflow-specific logic should stay in the app."
                  value="local"
                >
                  Keep app-local
                </RadioGroupItem>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-label text-muted-foreground uppercase">
              Compound controls
            </p>
            <CardTitle>Menus, selects, and hints share the same tone</CardTitle>
            <CardDescription>
              Heavier primitives should still inherit the same surface language:
              panel backgrounds, quiet borders, and tight focus treatment.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="playground-select">Preset</Label>
              <Select defaultValue="default">
                <SelectTrigger id="playground-select">
                  <SelectValue placeholder="Choose a preset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectLabel>House presets</SelectLabel>
                  <SelectItem value="default">Patternmode Default</SelectItem>
                  <SelectItem value="quiet">Quiet Editorial</SelectItem>
                  <SelectItem value="bright">Brighter Accent Lift</SelectItem>
                  <SelectSeparator />
                  <SelectLabel>Boundary</SelectLabel>
                  <SelectItem value="local">App-local wrapper</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap items-center gap-3 rounded-[calc(var(--radius-lg)-4px)] bg-secondary/55 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">Open review menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Patternmode</DropdownMenuLabel>
                  <DropdownMenuItem>Open package docs</DropdownMenuItem>
                  <DropdownMenuCheckboxItem checked>
                    Track package stories
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      Theme preset
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Default</DropdownMenuItem>
                      <DropdownMenuItem>Quiet Editorial</DropdownMenuItem>
                      <DropdownMenuItem>Accent Lift</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Why this batch?</Button>
                </TooltipTrigger>
                <TooltipContent>
                  Materia’s breadth starts with the control primitives teams use
                  every day, not only with hero components.
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card>
          <CardHeader>
            <Badge variant="accent">Next breadth</Badge>
            <CardTitle>Disclosure, overlays, and mode controls</CardTitle>
            <CardDescription>
              This batch rounds out the baseline control layer so the library
              can support richer product surfaces without falling back to
              app-local primitives too early.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex flex-wrap gap-3">
              <Toggle defaultPressed>Compact mode</Toggle>
              <Toggle>Review emphasis</Toggle>
              <ToggleGroup defaultValue="shared" type="single">
                <ToggleGroupItem value="shared">Shared</ToggleGroupItem>
                <ToggleGroupItem value="local">Local</ToggleGroupItem>
                <ToggleGroupItem value="review">Review</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <Alert variant="accent">
              <AlertTitle>Patternmode is tracking Materia’s breadth</AlertTitle>
              <AlertDescription>
                The package now supports a broader shared control set instead of
                stopping at a token demo and a few hero primitives.
              </AlertDescription>
            </Alert>

            <Accordion collapsible defaultValue="item-1" type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Why keep implementing breadth first?
                </AccordionTrigger>
                <AccordionContent>
                  Because a shared library only becomes genuinely useful once it
                  covers the baseline product interaction set.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What still stays app-local?</AccordionTrigger>
                <AccordionContent>
                  Domain workflows, data-heavy orchestration, and any visual
                  direction that no longer fits the house style.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-label text-muted-foreground uppercase">
              Context surfaces
            </p>
            <CardTitle>Short-form overlays should stay disciplined</CardTitle>
            <CardDescription>
              These components should provide context and lightweight actions,
              not become hidden replacement screens.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent className="grid gap-2">
                <p className="font-medium text-foreground">Review note</p>
                <p className="text-body text-muted-foreground">
                  Use popovers for compact editing and contextual review, not
                  for multi-step flows.
                </p>
                <PopoverArrow />
              </PopoverContent>
            </Popover>

            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  className="rounded-[calc(var(--radius-md)-2px)] bg-secondary/70 px-3 py-2 text-body text-foreground"
                  type="button"
                >
                  Hover reviewer
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="grid gap-2">
                <Badge variant="neutral">Reviewer</Badge>
                <p className="text-body text-muted-foreground">
                  Checks whether a component is broadly reusable enough to move
                  into the upstream package.
                </p>
              </HoverCardContent>
            </HoverCard>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Overlay rule</Button>
              </TooltipTrigger>
              <TooltipContent>
                If the interaction needs deep navigation or long-form editing,
                it probably wants a dialog or a full screen.
              </TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <Card>
          <CardHeader>
            <Badge variant="success">Utility surfaces</Badge>
            <CardTitle>
              Loading, progress, and overflow need shared defaults
            </CardTitle>
            <CardDescription>
              Utility primitives are not glamorous, but they are what make the
              library feel production-grade instead of ornamental.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-3">
              <div className="flex items-center justify-between text-body text-muted-foreground">
                <span>Library completion</span>
                <span>84%</span>
              </div>
              <Progress value={84} />
            </div>

            <div className="flex items-center gap-4">
              <ProgressCircle label="Coverage" value={84}>
                <span className="font-medium text-[0.82rem] text-foreground">
                  84%
                </span>
              </ProgressCircle>
              <div className="grid gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-16 w-52 rounded-[var(--radius-lg)]" />
              </div>
            </div>

            <div className="h-52">
              <ScrollArea className="h-full rounded-[calc(var(--radius-lg)-4px)] border border-border/80 bg-secondary/35 p-3">
                <div className="grid gap-2">
                  {[
                    "Finish utility surfaces",
                    "Refine form wrappers",
                    "Add more package stories",
                    "Push breadth toward Materia baseline",
                    "Review downstream usage",
                    "Add testing infrastructure",
                    "Polish motion and empty states",
                    "Document upgrade path",
                  ].map((item) => (
                    <div
                      className="rounded-[calc(var(--radius-md)-4px)] bg-white/80 px-3 py-2 text-body text-foreground shadow-2xs"
                      key={item}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-label text-muted-foreground uppercase">
              Form composition
            </p>
            <CardTitle>
              Grouped fields should still feel like one family
            </CardTitle>
            <CardDescription>
              Native form controls and composed input shells need the same
              spacing, focus, and tone as the rest of the library.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="native-density">Fallback selector</Label>
              <NativeSelect defaultValue="default" id="native-density">
                <NativeSelectOption value="default">
                  Patternmode Default
                </NativeSelectOption>
                <NativeSelectOption value="quiet">
                  Quiet Editorial
                </NativeSelectOption>
                <NativeSelectOption value="local">
                  App-local wrapper
                </NativeSelectOption>
              </NativeSelect>
            </div>

            <InputGroup>
              <InputGroupAddon>https://</InputGroupAddon>
              <InputGroupInput defaultValue="patternmode.design" />
              <InputGroupButton>Open</InputGroupButton>
            </InputGroup>

            <CheckboxField
              defaultChecked
              description="Required for package-level review confidence and regression visibility."
              label="Package-owned stories for every primitive"
            />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
        <Card>
          <CardHeader>
            <Badge variant="accent">Navigation shell</Badge>
            <CardTitle>Wayfinding should already be upstream</CardTitle>
            <CardDescription>
              Once the library moves beyond basic controls, product shells need
              navigation primitives that still share the same surface language.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Patternmode</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Navigation shell</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="rounded-[calc(var(--radius-lg)-4px)] bg-secondary/45 p-4">
              <Pagination
                onPageChange={() => undefined}
                page={7}
                totalPages={24}
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">Open side panel</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    Promote navigation primitives carefully
                  </SheetTitle>
                  <SheetDescription>
                    Shared shell components should stay broadly reusable while
                    leaving app-specific orchestration outside the package.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-3">
                  <div className="rounded-[calc(var(--radius-lg)-4px)] bg-secondary/55 px-4 py-3 text-body text-secondary-foreground">
                    Breadcrumbs anchor users in multi-layer product shells.
                  </div>
                  <div className="rounded-[calc(var(--radius-lg)-4px)] bg-secondary/55 px-4 py-3 text-body text-secondary-foreground">
                    Sheets extend context without forcing a full route change.
                  </div>
                </div>
                <SheetFooter>
                  <Button variant="ghost">Keep local</Button>
                  <Button variant="accent">Promote upstream</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <p className="text-label text-muted-foreground uppercase">
              Workspace affordances
            </p>
            <CardTitle>Search and movement need a library baseline</CardTitle>
            <CardDescription>
              Product teams should not rebuild command search and shell
              navigation from scratch once the primitive layer is stable.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <Command>
              <CommandInput placeholder="Search components, stories, and docs..." />
              <CommandList>
                <CommandEmpty>No result yet.</CommandEmpty>
                <CommandGroup heading="Components">
                  <CommandItem>
                    Breadcrumb
                    <CommandShortcut>Nav</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    Pagination
                    <CommandShortcut>Nav</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    Sheet
                    <CommandShortcut>Overlay</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Review">
                  <CommandItem>
                    Storybook surface
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    Playground audit
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
