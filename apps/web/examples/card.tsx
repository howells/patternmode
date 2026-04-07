"use client";

import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";

export default function CardExample() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project settings</CardTitle>
        <CardDescription>
          Manage your project configuration and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body text-muted-foreground">
          Update your project name, description, and visibility settings here.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
}
