import { Button } from "@patternmode/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@patternmode/ui/components/card";
import { Heading } from "@patternmode/ui/components/heading";
import { Text } from "@patternmode/ui/components/text";

export default function PlaygroundPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <div className="space-y-2">
        <Heading level="1" size="lg">
          PatternMode Playground
        </Heading>
        <Text variant="muted">Integration sandbox for testing components.</Text>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Component Test</CardTitle>
          <CardDescription>
            Verify components render correctly in a Next.js app.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </CardContent>
      </Card>
    </main>
  );
}
