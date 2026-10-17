import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

import {
  DeckPanel,
  StackSheetPanel,
  SwatchPanel,
  TagsPanel,
} from "@/components/patternmode-showcase";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const buttonVariants = ["default", "secondary", "outline", "ghost", "destructive", "link"] as const;

/**
 * A titled section separated by a hairline rule with a small mono eyebrow —
 * the repeating rhythm the whole page hangs on.
 */
const Section = ({ children, eyebrow }: { children: ReactNode; eyebrow: string }) => (
  <section className="border-t border-border py-12">
    <p className="mb-8 text-xs font-normal leading-4 text-muted-foreground">{eyebrow}</p>
    {children}
  </section>
);

const Field = ({ children, label }: { children: ReactNode; label: string }) => (
  <label className="flex flex-col gap-2 text-[13px] font-normal leading-[18px]">
    {label}
    {children}
  </label>
);

const RoleSelect = () => (
  <Select defaultValue="editor">
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select a role" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="viewer">Viewer</SelectItem>
      <SelectItem value="editor">Editor</SelectItem>
      <SelectItem value="admin">Admin</SelectItem>
    </SelectContent>
  </Select>
);

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <span className="text-[13px] leading-[18px]">patternmode</span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <section className="flex flex-col items-start gap-4 py-16">
          <h1 className="text-sm font-normal leading-[1.5] tracking-normal">Patternmode preview</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Stock shadcn components and vendored patternmode components under{" "}
            <span className="text-foreground">@patternmode/theme</span>.
          </p>
          <code className="w-fit rounded-md border border-border bg-muted px-3 py-1.5 font-mono text-sm text-muted-foreground">
            npx shadcn add @patternmode/theme
          </code>
        </section>

        <Section eyebrow="controls">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Buttons</CardTitle>
                <CardDescription className="leading-[1.5]">
                  Every variant and size, one shared token set.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {buttonVariants.map((variant) => (
                    <Button
                      className="text-[13px] font-normal leading-[18px]"
                      key={variant}
                      variant={variant}
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button className="text-[13px] font-normal leading-[18px]" size="sm">
                    Small
                  </Button>
                  <Button className="text-[13px] font-normal leading-[18px]" size="default">
                    Default
                  </Button>
                  <Button className="text-[13px] font-normal leading-[18px]" size="lg">
                    Large
                  </Button>
                  <Button
                    className="text-[13px] font-normal leading-[18px]"
                    aria-label="Expand"
                    size="icon"
                    variant="outline"
                  >
                    <ChevronDown aria-hidden />
                  </Button>
                  <Button className="text-[13px] font-normal leading-[18px]" disabled>
                    Disabled
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">
                  Workspace settings
                </CardTitle>
                <CardDescription className="leading-[1.5]">
                  Inputs, select, switch, and checkbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Field label="Workspace name">
                  <Input defaultValue="Patternmode" name="workspace" />
                </Field>
                <Field label="Default role">
                  <RoleSelect />
                </Field>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Weekly digest</span>
                  <Switch defaultChecked />
                </div>
                <label
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                  htmlFor="notify-breaking-changes"
                >
                  <Checkbox defaultChecked id="notify-breaking-changes" /> Notify me about breaking
                  changes
                </label>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section eyebrow="surfaces">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Registry status</CardTitle>
                <CardDescription className="leading-[1.5]">
                  Resynced from the local registry on every build.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4">
                {[
                  { label: "Items", value: "14" },
                  { label: "Components", value: "10" },
                  { label: "Libs", value: "2" },
                ].map((stat) => (
                  <div className="flex flex-col gap-1" key={stat.label}>
                    <span className="text-xl font-normal leading-7">{stat.value}</span>
                    <span className="text-xs font-normal leading-4 text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Project</CardTitle>
                <CardDescription className="leading-[1.5]">Tabbed detail surface.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                  </TabsList>
                  <TabsContent className="pt-4 text-sm text-muted-foreground" value="overview">
                    A design system distributed as a shadcn registry, vendored into consumers.
                  </TabsContent>
                  <TabsContent className="pt-4 text-sm text-muted-foreground" value="activity">
                    Registry rebuilt and re-synced on the last preview build.
                  </TabsContent>
                  <TabsContent className="pt-4 text-sm text-muted-foreground" value="members">
                    Three maintainers with publish access to the registry.
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section eyebrow="overlays">
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="text-[13px] font-normal leading-[18px]">Invite team</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-sm font-normal leading-[1.5]">
                    Invite a teammate
                  </DialogTitle>
                  <DialogDescription>
                    Send an invitation to collaborate on this workspace.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-2">
                  <Field label="Email address">
                    <Input name="email" placeholder="teammate@example.com" type="email" />
                  </Field>
                  <Field label="Role">
                    <RoleSelect />
                  </Field>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="text-[13px] font-normal leading-[18px]" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button className="text-[13px] font-normal leading-[18px]">Send invite</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="text-[13px] font-normal leading-[18px]" variant="outline">
                  Account
                  <ChevronDown aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        <Section eyebrow="feedback">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Badges</CardTitle>
                <CardDescription className="leading-[1.5]">
                  Status tokens across variants.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>Stable</Badge>
                <Badge variant="secondary">Preview</Badge>
                <Badge variant="outline">Draft</Badge>
                <Badge variant="destructive">Deprecated</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Loading</CardTitle>
                <CardDescription className="leading-[1.5]">Skeleton placeholders.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        <Section eyebrow="patternmode">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Swatch</CardTitle>
                <CardDescription className="leading-[1.5]">
                  Finish picker and weighted distribution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SwatchPanel />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Deck</CardTitle>
                <CardDescription className="leading-[1.5]">
                  Cyclic card stack with drag and keyboard.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DeckPanel />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">Tags</CardTitle>
                <CardDescription className="leading-[1.5]">
                  Command-driven tag selector.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TagsPanel />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-normal leading-[1.5]">StackSheet</CardTitle>
                <CardDescription className="leading-[1.5]">
                  Typed, nestable sheet stack.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <StackSheetPanel />
              </CardFooter>
            </Card>
          </div>
        </Section>
      </main>
    </>
  );
}
