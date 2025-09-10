import { HStack, Stack, VStack } from "./components/stack";

// Example components for the config
export const DefaultExample = () => (
  <Stack gap={4}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Stack>
);

export const HorizontalExample = () => (
  <HStack gap={4}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </HStack>
);

export const CustomSpacingExample = () => (
  <VStack gap={8}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </VStack>
);

export const AlignmentExample = () => (
  <Stack align="center" gap={4}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Stack>
);

export const ResponsiveExample = () => (
  <Stack direction={{ default: "vertical", md: "horizontal" }} gap={4}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Stack>
);

export const HelperComponentsExample = () => (
  <>
    <VStack gap={2}>
      <div>VStack Item 1</div>
      <div>VStack Item 2</div>
    </VStack>
    <HStack gap={2}>
      <div>HStack Item 1</div>
      <div>HStack Item 2</div>
    </HStack>
  </>
);

export const WithPaddingExample = () => (
  <Stack gap={4} padding={4}>
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </Stack>
);

export const WrappingExample = () => (
  <Stack gap={4} wrap>
    <div style={{ width: "200px" }}>Long Item 1</div>
    <div style={{ width: "200px" }}>Long Item 2</div>
    <div style={{ width: "200px" }}>Long Item 3</div>
    <div style={{ width: "200px" }}>Long Item 4</div>
  </Stack>
);
