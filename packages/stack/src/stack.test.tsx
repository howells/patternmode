import { expect, test } from "@playwright/experimental-ct-react";
import { HStack, Stack, VStack } from "./components/stack";
import { TestStack } from "./stack.stories";

test.describe("Simple Stack Test", () => {
  test("should render stack", async ({ mount }) => {
    const component = await mount(<TestStack />);
    await expect(component).toBeVisible();
  });

  test("VStack should not pass invalid props to anchor element", async ({
    mount,
  }) => {
    const component = await mount(
      <VStack
        data-testid="vstack-anchor"
        gap={4}
        padding={2}
        render={<a href="/test">Link</a>}
      >
        Test Link
      </VStack>
    );

    // Check that invalid props are not rendered as HTML attributes
    const anchor = component.locator("a");
    const gapAttr = await anchor.getAttribute("gap");
    const paddingAttr = await anchor.getAttribute("padding");

    expect(gapAttr).toBeNull();
    expect(paddingAttr).toBeNull();

    // But should still have the href and other valid props
    const href = await anchor.getAttribute("href");
    expect(href).toBe("/test");

    // And should have the data-testid
    const testId = await anchor.getAttribute("data-testid");
    expect(testId).toBe("vstack-anchor");
  });

  test("HStack should not pass invalid props to anchor element", async ({
    mount,
  }) => {
    const component = await mount(
      <HStack
        data-testid="hstack-anchor"
        gap={4}
        padding={2}
        render={<a href="/test">Link</a>}
      >
        Test Link
      </HStack>
    );

    // Check that invalid props are not rendered as HTML attributes
    const anchor = component.locator("a");
    const gapAttr = await anchor.getAttribute("gap");
    const paddingAttr = await anchor.getAttribute("padding");

    expect(gapAttr).toBeNull();
    expect(paddingAttr).toBeNull();

    // But should still have the href and other valid props
    const href = await anchor.getAttribute("href");
    expect(href).toBe("/test");

    // And should have the data-testid
    const testId = await anchor.getAttribute("data-testid");
    expect(testId).toBe("hstack-anchor");
  });

  test("Stack should not pass invalid props to anchor element with render prop", async ({
    mount,
  }) => {
    const component = await mount(
      <Stack
        data-testid="stack-anchor"
        gap={4}
        padding={2}
        render={<a href="/test">Link</a>}
      >
        Test Link
      </Stack>
    );

    // Check that invalid props are not rendered as HTML attributes
    const anchor = component.locator("a");
    const gapAttr = await anchor.getAttribute("gap");
    const paddingAttr = await anchor.getAttribute("padding");

    expect(gapAttr).toBeNull();
    expect(paddingAttr).toBeNull();

    // But should still have the href and other valid props
    const href = await anchor.getAttribute("href");
    expect(href).toBe("/test");

    // And should have the data-testid
    const testId = await anchor.getAttribute("data-testid");
    expect(testId).toBe("stack-anchor");

    // And should have the flex class for layout
    const className = await anchor.getAttribute("class");
    expect(className).toContain("flex");
  });
});
