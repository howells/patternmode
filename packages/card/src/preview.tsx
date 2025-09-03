"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeading,
} from "./component";

export function CardPreview() {
  return (
    <Card>
      <CardHeader>
        <CardHeading>Card Title</CardHeading>
        <CardDescription>Simple card preview</CardDescription>
      </CardHeader>
      <CardContent>Content goes here</CardContent>
      <CardFooter border>Footer content</CardFooter>
    </Card>
  );
}

export const cardPreviewProps: readonly unknown[] = [];
