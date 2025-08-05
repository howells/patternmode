import { expect, test } from "@playwright/experimental-ct-react";
import { TestButtonGroup } from "./button-group.stories";

test.describe("Simple ButtonGroup Test", () => {
  test("should render button-group", async ({ mount }) => {
    const component = await mount(<TestButtonGroup />);
    await expect(component).toBeVisible();
  });
});
