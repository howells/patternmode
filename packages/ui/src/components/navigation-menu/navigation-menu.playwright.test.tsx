import { expect, test } from "@playwright/experimental-ct-react";
import { TestNavigationMenu } from "./navigation-menu.stories";

test.describe("Simple NavigationMenu Test", () => {
  test("should render navigation-menu", async ({ mount }) => {
    const component = await mount(<TestNavigationMenu />);
    await expect(component).toBeVisible();
  });
});
