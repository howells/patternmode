import { expect, test } from "@playwright/experimental-ct-react";
import { TestCheckbox } from "./checkbox.stories";

test.describe("Simple Checkbox Test", () => {
  test("should render checkbox", async ({ mount }) => {
    const component = await mount(<TestCheckbox />);
    await expect(component).toBeVisible();
  });
});
