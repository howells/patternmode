"use client";

import React from "react";
import { Button } from "../button/component";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./component";

export const CardExample = () => (
  <div className="p-8 space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Preview Card</CardTitle>
        <CardDescription>This is how the Card component looks in the preview.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card component.</p>
      </CardContent>
      <CardFooter>
        <Button>Primary Action</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  </div>
);

export default CardExample;
