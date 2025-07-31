import { Card } from "@patternmode/ui";
import React from "react";

// Default card
export const /**
              *
              */
  DefaultExample = () => (
    <Card>
      <p>This is a simple card with some content.</p>
    </Card>
  );

// Card with title
export const /**
              *
              */
  WithTitleExample = () => (
    <Card>
      <h3 className="text-lg font-semibold mb-2">Card Title</h3>
      <p>This card includes a title and descriptive content below it.</p>
    </Card>
  );

// Compact card
export const /**
              *
              */
  CompactExample = () => (
    <Card padding={4}>
      <p>This is a more compact card with less padding.</p>
    </Card>
  );

// No padding card
export const /**
              *
              */
  NoPaddingExample = () => (
    <Card padding={0}>
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="font-semibold">Header</h3>
      </div>
      <div className="p-6">
        <p>Content with custom padding structure.</p>
      </div>
    </Card>
  );

// Custom styling
export const /**
              *
              */
  CustomStylingExample = () => (
    <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
      <p>This card has custom styling with a blue theme.</p>
    </Card>
  );

// Nested cards
export const /**
              *
              */
  NestedExample = () => (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Parent Card</h3>
      <div className="space-y-3">
        <Card className="bg-zinc-50 dark:bg-zinc-900">
          <p className="text-sm">Nested card 1</p>
        </Card>
        <Card className="bg-zinc-50 dark:bg-zinc-900">
          <p className="text-sm">Nested card 2</p>
        </Card>
      </div>
    </Card>
  );

// Interactive card
export const /**
              *
              */
  InteractiveExample = () => (
    <Card
      render={<button type="button" />}
      className="hover:shadow-lg transition-shadow cursor-pointer"
    >
      <h3 className="font-semibold mb-1">Clickable Card</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        This entire card is clickable using the render prop.
      </p>
    </Card>
  );

// Card grid
export const /**
              *
              */
  GridExample = () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <h4 className="font-medium mb-1">Card 1</h4>
        <p className="text-sm">First card in grid</p>
      </Card>
      <Card>
        <h4 className="font-medium mb-1">Card 2</h4>
        <p className="text-sm">Second card in grid</p>
      </Card>
    </div>
  );
