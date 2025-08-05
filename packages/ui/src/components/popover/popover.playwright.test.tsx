import { expect, test } from "@playwright/experimental-ct-react";
import { TestPopover } from "./popover.stories";

test.describe("Simple Popover Test", () => {
  test("should render popover", async ({ mount }) => {
    const component = await mount(<TestPopover />);
    await expect(component).toBeVisible();
  });
});
