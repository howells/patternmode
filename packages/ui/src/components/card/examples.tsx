"use client";

import React from "react";
import { Button } from "../button/component";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./component";

// Default card
export const DefaultExample = () => (
  <Card>
    <CardContent>
      <p>This is a simple card with some content.</p>
    </CardContent>
  </Card>
);

// Card with full structure
export const FullStructureExample = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>This is a card description that provides additional context.</CardDescription>
      <CardAction>
        <Button variant="outline" size="sm">Action</Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <p>This is the main content of the card. It can contain any type of content including text, images, or other components.</p>
    </CardContent>
    <CardFooter>
      <Button>Primary Action</Button>
      <Button variant="outline">Cancel</Button>
    </CardFooter>
  </Card>
);

// Card with title
export const WithTitleExample = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
    </CardHeader>
    <CardContent>
      <p>This card includes a title and descriptive content below it.</p>
    </CardContent>
  </Card>
);

// Compact card
export const CompactExample = () => (
  <Card padding={4}>
    <p>This is a more compact card with less padding.</p>
  </Card>
);

// No padding card
export const NoPaddingExample = () => (
  <Card padding={0}>
    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
      <h3 className="font-semibold">Header</h3>
    </div>
    <div className="p-6">
      <p>Content with custom padding structure.</p>
    </div>
  </Card>
);

// Dashed variant (drop zone style)
export const DashedExample = () => (
  <Card variant="dashed">
    <CardContent className="text-center">
      <p className="text-zinc-500">Drop files here or click to upload</p>
    </CardContent>
  </Card>
);

// Custom styling
export const CustomStylingExample = () => (
  <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
    <CardContent>
      <p>This card has custom styling with a blue theme.</p>
    </CardContent>
  </Card>
);

// Nested cards
export const NestedExample = () => (
  <Card>
    <CardHeader>
      <CardTitle>Parent Card</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <Card className="bg-zinc-50 dark:bg-zinc-900">
          <CardContent className="p-4">
            <p className="text-sm">Nested card 1</p>
          </CardContent>
        </Card>
        <Card className="bg-zinc-50 dark:bg-zinc-900">
          <CardContent className="p-4">
            <p className="text-sm">Nested card 2</p>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
);

// Interactive card
export const InteractiveExample = () => (
  <Card
    render={<button type="button" />}
    className="hover:shadow-lg transition-shadow cursor-pointer"
  >
    <CardContent>
      <h3 className="font-semibold mb-1">Clickable Card</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        This entire card is clickable using the render prop.
      </p>
    </CardContent>
  </Card>
);

// Card grid
export const GridExample = () => (
  <div className="grid grid-cols-2 gap-4">
    <Card>
      <CardContent>
        <h4 className="font-medium mb-1">Card 1</h4>
        <p className="text-sm">First card in grid</p>
      </CardContent>
    </Card>
    <Card>
      <CardContent>
        <h4 className="font-medium mb-1">Card 2</h4>
        <p className="text-sm">Second card in grid</p>
      </CardContent>
    </Card>
  </div>
);

// Fill height example
export const FillHeightExample = () => (
  <div className="h-64 grid grid-cols-2 gap-4">
    <Card fillHeight>
      <CardHeader>
        <CardTitle>Tall Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This card fills the available height in its container.</p>
      </CardContent>
    </Card>
    <Card fillHeight>
      <CardHeader>
        <CardTitle>Another Tall Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Both cards will have equal height regardless of content length.</p>
      </CardContent>
    </Card>
  </div>
);

// Product card example
export const ProductCardExample = () => (
  <Card className="max-w-sm">
    <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 rounded-t-lg"></div>
    <CardHeader>
      <CardTitle>Product Name</CardTitle>
      <CardDescription>Brief description of the product and its key features.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">$99.99</div>
      <div className="text-sm text-zinc-500">Free shipping included</div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Add to Cart</Button>
    </CardFooter>
  </Card>
);
