import { expect, test } from "@playwright/experimental-ct-react";
import { TestDrawer } from "./drawer.stories";

test.describe("Simple Drawer Test", () => {
  test("should render drawer", async ({ mount }) => {
    const component = await mount(<TestDrawer />);
    await expect(component).toBeVisible();
  });
});
