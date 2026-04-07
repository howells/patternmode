import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@patternmode/ui/components/alert";
import { Badge } from "@patternmode/ui/components/badge";
import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";
import { Container } from "@patternmode/ui/components/container";
import { Flex } from "@patternmode/ui/components/flex";
import { Heading } from "@patternmode/ui/components/heading";
import { Input } from "@patternmode/ui/components/input";
import { Separator } from "@patternmode/ui/components/separator";
import { Slider } from "@patternmode/ui/components/slider";
import { Stack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
import Link from "next/link";

import { ThemeCustomizer } from "@/components/theme-customizer";

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

function ComponentBoxesIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 text-accent"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
      <path d="m7 16.5-4.74-2.85" />
      <path d="m7 16.5 5-3" />
      <path d="M7 16.5v5.17" />
      <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10l-5 3.5Z" />
      <path d="m17 16.5-5-3" />
      <path d="m17 16.5 4.74-2.85" />
      <path d="M17 16.5v5.17" />
      <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
      <path d="M12 8 7.26 5.15" />
      <path d="m12 8 4.74-2.85" />
      <path d="M12 13.5V8" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 text-accent"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5 text-accent"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Showcase cards — each renders a live patternmode component                */
/* -------------------------------------------------------------------------- */

function ShowcaseButton() {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-elevation-card-hover)]">
      <CardContent className="space-y-3 pb-4 pt-6">
        <Flex gap="xs" wrap="wrap">
          <Button size="sm">Default</Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="default">
            Accent
          </Button>
          <Button size="sm" variant="ghost">
            Ghost
          </Button>
        </Flex>
      </CardContent>
      <div className="px-6 pb-5">
        <Text variant="muted" size="sm" weight="medium">
          Button
        </Text>
      </div>
    </Card>
  );
}

function ShowcaseBadge() {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-elevation-card-hover)]">
      <CardContent className="space-y-3 pb-4 pt-6">
        <Flex gap="xs" wrap="wrap" align="center">
          <Badge>Neutral</Badge>
          <Badge variant="default">Accent</Badge>
          <Badge variant="affirmative">Success</Badge>
          <Badge variant="outline">Outline</Badge>
        </Flex>
      </CardContent>
      <div className="px-6 pb-5">
        <Text variant="muted" size="sm" weight="medium">
          Badge
        </Text>
      </div>
    </Card>
  );
}

function ShowcaseInput() {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-elevation-card-hover)]">
      <CardContent className="space-y-3 pb-4 pt-6">
        <Input placeholder="Enter your email..." />
      </CardContent>
      <div className="px-6 pb-5">
        <Text variant="muted" size="sm" weight="medium">
          Input
        </Text>
      </div>
    </Card>
  );
}

function ShowcaseCard() {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-elevation-card-hover)]">
      <CardContent className="pb-4 pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Nested Card</CardTitle>
            <CardDescription>Cards compose with any content.</CardDescription>
          </CardHeader>
        </Card>
      </CardContent>
      <div className="px-6 pb-5">
        <Text variant="muted" size="sm" weight="medium">
          Card
        </Text>
      </div>
    </Card>
  );
}

function ShowcaseSlider() {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-elevation-card-hover)]">
      <CardContent className="space-y-3 pb-4 pt-6">
        <Slider defaultValue={[64]} max={100} min={0} />
      </CardContent>
      <div className="px-6 pb-5">
        <Text variant="muted" size="sm" weight="medium">
          Slider
        </Text>
      </div>
    </Card>
  );
}

function ShowcaseAlert() {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-[var(--shadow-elevation-card-hover)]">
      <CardContent className="space-y-3 pb-4 pt-6">
        <Alert variant="default">
          <AlertTitle>Heads up</AlertTitle>
          <AlertDescription>Components ship with variants.</AlertDescription>
        </Alert>
      </CardContent>
      <div className="px-6 pb-5">
        <Text variant="muted" size="sm" weight="medium">
          Alert
        </Text>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/*  Hero                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="pb-6 pt-20 md:pt-28">
        <Container size="3xl">
          <Stack align="center" gap="lg">
            <Badge variant="default">Open Source</Badge>

            <h1 className="max-w-3xl text-center font-display text-[clamp(2.4rem,5vw,3.6rem)] font-normal leading-[1.1] tracking-[var(--tracking-display)] text-foreground">
              Build Linear-quality interfaces
            </h1>

            <Text
              variant="muted"
              size="base"
              className="max-w-[52ch] text-center"
            >
              A design system ecosystem: canonical components, interaction
              patterns, and curated tooling for refined UI engineering.
            </Text>

            <Flex gap="sm" className="mt-2" wrap="wrap" justify="center">
              <Button asChild variant="default" size="lg">
                <Link href="/docs">
                  Get Started
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a
                  href="https://github.com/patternmode/patternmode"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  GitHub
                  <ExternalLinkIcon />
                </a>
              </Button>
            </Flex>
          </Stack>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/*  Theme Customizer + Component Showcase                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="pt-12 pb-20">
        <ThemeCustomizer>
          <Container size="3xl" className="pt-12">
            <Stack align="center" gap="sm" className="mb-10">
              <Text
                variant="muted"
                weight="medium"
                size="sm"
                className="uppercase tracking-widest text-[0.7rem]"
              >
                Live Preview
              </Text>
              <Heading level="2" size="base" className="text-center">
                Every component, production-ready
              </Heading>
              <Text
                variant="muted"
                size="sm"
                className="max-w-[48ch] text-center"
              >
                Adjust the sliders above. The showcase below updates in real
                time -- these are the actual library components.
              </Text>
            </Stack>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ShowcaseButton />
              <ShowcaseBadge />
              <ShowcaseInput />
              <ShowcaseCard />
              <ShowcaseSlider />
              <ShowcaseAlert />
            </div>
          </Container>
        </ThemeCustomizer>
      </section>

      <Separator />

      {/* ------------------------------------------------------------------ */}
      {/*  Features                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-20">
        <Container size="3xl">
          <Stack align="center" gap="sm" className="mb-12">
            <Heading level="2" size="base" className="text-center">
              Designed for serious UI work
            </Heading>
            <Text
              variant="muted"
              size="sm"
              className="max-w-[48ch] text-center"
            >
              Not another component library. An opinionated ecosystem for teams
              that care about craft.
            </Text>
          </Stack>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-1">
                  <ComponentBoxesIcon />
                </div>
                <CardTitle>54 Components</CardTitle>
                <CardDescription>
                  From primitives like Button and Input to complex patterns like
                  Command and Combobox. Each one hand-tuned for density, motion,
                  and accessibility.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-1">
                  <LayersIcon />
                </div>
                <CardTitle>Composition Packages</CardTitle>
                <CardDescription>
                  Separate motion, transition, and tailwind-config packages.
                  Adopt the pieces you need. Override the rest. No lock-in.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-1">
                  <GlobeIcon />
                </div>
                <CardTitle>Curated Ecosystem</CardTitle>
                <CardDescription>
                  Radix primitives, oklch color system, responsive props, CVA
                  variants. The best tools, wired together with strong opinions.
                </CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
