"use client";

import { Grid } from "@patternmode/ui";
import { VStack } from "@patternmode/ui";
import { Subheading } from "@patternmode/ui";
import { Text } from "@patternmode/ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuItemLink,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@patternmode/ui";

export function NavigationMenuExample() {
  return (
    <NavigationMenu className="min-w-max rounded-lg bg-zinc-50 p-1 text-zinc-900">
      <NavigationMenuList className="relative flex">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Overview</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[400px]">
            <Grid
              columns={2}
              gap={3}
              minHeight="none"
            >
              <NavigationMenuLink href="#quick-start">
                <VStack gap={1}>
                  <Subheading>Quick Start</Subheading>
                  <Text>Install and assemble your first component.</Text>
                </VStack>
              </NavigationMenuLink>
              <NavigationMenuLink href="#accessibility">
                <VStack gap={1}>
                  <Subheading>Accessibility</Subheading>
                  <Text>Learn how we build accessible components.</Text>
                </VStack>
              </NavigationMenuLink>
              <NavigationMenuLink href="#releases">
                <VStack gap={1}>
                  <Subheading>Releases</Subheading>
                  <Text>See what&apos;s new in the latest versions.</Text>
                </VStack>
              </NavigationMenuLink>
              <NavigationMenuLink href="#about">
                <VStack gap={1}>
                  <Subheading>About</Subheading>
                  <Text>Learn more about Base UI and our mission.</Text>
                </VStack>
              </NavigationMenuLink>
            </Grid>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Handbook</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[300px]">
            <VStack gap={3}>
              <NavigationMenuLink href="#styling">
                <VStack gap={1}>
                  <Subheading>Styling</Subheading>
                  <Text>
                    Style components with CSS, Tailwind, or CSS-in-JS.
                  </Text>
                </VStack>
              </NavigationMenuLink>
              <NavigationMenuLink href="#animation">
                <VStack gap={1}>
                  <Subheading>Animation</Subheading>
                  <Text>
                    Animate with CSS transitions or JavaScript libraries.
                  </Text>
                </VStack>
              </NavigationMenuLink>
              <NavigationMenuLink href="#composition">
                <VStack gap={1}>
                  <Subheading>Composition</Subheading>
                  <Text>Compose components with your existing ones.</Text>
                </VStack>
              </NavigationMenuLink>
            </VStack>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuItemLink href="https://github.com/mui/base-ui">
            GitHub
          </NavigationMenuItemLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuViewport />
    </NavigationMenu>
  );
}
