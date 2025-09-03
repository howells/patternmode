import { Separator } from "@patternmode/separator";
import { VStack } from "@patternmode/stack";
import { Examples } from "./page.examples";
import { Purpose } from "./page.purpose";

export default function Home() {
  return (
    <VStack className="p-16" gap={16}>
      <h1 className="max-w-3xl font-serif text-4xl">
        Patternmode is a very opinionated component library based on the best
        bits of Base UI, Shadcn UI, Tailwind, and more.
      </h1>

      <Purpose />

      <Separator />

      <Examples />
    </VStack>
  );
}
