import { expect, test } from "@playwright/experimental-ct-react";
import { TestResponsiveDrawer } from "./responsive-drawer.stories";

test.describe("Simple ResponsiveDrawer Test", () => {
  test("should render responsive-drawer", async ({ mount }) => {
    const component = await mount(<TestResponsiveDrawer />);
    await expect(component).toBeVisible();
  });
});
