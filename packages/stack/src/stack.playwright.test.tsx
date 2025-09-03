import { expect, test } from "@playwright/experimental-ct-react";
import { TestStack } from "./stack.stories";

test.describe("Simple Stack Test", () => {
  test("should render stack", async ({ mount }) => {
    const component = await mount(<TestStack />);
    await expect(component).toBeVisible();
  });
});
