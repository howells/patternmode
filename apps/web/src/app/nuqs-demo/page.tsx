"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@patternmode/ui/components/button";
import { Input } from "@patternmode/ui/components/input";
import { Stack, HStack, VStack } from "@patternmode/ui/components/stack";
import { Text } from "@patternmode/ui/components/text";
import { useQueryState, parseAsString, parseAsInteger, parseAsBoolean } from "nuqs";

export default function NuqsDemoPage() {
  // String state
  const [name, setName] = useQueryState("name", parseAsString.withDefault(""));

  // Integer state
  const [count, setCount] = useQueryState("count", parseAsInteger.withDefault(0));

  // Boolean state
  const [isEnabled, setIsEnabled] = useQueryState("enabled", parseAsBoolean.withDefault(false));

  return (
    <div>
      <PageHeader
        title="nuqs Demo"
        description="Demonstrating URL query state management with nuqs"
      />
      <div className="p-8">
        <VStack gap={6}>
          <div>
            <Text size="xl">Current URL State</Text>
            <Text size="base" className="text-zinc-600 dark:text-zinc-400">
              Check your browser's URL to see the state reflected in the query parameters
            </Text>
          </div>

          <VStack gap={4}>
            <div>
              <Text size="lg">String State</Text>
              <HStack gap={2}>
                <Input
                  placeholder="Enter your name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => setName("")}
                >
                  Clear
                </Button>
              </HStack>
              <Text size="base" className="text-zinc-600 dark:text-zinc-400">
                Current value: {name || "empty"}
              </Text>
            </div>

            <div>
              <Text size="lg">Integer State</Text>
              <HStack gap={2}>
                <Button
                  onClick={() => setCount((prev) => (prev || 0) - 1)}
                >
                  -
                </Button>
                <Text size="base" className="min-w-[3rem] text-center">
                  {count || 0}
                </Text>
                <Button
                  onClick={() => setCount((prev) => (prev || 0) + 1)}
                >
                  +
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCount(0)}
                >
                  Reset
                </Button>
              </HStack>
            </div>

            <div>
              <Text size="lg">Boolean State</Text>
              <HStack gap={2}>
                <Button
                  variant={isEnabled ? "primary" : "outline"}
                  onClick={() => setIsEnabled(!isEnabled)}
                >
                  {isEnabled ? "Enabled" : "Disabled"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEnabled(false)}
                >
                  Reset
                </Button>
              </HStack>
            </div>
          </VStack>

          <div>
            <Text size="lg">Features Demonstrated</Text>
            <VStack gap={2} className="text-sm">
              <Text size="sm">• URL state persistence - refresh the page to see state preserved</Text>
              <Text size="sm">• Type-safe parsing with different data types</Text>
              <Text size="sm">• Default values for better UX</Text>
              <Text size="sm">• Browser back/forward button support</Text>
              <Text size="sm">• Shareable URLs with state</Text>
            </VStack>
          </div>
        </VStack>
      </div>
    </div>
  );
}