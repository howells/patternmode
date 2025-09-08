"use client";

import { Card, CardContent, CardFooter, CardHeader, CardHeading } from "@patternmode/card";
import { Button } from "@patternmode/button";
import {
  COMPONENT_CATEGORIES,
  type ComponentCategory,
} from "@patternmode/constants/component-categories";
import { Grid, GridCell } from "@patternmode/grid";
import { Heading } from "@patternmode/heading";
import { VStack } from "@patternmode/stack";
import React from "react";
import { COMPONENT_REGISTRY, PREVIEW_REGISTRY } from "@/registry/components";
import {
  ResponsiveDrawer,
  ResponsiveDrawerContent,
  ResponsiveDrawerHeader,
  ResponsiveDrawerTitle,
  ResponsiveDrawerTrigger,
} from "@patternmode/responsive-drawer";

// Build a complete list of all components with previews from the registry
// Exclude components that don't make sense in the grid (e.g., the layout's own sidebar)
const components = Object.entries(PREVIEW_REGISTRY)
  .filter(([id]) => id !== "sidebar")
  .map(([id, Component]) => {
    const cfg = COMPONENT_REGISTRY[id as keyof typeof COMPONENT_REGISTRY];
    return {
      id,
      name: cfg?.name ?? id,
      category: cfg?.category as ComponentCategory | undefined,
      Component,
    };
  })
  .filter((c) => !!c.category)
  // Sort alphabetically by display name for stable ordering within categories
  .sort((a, b) => a.name.localeCompare(b.name));

class Boundary extends React.Component<
  { name: string; children: React.ReactNode },
  { error?: Error }
> {
  state: { error?: Error } = {};
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="text-red-600 text-sm">Failed: {this.props.name}</div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

const Examples = () => {
  return (
    <div className="space-y-10">
      {COMPONENT_CATEGORIES.map((category) => {
        const items = components.filter((c) => c.category === category.key);
        if (items.length === 0) return null;
        return (
          <VStack gap={6} key={category.key}>
            <Heading level={2}>{category.label}</Heading>
            <Grid columns={{ sm: 2, md: 3, "2xl": 4 }} gap={6}>
              {items.map(({ name, Component, id }) => (
                <GridCell key={`${category.key}-${id}`}>
                  <Card fillHeight>
                    <CardHeader>
                      <CardHeading>{name}</CardHeading>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                      <Boundary name={name}>
                        {typeof Component === "string" ? (
                          React.createElement(Component, { key: id })
                        ) : (
                          <Component key={id} />
                        )}
                      </Boundary>
                  </CardContent>
                  <CardFooter className="justify-end" border>
                    <ResponsiveDrawer>
                      <ResponsiveDrawerTrigger
                        render={
                          <Button size="sm" variant="outline" type="button">
                            View Details
                          </Button>
                        }
                      />
                      <ResponsiveDrawerContent>
                        <ResponsiveDrawerHeader>
                          <ResponsiveDrawerTitle>{name}</ResponsiveDrawerTitle>
                        </ResponsiveDrawerHeader>
                        <div className="p-4">
                          <Boundary name={`${name}-drawer`}>
                            {typeof Component === "string" ? (
                              React.createElement(Component, { key: id })
                            ) : (
                              <Component key={`${id}-drawer`} />
                            )}
                          </Boundary>
                        </div>
                      </ResponsiveDrawerContent>
                    </ResponsiveDrawer>
                  </CardFooter>
                </Card>
              </GridCell>
            ))}
            </Grid>
          </VStack>
        );
      })}
    </div>
  );
};

export { Examples };
