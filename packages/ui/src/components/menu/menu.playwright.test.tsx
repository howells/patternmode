import { expect, test } from "@playwright/experimental-ct-react";
import { TestMenu } from "./menu.stories";

test.describe("Simple Menu Test", () => {
  test("should render menu", async ({ mount }) => {
    const component = await mount(<TestMenu />);
    await expect(component).toBeVisible();
  });
});
