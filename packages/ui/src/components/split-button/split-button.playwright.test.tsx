import { expect, test } from "@playwright/experimental-ct-react";
import { TestSplitButton } from "./split-button.stories";

test.describe("Simple SplitButton Test", () => {
  test("should render split-button", async ({ mount }) => {
    const component = await mount(<TestSplitButton />);
    await expect(component).toBeVisible();
  });
});
