import { expect, test } from "@playwright/experimental-ct-react";
import { TestKbd } from "./kbd.stories";

test.describe("Simple Kbd Test", () => {
  test("should render kbd", async ({ mount }) => {
    const component = await mount(<TestKbd />);
    await expect(component).toBeVisible();
  });
});
