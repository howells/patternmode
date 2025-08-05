import { expect, test } from "@playwright/experimental-ct-react";
import { TestButton, ClickableButton } from "./button.stories";

test.describe("Simple Button Test", () => {
  test("should render button", async ({ mount }) => {
    const component = await mount(<TestButton />);
    await expect(component).toBeVisible();
  });

  test("should have correct text", async ({ mount }) => {
    const component = await mount(<TestButton />);
    await expect(component).toContainText("Test Button");
  });

  test("should be clickable", async ({ mount }) => {
    const component = await mount(<ClickableButton />);
    await component.click();
    // Note: In a real test, you'd need a way to verify the click handler was called
    await expect(component).toBeVisible();
  });
});