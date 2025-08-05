import { expect, test } from "@playwright/experimental-ct-react";
import { TestFieldset } from "./fieldset.stories";

test.describe("Simple Fieldset Test", () => {
  test("should render fieldset", async ({ mount }) => {
    const component = await mount(<TestFieldset />);
    await expect(component).toBeVisible();
  });
});
